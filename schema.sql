--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: event_service; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA event_service;


--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: PaymentStatus; Type: TYPE; Schema: event_service; Owner: -
--

CREATE TYPE event_service."PaymentStatus" AS ENUM (
    'PENDING',
    'PAID',
    'FAILED',
    'REFUNDED',
    'UNPAID'
);


--
-- Name: RegistrationStatus; Type: TYPE; Schema: event_service; Owner: -
--

CREATE TYPE event_service."RegistrationStatus" AS ENUM (
    'PENDING',
    'CONFIRMED',
    'CANCELLED'
);


--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'PAID',
    'FAILED',
    'REFUNDED',
    'UNPAID',
    'EXPIRED',
    'CANCELLED',
    'PROCESSING'
);


--
-- Name: PaymentType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentType" AS ENUM (
    'EVENT_REGISTRATION',
    'TEAM_APPLICATION',
    'EXCLUSIVE_MEMBERSHIP'
);


--
-- Name: RegistrationStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."RegistrationStatus" AS ENUM (
    'PENDING',
    'CONFIRMED',
    'CANCELLED'
);


--
-- Name: RequestStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."RequestStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


--
-- Name: ResourceType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ResourceType" AS ENUM (
    'DOCUMENT',
    'TEMPLATE',
    'GUIDE',
    'VIDEO',
    'LINK'
);


--
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Event; Type: TABLE; Schema: event_service; Owner: -
--

CREATE TABLE event_service."Event" (
    id text NOT NULL,
    "externalId" text NOT NULL,
    title text NOT NULL,
    description text,
    price double precision,
    "maxAttendees" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone,
    "startDate" timestamp(3) without time zone
);


--
-- Name: Payment; Type: TABLE; Schema: event_service; Owner: -
--

CREATE TABLE event_service."Payment" (
    id text NOT NULL,
    "stripeSessionId" text NOT NULL,
    "stripePaymentId" text,
    amount double precision NOT NULL,
    currency text DEFAULT 'eur'::text NOT NULL,
    status event_service."PaymentStatus" NOT NULL,
    "userId" text NOT NULL,
    "eventId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Registration; Type: TABLE; Schema: event_service; Owner: -
--

CREATE TABLE event_service."Registration" (
    id text NOT NULL,
    "eventId" text NOT NULL,
    "userId" text NOT NULL,
    status event_service."RegistrationStatus" NOT NULL,
    "paymentStatus" event_service."PaymentStatus" NOT NULL,
    "paymentId" text,
    "expiresAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: WebhookLog; Type: TABLE; Schema: event_service; Owner: -
--

CREATE TABLE event_service."WebhookLog" (
    id text NOT NULL,
    source text NOT NULL,
    "eventType" text NOT NULL,
    payload text NOT NULL,
    "processedAt" timestamp(3) without time zone,
    error text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: event_service; Owner: -
--

CREATE TABLE event_service._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: ContactSubmission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ContactSubmission" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    responded boolean DEFAULT false NOT NULL
);


--
-- Name: Event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Event" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    content text,
    location text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    "imageUrl" text,
    "maxAttendees" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text NOT NULL,
    published boolean DEFAULT false NOT NULL,
    price double precision,
    "requiresPayment" boolean DEFAULT false NOT NULL
);


--
-- Name: EventImage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EventImage" (
    id text NOT NULL,
    "eventId" text NOT NULL,
    "imageUrl" text NOT NULL,
    caption text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: ExclusiveMembership; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ExclusiveMembership" (
    id text NOT NULL,
    "userId" text NOT NULL,
    code text NOT NULL,
    "paymentId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: MembershipRequest; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."MembershipRequest" (
    id text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    "isStudent" boolean DEFAULT true NOT NULL,
    university text NOT NULL,
    "codiceFiscale" text,
    status public."RequestStatus" DEFAULT 'PENDING'::public."RequestStatus" NOT NULL,
    "paymentReference" text,
    notes text,
    "userId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "reviewedBy" text,
    "reviewedAt" timestamp(3) without time zone
);


--
-- Name: PasswordReset; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PasswordReset" (
    id text NOT NULL,
    "userId" text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Profile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Profile" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "universityInIndia" text,
    "degreeInIndia" text,
    "yearOfArrival" integer,
    "residenceArea" text,
    interests text,
    skills text,
    "showEmail" boolean DEFAULT false NOT NULL,
    "showPhone" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Registration; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Registration" (
    id text NOT NULL,
    "eventId" text NOT NULL,
    "userId" text NOT NULL,
    status public."RegistrationStatus" DEFAULT 'PENDING'::public."RegistrationStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "paymentId" text,
    "paymentStatus" public."PaymentStatus" DEFAULT 'UNPAID'::public."PaymentStatus" NOT NULL,
    "expiresAt" timestamp(3) without time zone,
    name text
);


--
-- Name: Resource; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Resource" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "fileUrl" text NOT NULL,
    "thumbnailUrl" text,
    "categoryId" text NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    "resourceType" public."ResourceType" DEFAULT 'DOCUMENT'::public."ResourceType" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "viewCount" integer DEFAULT 0 NOT NULL,
    "downloadCount" integer DEFAULT 0 NOT NULL,
    slug text NOT NULL
);


--
-- Name: ResourceCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ResourceCategory" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    "imageUrl" text,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ResourceView; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ResourceView" (
    id text NOT NULL,
    "resourceId" text NOT NULL,
    "userId" text NOT NULL,
    "viewedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    downloaded boolean DEFAULT false NOT NULL
);


--
-- Name: StripePayment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."StripePayment" (
    id text NOT NULL,
    "stripeSessionId" text NOT NULL,
    "stripePaymentId" text,
    amount double precision NOT NULL,
    currency text DEFAULT 'eur'::text NOT NULL,
    status public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    "paymentType" public."PaymentType" NOT NULL,
    "userId" text NOT NULL,
    "eventId" text,
    "teamApplicationId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: TeamApplication; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TeamApplication" (
    id text NOT NULL,
    department text NOT NULL,
    motivation text,
    status public."RequestStatus" DEFAULT 'PENDING'::public."RequestStatus" NOT NULL,
    notes text,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "reviewedBy" text,
    "reviewedAt" timestamp(3) without time zone,
    "paymentId" text
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    password text NOT NULL,
    image text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    bio text,
    city text,
    course text,
    "graduationYear" integer,
    "isProfilePublic" boolean DEFAULT true NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    "linkedinUrl" text,
    "phoneNumber" text,
    university text,
    "membershipExpiryDate" timestamp(3) without time zone,
    "paymentVerified" boolean DEFAULT false NOT NULL,
    "isSuperAdmin" boolean DEFAULT false NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: event_service; Owner: -
--

ALTER TABLE ONLY event_service."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: event_service; Owner: -
--

ALTER TABLE ONLY event_service."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: Registration Registration_pkey; Type: CONSTRAINT; Schema: event_service; Owner: -
--

ALTER TABLE ONLY event_service."Registration"
    ADD CONSTRAINT "Registration_pkey" PRIMARY KEY (id);


--
-- Name: WebhookLog WebhookLog_pkey; Type: CONSTRAINT; Schema: event_service; Owner: -
--

ALTER TABLE ONLY event_service."WebhookLog"
    ADD CONSTRAINT "WebhookLog_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: event_service; Owner: -
--

ALTER TABLE ONLY event_service._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: ContactSubmission ContactSubmission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ContactSubmission"
    ADD CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY (id);


--
-- Name: EventImage EventImage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EventImage"
    ADD CONSTRAINT "EventImage_pkey" PRIMARY KEY (id);


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: ExclusiveMembership ExclusiveMembership_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ExclusiveMembership"
    ADD CONSTRAINT "ExclusiveMembership_pkey" PRIMARY KEY (id);


--
-- Name: MembershipRequest MembershipRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MembershipRequest"
    ADD CONSTRAINT "MembershipRequest_pkey" PRIMARY KEY (id);


--
-- Name: PasswordReset PasswordReset_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PasswordReset"
    ADD CONSTRAINT "PasswordReset_pkey" PRIMARY KEY (id);


--
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);


--
-- Name: Registration Registration_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Registration"
    ADD CONSTRAINT "Registration_pkey" PRIMARY KEY (id);


--
-- Name: ResourceCategory ResourceCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResourceCategory"
    ADD CONSTRAINT "ResourceCategory_pkey" PRIMARY KEY (id);


--
-- Name: ResourceView ResourceView_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResourceView"
    ADD CONSTRAINT "ResourceView_pkey" PRIMARY KEY (id);


--
-- Name: Resource Resource_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_pkey" PRIMARY KEY (id);


--
-- Name: StripePayment StripePayment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StripePayment"
    ADD CONSTRAINT "StripePayment_pkey" PRIMARY KEY (id);


--
-- Name: TeamApplication TeamApplication_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TeamApplication"
    ADD CONSTRAINT "TeamApplication_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Event_externalId_key; Type: INDEX; Schema: event_service; Owner: -
--

CREATE UNIQUE INDEX "Event_externalId_key" ON event_service."Event" USING btree ("externalId");


--
-- Name: Payment_stripeSessionId_key; Type: INDEX; Schema: event_service; Owner: -
--

CREATE UNIQUE INDEX "Payment_stripeSessionId_key" ON event_service."Payment" USING btree ("stripeSessionId");


--
-- Name: Registration_eventId_userId_key; Type: INDEX; Schema: event_service; Owner: -
--

CREATE UNIQUE INDEX "Registration_eventId_userId_key" ON event_service."Registration" USING btree ("eventId", "userId");


--
-- Name: Registration_paymentId_key; Type: INDEX; Schema: event_service; Owner: -
--

CREATE UNIQUE INDEX "Registration_paymentId_key" ON event_service."Registration" USING btree ("paymentId");


--
-- Name: ExclusiveMembership_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ExclusiveMembership_code_key" ON public."ExclusiveMembership" USING btree (code);


--
-- Name: ExclusiveMembership_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ExclusiveMembership_userId_key" ON public."ExclusiveMembership" USING btree ("userId");


--
-- Name: PasswordReset_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "PasswordReset_token_key" ON public."PasswordReset" USING btree (token);


--
-- Name: PasswordReset_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "PasswordReset_userId_key" ON public."PasswordReset" USING btree ("userId");


--
-- Name: Profile_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Profile_userId_key" ON public."Profile" USING btree ("userId");


--
-- Name: Registration_eventId_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Registration_eventId_userId_key" ON public."Registration" USING btree ("eventId", "userId");


--
-- Name: ResourceCategory_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ResourceCategory_slug_key" ON public."ResourceCategory" USING btree (slug);


--
-- Name: ResourceView_resourceId_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ResourceView_resourceId_userId_key" ON public."ResourceView" USING btree ("resourceId", "userId");


--
-- Name: Resource_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Resource_slug_key" ON public."Resource" USING btree (slug);


--
-- Name: StripePayment_stripeSessionId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "StripePayment_stripeSessionId_key" ON public."StripePayment" USING btree ("stripeSessionId");


--
-- Name: StripePayment_teamApplicationId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "StripePayment_teamApplicationId_key" ON public."StripePayment" USING btree ("teamApplicationId");


--
-- Name: TeamApplication_paymentId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "TeamApplication_paymentId_key" ON public."TeamApplication" USING btree ("paymentId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Payment Payment_eventId_fkey; Type: FK CONSTRAINT; Schema: event_service; Owner: -
--

ALTER TABLE ONLY event_service."Payment"
    ADD CONSTRAINT "Payment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES event_service."Event"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Registration Registration_eventId_fkey; Type: FK CONSTRAINT; Schema: event_service; Owner: -
--

ALTER TABLE ONLY event_service."Registration"
    ADD CONSTRAINT "Registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES event_service."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Registration Registration_paymentId_fkey; Type: FK CONSTRAINT; Schema: event_service; Owner: -
--

ALTER TABLE ONLY event_service."Registration"
    ADD CONSTRAINT "Registration_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES event_service."Payment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EventImage EventImage_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EventImage"
    ADD CONSTRAINT "EventImage_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Event Event_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ExclusiveMembership ExclusiveMembership_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ExclusiveMembership"
    ADD CONSTRAINT "ExclusiveMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MembershipRequest MembershipRequest_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MembershipRequest"
    ADD CONSTRAINT "MembershipRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PasswordReset PasswordReset_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PasswordReset"
    ADD CONSTRAINT "PasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Profile Profile_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Registration Registration_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Registration"
    ADD CONSTRAINT "Registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Registration Registration_paymentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Registration"
    ADD CONSTRAINT "Registration_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES public."StripePayment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Registration Registration_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Registration"
    ADD CONSTRAINT "Registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ResourceView ResourceView_resourceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResourceView"
    ADD CONSTRAINT "ResourceView_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES public."Resource"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ResourceView ResourceView_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResourceView"
    ADD CONSTRAINT "ResourceView_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Resource Resource_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."ResourceCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StripePayment StripePayment_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StripePayment"
    ADD CONSTRAINT "StripePayment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: StripePayment StripePayment_teamApplicationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StripePayment"
    ADD CONSTRAINT "StripePayment_teamApplicationId_fkey" FOREIGN KEY ("teamApplicationId") REFERENCES public."TeamApplication"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: StripePayment StripePayment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StripePayment"
    ADD CONSTRAINT "StripePayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TeamApplication TeamApplication_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TeamApplication"
    ADD CONSTRAINT "TeamApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

