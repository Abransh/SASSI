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
-- Data for Name: Event; Type: TABLE DATA; Schema: event_service; Owner: -
--

COPY event_service."Event" (id, "externalId", title, description, price, "maxAttendees", "createdAt", "updatedAt", "endDate", "startDate") FROM stdin;
cm96jtcsf0000x7fd6500tk3h	test-1743998730153	Test Event	This is a test event created with Prisma	10	\N	2025-04-07 04:05:30.494	2025-04-07 04:05:30.494	\N	\N
cm97344qk0000x72m9ixi8mwn	ext-1744031145639	test pay 7 	test pay 7 	1	\N	2025-04-07 13:05:45.668	2025-04-07 13:05:45.668	\N	\N
cm9734xd20001x72m412yzvss	ext-1744031183000	test pay 8	test pay 8	1	\N	2025-04-07 13:06:23.003	2025-04-07 13:06:23.003	\N	\N
cm9736tuz0006x72msw8mvg7w	ext-1744031271738	test pay 9	test pay 9	2	\N	2025-04-07 13:07:51.758	2025-04-07 13:07:51.758	\N	\N
cm973huv60000x7yd42unc2mf	ext-1744031786294	test pay 10	test pay 10	3	\N	2025-04-07 13:16:26.319	2025-04-07 13:16:26.319	\N	\N
cm973mx800000x7n1w4gjlzh3	ext-1744032022626	test pay 11	test pay 11	1	\N	2025-04-07 13:20:22.638	2025-04-07 13:20:22.638	\N	\N
cm973s0xi0000x7blf2ubwgc9	ext-1744032260735	test pay 12	test pay 11	1	\N	2025-04-07 13:24:20.749	2025-04-07 13:24:20.749	\N	\N
cm9747una0000x7amxre66fbf	ext-1744032999142	test pay 13	test pay 13	1	\N	2025-04-07 13:36:39.143	2025-04-07 13:36:39.143	\N	\N
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: event_service; Owner: -
--

COPY event_service."Payment" (id, "stripeSessionId", "stripePaymentId", amount, currency, status, "userId", "eventId", "createdAt", "updatedAt") FROM stdin;
cm972m2nt0003x7kvzr6lvt5f	cs_live_a1y1fkckHn5srwUtUHaR9UwC0DZCjoKL0HEY5bWbr7HqC8Ym9PQg6E1Q46	\N	10	eur	PENDING	cm96kdbk20000x746w97r17hx	cm96jtcsf0000x7fd6500tk3h	2025-04-07 12:51:43.481	2025-04-07 12:51:44.494
cm9735cxv0005x72msph4f7l1	cs_live_a1JfUpyzZaq8gEbZHYTUPL0tF7NLY6ZfO9mMRhVnkPandAM2XTBKVW6ZRy	\N	1	eur	PENDING	cm95kupb90000x7h53bcapa4d	cm9734xd20001x72m412yzvss	2025-04-07 13:06:43.268	2025-04-07 13:06:44.125
cm97375sx000ax72m5vvgv9yx	cs_live_a1ILCK8vCFa8QOaMaNKPIk1SrHfdB3VG61xCXeXLX08hJgSAuMxtMLSIJk	\N	2	eur	PENDING	cm95kupb90000x7h53bcapa4d	cm9736tuz0006x72msw8mvg7w	2025-04-07 13:08:07.33	2025-04-07 13:08:08.113
cm973iawg0004x7ydhu9nl0n4	cs_live_a18ceJwwXzIHD1Cz2LqbpViVVd84nmtxDpLhnaFqsFgpBRXXZBazCEF3JS	\N	3	eur	PENDING	cm95kupb90000x7h53bcapa4d	cm973huv60000x7yd42unc2mf	2025-04-07 13:16:47.152	2025-04-07 13:16:47.973
cm973ncdc0004x7n1hbs8ep0o	cs_live_a1suxEyGAvbRO50ruhqnJ5ho48fQfFprlcpGZXhoIEZ1wvvsnPJli41TdW	\N	1	eur	PENDING	cm95kupb90000x7h53bcapa4d	cm973mx800000x7n1w4gjlzh3	2025-04-07 13:20:42.337	2025-04-07 13:20:43.253
cm973sj3u0004x7blp6oms5m6	cs_live_a1YNjovE1QEAddqQdr5Vb98oiPe2icu1g4JkVD0i4wqYOoG6nIKZaqFHti	\N	1	eur	PENDING	cm95kupb90000x7h53bcapa4d	cm973s0xi0000x7blf2ubwgc9	2025-04-07 13:24:44.346	2025-04-07 13:24:45.177
\.


--
-- Data for Name: Registration; Type: TABLE DATA; Schema: event_service; Owner: -
--

COPY event_service."Registration" (id, "eventId", "userId", status, "paymentStatus", "paymentId", "expiresAt", "createdAt", "updatedAt") FROM stdin;
cm972m2kc0001x7kvjshpuzb0	cm96jtcsf0000x7fd6500tk3h	cm96kdbk20000x746w97r17hx	PENDING	PENDING	\N	\N	2025-04-07 12:51:43.355	2025-04-07 12:51:43.355
cm9735cvm0003x72m7oenydmp	cm9734xd20001x72m412yzvss	cm95kupb90000x7h53bcapa4d	PENDING	PENDING	\N	\N	2025-04-07 13:06:43.186	2025-04-07 13:06:43.186
cm97375q40008x72m82rud0dp	cm9736tuz0006x72msw8mvg7w	cm95kupb90000x7h53bcapa4d	PENDING	PENDING	\N	\N	2025-04-07 13:08:07.227	2025-04-07 13:08:07.227
cm973iat30002x7ydnmd1550t	cm973huv60000x7yd42unc2mf	cm95kupb90000x7h53bcapa4d	PENDING	PENDING	\N	\N	2025-04-07 13:16:47.031	2025-04-07 13:16:47.031
cm973ncae0002x7n1dil4bp2l	cm973mx800000x7n1w4gjlzh3	cm95kupb90000x7h53bcapa4d	PENDING	PENDING	\N	\N	2025-04-07 13:20:42.231	2025-04-07 13:20:42.231
cm973sj1i0002x7blzug8hugp	cm973s0xi0000x7blf2ubwgc9	cm95kupb90000x7h53bcapa4d	PENDING	PENDING	\N	\N	2025-04-07 13:24:44.261	2025-04-07 13:24:44.261
\.


--
-- Data for Name: WebhookLog; Type: TABLE DATA; Schema: event_service; Owner: -
--

COPY event_service."WebhookLog" (id, source, "eventType", payload, "processedAt", error, "createdAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: event_service; Owner: -
--

COPY event_service._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
db1dace4-23fa-437c-aa8f-ee55b3c416b4	c7e09fde2d9ba23fcaf364e424b66159ecaca3d074ce985e91f49988062c3b65	2025-04-07 02:12:30.231982+00	20250407021229_init	\N	\N	2025-04-07 02:12:29.962268+00	1
f83d3e12-79df-4f95-ba09-fb6cef085eec	72978d7812ee1d75ae91feb81c88a5d3be9071502494c4ae8964c943d7ac30f5	2025-04-07 13:14:01.499304+00	20250407131401_add_event_dates	\N	\N	2025-04-07 13:14:01.266048+00	1
\.


--
-- Data for Name: ContactSubmission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ContactSubmission" (id, name, email, subject, message, "createdAt", responded) FROM stdin;
cm97lbard0000jx045rrewxau	Abransh	abransh05@gmail.com	testing 	testingthis	2025-04-07 21:35:13.464	t
cm97lblgh0001jx04sm9oo1mn	Abransh	abransh05@gmail.com	testing 	testingthis	2025-04-07 21:35:27.33	t
cm9b73iqe0000jn04rqhnrfi5	hi	abransh05@gmail.com	hi	hillllllfdewf\n	2025-04-10 10:08:20.61	t
cm9br8cgr0000l7042r39tjrj	abransh	abranshbaliyan2807@gmail.com	who's the CTO	whos the CTO	2025-04-10 19:31:58.107	t
cm9q72gin0002l504u0g5xsbj	Abransh 	abranshbaliyan2807@gmail.com	test 	Hey I am abransh\n	2025-04-20 22:04:03.742	t
cma7nsk7i0000jp04xbmfzg4z	abransh	abransh06@gmail.com	hahahah ddos	ddosfihdjkcbd	2025-05-03 03:24:20.43	t
cmai8hqiq000gjs04u43b5p87	Radhika Rajan	radhikarajan2001@gmail.com	RE-Entry to Italy 	Hi Sassi,\nI applied for my permesso renewal in February and then traveled to India. I have my graduation ceremony on June 19th and I possess the postal receipt. I would like to know if I can re-enter Italy with this receipt or if I need to apply for a visa.\nMy original fingerprint appointment was on April 30th, which I missed, but I have been given a new appointment date of July 2nd, as shown on the Portale Immigrazione.\nCan I enter Italy with this updated appointment and the postal receipt?\nRadhika Rajan - +39 3509258986 	2025-05-10 13:01:29.091	t
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, name, email, password, image, role, "createdAt", "updatedAt", bio, city, course, "graduationYear", "isProfilePublic", "isVerified", "linkedinUrl", "phoneNumber", university, "membershipExpiryDate", "paymentVerified", "isSuperAdmin") FROM stdin;
cm95ov2750004x7sns0vmpzay	Abransh Baliyan	abranshbaliyan2807@gmail.com	$2b$10$LMFrHqtX0DuZoL9b1WWHH.UiNM/eomLaVolBaDjz0ykTEu.fMwSAW	\N	USER	2025-04-06 13:39:01.986	2025-04-06 13:39:01.986	\N	\N		\N	t	f	\N	\N		\N	f	f
cm9h1whbk0000jx04ykcx2pzq	Meet Jayesh Choudhari	20101013.meetchoudhari@gmail.com	$2b$10$IKYzFZP4ibUGqMkWnXc8jOvbYZDrEaW3broo/q9jEw.TL19Ft0YAq	\N	USER	2025-04-14 12:29:31.184	2025-04-14 12:29:31.184	\N	\N	MSc in civil engineering	\N	t	f	\N	\N	Politecnico Di Milano	\N	f	f
cm965oiij0000l80457zo1gv1	abransh	abransh05@gmail.com	$2b$10$06HYFGSa0SyC446FO05Q7enWpkCoDPKSsbTcHKs1YPvGcVLHivGYC	\N	USER	2025-04-06 21:29:50.012	2025-04-06 21:29:50.012	\N	\N		\N	t	f	\N	\N		\N	f	f
cm96eat2a0004x7l2940yy0mx	a	a@gmail.com	$2b$10$6myXyLHgYWzHBD9KdzcNgOJSvg4uGiCdlXYCsU1q4N2eaTa/bWNRC	\N	USER	2025-04-07 01:31:07.042	2025-04-07 01:31:07.042	\N	\N		\N	t	f	\N	\N		\N	f	f
cm96ehicc0002lf04chp34rqo	ab	ab@gmail.com	$2b$10$hc25X23Fml1/zbrUOEIb.ONewwqchtsBfTYNTL257/iNRJqmnRpAe	\N	USER	2025-04-07 01:36:19.741	2025-04-07 01:36:19.741	\N	\N		\N	t	f	\N	\N		\N	f	f
cm96kdbk20000x746w97r17hx	Test User	test@example.com	$2b$10$tD/An1G8QuMck0Gs79qmf.uvDyTPfRqfm3LOUvMMGftFgoEuRE8VO	\N	ADMIN	2025-04-07 04:21:02.011	2025-04-07 04:21:02.011	\N	\N	\N	\N	t	t	\N	\N	\N	\N	f	t
cm9h25onw0006js04ggl27m68	Sri Karthik Dara	dsri2211@gmail.com	$2b$10$0wzLDuxHju1QlAkRm8ruv.KULpD8xuxsKYobJ.dDzknCE9AK7xscW	\N	USER	2025-04-14 12:36:40.604	2025-04-14 12:36:40.604	\N	\N	Masters in Mechanical Engineering 	\N	t	f	\N	\N	Politecnico Di Milano 	\N	f	f
cm9h277dr0000jr047t451nuw	Prit Vijay Ramjiyani 	ramjiyani.prit7@gmail.com	$2b$10$lovZX6StWPd8YyOrPVB09uCyaFm3/iHSYfrkujFtklZXDr5B55E7G	\N	USER	2025-04-14 12:37:51.52	2025-04-14 12:37:51.52	\N	\N	Msc Civil Engineering 	\N	t	f	\N	\N	Polimi	\N	f	f
cm9h36o890000l504ew6jhpak	Kartik Prasanna	kartikprasanna2002@gmail.com	$2b$10$rDk2WdQOh3vsYvDFsChMY.k.idS0UuwOApHuIK5NmCHZS2ECNWyli	\N	USER	2025-04-14 13:05:26.313	2025-04-14 13:05:26.313	\N	\N	MSc Mechanical Engineering	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm97ry7cd0000lb04tlxrkl0n	Insha Murad Lari	inshalari0001@gmail.com	$2b$10$dAFwvmONrusYDeknLVCUTOzSYtYhNHHzHVyjrFdFWvgpL8e0mL/Oe	\N	USER	2025-04-08 00:40:59.821	2025-04-08 00:40:59.821	\N	\N	MIE	\N	t	f	\N	\N	Unimi ( Maybe Future)	\N	f	f
cm95kupb90000x7h53bcapa4d	SASSI Admin	admin@sassimilan.com	$2b$10$IUX9e5bncyEQCQmsBD/LCOtItKs/FyYltMtVVC6ujaz7YJ6alQPv6	\N	ADMIN	2025-04-06 11:46:46.822	2025-04-08 02:05:28.691	\N	\N	\N	\N	t	t	\N	\N	\N	\N	t	t
cm965tc270008l804yhpn1hom	Harsh	ge@hasb.com	$2b$10$A4E.G.vvc0uDO4Nk4kH5/OFItbt1nas01oDVfI.S/6tyJQZqdzIcG	\N	USER	2025-04-06 21:33:34.927	2025-04-10 07:14:58.183	\N	\N		\N	t	t	\N	\N	Hasbilla	\N	t	f
cm9b6oelr0000ih04a9m1e0nq	Paul	abhronilpaul@gmail.com	$2b$10$OxiDSfJj9WKX2kC5wPk2meNBd5x5W7FnISn1uNzy9tZucmg2l.ZeG	\N	USER	2025-04-10 09:56:35.44	2025-04-10 09:56:35.44	\N	\N		\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9bnuo390000ld049j6c9hrc	Harsh Nanesha	hnanesha@gmail.com	$2b$10$luZ.8pqS5Y8KgYsaQY4rXumgigLTqz5GN0bmIUd4VyUMbsL1J7zOG	\N	USER	2025-04-10 17:57:21.141	2025-04-10 17:57:21.141	\N	\N	PhD	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9bs5ecz0000l804vzf0ijla	Srikrishna Kidambi Murali 	kingmaker04111999@gmail.com	$2b$10$L5Niz81E/N3nNaZTD4ygqe.edF9TNXNobzIOJ3lH4Wf8S3FmXZirC	\N	USER	2025-04-10 19:57:40.211	2025-04-10 19:57:40.211	\N	\N		\N	t	f	\N	\N	Politecnico Di Milano	\N	f	f
cm9buxfvs0002la046kcxcm9s	Shubham Gangurde 	shubhamatpolimi@gmail.com	$2b$10$TmJXHZkibF8qpt5K2g2dV.fkHywdNu4izlmW5g4BOV0VJ7QzLZU1m	\N	USER	2025-04-10 21:15:27.784	2025-04-10 21:15:27.784	\N	\N	Msc Computer Engineering 	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9ccptqj0000js0494cdlhhr	Nain bohra	Nainjain2@gmail.com	$2b$10$9F.RNtLIPwH52/oSjgSBpeo7I2j2Jfz.HlcYVgJsI5oAzZemRl1YW	\N	USER	2025-04-11 05:33:25.579	2025-04-11 05:33:25.579	\N	\N	Masters in Global Luxury goods and services management 	\N	t	f	\N	\N	Politecnico di milano	\N	f	f
cm9cmgvk30000l704dawlo3o0	anmol kaur	anmolkaurteen@gmail.com	$2b$10$Jty1YXWXUQZSqdxjNbmwnuekiXRpJ6tdYqpFWZpkyo12/X1zbn6ha	\N	USER	2025-04-11 10:06:24.195	2025-04-11 10:06:24.195	\N	\N	Masters in furniture design 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cm9cnw0hs0000l604q2knr0dz	Ayush Kumar	mental.ak123@gmail.com	$2b$10$5fZWB2XE1zVYD6aYVPwdV./7f3e1U49D9Qf6ds4GYWkqo2A/6gsaK	\N	USER	2025-04-11 10:46:10.048	2025-04-11 10:46:10.048	\N	\N	MSc Aeronautical Engineering 	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9d3yi8s0000kw046kvq9xgn	Jugjeev Singh Kukkal 	kukkaljugjeevsingh2003@gmail.com	$2b$10$oy0rd1EYXqbXIODFCDZ7P.kSj6HCBIsywBlphXpvlzmCVonozyfx6	\N	USER	2025-04-11 18:16:00.22	2025-04-11 18:16:00.22	\N	\N	MSc Mechanical Engineering 	\N	t	f	\N	\N	Politecnico di milano 	\N	f	f
cm9desqm60002jx04gg0hr4q5	niggaaa	nigga@chigga.com	$2b$10$U2RvLog9vXCAnDd4IGfn0u.vOketuZEAm1vfOWb4Q1y05hXSyfN9C	\N	USER	2025-04-11 23:19:26.91	2025-04-11 23:19:26.91	\N	\N		\N	t	f	\N	\N		\N	f	f
cm9dv9xxu0000l8043y5x2sxh	Aman dube	aman.dube1732@gmail.com	$2b$10$LcV.mH5VBJyjDsDkuMlcqO3xzYusOoVEtYkrkMqXZkGH4qLPxwKvK	\N	USER	2025-04-12 07:00:43.411	2025-04-12 07:00:43.411	\N	\N		\N	t	f	\N	\N		\N	f	f
cm9dwg1xy0000lc04ppgtejhs	SAI KRISHNA K	saikrishna.kakedla@gmail.com	$2b$10$pG0YaRIH7n0UC6WHGgCoHOeLX25Iomub8wB8r/f4L7Fc9BGWb6BOK	\N	USER	2025-04-12 07:33:28.15	2025-04-12 07:33:28.15	\N	\N	MSc Environmental and Land Planning Engineering	\N	t	f	\N	\N	Plitecnico Di Milano	\N	f	f
cm9ec9vtt0000ky049r03ka7i	Mahati Bandekar 	mbandekardes@gmail.com	$2b$10$hLCDjHDa6h.Z2gVRDXuXN.Ccz2ysmiUiKJJLOv6ByXJLc9l/WpZCi	\N	USER	2025-04-12 14:56:34.145	2025-04-12 14:56:34.145	\N	\N		\N	t	f	\N	\N	Domus Academy 	\N	f	f
cm9ef3oqz0000lh042rjagoet	Gopal k	Gopalkabra00@yahoo.com	$2b$10$SH7lo0hlJck7.xcmcYt2B.htAeyLKLpKx4U9UaM7cnr0J1gPJWY9.	\N	USER	2025-04-12 16:15:43.884	2025-04-12 16:15:43.884	\N	\N		\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cm9frzmyv0000l504vfcsbvh7	Anwar Ahsen	anwarahsen1@gmail.com	$2b$10$NjsT/6zR3dmYmmbB9BaXdOOXsox.MrNAQ1KSOCpWbHggr1oeN5MhO	\N	USER	2025-04-13 15:04:16.135	2025-04-13 15:04:16.135	\N	\N	MSc Building Engineering 	\N	t	f	\N	\N	Poli tecnico Di Milano	\N	f	f
cm9fsgmhl0000ky04zncp2xx0	Hammad Tariq	hamadali4124@gmail.com	$2b$10$8Qeb1azp73A9CJLbT3cdUuNYW/OqHu3rR3LyNuD63gHwhDUlEEP/e	\N	USER	2025-04-13 15:17:28.665	2025-04-13 15:17:28.665	\N	\N	MSc Mechanical Engineering 	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9fybnce0000jr04adcegjwu	Ayush Bhardwaj	classicayush@gmail.com	$2b$10$NjlXd4QaOLS.eR/4SvG0iuKhD4OaXZAe6WV04lDQ4vOkvPhJhKr3y	\N	USER	2025-04-13 18:01:34.191	2025-04-13 18:01:34.191	\N	\N	MSc - Computer Science & Engineering	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9g151an0000lg04ai6r9eok	Guna Sai Krishna Goriparthy	gunasaikrishnagoriparthy@gmail.com	$2b$10$22JS9UnxECXenFzAyF.6wuYYijhwu3Ubrg/UEue6GUyHm460i9DvK	\N	USER	2025-04-13 19:20:24.527	2025-04-13 19:20:24.527	\N	\N	User experience design	\N	t	f	\N	\N	Naba	\N	f	f
cm9grh72h0000if04p99petto	Vamshi Damagatla	boby.vamshikd03@gmail.com	$2b$10$4yq//cHRjKg/FYzjoWgJgeawb73NPU3KFP7WdmLe/nHzsRbmX.Hj.	\N	USER	2025-04-14 07:37:41.898	2025-04-14 07:37:41.898	\N	\N	PhD in Physics	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9gud21m0000l70420ze0y7v	Mohan Lal	karmanimk2021@gmail.com	$2b$10$e.tckMQbsNEsGh0b.i9zcesUUxnDL29XzjctICJK1kacOnYRIOkvG	\N	USER	2025-04-14 08:58:27.611	2025-04-14 08:58:27.611	\N	\N	Msc Civil Engineering 	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9gujshz0004js04lqnhp2i5	Kalash Paripurnam	Kalash.Paripurnam@gmail.com	$2b$10$lflJ.L2Q9VLWBu6xlkpqNe2QwZ79QTTO6mkpkagGUPPbcZvIJWIo6	\N	USER	2025-04-14 09:03:41.832	2025-04-14 09:03:41.832	\N	\N	MS Space Engineering	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9gut1t30006js04bu1agj6b	Aditya Gangula	aditya.gangula@gmail.com	$2b$10$X1ZnpI6BFm32mlqLtK4u2OvL4DJhft74VOujE87RFczMggvHtXvGy	\N	USER	2025-04-14 09:10:53.8	2025-04-14 09:10:53.8	\N	\N		\N	t	f	\N	\N	Polimi	\N	f	f
cm9h3mu2t0004ld048hexmykd	Shreshtha Choudhury	shreshthachoudhury11@gmail.com	$2b$10$edVK6Obl5mjbNfIzdyFx6.hdrZr7uZm0YSS/HHUQsjFWcbRM.eSKi	\N	USER	2025-04-14 13:18:00.39	2025-04-14 13:18:00.39	\N	\N	BSc Architectural Design	\N	t	f	\N	\N	Politecnico Di Milano	\N	f	f
cm9h3rd1x0004l504vkvf7p2l	Meenal	meenal.humnekar601@gmail.com	$2b$10$G7uc1cK.xNLsDXxJst.TluBOOenF6BAu5HUmWQxmPn4SBMe7M0ETS	\N	USER	2025-04-14 13:21:31.605	2025-04-14 13:21:31.605	\N	\N	Msc Management engineering 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cm9h3v8n00000ih04ain0q2og	test	test2@gmail.com	$2b$10$8gwfCsGsGUY2Xik9A1TiwObpJeEGS1Bd46jL154PunPqtrOerfHay	\N	USER	2025-04-14 13:24:32.509	2025-04-14 13:24:32.509	\N	\N		\N	t	f	\N	\N		\N	f	f
cm9h474mu0006l504evikx7vn	Satvik Sharma	satviksharma219@gmail.com	$2b$10$pv6Qpj6NN5fQN1D4BGCXcekmJX1aTcX.bv7F6pRcemfyBsVK3PJWC	\N	USER	2025-04-14 13:33:47.19	2025-04-14 13:33:47.19	\N	\N	MSc Computer Engineering	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9h519bs0000jy04o3sxtjsh	Om Mohan Deshmukh 	ommd1404@gmail.com	$2b$10$9TM9Z1Nod/y2ihYtX0NrLeKlLESvg2/R0eOPuDvDdB2Yl0RjfMJrG	\N	USER	2025-04-14 13:57:12.952	2025-04-14 13:57:12.952	\N	\N		\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9h7cwjc0000jy04mm9ep1l5	Ishaanpon Manikandan	ishaanpon@gmail.com	$2b$10$khpDrwTF/MDsLe83cUEUmO3LXp6dpo/pWotvbB0chPOdwZp9dZuW6	\N	USER	2025-04-14 15:02:15.48	2025-04-14 15:02:15.48	\N	\N	MSc Electronics Engineering	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9h8a7uh0002jy04b9imrfly	Edward Staines	edward.staines1@gmail.com	$2b$10$0aD.mXgicrJdoncH0mL0N.bF1yqGtkSSCoXLEapbxGzVG3..HDOKS	\N	USER	2025-04-14 15:28:09.785	2025-04-14 15:28:09.785	\N	\N	Msc Mechanical Engineering 	\N	t	f	\N	\N	Polimi	\N	f	f
cm9hbj92w0000i50424n4kprd	Ashna Agarwal	ashna15102003@gmail.com	$2b$10$Dio0wyP0RBB1aYmNsHmcr.ga2yoTrEM0S11LeTy8h.KdwJIHMTE2a	\N	USER	2025-04-14 16:59:10.137	2025-04-14 16:59:10.137	\N	\N	Fashion and accessories design. 	\N	t	f	\N	\N	Istituto Marangoni 	\N	f	f
cm9hc8hgq0002i504ppp3rlq4	samruddhi	samruddhipatil2331@gmail.com	$2b$10$6GIqRGhRzkUU24.SouiGeONA2/OndtNIWGNgmKD3PI0Pla6wL3Jp2	\N	USER	2025-04-14 17:18:47.402	2025-04-14 17:18:47.402	\N	\N		\N	t	f	\N	\N		\N	f	f
cm9hegnay0000kz04d914txrk	Saniyaa Kenjale 	saniyaa.kenjale@mail.polimi.it	$2b$10$XKGnAnMeverVItzvyztVWe562mFrKttlBgLzhowYV7sCkCaIm24Du	\N	USER	2025-04-14 18:21:07.45	2025-04-14 18:26:41.821	\N	\N		\N	t	f	\N	\N	Polimi 	\N	f	f
cm9hg3v270000le04x2fmzefa	Manikandan Ravichandran	maninayna1994@gmail.com	$2b$10$IczPMRJtqm9vJBUEC9SUvOxdV2UyAXUtVg5JrLc5mOmEhwx4zRKpG	\N	USER	2025-04-14 19:07:10.207	2025-04-14 19:07:10.207	\N	\N		\N	t	f	\N	\N		\N	f	f
cm9hhlb2q0000jy045qi4u2bf	Sahil Mallya	sahilmallya15@gmail.com	$2b$10$qv7eV8Rsy6PmaSYTVqlpKeMC91EqIQpdLGdpxWI/tYWOi6Af38/nS	\N	USER	2025-04-14 19:48:43.731	2025-04-14 19:48:43.731	\N	\N	Ar.	\N	t	f	\N	\N	Polimi	\N	f	f
cm9hjy5gq0000lb04wn3gse67	Garimaa Kejriwal	garimaakejriwal06@gmail.com	$2b$10$rURmRTbGTA.EJQroXjOOh.BqciQmjvZcwWdF8.rSGqcUUr0hup3pG	\N	USER	2025-04-14 20:54:42.219	2025-04-14 20:54:42.219	\N	\N	design	\N	t	f	\N	\N	NABA	\N	f	f
cm9hk2khx0004ju04v1mwvo38	Jahnavi Narayan	jahnavi2403@gmail.com	$2b$10$yORYo3HAO1EVQc2pK6AE0uIUqqem.ghey/3XQHVAODIVKCePeiZt.	\N	USER	2025-04-14 20:58:08.326	2025-04-14 20:58:08.326	\N	\N		\N	t	f	\N	\N	naba	\N	f	f
cm9hna37t0000jq04r18hl3lz	PRANAV LALIT SALUNKE	pranavlalitsalunke@gmail.com	$2b$10$qC0PhKhqH2BZ0jDbh1D4LetkDzk9Q0qF1AHeHpSAMPdFYmiF9ntMG	\N	USER	2025-04-14 22:27:58.025	2025-04-14 22:35:19.633		Mumbai	MSC Management Engineering	0	t	f			POLITECNICO DI MILANO	\N	f	f
cm9i1z6hn0000l804lq0g1n15	Nimish Gupta	nimish1523@gmail.com	$2b$10$6lNj3Y7JQqlk5EBmAS.TjOXJCBOCC3xeT8usTno1V2ZEfwrwPBVha	\N	USER	2025-04-15 05:19:23.291	2025-04-15 05:19:23.291	\N	\N	MSc Mechanical Engineering	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9iiiepz0000i90aaembbas3	Aadya Sharma	aadyasharma2000@gmail.com	$2b$10$jKATcEBIcCbFl0E8pDAyCetvWGvcqD8ESYNyJ4zav2eN1Dat8jn36	\N	USER	2025-04-15 13:02:14.279	2025-04-15 13:02:14.279	\N	\N	MGLuxM 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cm9iio0tw0000il04hfn42v97	Nain Bohra	nainjain2@gmail.com	$2b$10$1oOlgQP0IiprcsqeICE5..lQQmj9yfHW3RwjnYLeiPl3OQEZm9bU6	\N	USER	2025-04-15 13:06:36.212	2025-04-15 13:06:36.212	\N	\N		\N	t	f	\N	\N		\N	f	f
cm9ip90aq0000i504sqq6i1nq	Shreecharan Dhandapani	shreecharan.d@gmail.com	$2b$10$BAtXPCElz5eYyQzqqZWqHeui4fqwSPAUNnl9gdEJCG6RP1wGUEIki	\N	USER	2025-04-15 16:10:52.994	2025-04-15 16:10:52.994	\N	\N	Msc Management Engineering 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cm9itv6g90000jx049bm7z77q	Rifaa Javed	rifaarj@gmail.com	$2b$10$glB9U201rAJAcFSRyC4Q.e6mHfC.j4eLDMEDddyQnMnphnNZtAj0m	\N	USER	2025-04-15 18:20:05.866	2025-04-15 18:20:05.866	\N	\N	MSc Design & Engineering	\N	t	f	\N	\N	Politecnico Di Milano	\N	f	f
cm9j0aags0000js048bu94w7r	Kaif 	kaifkagzi3@gmail.com	$2b$10$jtrApK6wRSsk2VucCG7/wu.CVZIG3tvGjRNZE5Vhg.JtUndiyDkY2	\N	USER	2025-04-15 21:19:48.605	2025-04-15 21:19:48.605	\N	\N		\N	t	f	\N	\N	Politecnico di milano	\N	f	f
cm9j0nvgd0002js04kt2ez1x1	Darpana Jain	darpana.jain27@gmail.com	$2b$10$Y8te3mXTLzDxk8uz1t8xOetjowTUiyM5IKylzFPyz2GGNaa9ETV6S	\N	USER	2025-04-15 21:30:22.333	2025-04-15 21:30:22.333	\N	\N	Fashion design	\N	t	f	\N	\N	Instituto marangoni	\N	f	f
cm9jypbr40000js046cr0v2ua	Samiksha Sachdeva	samiksha.sachdeva4@gmail.com	$2b$10$2e1vOJMPUz2SSiKmJWfaPuoXn1/HyGo/ikIcMTfV2221jJDgexj8W	\N	USER	2025-04-16 13:23:17.056	2025-04-16 13:23:17.056	\N	\N	Masters in Furniture Design	\N	t	f	\N	\N	Politecnico di Milano - POLI Design	\N	f	f
cm9k49nvf0000js04vqujuks0	Nihal Al Amin	nihalmail2000@gmail.com	$2b$10$SNOr9N5JKASXN.oYXnBXA.DCrnyC1SqKK31HGHimvEAw00GtdW696	\N	USER	2025-04-16 15:59:03.964	2025-04-16 15:59:03.964	\N	\N		\N	t	f	\N	\N		\N	f	f
cm9kcoboq0000l804nzwz99bg	Gurkamal Kaur	gurkamalshergill200@gmail.com	$2b$10$b1EKz8TgAVWiqMrNcDNYtehAe0jaH0rVgq/9X2CaE1mWpxUhIxMii	\N	USER	2025-04-16 19:54:24.939	2025-04-16 19:54:24.939	\N	\N	masters in fashion design	\N	t	f	\N	\N	politecnico di milano	\N	f	f
cm9lvqo1f0000k004mvszj5wi	cihehon	cihehon972@lushosa.com	$2b$10$WbK8ker3EoMsiC8kEj7ITeWCyZS20lNZvrHAu.TJDtEjqZFuMGp7i	\N	USER	2025-04-17 21:35:53.139	2025-04-17 21:35:53.139	\N	\N		\N	t	f	\N	\N		\N	f	f
cm9lzaatx0000la04oqmo210w	Rudrarth Vatsa	rudrarth.vatsa@gmail.com	$2b$10$5nVboy01gT.KH.wCLVRKpel3ucm.Yu46dvHVlTFB3yYTLb1W/ImIK	\N	USER	2025-04-17 23:15:07.989	2025-04-17 23:15:07.989	\N	\N	MS Mechanical Engg	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9mso6ai0000l904amw92oca	Sriram Krishnasamy Seenivasan 	sriramvasan603@gmail.com	$2b$10$m/8qKarGgiTtYTBCQ.ghC.lxGX6e1tMLf7XYYgdB/4Fx4t5FtAKYa	\N	USER	2025-04-18 12:57:44.154	2025-04-18 12:57:44.154	\N	\N	Msc Geoinformatics Engineering	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9n8t7ph0000l804cpiqw50x	Samson 	samsonhansraj@gmail.com	$2b$10$CDfRd1GWtfJBwOspr97mxedv.tzxsJ/o/VRfnWumPgFBJ224QwuBC	\N	USER	2025-04-18 20:29:33.126	2025-04-18 20:29:33.126	\N	\N		\N	t	f	\N	\N		\N	f	f
cm9opbqf00002l104mlkyjmye	Srinithish Sriramulu 	srinithishsriramulu@gmail.com	$2b$10$so1WoOGhjIXNCCtn3sO5UOacUCrRB1v.bDPV1UCsLtJ8tkx50hHHe	\N	USER	2025-04-19 20:59:37.212	2025-04-19 20:59:37.212	\N	\N	Mcs civil engineering 	\N	t	f	\N	\N	Politecnico di milano 	\N	f	f
cm9pp6wv50000lk0493jo1jxe	Karimulla Gaghuturi	karimniv4@gmail.com	$2b$10$uk6lgoojwOdakbhblV3pIOwnNCe9W90EY7Pj3eq.4BAwacTua4GUu	\N	USER	2025-04-20 13:43:38.466	2025-04-20 13:43:38.466	\N	\N		\N	t	f	\N	\N		\N	f	f
cm9ss4xc80000l604etngtu0u	Nishanth Balasubramanian	nish.bala123456@gmail.com	$2b$10$FVNGhPcDiuZk48uYwv476O3F9ELvYfDjISCRFEKY6cE10fC/lnONe	\N	USER	2025-04-22 17:29:23.145	2025-04-22 17:29:23.145	\N	\N	MSc Management Engineering	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cm9xyr51x0000lg04jkkc2qz7	Varun kumar reddy Poreddy	varun0528@gmail.com	$2b$10$kJoWgIpymoksLn53X/PLZ.JZnlUjeOajzo9DJeKFq2wSKeIuC4dou	\N	USER	2025-04-26 08:33:28.15	2025-04-26 08:33:28.15	\N	\N		\N	t	f	\N	\N	Politecnico di milano	\N	f	f
cma5abfn00000jp04taeb3et6	Sai kiran	muralisai197@gmail.com	$2b$10$vzYuN0wUgYRZTxpDhvxwFu1YBLWIHINGxwco7mUEU42oUuHvs4ioC	\N	USER	2025-05-01 11:31:33.996	2025-05-01 11:31:33.996	\N	\N		\N	t	f	\N	\N		\N	f	f
cma8qs88a0000ju04wcouehaq	Debmallya Chanda	debmallyachanda93@gmail.com	$2b$10$PwyfQDCl40p3WuuJRgZVUeSFLQz8I6EGAyCb5J5ZnZZSFKxXgzfFC	\N	USER	2025-05-03 21:35:49.93	2025-05-03 21:35:49.93	\N	\N	PhD in Economics	\N	t	f	\N	\N	Università Cattolica del Sacro Cuore	\N	f	f
cma9pdbgl0000jo04apghy0k4	Yarek	yarek84034@javbing.com	$2b$10$uQc5haB/a4Cr.jQijLWEVu3NyssAPV5PG9keHAWyiNRc2zSzBUaV.	\N	USER	2025-05-04 13:44:00.838	2025-05-04 13:44:00.838	\N	\N		\N	t	f	\N	\N		\N	f	f
cma9pgy2x0002jo041giizjao	a	lijeji8515@harinv.com	$2b$10$E3DWf5aVroRz.mTpKF7sG.YQCpzqJFpFCad5dJCI1EbBAxXiGBLrC	\N	USER	2025-05-04 13:46:50.122	2025-05-04 13:46:50.122	\N	\N		\N	t	f	\N	\N		\N	f	f
cmagf8oyb0000jj04aftbj408	Sarish Manjarekar	manjarekarsarish@gmail.com	$2b$10$wjRpcEfwScJVZb8pOaRy..ozHfG3/Eh.PMPXWi/nZCHajgVdanlYG	\N	USER	2025-05-09 06:34:52.115	2025-05-09 06:34:52.115	\N	\N	Masters in ECGS	\N	t	f	\N	\N	University Of Milan 	\N	f	f
cmah0ipz40000jl04rcq4gsek	Junyali Maindola	maindolajunyali@gmail.com	$2b$10$sma4MG5Eg4V0bztUNC7tAeXDyd1JRsKcFSYqNrxMhYN2RUzaY0YTG	\N	USER	2025-05-09 16:30:31.937	2025-05-09 16:30:31.937	\N	\N		\N	t	f	\N	\N		\N	f	f
cmah7yjrb0000ib04675xacki	Monil Mihirbhai Thakkar 	amz.thakkar@gmail.com	$2b$10$UOR6i/FA5tWxiu07cccz0uBbhoxR6Tv8EiebNwLAcXNlpwTrMmVhS	\N	USER	2025-05-09 19:58:47.687	2025-05-09 19:58:47.687	\N	\N	PhD Mechanical Engineering 	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmai2j2oi0000ju049130nsfx	Uditi Ojha	uditiojha13@gmail.com	$2b$10$sbOJy6qLDIs/rW7i1csKq.KxIN/NyxPXmDvMu7S9uBfVN/U8PTf4.	\N	USER	2025-05-10 10:14:33.81	2025-05-10 10:14:33.81	\N	\N	MSc Computer Engineering 	\N	t	f	\N	\N	Politecnico di Torino	\N	f	f
cmai2tohi0000ib04uuspdgd9	ATHIRA	athiraprasad11081997@gmail.com	$2b$10$.YQq.vuWWpsgUilWOdbmoOt2gt324cnc1sMYOgKp2gy17G/4XSTAK	\N	USER	2025-05-10 10:22:48.631	2025-05-10 10:22:48.631	\N	\N	Master's in Business Administration Professional and Managerial Accounting 	\N	t	f	\N	\N	University of Bergamo 	\N	f	f
cmai34w110000l1048a2qt4t9	Nitin Shah	nitinrgp@gmail.com	$2b$10$HarrI6rtZvfL/7s1NFGbb.xnaR66bPYtm4fSxuSLyCoFAcEm4IY9K	\N	USER	2025-05-10 10:31:31.621	2025-05-10 10:31:31.621	\N	\N	MA Planning and Management of Tourism Systems	\N	t	f	\N	\N	University of Bergamo	\N	f	f
cmai4sm2g0000kw04vieio79b	Hemant Kumar Dubey	hemantdubey1895@gmail.com	$2b$10$hc05m6z1hrOwvvn1XBpzJ.h92pcH3.N22lgFoGPPqrGPAsurwaRyK	\N	USER	2025-05-10 11:17:58.073	2025-05-10 11:17:58.073	\N	\N		\N	t	f	\N	\N		\N	f	f
cmai4ykp90000jx04slhgjr7p	onkar chavan	onkar241198@gmail.com	$2b$10$2E1zkxSJX.e5/wVsFSxHB.DYWh7Bbrsm8psem.SUOJ/zdbE5iZUN6	\N	USER	2025-05-10 11:22:36.238	2025-05-10 11:22:36.238	\N	\N		\N	t	f	\N	\N		\N	f	f
cmai4zrq30002jx04xac7n1y9	Dibakar Ghosh	dibakarghosh2@gmail.com	$2b$10$KSSbwM7qFob2Ye6PfJc/wOk2PyjU7BnpAasAO0XlSM/FTbp6lAiwu	\N	USER	2025-05-10 11:23:31.995	2025-05-10 11:23:31.995	\N	\N	MSc Electronics Engineering 	\N	t	f	\N	\N	Politecnico di Torino 	\N	f	f
cmai7jzcd0000l104jfyhsmrz	Aman dube	Aman.dube1732@gmail.com	$2b$10$6cRZ.4qJNTzyoa1O9NSsQ.T1GWLlVRe/MJZIfmrOvQHKZNT6dwxju	\N	USER	2025-05-10 12:35:14.221	2025-05-10 12:35:14.221	\N	\N		\N	t	f	\N	\N		\N	f	f
cmai7kycb0004l104sqayuy9x	Nishant Deshpande 	nishdeshpande1@gmail.com	$2b$10$RUHsgBtN1QTqqKPTrjLk0OF4aaZr5BkUlkAyKfhghTJs48YJ5nmrm	\N	USER	2025-05-10 12:35:59.58	2025-05-10 12:35:59.58	\N	\N	Management Engineering 	\N	t	f	\N	\N	POLIMI - Politecnico di Milano - Italy	\N	f	f
cmai7o5dc0002js04ol71by18	Hemant Achyutrao Rakh	hemantrakh2605@gmail.com	$2b$10$V4Qc2xpQCHdzikqB5T.kjuo6Hqf0..ujyn2bw5bzkotaK9E/adx52	\N	USER	2025-05-10 12:38:28.657	2025-05-10 12:38:28.657	\N	\N	Urban and Environmental Planning	\N	t	f	\N	\N		\N	f	f
cmai7v65a000al10475o67hi8	Ishita Goyal	ishitagoyal300@gmail.com	$2b$10$RUa7jwT7vF0.b5gEyqoN6Oa8aZXk8vP6sTIG5Gn5/hdv9V71oJux6	\N	USER	2025-05-10 12:43:56.255	2025-05-10 12:43:56.255	\N	\N		\N	t	f	\N	\N	Domus Academy	\N	f	f
cmai833wm000el104t9wzo3s2	Shrey	subodhshrey@gmail.com	$2b$10$7RpD6OrccG7VZ5cU/Bol/.01mVt8ogXZnD6x3ofPrfVgfse4J4.Ka	\N	USER	2025-05-10 12:50:06.598	2025-05-10 12:50:06.598	\N	\N	Visual Brand Design 	\N	t	f	\N	\N	Domus Academy 	\N	f	f
cmai84zut0002jp04zvueju4l	Merrick Fernandes	merrickmsfernandes@gmail.comm	$2b$10$HxWH1hF1fw7YOGuUceULNenfr7VJzkzEUSB0wMTvHzhIYFiJvQBg2	\N	USER	2025-05-10 12:51:34.662	2025-05-10 12:51:34.662	\N	\N	MBA	\N	t	f	\N	\N	SDA Bocconi	\N	f	f
cmai8aboc0006js04wy3ipd1s	Merrick Fernandes	merrickmsfernandes@gmail.com	$2b$10$mPvZrLAZ/O0/.kxsOwcRdeB38aOdAlnl0CU7FVMp5UbMa.h0fiRr2	\N	USER	2025-05-10 12:55:43.261	2025-05-10 12:55:43.261	\N	\N	MBA	\N	t	f	\N	\N	SDA Bocconi	\N	f	f
cmai8bgcs0006jp04l4pgly82	Injila Imam	injila.imam30@gmail.com	$2b$10$HXokjmLOh1IHgeqhG17sXOQOxjxbi0guxlK0REeKfzCSQwrux8QZ.	\N	USER	2025-05-10 12:56:35.98	2025-05-10 12:56:35.98	\N	\N	Msc. Human Resource management 	\N	t	f	\N	\N	Universita degli studi di Milano	\N	f	f
cmai8gyki000ajs042ux2kuud	Akhil Mohan	akhilmohanhere@gmail.com	$2b$10$bcrYnM1JYetJccIpyWbLkO6efHAaYkNv2V5mOoJxxrxJdAc5etGw6	\N	USER	2025-05-10 13:00:52.866	2025-05-10 13:00:52.866	\N	\N	Energy Engineering 	\N	t	f	\N	\N	POLITECNICO DI MILANO	\N	f	f
cmai8gzw7000cjs04l6hqo1kg	Sauveer 	sauveersinha@gmail.com	$2b$10$BiIw9fa/jnLOd6F33H2hkuSdgcj5D8NEaCnYJbO8QYV9.nHuGnwx2	\N	USER	2025-05-10 13:00:54.583	2025-05-10 13:00:54.583	\N	\N	User Experience 	\N	t	f	\N	\N	Naba	\N	f	f
cmai8h2z8000ejs044xq5pzvv	John daniel Williams	johndaniel.williams@mail.polimi.it	$2b$10$cqpEKCcx3GrvFKIySxRfb.41yE8L4sIJGGhUCWQzNTCicjsr.j6x6	\N	USER	2025-05-10 13:00:58.58	2025-05-10 13:00:58.58	\N	\N	Energy engineering	\N	t	f	\N	\N	Polimi	\N	f	f
cmai8k5gb0006l40bg048ppg4	Josvin corda	josvin.milano@gmail.com	$2b$10$RXrmFQ.77ahou5Od6xyKy.yKPFzIPXKrzYQuQs7xiV5clH3NOp7mW	\N	USER	2025-05-10 13:03:21.755	2025-05-10 13:03:21.755	\N	\N	Msc Mechanical Engineering 	\N	t	f	\N	\N	Politecnico Di Milano	\N	f	f
cmai8t67w000kl104m7wkajxy	Srikrishna Kidambi Murali 	srikrishnakidambimurali@gmail.com	$2b$10$Ns4O7IeQkKDPBUDJwzTC6eGx9q75bdKbpTL1/2f6lkc96TYzJ5uE2	\N	USER	2025-05-10 13:10:22.652	2025-05-10 13:10:22.652	\N	\N	Automation and Control Engineering 	\N	t	f	\N	\N	Politecnico Di Milano	\N	f	f
cmai8thik000ol104ifdkwnyo	Bala Praveen Kumar Pugal Raj 	balapraveenkumarpugalraj@gmail.com	$2b$10$HuCoNIzrI9gRxrFu8OMHkuKNo1arARDCZl3DV8QwQ6I0342VR5NCq	\N	USER	2025-05-10 13:10:37.292	2025-05-10 13:10:37.292	\N	\N	MSc Mechanical engineering 	\N	t	f	\N	\N	Politecnico di milano 	\N	f	f
cmai8ubk10006l2042r9xk0rz	JONMANI MAHANTA	jonmanimahanta50@gmail.com	$2b$10$Lo8xOZwP7ZG7N6gYAyj1vO0j23TEcJSnxWvr/zjwTydGDokoKMLVG	\N	USER	2025-05-10 13:11:16.226	2025-05-10 13:11:16.226	\N	\N	MSc in Food Engineering 	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmai8uocv0008l204bavox41t	Vimala Sakshi Gangu	sakshi.gangu@gmail.com	$2b$10$Oza8CWrBLTxjQbtM1p7rXe.S15ILHScWGcQLsPDXbnCz04hqhakxa	\N	USER	2025-05-10 13:11:32.815	2025-05-10 13:11:32.815	\N	\N	Urban Planning	\N	t	f	\N	\N	Politecnico di milano	\N	f	f
cmai8utmb000al204gwvpqfax	Bhumi Sharma	bhumitillu2009@gmail.com	$2b$10$5Eg4ww6RybmEtvbDCjNrMuDLNtINDyYM3bB1D43RSrJokFCQLQKZS	\N	USER	2025-05-10 13:11:39.636	2025-05-10 13:11:39.636	\N	\N	MSc Aeronautical Engineering 	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmai8v459000ql104eljn7wcw	Sraavya 	sraavyadv@gmail.com	$2b$10$S0uuUFHjjfX7z02.GtMnV./DWTiCBwBskPfdHF1ndUfkEJPt3jvPG	\N	USER	2025-05-10 13:11:53.277	2025-05-10 13:11:53.277	\N	\N	MSc Computer Science 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmai8xizi000el204nk0m8am4	Lavanya Somasundaram	lavanyasomasundaram21@gmail.com	$2b$10$reMHnJ0Olp/qClrikP4tUeRFpM/LKHD0z2J.VNTEvK8eQPRWHcvOy	\N	USER	2025-05-10 13:13:45.822	2025-05-10 13:13:45.822	\N	\N	Interior design	\N	t	f	\N	\N	Politecnico di milano	\N	f	f
cmai8xxw1000wl104m7aui1ec	Srivatsan Ramesh	srivatsanramesh001@gmail.com	$2b$10$llJyH2MUVcIhzx0vwAnf2O52lvpawl7NkxRz9LTLTxIY8B7Xoca0W	\N	USER	2025-05-10 13:14:05.137	2025-05-10 13:14:05.137	\N	\N	Msc.Mechancial Engineering	\N	t	f	\N	\N	Politecnico Di Milano	\N	f	f
cmai8y1rk000yl104yizi4mkc	Dharshan Lakshmi Narasimhan	dharshan.dsn123@gmail.com	$2b$10$mMhSV5KWgAO8CfHt4lKO1.OGnggzcD5jkejcG815FhO6uVcDip51.	\N	USER	2025-05-10 13:14:10.161	2025-05-10 13:14:10.161	\N	\N	MSc in Mechanical engineering	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmai8ymev0002ji045zcskh8n	THIRUMAVALAVAN RAHUL RAJ	rahulraj.thirumavalavan@mail.polimi.it	$2b$10$u1SfqnNZAfwyA9zeN6IEgeE8vpA8Gl99sdErYGmH4OZ02dMM3dyIq	\N	USER	2025-05-10 13:14:36.919	2025-05-10 13:14:36.919	\N	\N	MSC Mechanical Engineering	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmai8zgzi000il204qjfaeg1v	Emad	emad333roman@gmail.com	$2b$10$RHGXtNt03HOvZrCyFW91OeK03JqwPDA70kbTQBX0KpIWuwcCRusMW	\N	USER	2025-05-10 13:15:16.542	2025-05-10 13:15:16.542	\N	\N	MSc Energy Engineering 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmai92qoi000ljs04b1blbutj	Dhruv Nautiyal	dhruv.nautiyal420@gmail.com	$2b$10$TmR0QFV3xMk7bitmhaV1iu.qGw5KBQyUo4.y278XKD/in.wwQmW/6	\N	USER	2025-05-10 13:17:49.075	2025-05-10 13:17:49.075	\N	\N	Msc computer science 	\N	t	f	\N	\N	Politecnico di milano	\N	f	f
cmai930p2000njs04fmmn7gnn	Meenal Humnekar	Meenal.humnekar601@gmail.com	$2b$10$N8JU/3NIV6EW2kTs3aotJedz2udMqpqurwrH29by7jtGuDupOEOiO	\N	USER	2025-05-10 13:18:02.054	2025-05-10 13:18:02.054	\N	\N	Msc Management engineering 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmai96fsp000rjs04830ypog7	Shubhangi 	shubhangiiprabhaakar@gmail.com	$2b$10$UV8r/4CiiGN3CeGFAkpgG.wlhIWG.UJpGZBFWJXRdGM1ZlwP99qSK	\N	USER	2025-05-10 13:20:41.593	2025-05-10 13:20:41.593	\N	\N	Masters in interior and living design 	\N	t	f	\N	\N	Domus academy 	\N	f	f
cmai97gup000tjs0419pl8140	Medha Bothra	medhapointer14@gmail.com	$2b$10$UI9jrudc4Oc1lSOwwFzBVe5hxMswL.UzHtWCEG.dn/mgJTddHEI6m	\N	USER	2025-05-10 13:21:29.617	2025-05-10 13:21:29.617	\N	\N		\N	t	f	\N	\N	Domus	\N	f	f
cmai9csmy000ol204b2zn6n17	Dhruvi 	dhruvimharsora@gmail.com	$2b$10$SGhwu9E8PFFeJIxHJdgPTepxJAIl3YJRT2VnzBd3RKkGs3JgtOyvq	\N	USER	2025-05-10 13:25:38.17	2025-05-10 13:25:38.17	\N	\N	MSc Product Design	\N	t	f	\N	\N	POLITECNICO DI MILANO	\N	f	f
cmai9dvz5000vjs04ozf9x507	Ansh Kharbanda 	kharbandaansh.02@gmail.com	$2b$10$ahZ.EnARcUHYSvWPFTTlHeN8D1lnwg62/9rbBu3tDO8mpiGwjQsyi	\N	USER	2025-05-10 13:26:29.153	2025-05-10 13:26:29.153	\N	\N	MSc Mathematical Engineering (Quantitative Finance)	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmai9mjt8000ul2042nq5uq58	Anurag Singh	anurag.harsh1997@gmail.com	$2b$10$YhGpD6vdBasB.wl9KpwA8uh2IzEmRq4i/M2.chDDXvkB1MDoQZJdu	\N	USER	2025-05-10 13:33:13.292	2025-05-10 13:33:13.292	\N	\N	Masters in Luxury Brand Management 	\N	t	f	\N	\N	Domus Academy 	\N	f	f
cmai9n7lb000wl204smmbv1ix	Lalith kanna	lalithkanna21@gmail.com	$2b$10$M9g8UpgIxfCaCScnRTDohOm9kjYSbIsC/UAdKr25pa0IA6PGMDim.	\N	USER	2025-05-10 13:33:44.111	2025-05-10 13:33:44.111	\N	\N	Management engineering 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmai9oly4000yl2046vkauaiy	Amita Rajender Saroya	amitarajender.saroya@mail.polimi.it	$2b$10$a03aJscGQSQjLUBp4Dk3l.C/tGYMzfT3qEk3h67920Ng6/N6JOMQS	\N	USER	2025-05-10 13:34:49.273	2025-05-10 13:34:49.273	\N	\N	MSc Building Engineering for Sustainability 	\N	t	f	\N	\N	Politechnico Di Milano	\N	f	f
cmai9osno0010l204farnk4hp	Kriti Nagar	kritinagar2010@gmail.com	$2b$10$xrxHj0D3aM7ZehlFLudITOwJaZ0jbDym/tc/2dH5a.rsO1APITYqS	\N	USER	2025-05-10 13:34:58.068	2025-05-10 13:34:58.068	\N	\N	Masters in Interaction Design	\N	t	f	\N	\N	Domus Academy	\N	f	f
cmai9p83y0012l204qwctakt5	Kirandeep kaur	7kirandeep01@gmail.com	$2b$10$UXpyXMLZYDqZwaY/DpBAqOYVEFr9giKZWOzUlSrEP/uMIW2M3MXB6	\N	USER	2025-05-10 13:35:18.094	2025-05-10 13:35:18.094	\N	\N		\N	t	f	\N	\N		\N	f	f
cmai9pcs40014l204xvhrd2hk	Nandan Tulsidas Patel	nandan.patel@mail.polimi.it	$2b$10$hP8vGe3X5E/NSy2aSxzBq.6ab8DF21j44FAXrC852F1wrhEUsYsxG	\N	USER	2025-05-10 13:35:24.148	2025-05-10 13:35:24.148	\N	\N	M.sc Building Engineering in Sustainability	\N	t	f	\N	\N	politecnico di milano	\N	f	f
cmai9pupp000eji0497g8vlgk	Kader Jassim Magdoom Meera Sahib 	kaderjassim98@gmail.com	$2b$10$xV0H/BciXY9v9maiS5/TGu747iulBC2YxUEfvNmdUBZLJLxv5O/Sy	\N	USER	2025-05-10 13:35:47.39	2025-05-10 13:35:47.39	\N	\N	M.Sc in Food Engineering 	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cm9h3dt0n0002l50414ztsiip	Vritika	vritikag11@gmail.com	$2b$10$COxnJN/8WNQDDD0ejh3CpuvCl5Oz1/YIv0H040Mv0HESUDIKEfYvO	\N	USER	2025-04-14 13:10:59.112	2025-05-10 13:37:27.131	\N	\N		\N	t	f	\N	\N		\N	f	f
cmai9t29r000zjs04e4x9mnmk	Lori Pathak 	punditlori@gmail.com	$2b$10$oLnKbyuXW8gfgUxJ4m6TReeBNwVRJ3VtlCm/u.kLPePsPMFUgzAie	\N	USER	2025-05-10 13:38:17.151	2025-05-10 13:38:17.151	\N	\N	Masters in Visual Brand Design 	\N	t	f	\N	\N	Domus Academy 	\N	f	f
cmai9u2ft001cl20416fhd7zr	Jiya Sheth	jiyasheth3110@gmail.com	$2b$10$s2RJw1wR5ueT8.EYeVWmJOPVGPbCzsrJKyOWLD5L5uljTT9sVYf4q	\N	USER	2025-05-10 13:39:03.931	2025-05-10 13:39:03.931	\N	\N	Fashion management 	\N	t	f	\N	\N	Domus academy	\N	f	f
cmai9uw5f001el204b3lfkjju	Reshabh Raj	reshabhraj@gmail.com	$2b$10$4IrucrNUU4J.NQJXpoXYtuxm09aZUm1wCeIYc2L3LSlbe.dCxAaf2	\N	USER	2025-05-10 13:39:42.532	2025-05-10 13:39:42.532	\N	\N		\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmai9uz7f001gl204caesw2l5	Shriya Berry	shriya.berry@mail.polimi.it	$2b$10$jhcroG1lht2AbHBzjh/AleNnmBnVhHHljRNbLAsEVrp0HlJUQ1j.e	\N	USER	2025-05-10 13:39:46.492	2025-05-10 13:39:46.492	\N	\N	MSc Architecture 	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmaiad7zr000oji04wx86skc7	Shreya	malikkshreya@gmail.com	$2b$10$Dvj9VeJu2smmyDc8wtzfQ..qtujXn5AHGumyjdYB7F6tvY23qGoXe	\N	USER	2025-05-10 13:53:57.676	2025-05-10 13:53:57.676	\N	\N	MS Data Science	\N	t	f	\N	\N		\N	f	f
cmaiagxww001ol204ockix90u	Aayush Bajpai	aayushbajpaistg@gmail.com	$2b$10$ycs1WoP3A.FazoMa7.FCsOPgJ/rnTdQNzpbjoFni.RUWWPLQL9pbW	\N	USER	2025-05-10 13:56:51.248	2025-05-10 13:56:51.248	\N	\N	MS AI	\N	t	f	\N	\N		\N	f	f
cmaiaii9f000wji04263gtw8y	Asmita Seth	asmitaseth11998@gmail.com	$2b$10$g0fDL5ueI4JpYmIS2N/wVeG.4iRODg4BNieiSwNkmbQMtrAKZ.ghu	\N	USER	2025-05-10 13:58:04.275	2025-05-10 13:58:04.275	\N	\N	Masters in global luxury brands and services management 	\N	t	f	\N	\N	Politecnico Di Milano	\N	f	f
cmaianlxs001sl204iv70r1gd	Sushmitha Pothula	sushmithapothula0504@gmail.com	$2b$10$ca2YtZNxxhaUa5KA6xCSc.xMTI4GQ4W33izFGvTykrVNtsFn1o8Wm	\N	USER	2025-05-10 14:02:02.32	2025-05-10 14:02:02.32	\N	\N		\N	t	f	\N	\N		\N	f	f
cmaiaxj950000l204xj0c0nv5	Ashish Ravi	ashishravi619@gmail.com	$2b$10$Hv1vO/RbrgnepafxTY4O6uRnIi2.atGWTLqKiARX4HfqnuB0Fmehu	\N	USER	2025-05-10 14:09:45.401	2025-05-10 14:09:45.401	\N	\N	Msc Project Management 	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmaib3jt7001yl204umfw2dgz	Mullapudi Anjaneya sarma 	tejakrishna211@gmail.com	$2b$10$ErQ9EHilO/xhzYthhW/S8O8uYuyoz5t/jeYaVBayJUkiczhv.REcS	\N	USER	2025-05-10 14:14:26.059	2025-05-10 14:14:26.059	\N	\N	Electrical engineering 	\N	t	f	\N	\N	Politecnico Di milano 	\N	f	f
cmaib75990022l204948tpnf1	Shubhra	shubhra2699@outlook.com	$2b$10$cYBvfSj9eyTNGLgZzSfR0eT1hWJFKE26k/qe/pOq7jiGNsJWtdbDe	\N	USER	2025-05-10 14:17:13.821	2025-05-10 14:17:13.821	\N	\N	Pharmaceutical Biotechnology 	\N	t	f	\N	\N	Bologna	\N	f	f
cmaib9awr000yji04nv907fo7	Anvitha Cherukupalli 	anvitha.c99@gmail.com	$2b$10$wvGd4w/hjnMdRz6nP2WWg.AJk1IpV.voMR7JUYKB7lsTTvqbK4LPq	\N	USER	2025-05-10 14:18:54.46	2025-05-10 14:18:54.46	\N	\N	Master’s in Interior and Living Design 	\N	t	f	\N	\N	Domus Academy 	\N	f	f
cmaibajng0010ji04rt1jg54t	Kalai Arasan	kalaiarasan1998@gmail.com	$2b$10$1S3MrYyiEznai69kfr9J/OFUBzTQ.q4tLp51GQ98sE19C50vIfH1q	\N	USER	2025-05-10 14:19:52.444	2025-05-10 14:19:52.444	\N	\N	Urban planning	\N	t	f	\N	\N	Politecnico di milano	\N	f	f
cmaibctkq0012ji04xb3u867y	Sharanya 	shard.polimi@gmail.com	$2b$10$0e0KVCT19z1TAJPkanMbS.3HNdK03nEmTsbOdFwKV9.rglGdkxVQa	\N	USER	2025-05-10 14:21:38.618	2025-05-10 14:21:38.618	\N	\N	M.Sc. Industrial design for architecture 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmaibcv1j0016ji04v6ug2mu1	Sangeeta Dutta 	work.sangeeta97@gmail.com	$2b$10$qoGBRe2t70t1u0Ynk/9SE.VF63BrJ67hA56EzIqW2jDiqYOjyIyfG	\N	USER	2025-05-10 14:21:40.519	2025-05-10 14:21:40.519	\N	\N		\N	t	f	\N	\N		\N	f	f
cmaibeccb001aji04ja9fyiba	Digvi Patel	pateldigvij@gmail.com	$2b$10$V0.H/NpUZlDt6GG7rOJYh.LlB6SZwam3eWgGeE91zOE51ovLIA482	\N	USER	2025-05-10 14:22:49.596	2025-05-10 14:22:49.596	\N	\N	Landscape Architecture - Land Landscape Heritage 	\N	t	f	\N	\N	Politecnico Di Milano 	\N	f	f
cmaibj3rw0006l204vq0lmvhw	Pavani Joshi	pdjpavani@gmail.com	$2b$10$9EtZrma63J0si9B0sZAo1.lvP93elH3d8y6AUCk2Iw5tca3ntnKk.	\N	USER	2025-05-10 14:26:31.772	2025-05-10 14:26:31.772	\N	\N	Msc. Landscape architecture 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmaibximv0004jl04thwp6rr9	Harshika S	saynakharshika@gmail.com	$2b$10$12/UdiI6Syvp6DZkjXpM/OWZBTnwDAvK4BG221gLMbPH7qYyBQQtu	\N	USER	2025-05-10 14:37:44.216	2025-05-10 14:37:44.216	\N	\N		\N	t	f	\N	\N		\N	f	f
cmaiby0s40006jl04ajbbhh16	Venkat Puneeth Punniyamoorthy 	venkatpuneeth002@outlook.com	$2b$10$BDEQnvJ5PKWPcb/lttuSTexFVJNEF0vnVxNF7bFXoaNczkFCGREqe	\N	USER	2025-05-10 14:38:07.732	2025-05-10 14:38:07.732	\N	\N	MSc Aeronautical Engineering 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmaic2409000al204ljgrse5h	Bhushan chouksey	shankychouksey16@gmail.com	$2b$10$hXeHjh2Doaffsm5xzVyv3Oo6wMsVM/WZUgET.WIzOt672iod9ETRm	\N	USER	2025-05-10 14:41:18.538	2025-05-10 14:41:18.538	\N	\N		\N	t	f	\N	\N		\N	f	f
cmaicdh2g0008jl04oucpy87o	Imayan Kodaikal Thirumavalavan	imayanthiruma@gmail.com	$2b$10$m7ReGNG1wZyLmHRL1pantePmue0m/G/FGqjS5nfy/Fc2qCKwMknqa	\N	USER	2025-05-10 14:50:08.68	2025-05-10 14:50:08.68	\N	\N	M.Sc Management Engineering	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmaicei82000ajl04cmbji3gq	Sruthin James	jsruthin@gmail.com	$2b$10$Zzc36me8lcSh/bjOT2ZLvuAJ8EYnMZruyJ4zSy63qMcWLanBEY5Di	\N	USER	2025-05-10 14:50:56.834	2025-05-10 14:50:56.834	\N	\N	Product design 	\N	t	f	\N	\N	Domus Academy 	\N	f	f
cmaichvbz001cji04hewfhm5q	Monica teja	kilaparthimonica0@gmail.con	$2b$10$vpfOrmG9LDqk9D/dMIxHqu43kZQD9UMvzNQV/b8nK6CPGbRDpmaoG	\N	USER	2025-05-10 14:53:33.791	2025-05-10 14:53:33.791	\N	\N	Msc management of built environment 	\N	t	f	\N	\N	Politechnico di milano	\N	f	f
cmaichzlm001eji043ssy8wfs	Anantha Subramanian 	anirudh01anantha@gmail.com	$2b$10$xQpWx3eyLpPzvjIuFWXAR./k.tfQ9rztRs/tJZKdmmf/G0wIzYDeC	\N	USER	2025-05-10 14:53:39.322	2025-05-10 14:53:39.322	\N	\N	Msc Management engineering	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmaick6rg000cjl049ex055r1	Monica teja	kilaparthimonica0@gmail.com	$2b$10$z4HV1RxQz.rt8f/8VEdTkuYPlXrkb2lr56lyK4Gck15QNk6Vlj.iy	\N	USER	2025-05-10 14:55:21.916	2025-05-10 14:55:21.916	\N	\N		\N	t	f	\N	\N		\N	f	f
cmaicqsw2001gji040ohauol6	Rama Surya Sai Palivela 	ramasuryasaipalivela@gmail.com	$2b$10$R87xkhz2D7xpy48Ej3f3jOdTVJJzrX5wTFXa6gTVhYMRo9RlhXbV6	\N	USER	2025-05-10 15:00:30.531	2025-05-10 15:00:30.531	\N	\N	Mobility engineering 	\N	t	f	\N	\N	politechnico di milano 	\N	f	f
cmaidavjh000ejl04nr60k4kr	Lakshmi Umesh 	lakshmiumesh162@gmail.com	$2b$10$XoiPhsD1RHagujnZQkoimew0P6QUHq7Pc8.i3nOKybcDnaWd9pHBC	\N	USER	2025-05-10 15:16:07.086	2025-05-10 15:16:07.086	\N	\N	MSc Datascience for Economics 	\N	t	f	\N	\N	University of Milan 	\N	f	f
cmaidvnjn000cl204wenehqcp	Karan nachinolkar	PDNachinolkar@gmail.com	$2b$10$i0RbVzlc8FJ9aFmzehOvG.QYfsBcUbVhG5j8pfOJJbGXcAd9AalBi	\N	USER	2025-05-10 15:32:16.499	2025-05-10 15:32:16.499	\N	\N		\N	t	f	\N	\N		\N	f	f
cmaie5yan0000kw04owpemo9l	Manoj Tilak Rajendran 	manojtilakr@gmail.com	$2b$10$5i8HwzwzHpv5AqxW1r49/uCkxGa3MD9ppBfRetvSePwimZb9/FXT.	\N	USER	2025-05-10 15:40:16.992	2025-05-10 15:40:16.992	\N	\N	MSc Mechanical engineering 	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmaifm4az0000l504lg1hfzo7	Bharath Babu	bharathbabu1112000@gmail.com	$2b$10$v3BtUiidAGty.Jd7o3x3Feh1B5BlqGtwI6198CRDnlg9yMC/wo8Ci	\N	USER	2025-05-10 16:20:50.891	2025-05-10 16:20:50.891	\N	\N		\N	t	f	\N	\N	Politecnico di milano	\N	f	f
cmaifmslu0002l504hqllws15	Shaoli Das	shaolidas97@gmail.com	$2b$10$jtgU1K1VdmGWG6Zz9I7KX.GZeadtmN.eEl8U4uFHg8jybvq.l7h4C	\N	USER	2025-05-10 16:21:22.292	2025-05-10 16:21:22.292	\N	\N	Global luxury goods and services management	\N	t	f	\N	\N	Polimi Graduate School of Management 	\N	f	f
cmaifo78n000gjl04qd02cw27	Dharshan Ramessh 	dharshanramessh@gmail.com	$2b$10$BtfhcuMEARXcfAsv6Sf9u.pN7qYn.VIQuFJqPt8SgxuCsYNtXpXmu	\N	USER	2025-05-10 16:22:28.007	2025-05-10 16:22:28.007	\N	\N	MSc Management Engineering 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmaigeep90004l504hzfvx466	Shreyansh	shreyansh.hybrutos@gmail.com	$2b$10$fKveHA1ClQ9ve.1xNSRXYeo0BCZTAzbTfxtqNe1jLDUN9g6rOfXT6	\N	USER	2025-05-10 16:42:50.733	2025-05-10 16:42:50.733	\N	\N		\N	t	f	\N	\N		\N	f	f
cmaigwt2f0000jy04wyki8bji	Manjot Singh 	ermanjotsingh16@gmail.com	$2b$10$xhN7tOo6Xxlq0K5kwJvrUupaTgiVIn4g.pVu0kqKE8sPuaNwqKCwO	\N	USER	2025-05-10 16:57:09.159	2025-05-10 16:57:09.159	\N	\N	Assegneo in Physics	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmaihbz000002jy04m44yvlbh	Gayathri Tirupapuli 	tirupapuligayathri3@gmail.com	$2b$10$O9Cw6ypbC9g6VOKpvlXuRukpey2tHZH5uJDFbJ6D0T95R0NfEA3mC	\N	USER	2025-05-10 17:08:56.688	2025-05-10 17:08:56.688	\N	\N	MSc in Management of Built environment 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmaihirq60006l504hrua10vh	Tharun reddy banda	tharunreddy9705@gmail.com	$2b$10$OBOmNPR8zzhA2DoIlBiaQ.pLiV37q2aaGB5Twv0/XfYng3b5TpZ8u	\N	USER	2025-05-10 17:14:13.855	2025-05-10 17:14:13.855	\N	\N	Msc Computer Science 	\N	t	f	\N	\N	University of Milan 	\N	f	f
cmaii1wjl0008l504u19jurvs	Karthik Tanjore Subramaniam 	karthiksbrmnm@gmail.com	$2b$10$xm1fEPT193rIEYVEwDgQV.QV5a6BPv3w7eljc4mZJPSv99JP7Sctm	\N	USER	2025-05-10 17:29:06.562	2025-05-10 17:29:06.562	\N	\N	MSc Aeronautical Engineering 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmaiia1c60000l804hw9ogk54	Pavithra Selvakumar	Pavithrra2002@gmail.com	$2b$10$HW7i/t..wp.CiIxgP248U.i093tTyc0rTaud.QRReDJYzt/8w0Xw6	\N	USER	2025-05-10 17:35:26.022	2025-05-10 17:35:26.022	\N	\N	Polimi Graduate school of management 	\N	t	f	\N	\N	Polimi Graduate school of management 	\N	f	f
cmaij5l2y0000l504uvon2379	Pooja	pshetiya18@gmail.com	$2b$10$jarFXbtGL3cx/NQ2232ZhOMR3SQ0O2M2qPXp1kRtRV.c.jM2OnS2G	\N	USER	2025-05-10 17:59:57.946	2025-05-10 17:59:57.946	\N	\N	Interior designer 	\N	t	f	\N	\N	Domus Academy	\N	f	f
cmaijb7f30000jr04xjl3r3qq	Bharath Muppavarapu 	bharathmuppavarapu7@gmail.com	$2b$10$tj5c2kxQfJQwhFPAWQ8qEu56fVKqtn9hBxIHyvtF/1dNZKvEv1Sqy	\N	USER	2025-05-10 18:04:20.175	2025-05-10 18:04:20.175	\N	\N	MSc management of built environment 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmaik89ma0000l804v9lt2uq1	Sayyid shibil kallan	Sayyidshibilkallan@gmail.com	$2b$10$lsopgxbYQ9QEZCR.esdhS.6FtLXlUXSHiddmmBpyVhV1x0K6w6J7m	\N	USER	2025-05-10 18:30:02.674	2025-05-10 18:30:02.674	\N	\N	Planning and management of tourism systems 	\N	t	f	\N	\N	University of bergamo	\N	f	f
cmailymcx0000ju049hfs4wb7	Sanjana Shet Shivaprasad 	sanjanashet2800@gmail.com	$2b$10$yWh6kdV91VmLLLlYOxMLoe/Dp2hCM5eJlbnH72MtU5PCcdHaTEJhC	\N	USER	2025-05-10 19:18:31.857	2025-05-10 19:18:31.857	\N	\N	Product Service System Design 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmaimal3d0000l104kp53yl26	utkarsh	us1998ut@gmail.com	$2b$10$eEa285wQyj4jzvJDwxZ1VeNzmdcHoZOlnKKvl9vx7ovDRb.vavsoq	\N	USER	2025-05-10 19:27:50.089	2025-05-10 19:27:50.089	\N	\N	Msc Management Engineering	\N	t	f	\N	\N	Politecnico Di Milano	\N	f	f
cmaiqu54f0000jm04yh3yylxh	Stephen Kuzhivelipurath jose	amstephenkj@gmail.com	$2b$10$zsaA0pSeqNgEIz2NJt86fudREeyoZas.uNSst2wR.ZZbBBStg5DAS	\N	USER	2025-05-10 21:35:00.976	2025-05-10 21:35:00.976	\N	\N	Management of built environment 	\N	t	f	\N	\N	Politecnico di milano	\N	f	f
cmaisbnmj0000l404h3aw5wy1	Suyash Singh	singhsuyash444@gmail.com	$2b$10$WL46AOIhL/Jx/VfiLEL1ZeWS609pxkDv76OeuiUQAfZN8ujkMOXtO	\N	USER	2025-05-10 22:16:37.724	2025-05-10 22:16:37.724	\N	\N		\N	t	f	\N	\N		\N	f	f
cmaivn0d30000la04wjhxwb2k	Sutanuka Mishra	mailmesutanuka@gmail.com	$2b$10$8ST9qeFiC2fpmGEsvIvLRebRmjKK/MUVniOEtaAbaKIFqOsPd6jmS	\N	USER	2025-05-10 23:49:26.296	2025-05-10 23:49:26.296	\N	\N	Management of Built Environment 	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmaix1snr0000l904jcf8m31d	Sanjana Saha	sanjanasaha.work@gmail.com	$2b$10$rSngTxm/iSJIasSCI0gPx.2FSUt6LgwjZiC/w3tI5iECDJStKdfNW	\N	USER	2025-05-11 00:28:55.767	2025-05-11 00:28:55.767	\N	\N		\N	t	f	\N	\N		\N	f	f
cmaj9ndee0000jl04jlp9ldw3	MANIKANDAN GOVINDARASU	ermanibe1507@gmail.com	$2b$10$.W3pS5fQF6OF2EM3p1xrz.hITndEGyU4G50T22cm5MDNPUEf0yLk6	\N	USER	2025-05-11 06:21:37.814	2025-05-11 06:21:37.814	\N	\N		\N	t	f	\N	\N		\N	f	f
cmaj9pxwt0000jo04j001sw6t	Anitta Roy 	anittaroy96@gmail.com	$2b$10$BeehAe4VHEZzTkgJp59LQ.fmGD6DpTZtu3JkhJS3WB7pXwoYHxSpy	\N	USER	2025-05-11 06:23:37.71	2025-05-11 06:23:37.71	\N	\N	Masters in Business Administration professional and managerial e	\N	t	f	\N	\N	Unibg 	\N	f	f
cmaje8fh80000jv04a5kwk3df	Archi Gupta	itsarchi25@gmail.com	$2b$10$CDRbpUlXyxPZUdc3lyCnFe9UPR4yFh3kXlLAu/7O7YRHi4fxqM2y.	\N	USER	2025-05-11 08:29:58.748	2025-05-11 08:29:58.748	\N	\N	Fashion marketing management 	\N	t	f	\N	\N	Domus Academy	\N	f	f
cmajfkuh90000lb04zjual78a	Bharath Arappali	bharatharappali@gmail.com	$2b$10$oO5GvlfhmEF0Z40XjB1YkuxbbWocB5bAqP0GZvGDeRkVi3tvvTxYq	\N	USER	2025-05-11 09:07:37.677	2025-05-11 09:07:37.677	\N	\N	MSc Communication design	\N	t	f	\N	\N	Politecnico di Milano 	\N	f	f
cmajg6nkw0000l104qapuu4hz	Chaitra Sriram Iyengar	chaitras2412@gmail.com	$2b$10$xjd9Bt5MP.URkFp9P0bAhOyC8zS2kkKqeYiXJGJtkhDwSOtyxkvfy	\N	USER	2025-05-11 09:24:35.168	2025-05-11 09:24:35.168	\N	\N	-	\N	t	f	\N	\N	Domus Academy	\N	f	f
cmajg8ibt0000l404o11fbj94	Likhitha huralichikkanahalli Munidasappa 	likhitha7724@gmail.com	$2b$10$nGWStQ8cgUojkvXg/aXRAemzBoapxvnTGuPEgBIeS/nqxwKVjlmpK	\N	USER	2025-05-11 09:26:01.673	2025-05-11 09:26:01.673	\N	\N	Masters in interior and living design 	\N	t	f	\N	\N	Domus academy 	\N	f	f
cmajg9sle0002l404dyhvzjyj	Sheetal Bhat	sheetalsbhat2001@gmail.com	$2b$10$75LkJK20kh1J/TNmyBGxNu8m5ZFxDlFp1oHUVaHAouKuzXgSieFvu	\N	USER	2025-05-11 09:27:01.634	2025-05-11 09:27:01.634	\N	\N	Masters in Fashion Design	\N	t	f	\N	\N	Domus Academy	\N	f	f
cmajgwxhb0000ky040fds1xz7	Sanyuktaa prakash paatil	sanyuktaapaatil@gmail.com	$2b$10$z5dVqyk0Hy3JrkyQMt7zVuZl0RaNFRT/dyLId2oyl8hmDiFvjt2pq	\N	USER	2025-05-11 09:45:01.055	2025-05-11 09:45:01.055	\N	\N	MA in product and service design	\N	t	f	\N	\N	Naba, milano	\N	f	f
cmajkax8h0000l704f2oq4qia	Bihan Banerjee 	b.banerjee@studenti.unibg.it	$2b$10$G56rPV203woenPvHudN6IuLQUjSgCUJpTNE5pA36pAhB2ihKhQeAa	\N	USER	2025-05-11 11:19:52.77	2025-05-11 11:19:52.77	\N	\N	MA Planning and Management of Tourism Systems 	\N	t	f	\N	\N	University of Bergamo 	\N	f	f
cmajm7vq50000l404570k88jy	Madhan Tamizharasan 	madhantamizharasan03@gmail.com	$2b$10$AJqB3wl01v5xBHBpmRLayODM6qhbATubev.V6AiiSUxz/9jsUHnBa	\N	USER	2025-05-11 12:13:30.077	2025-05-11 12:13:30.077	\N	\N	Medical Biotechnology 	\N	t	f	\N	\N	UPO	\N	f	f
cmajms1qq0000la04gr503s2g	Atharva Rajesh Kulkarni	atharvarajesh.kulkarni@mail.polimi.it	$2b$10$TxMhpCPzloDkaU9Ub7hlcenKNZOe6A.bb68IZUpmyfTNxerCAgf3O	\N	USER	2025-05-11 12:29:10.994	2025-05-11 12:29:10.994	\N	\N	MSc Civil engineering with risk mitigation	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
cmajns0fi0000jw04bsgkm8dw	Jegadeeswaran Sampath	jega130194@gmail.com	$2b$10$bYe3/QwuHT23bQAs1/DBZuSrmJOad03lR6qsuhpgg.cprVC3HjIQy	\N	USER	2025-05-11 12:57:08.91	2025-05-11 12:57:08.91	\N	\N		\N	t	f	\N	\N		\N	f	f
cmajqbg4a0000l404hco9drkx	Gregory Sunny Mathew	gregory.sunny@mail.polimi.it	$2b$10$W6Ij56e2javdeeBieJtSyuVoEyATW6JkuMWdNV359c0UxxzX5sQlm	\N	USER	2025-05-11 14:08:14.938	2025-05-11 14:08:14.938	\N	\N	Management Engineering (Analytics)	\N	t	f	\N	\N	Polimi	\N	f	f
cmak0zcuc0000l104docluswp	SOUMYADEEP SHARMA	soumyadeepsharma2022@outlook.com	$2b$10$Whv.xWfunZhMPPzgmhLrf.X4IHRBFZrX1BgR.Ver9itwgffCDzW0G	\N	USER	2025-05-11 19:06:46.596	2025-05-11 19:06:46.596	\N	\N	MSc Computer Science and Engineering	\N	t	f	\N	\N	Politecnico di Milano	\N	f	f
\.


--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Event" (id, title, description, content, location, "startDate", "endDate", "imageUrl", "maxAttendees", "createdAt", "updatedAt", "createdBy", published, price, "requiresPayment") FROM stdin;
cm97rdoz90001la044naksq9o	Bowling	Lace up, line up, and let it roll! 🎳💫Step into the spotlight for a night where strikes speak louder than words and every frame brings the hype. Whether you’re a casual roller or a lane legend, come join us for an evening packed with fun, laughter, and a little friendly fire.	🎟️ Paid | Limited spots availableAdmissions are on first come, first serve basis, so DM us to secure your spot ASAP!<b>‼️Winning performers in the first round will be going ahead with second round‼️</b>Stay tuned to get more updates on the tournament.🚨 <b> TIME 8:00PM</B>	Bowling Milano, Via Francesco Cavezzali, 9/11, 20127 Milano MI	2025-04-16 20:00:00	2025-04-16 20:00:00	https://ucarecdn.com/168bdc08-af50-4602-b8bd-6e427f4cd725/	27	2025-04-08 00:25:02.899	2025-04-15 17:04:44.492	cm95kupb90000x7h53bcapa4d	t	5	t
cmacrvz8u0000fs2txrpjo4cq	Career Connect Day	<h2 style="color: #333333; margin-bottom: 20px;"><strong>&nbsp;Are you an Indian student/professional in Milan looking to build a rewarding career and grow your network </strong><strong>&nbsp; <br><br>Join us for an inspiring evening featuring:</strong>&nbsp;</h2>\n<ul>\n<li style="list-style-type: none;">\n<ul style="margin: 0 0 20px 20px; color: #555; list-style: disc inside;">\n<li style="margin-bottom: 8px;">Networking with top professionals.</li>\n<li style="margin-bottom: 8px;">Career stories from industry leaders</li>\n<li style="margin-bottom: 8px;">Insights into building your future in Italy and beyond</li>\n</ul>\n</li>\n</ul>	<section style="max-width: 700px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; text-align: left;">\n<p style="font-size: 1rem; color: #333333; margin-bottom: 16px; text-align: left;"><strong>Keep your CVs along.</strong></p>\n<p style="font-size: 1.1rem; font-weight: bold; color: #333333; margin-bottom: 8px; text-align: left;">Featured Speakers:</p>\n<ul style="margin: 0px 0px 20px 20px; color: #555555; list-style: inside disc; text-align: left;">\n<li>Ms. Lucia Salmaso, Managing Director, BKT Europe</li>\n<li>Mr. Santiago Priario, Country Manager, TCS</li>\n<li>Mr. Fabio Novelli, CEO, Noltec</li>\n<li>Mr. Gabriele Porta, Owner, Naked (Advertising agency and fashion sector educator)</li>\n<li>Ms. Giulia Tricotti, Partner, Rise (Head Hunting company)</li>\n</ul>\n<p style="margin-bottom: 10px; text-align: left;"><strong>Date:</strong> 15th May 2025</p>\n<p style="margin-bottom: 10px; text-align: left;"><strong>Time:</strong> From 5:30 PM onwards</p>\n<p style="margin-bottom: 10px; text-align: left;"><strong>Venue:</strong> CGI Milan &ndash; Via dei Filodrammatici 8, 20121 Milano MI</p>\n<p style="margin-top: 20px; color: #b58900; text-align: left;"><strong>Registration is FREE but mandatory.</strong> Limited spots available(Max 70 participants).</p>\n</section>\n<!-- Our Patreon Section -->\n<div class="section-container">\n<h2 style="text-align: center;"><strong>Our Patron</strong></h2>\n<div class="patreon-item"><br><br><img style="display: block; margin-left: auto; margin-right: auto;" src="../../assests/Consulate.svg" alt="Consulate Logo" width="201" height="320">\n<div class="label" style="font-size: 2rem; color: black; text-align: center;">&nbsp;Consulate General <br>of&nbsp;India in Milan</div>\n</div>\n</div>\n<p><br><br></p>	Consulate General of India in Milan	2025-05-16 17:30:00	2025-05-16 19:30:00	https://ucarecdn.com/255b444b-3361-4bc6-84e8-3987e147ff01/careerconnectbannerf12.jpeg	71	2025-05-06 17:17:49.23	2025-05-12 01:38:04.915	cm95kupb90000x7h53bcapa4d	t	\N	f
cm9i37g9i0000fqla41p0whcf	Super 6s	Cricket fever is back with a bang! Get ready for an action packed cricket tournament, Super 6s, brought to you by the <a href= "https://x.com/CGIMilan?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" style="color: #FF9C33;" target="_blank"> Consulate General of India</a> in Milan & <a href = "https://www.instagram.com/sassi.milan/" style="color: #FF9C33;" target="_blank"> Students’ Association of Indians</a>🏏	    <h1>Green Cosco Cricket ball Tournament</h1>   <br></br>   <h2><b>Match Info:</b></h2>  <ul>           <li> • 7 players on field   </li>       <li> • 5-over innings (Max 2 overs per bowler, Min 4 bowlers)</li>           <li>• Good sportsmanship expected</li>            <li>• 1 batting team player to stay with scorer (<a href="https://www.instagram.com/monilmt/" style="color: #FF9C33;" target="_blank">Monil Thakkar</a>)</li>            <li>• Water/Food break only between innings</li>         <li>• Umpire’s decision is final</li> <br></br>            </ul>            <h2>      <b>Registration & Prizes</b>   </h2>   <br></br>      <ul>            <li><span class="highlight">Registration Fee:</span> 100€ per team</li>            <li><span class="highlight">Winning Team:</span> 200€ Prize Money, Gold medal for each member, and sponsored dinner for the Winning team by  <a href="https://www.instagram.com/currytwist_ristorante_indiano/"  style="color: #FF9C33;" target="_blank">Curry Twist</a>          <li><span class="highlight">Runners Up:</span> 100€ Prize money and Silver medal for each member.</li>            <li><span class="highlight">SASSI Super 6s T-shirts, sponsored by <a href = "https://gradbees.com/" style="color: #FF9C33;" target="_blank"> Gradbees </a> included</span> for each player in the team. </li>      <br </br>Once payment has been made to register your team, you will receive a confirmation email requesting your team members’ details and T-shirt sizes for the SASSI Super 6s tournament day, along with a link to join the WhatsApp group for further updates.  <br> </br>   </ul>           <h2><b>Important Note</b></h2>     <p>If you want your <strong>name and number on the t-shirt</strong> (first come first serve), please register by <strong>April 19th</strong>.</p>        <p class="note"> After April 19th, registration will remain open, but <strong>name and number on t-shirt cannot be guaranteed</strong>.</p>         <br></br>   <style>    /* Common container to center sections */    .section-container {        max-width: 1000px;       margin: 0 auto 40px;        text-align: center;      color: #FF9C33;       }     /* Logo grids */   .logo-grid {          display: grid;          gap: 30px;          justify-items: center;        }      /* Partners: auto-fit around 150px */    .partners-grid {   display: grid;   grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));   gap: 30px;   justify-items: center;      /* centers logos within each cell */   justify-content: center;    /* centers the whole grid within its container */   max-width: 600px;           /* or whatever width fits your design */   margin: 0 auto;             /* horizontal centering */ }   .section-container h2 {     font-size: 2rem;   /* adjust as needed */   }  /* Teams: auto-fit around 120px */    .teams-grid {        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));      }       /* Special flex for Consulate + text */     .patreon-item {        display: inline-flex;        align-items: center;        gap: 20px;     }     .patreon-item img {        height: 60px;       }     .patreon-item .label {        font-size: 1.5rem;      /* big enough to match logo */        font-weight: bold;   }   </style>    <!-- Our Patreon Section -->   <div class="section-container">    <h2><b>Our Patron</b></h2>  <div class="patreon-item">   <br></br>       <img src="/assests/Consulate.svg" alt="Consulate Logo">      <div style="font-size:2rem; color: black; text-align: center;" class="label">Consulate General of India</div>         </div> </div> <br></br>             <!-- Our Partners Section -->        <div class="section-container">  <h2>        <b>Our Partners</b>  <br></br>       </h2>   <div class="logo-grid partners-grid">   <br></br>          <img src="/assests/gradbees.svg" alt="Gradbees Logo" style="height:60px;">                         <img src="/assests/currytwist.png" alt="Curry Twist Logo" style="height:60px;">   </div> </div> <br></br>                <!-- Participating Teams Section -->                <div class="section-container">                  <h2><b>Participating Teams</b> <br></br>                </h2>   <div class="logo-grid teams-grid">                     <img src="/assests/teams/Baapdimilano.svg" alt="Baap di Milano Logo">                       <img src="/assests/teams/IndianStrikers.svg" alt="Indian Strikers Logo">                         <img src="/assests/teams/LeccoLegends.svg" alt="Lecco Legends Logo">                           <img src="/assests/teams/MilanoMavericks.svg" alt="Milano Mavericks Logo">                             <img src="/assests/teams/OrangeArmy.svg" alt="Orange Army Logo">                                 <img src="/assests/teams/Pavia.svg" alt="Pavia Logo">                                     <img src="/assests/teams/Tridents.png" alt="Tridents Logo">                                     <img src="/assests/teams/DurandoDemons.png" alt="Durando Demons Logo">                                     </div> </div>	parco Aldo Aniasi	2025-05-31 08:00:00	2025-05-31 19:00:00	https://ucarecdn.com/d528ccfb-218a-4fbe-a9e1-c6f6a6992ea7/super6s.jpeg	8	2025-04-15 05:53:48.821	2025-05-11 22:48:42.768	cm95kupb90000x7h53bcapa4d	t	100	t
\.


--
-- Data for Name: EventImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EventImage" (id, "eventId", "imageUrl", caption, "createdAt") FROM stdin;
\.


--
-- Data for Name: ExclusiveMembership; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ExclusiveMembership" (id, "userId", code, "paymentId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: MembershipRequest; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."MembershipRequest" (id, "firstName", "lastName", email, "isStudent", university, "codiceFiscale", status, "paymentReference", notes, "userId", "createdAt", "updatedAt", "reviewedBy", "reviewedAt") FROM stdin;
cm97uyui60001lg043zb47win	SASSI	Admin	admin@sassimilan.com	t	Not specified	\N	APPROVED	\N	Created by administrator	cm95kupb90000x7h53bcapa4d	2025-04-08 02:05:28.686	2025-04-08 02:05:28.686	cm95kupb90000x7h53bcapa4d	2025-04-08 02:05:28.685
cm9b0wk5f0001jr049xx0h8hl	Harsh		ge@hasb.com	t	Hasbilla	\N	APPROVED	\N	Created by administrator	cm965tc270008l804yhpn1hom	2025-04-10 07:14:58.18	2025-04-10 07:14:58.18	cm95kupb90000x7h53bcapa4d	2025-04-10 07:14:58.179
\.


--
-- Data for Name: PasswordReset; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PasswordReset" (id, "userId", token, expires, "createdAt") FROM stdin;
cmai8eeh70009jp04hburdgu8	cm9h474mu0006l504evikx7vn	2621e6631b5b2b9768b6f6d5c73e5686f44ed06536571120d4b773f7301b77e8	2025-05-10 13:58:53.514	2025-05-10 12:58:53.515
cmajiynmc0001l704ycdcq1wx	cmai8uocv0008l204bavox41t	ae973d9d4d4fccfe53f5066acf0d9609175b7e0bb9f7a2fb43318d5c25c8aeae	2025-05-11 11:42:20.819	2025-05-11 10:42:20.82
\.


--
-- Data for Name: Profile; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Profile" (id, "userId", "universityInIndia", "degreeInIndia", "yearOfArrival", "residenceArea", interests, skills, "showEmail", "showPhone", "createdAt", "updatedAt") FROM stdin;
cm95ov2750005x7snewswqeel	cm95ov2750004x7sns0vmpzay	\N	\N	\N	\N	\N	\N	f	f	2025-04-06 13:39:01.986	2025-04-06 13:39:01.986
cm965oiij0001l804qv8lwb8c	cm965oiij0000l80457zo1gv1	\N	\N	\N	\N	\N	\N	f	f	2025-04-06 21:29:50.012	2025-04-06 21:29:50.012
cm965tc270009l804f41ki8m6	cm965tc270008l804yhpn1hom	\N	\N	\N	\N	\N	\N	f	f	2025-04-06 21:33:34.927	2025-04-06 21:33:34.927
cm96eat2b0005x7l2p5ytk6ta	cm96eat2a0004x7l2940yy0mx	\N	\N	\N	\N	\N	\N	f	f	2025-04-07 01:31:07.042	2025-04-07 01:31:07.042
cm96ehicc0003lf04ts88xu1o	cm96ehicc0002lf04chp34rqo	\N	\N	\N	\N	\N	\N	f	f	2025-04-07 01:36:19.741	2025-04-07 01:36:19.741
cm97ry7cd0001lb04c1f99j0z	cm97ry7cd0000lb04tlxrkl0n	\N	\N	\N	\N	\N	\N	f	f	2025-04-08 00:40:59.821	2025-04-08 00:40:59.821
cm9b6oelr0001ih04bcjtp20v	cm9b6oelr0000ih04a9m1e0nq	\N	\N	\N	\N	\N	\N	f	f	2025-04-10 09:56:35.44	2025-04-10 09:56:35.44
cm9bnuo390001ld04acw7tpek	cm9bnuo390000ld049j6c9hrc	\N	\N	\N	\N	\N	\N	f	f	2025-04-10 17:57:21.141	2025-04-10 17:57:21.141
cm9bs5ecz0001l804s0b8ooyn	cm9bs5ecz0000l804vzf0ijla	\N	\N	\N	\N	\N	\N	f	f	2025-04-10 19:57:40.211	2025-04-10 19:57:40.211
cm9buxfvs0003la04ia5k0rnv	cm9buxfvs0002la046kcxcm9s	\N	\N	\N	\N	\N	\N	f	f	2025-04-10 21:15:27.784	2025-04-10 21:15:27.784
cm9ccptqj0001js04hk9kkc6w	cm9ccptqj0000js0494cdlhhr	\N	\N	\N	\N	\N	\N	f	f	2025-04-11 05:33:25.579	2025-04-11 05:33:25.579
cm9cmgvk30001l7046mri3579	cm9cmgvk30000l704dawlo3o0	\N	\N	\N	\N	\N	\N	f	f	2025-04-11 10:06:24.195	2025-04-11 10:06:24.195
cm9cnw0hs0001l604be0hf1ui	cm9cnw0hs0000l604q2knr0dz	\N	\N	\N	\N	\N	\N	f	f	2025-04-11 10:46:10.048	2025-04-11 10:46:10.048
cm9d3yi8s0001kw04mardv4t3	cm9d3yi8s0000kw046kvq9xgn	\N	\N	\N	\N	\N	\N	f	f	2025-04-11 18:16:00.22	2025-04-11 18:16:00.22
cm9desqm60003jx04lygka1cu	cm9desqm60002jx04gg0hr4q5	\N	\N	\N	\N	\N	\N	f	f	2025-04-11 23:19:26.91	2025-04-11 23:19:26.91
cm9dv9xxu0001l804cpozyhbw	cm9dv9xxu0000l8043y5x2sxh	\N	\N	\N	\N	\N	\N	f	f	2025-04-12 07:00:43.411	2025-04-12 07:00:43.411
cm9dwg1y00001lc04fpu5l9r2	cm9dwg1xy0000lc04ppgtejhs	\N	\N	\N	\N	\N	\N	f	f	2025-04-12 07:33:28.15	2025-04-12 07:33:28.15
cm9ec9vtt0001ky04qifr0z7d	cm9ec9vtt0000ky049r03ka7i	\N	\N	\N	\N	\N	\N	f	f	2025-04-12 14:56:34.145	2025-04-12 14:56:34.145
cm9ef3or00001lh04k5ko5aop	cm9ef3oqz0000lh042rjagoet	\N	\N	\N	\N	\N	\N	f	f	2025-04-12 16:15:43.884	2025-04-12 16:15:43.884
cm9frzmyv0001l5042mra66go	cm9frzmyv0000l504vfcsbvh7	\N	\N	\N	\N	\N	\N	f	f	2025-04-13 15:04:16.135	2025-04-13 15:04:16.135
cm9fsgmhl0001ky045ugyhs0k	cm9fsgmhl0000ky04zncp2xx0	\N	\N	\N	\N	\N	\N	f	f	2025-04-13 15:17:28.665	2025-04-13 15:17:28.665
cm9fybnch0001jr04rpmq5ic5	cm9fybnce0000jr04adcegjwu	\N	\N	\N	\N	\N	\N	f	f	2025-04-13 18:01:34.191	2025-04-13 18:01:34.191
cm9g151an0001lg04liq4yhp7	cm9g151an0000lg04ai6r9eok	\N	\N	\N	\N	\N	\N	f	f	2025-04-13 19:20:24.527	2025-04-13 19:20:24.527
cm9grh72k0001if04yzga09z6	cm9grh72h0000if04p99petto	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 07:37:41.898	2025-04-14 07:37:41.898
cm9gud21n0001l704hwwojzat	cm9gud21m0000l70420ze0y7v	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 08:58:27.611	2025-04-14 08:58:27.611
cm9gujshz0005js04kdy1gdw5	cm9gujshz0004js04lqnhp2i5	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 09:03:41.832	2025-04-14 09:03:41.832
cm9gut1t30007js04b2wssuuu	cm9gut1t30006js04bu1agj6b	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 09:10:53.8	2025-04-14 09:10:53.8
cm9h1whbk0001jx04g6ouyxcn	cm9h1whbk0000jx04ykcx2pzq	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 12:29:31.184	2025-04-14 12:29:31.184
cm9h25onw0007js04pgsqw5br	cm9h25onw0006js04ggl27m68	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 12:36:40.604	2025-04-14 12:36:40.604
cm9h277dr0001jr04mv42up3r	cm9h277dr0000jr047t451nuw	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 12:37:51.52	2025-04-14 12:37:51.52
cm9h36o890001l5040xhpbiip	cm9h36o890000l504ew6jhpak	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 13:05:26.313	2025-04-14 13:05:26.313
cm9h3dt0n0003l504rmxg1gok	cm9h3dt0n0002l50414ztsiip	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 13:10:59.112	2025-04-14 13:10:59.112
cm9h3mu2t0005ld04xgyja3cz	cm9h3mu2t0004ld048hexmykd	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 13:18:00.39	2025-04-14 13:18:00.39
cm9h3rd1x0005l504hq4prng4	cm9h3rd1x0004l504vkvf7p2l	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 13:21:31.605	2025-04-14 13:21:31.605
cm9h3v8n00001ih04xe323fxm	cm9h3v8n00000ih04ain0q2og	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 13:24:32.509	2025-04-14 13:24:32.509
cm9h474mu0007l504f9zls0up	cm9h474mu0006l504evikx7vn	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 13:33:47.19	2025-04-14 13:33:47.19
cm9h519bs0001jy04um82vvdn	cm9h519bs0000jy04o3sxtjsh	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 13:57:12.952	2025-04-14 13:57:12.952
cm9h7cwjc0001jy04ymr4iu3v	cm9h7cwjc0000jy04mm9ep1l5	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 15:02:15.48	2025-04-14 15:02:15.48
cm9h8a7uh0003jy04p8rfxahw	cm9h8a7uh0002jy04b9imrfly	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 15:28:09.785	2025-04-14 15:28:09.785
cm9hbj92x0001i504hp6ii5gf	cm9hbj92w0000i50424n4kprd	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 16:59:10.137	2025-04-14 16:59:10.137
cm9hc8hgq0003i504dw030mdu	cm9hc8hgq0002i504ppp3rlq4	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 17:18:47.402	2025-04-14 17:18:47.402
cm9hegnay0001kz0442ta2aep	cm9hegnay0000kz04d914txrk	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 18:21:07.45	2025-04-14 18:21:07.45
cm9hg3v270001le0402e100uj	cm9hg3v270000le04x2fmzefa	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 19:07:10.207	2025-04-14 19:07:10.207
cm9hhlb2q0001jy042c7oz31v	cm9hhlb2q0000jy045qi4u2bf	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 19:48:43.731	2025-04-14 19:48:43.731
cm9hjy5gq0001lb04xezkihcx	cm9hjy5gq0000lb04wn3gse67	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 20:54:42.219	2025-04-14 20:54:42.219
cm9hk2khy0005ju04y718weco	cm9hk2khx0004ju04v1mwvo38	\N	\N	\N	\N	\N	\N	f	f	2025-04-14 20:58:08.326	2025-04-14 20:58:08.326
cm9hna37t0001jq04jq6s6d29	cm9hna37t0000jq04r18hl3lz			0				f	f	2025-04-14 22:27:58.025	2025-04-14 22:35:19.647
cm9i1z6hn0001l804vkweyfa4	cm9i1z6hn0000l804lq0g1n15	\N	\N	\N	\N	\N	\N	f	f	2025-04-15 05:19:23.291	2025-04-15 05:19:23.291
cm9iiiepz0001i90a5pmmdwrq	cm9iiiepz0000i90aaembbas3	\N	\N	\N	\N	\N	\N	f	f	2025-04-15 13:02:14.279	2025-04-15 13:02:14.279
cm9iio0tw0001il041w9pv4qf	cm9iio0tw0000il04hfn42v97	\N	\N	\N	\N	\N	\N	f	f	2025-04-15 13:06:36.212	2025-04-15 13:06:36.212
cm9ip90aq0001i504e0qhjbvv	cm9ip90aq0000i504sqq6i1nq	\N	\N	\N	\N	\N	\N	f	f	2025-04-15 16:10:52.994	2025-04-15 16:10:52.994
cm9itv6ga0001jx0436js7aif	cm9itv6g90000jx049bm7z77q	\N	\N	\N	\N	\N	\N	f	f	2025-04-15 18:20:05.866	2025-04-15 18:20:05.866
cm9j0aagt0001js041649slk8	cm9j0aags0000js048bu94w7r	\N	\N	\N	\N	\N	\N	f	f	2025-04-15 21:19:48.605	2025-04-15 21:19:48.605
cm9j0nvgd0003js04acyw21tk	cm9j0nvgd0002js04kt2ez1x1	\N	\N	\N	\N	\N	\N	f	f	2025-04-15 21:30:22.333	2025-04-15 21:30:22.333
cm9jypbr40001js04la49itur	cm9jypbr40000js046cr0v2ua	\N	\N	\N	\N	\N	\N	f	f	2025-04-16 13:23:17.056	2025-04-16 13:23:17.056
cm9k49nvr0001js04i9x4c5at	cm9k49nvf0000js04vqujuks0	\N	\N	\N	\N	\N	\N	f	f	2025-04-16 15:59:03.964	2025-04-16 15:59:03.964
cm9kcobot0001l804gdef0jtw	cm9kcoboq0000l804nzwz99bg	\N	\N	\N	\N	\N	\N	f	f	2025-04-16 19:54:24.939	2025-04-16 19:54:24.939
cm9lvqo1f0001k004vmj7dzb2	cm9lvqo1f0000k004mvszj5wi	\N	\N	\N	\N	\N	\N	f	f	2025-04-17 21:35:53.139	2025-04-17 21:35:53.139
cm9lzaatx0001la04i54lnxv2	cm9lzaatx0000la04oqmo210w	\N	\N	\N	\N	\N	\N	f	f	2025-04-17 23:15:07.989	2025-04-17 23:15:07.989
cm9mso6ai0001l904uk8cbuku	cm9mso6ai0000l904amw92oca	\N	\N	\N	\N	\N	\N	f	f	2025-04-18 12:57:44.154	2025-04-18 12:57:44.154
cm9n8t7ph0001l804rcwwhma9	cm9n8t7ph0000l804cpiqw50x	\N	\N	\N	\N	\N	\N	f	f	2025-04-18 20:29:33.126	2025-04-18 20:29:33.126
cm9opbqf00003l104ntmfmr3c	cm9opbqf00002l104mlkyjmye	\N	\N	\N	\N	\N	\N	f	f	2025-04-19 20:59:37.212	2025-04-19 20:59:37.212
cm9pp6wv60001lk04ytgfg969	cm9pp6wv50000lk0493jo1jxe	\N	\N	\N	\N	\N	\N	f	f	2025-04-20 13:43:38.466	2025-04-20 13:43:38.466
cm9ss4xc90001l6043ix3bgm5	cm9ss4xc80000l604etngtu0u	\N	\N	\N	\N	\N	\N	f	f	2025-04-22 17:29:23.145	2025-04-22 17:29:23.145
cm9xyr51x0001lg04kwt1pce2	cm9xyr51x0000lg04jkkc2qz7	\N	\N	\N	\N	\N	\N	f	f	2025-04-26 08:33:28.15	2025-04-26 08:33:28.15
cma5abfn00001jp04vweuggep	cma5abfn00000jp04taeb3et6	\N	\N	\N	\N	\N	\N	f	f	2025-05-01 11:31:33.996	2025-05-01 11:31:33.996
cma8qs88a0001ju04jpiif3ho	cma8qs88a0000ju04wcouehaq	\N	\N	\N	\N	\N	\N	f	f	2025-05-03 21:35:49.93	2025-05-03 21:35:49.93
cma9pdbgl0001jo04zzkjtnv3	cma9pdbgl0000jo04apghy0k4	\N	\N	\N	\N	\N	\N	f	f	2025-05-04 13:44:00.838	2025-05-04 13:44:00.838
cma9pgy2x0003jo04cat750u3	cma9pgy2x0002jo041giizjao	\N	\N	\N	\N	\N	\N	f	f	2025-05-04 13:46:50.122	2025-05-04 13:46:50.122
cmagf8oyb0001jj04y4qef7as	cmagf8oyb0000jj04aftbj408	\N	\N	\N	\N	\N	\N	f	f	2025-05-09 06:34:52.115	2025-05-09 06:34:52.115
cmah0ipz40001jl04dmo2d0no	cmah0ipz40000jl04rcq4gsek	\N	\N	\N	\N	\N	\N	f	f	2025-05-09 16:30:31.937	2025-05-09 16:30:31.937
cmah7yjrb0001ib04llyrybvw	cmah7yjrb0000ib04675xacki	\N	\N	\N	\N	\N	\N	f	f	2025-05-09 19:58:47.687	2025-05-09 19:58:47.687
cmai2j2oi0001ju04e70uw7wq	cmai2j2oi0000ju049130nsfx	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 10:14:33.81	2025-05-10 10:14:33.81
cmai2tohj0001ib04yprrx0ys	cmai2tohi0000ib04uuspdgd9	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 10:22:48.631	2025-05-10 10:22:48.631
cmai34w110001l104dhyet8lk	cmai34w110000l1048a2qt4t9	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 10:31:31.621	2025-05-10 10:31:31.621
cmai4sm2g0001kw04az3xxfee	cmai4sm2g0000kw04vieio79b	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 11:17:58.073	2025-05-10 11:17:58.073
cmai4ykpa0001jx04ipq2itom	cmai4ykp90000jx04slhgjr7p	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 11:22:36.238	2025-05-10 11:22:36.238
cmai4zrq30003jx04z9t8pyfo	cmai4zrq30002jx04xac7n1y9	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 11:23:31.995	2025-05-10 11:23:31.995
cmai7jzcd0001l104qt2v4pae	cmai7jzcd0000l104jfyhsmrz	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 12:35:14.221	2025-05-10 12:35:14.221
cmai7kycb0005l104y54o6q4b	cmai7kycb0004l104sqayuy9x	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 12:35:59.58	2025-05-10 12:35:59.58
cmai7o5dc0003js043vos2ajp	cmai7o5dc0002js04ol71by18	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 12:38:28.657	2025-05-10 12:38:28.657
cmai7v65a000bl104nacxheeq	cmai7v65a000al10475o67hi8	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 12:43:56.255	2025-05-10 12:43:56.255
cmai833wm000fl104inlm90iz	cmai833wm000el104t9wzo3s2	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 12:50:06.598	2025-05-10 12:50:06.598
cmai84zut0003jp04ln1ol6k3	cmai84zut0002jp04zvueju4l	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 12:51:34.662	2025-05-10 12:51:34.662
cmai8aboc0007js044dn0p5bk	cmai8aboc0006js04wy3ipd1s	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 12:55:43.261	2025-05-10 12:55:43.261
cmai8bgcs0007jp04p67n8iwq	cmai8bgcs0006jp04l4pgly82	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 12:56:35.98	2025-05-10 12:56:35.98
cmai8gyki000bjs041vi3cxa1	cmai8gyki000ajs042ux2kuud	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:00:52.866	2025-05-10 13:00:52.866
cmai8gzw7000djs045hw1z46q	cmai8gzw7000cjs04l6hqo1kg	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:00:54.583	2025-05-10 13:00:54.583
cmai8h2z8000fjs04gsxk91k4	cmai8h2z8000ejs044xq5pzvv	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:00:58.58	2025-05-10 13:00:58.58
cmai8k5gb0007l40bwtkyzviu	cmai8k5gb0006l40bg048ppg4	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:03:21.755	2025-05-10 13:03:21.755
cmai8t67w000ll104u5a088w5	cmai8t67w000kl104m7wkajxy	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:10:22.652	2025-05-10 13:10:22.652
cmai8thik000pl104q0uvzvqq	cmai8thik000ol104ifdkwnyo	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:10:37.292	2025-05-10 13:10:37.292
cmai8ubk10007l204b7q5igd9	cmai8ubk10006l2042r9xk0rz	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:11:16.226	2025-05-10 13:11:16.226
cmai8uocv0009l204ehxe8u8v	cmai8uocv0008l204bavox41t	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:11:32.815	2025-05-10 13:11:32.815
cmai8utmb000bl204rnldof0s	cmai8utmb000al204gwvpqfax	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:11:39.636	2025-05-10 13:11:39.636
cmai8v459000rl1040gzh95q8	cmai8v459000ql104eljn7wcw	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:11:53.277	2025-05-10 13:11:53.277
cmai8xizi000fl2049ipxv69c	cmai8xizi000el204nk0m8am4	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:13:45.822	2025-05-10 13:13:45.822
cmai8xxw1000xl104zp1mouqw	cmai8xxw1000wl104m7aui1ec	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:14:05.137	2025-05-10 13:14:05.137
cmai8y1rk000zl104xl2howla	cmai8y1rk000yl104yizi4mkc	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:14:10.161	2025-05-10 13:14:10.161
cmai8ymev0003ji04xqb0j7k8	cmai8ymev0002ji045zcskh8n	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:14:36.919	2025-05-10 13:14:36.919
cmai8zgzi000jl20445t7kdss	cmai8zgzi000il204qjfaeg1v	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:15:16.542	2025-05-10 13:15:16.542
cmai92qoi000mjs04wj1r5duu	cmai92qoi000ljs04b1blbutj	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:17:49.075	2025-05-10 13:17:49.075
cmai930p2000ojs04ef4diko8	cmai930p2000njs04fmmn7gnn	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:18:02.054	2025-05-10 13:18:02.054
cmai96fsp000sjs04tqls9o7w	cmai96fsp000rjs04830ypog7	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:20:41.593	2025-05-10 13:20:41.593
cmai97gup000ujs04z8q0agvt	cmai97gup000tjs0419pl8140	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:21:29.617	2025-05-10 13:21:29.617
cmai9csmy000pl204rt2vx6oq	cmai9csmy000ol204b2zn6n17	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:25:38.17	2025-05-10 13:25:38.17
cmai9dvz5000wjs04vd3vgj6c	cmai9dvz5000vjs04ozf9x507	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:26:29.153	2025-05-10 13:26:29.153
cmai9mjt8000vl204s1fxqxi5	cmai9mjt8000ul2042nq5uq58	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:33:13.292	2025-05-10 13:33:13.292
cmai9n7lb000xl20467h52owc	cmai9n7lb000wl204smmbv1ix	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:33:44.111	2025-05-10 13:33:44.111
cmai9oly4000zl204l4pp54ca	cmai9oly4000yl2046vkauaiy	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:34:49.273	2025-05-10 13:34:49.273
cmai9osno0011l204lf2rdcso	cmai9osno0010l204farnk4hp	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:34:58.068	2025-05-10 13:34:58.068
cmai9p83y0013l204ogia2jzz	cmai9p83y0012l204qwctakt5	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:35:18.094	2025-05-10 13:35:18.094
cmai9pcs40015l2048ks940kv	cmai9pcs40014l204xvhrd2hk	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:35:24.148	2025-05-10 13:35:24.148
cmai9pupq000fji04p01ovlko	cmai9pupp000eji0497g8vlgk	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:35:47.39	2025-05-10 13:35:47.39
cmai9t29r0010js04b15kfubt	cmai9t29r000zjs04e4x9mnmk	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:38:17.151	2025-05-10 13:38:17.151
cmai9u2ft001dl204tyb5exii	cmai9u2ft001cl20416fhd7zr	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:39:03.931	2025-05-10 13:39:03.931
cmai9uw5g001fl204k3vf8sh5	cmai9uw5f001el204b3lfkjju	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:39:42.532	2025-05-10 13:39:42.532
cmai9uz7f001hl204qk70fuky	cmai9uz7f001gl204caesw2l5	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:39:46.492	2025-05-10 13:39:46.492
cmaiad7zr000pji041nwsshz1	cmaiad7zr000oji04wx86skc7	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:53:57.676	2025-05-10 13:53:57.676
cmaiagxww001pl204a1x84vly	cmaiagxww001ol204ockix90u	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:56:51.248	2025-05-10 13:56:51.248
cmaiaii9f000xji04uzuadk09	cmaiaii9f000wji04263gtw8y	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 13:58:04.275	2025-05-10 13:58:04.275
cmaianlxs001tl204kn8j59ql	cmaianlxs001sl204iv70r1gd	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:02:02.32	2025-05-10 14:02:02.32
cmaiaxj950001l204jeazonjh	cmaiaxj950000l204xj0c0nv5	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:09:45.401	2025-05-10 14:09:45.401
cmaib3jt7001zl204ynrljrho	cmaib3jt7001yl204umfw2dgz	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:14:26.059	2025-05-10 14:14:26.059
cmaib75990023l204q1v4ui6u	cmaib75990022l204948tpnf1	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:17:13.821	2025-05-10 14:17:13.821
cmaib9awr000zji04nmecgf94	cmaib9awr000yji04nv907fo7	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:18:54.46	2025-05-10 14:18:54.46
cmaibajng0011ji04w8ns6p84	cmaibajng0010ji04rt1jg54t	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:19:52.444	2025-05-10 14:19:52.444
cmaibctkq0013ji04yz6dx3kb	cmaibctkq0012ji04xb3u867y	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:21:38.618	2025-05-10 14:21:38.618
cmaibcv1j0017ji042nlcvyfk	cmaibcv1j0016ji04v6ug2mu1	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:21:40.519	2025-05-10 14:21:40.519
cmaibeccb001bji04p1r9ycbr	cmaibeccb001aji04ja9fyiba	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:22:49.596	2025-05-10 14:22:49.596
cmaibj3rw0007l204kmvqfcnz	cmaibj3rw0006l204vq0lmvhw	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:26:31.772	2025-05-10 14:26:31.772
cmaibximv0005jl04fg50oucd	cmaibximv0004jl04thwp6rr9	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:37:44.216	2025-05-10 14:37:44.216
cmaiby0s40007jl04r5shc9aa	cmaiby0s40006jl04ajbbhh16	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:38:07.732	2025-05-10 14:38:07.732
cmaic2409000bl2047non5owr	cmaic2409000al204ljgrse5h	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:41:18.538	2025-05-10 14:41:18.538
cmaicdh2g0009jl04x4w5pwqk	cmaicdh2g0008jl04oucpy87o	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:50:08.68	2025-05-10 14:50:08.68
cmaicei82000bjl04ya1lijzc	cmaicei82000ajl04cmbji3gq	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:50:56.834	2025-05-10 14:50:56.834
cmaichvbz001dji04zwv6hlpz	cmaichvbz001cji04hewfhm5q	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:53:33.791	2025-05-10 14:53:33.791
cmaichzlm001fji04m3tfs6uf	cmaichzlm001eji043ssy8wfs	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:53:39.322	2025-05-10 14:53:39.322
cmaick6rg000djl04y9y11l5z	cmaick6rg000cjl049ex055r1	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 14:55:21.916	2025-05-10 14:55:21.916
cmaicqsw3001hji04zexspqvu	cmaicqsw2001gji040ohauol6	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 15:00:30.531	2025-05-10 15:00:30.531
cmaidavjh000fjl0446pkn8qz	cmaidavjh000ejl04nr60k4kr	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 15:16:07.086	2025-05-10 15:16:07.086
cmaidvnjn000dl204v54jzbu7	cmaidvnjn000cl204wenehqcp	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 15:32:16.499	2025-05-10 15:32:16.499
cmaie5yan0001kw04faldgrer	cmaie5yan0000kw04owpemo9l	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 15:40:16.992	2025-05-10 15:40:16.992
cmaifm4az0001l504iuvbhhhs	cmaifm4az0000l504lg1hfzo7	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 16:20:50.891	2025-05-10 16:20:50.891
cmaifmslu0003l5040n0jk653	cmaifmslu0002l504hqllws15	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 16:21:22.292	2025-05-10 16:21:22.292
cmaifo78n000hjl04kzyftg6p	cmaifo78n000gjl04qd02cw27	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 16:22:28.007	2025-05-10 16:22:28.007
cmaigeep90005l504ikevzd1e	cmaigeep90004l504hzfvx466	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 16:42:50.733	2025-05-10 16:42:50.733
cmaigwt2f0001jy04vfwfk851	cmaigwt2f0000jy04wyki8bji	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 16:57:09.159	2025-05-10 16:57:09.159
cmaihbz000003jy04wbd3kksi	cmaihbz000002jy04m44yvlbh	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 17:08:56.688	2025-05-10 17:08:56.688
cmaihirq70007l504bqprvrua	cmaihirq60006l504hrua10vh	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 17:14:13.855	2025-05-10 17:14:13.855
cmaii1wjl0009l504u4zghhaz	cmaii1wjl0008l504u19jurvs	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 17:29:06.562	2025-05-10 17:29:06.562
cmaiia1c60001l804h81ypeno	cmaiia1c60000l804hw9ogk54	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 17:35:26.022	2025-05-10 17:35:26.022
cmaij5l2y0001l504t8hicwzc	cmaij5l2y0000l504uvon2379	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 17:59:57.946	2025-05-10 17:59:57.946
cmaijb7f30001jr04whmgd5js	cmaijb7f30000jr04xjl3r3qq	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 18:04:20.175	2025-05-10 18:04:20.175
cmaik89ma0001l804wrxjlqsd	cmaik89ma0000l804v9lt2uq1	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 18:30:02.674	2025-05-10 18:30:02.674
cmailymcx0001ju04hmaehd6t	cmailymcx0000ju049hfs4wb7	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 19:18:31.857	2025-05-10 19:18:31.857
cmaimal3d0001l104ukklazfq	cmaimal3d0000l104kp53yl26	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 19:27:50.089	2025-05-10 19:27:50.089
cmaiqu54f0001jm040blaes4b	cmaiqu54f0000jm04yh3yylxh	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 21:35:00.976	2025-05-10 21:35:00.976
cmaisbnmj0001l404v7vxj0qe	cmaisbnmj0000l404h3aw5wy1	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 22:16:37.724	2025-05-10 22:16:37.724
cmaivn0d30001la046sxvdbkj	cmaivn0d30000la04wjhxwb2k	\N	\N	\N	\N	\N	\N	f	f	2025-05-10 23:49:26.296	2025-05-10 23:49:26.296
cmaix1snr0001l904ie3bl418	cmaix1snr0000l904jcf8m31d	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 00:28:55.767	2025-05-11 00:28:55.767
cmaj9ndee0001jl04oegdas8f	cmaj9ndee0000jl04jlp9ldw3	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 06:21:37.814	2025-05-11 06:21:37.814
cmaj9pxww0001jo048dc6urf3	cmaj9pxwt0000jo04j001sw6t	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 06:23:37.71	2025-05-11 06:23:37.71
cmaje8fh80001jv04ce8fo4it	cmaje8fh80000jv04a5kwk3df	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 08:29:58.748	2025-05-11 08:29:58.748
cmajfkuh90001lb04mrdzkkwx	cmajfkuh90000lb04zjual78a	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 09:07:37.677	2025-05-11 09:07:37.677
cmajg6nkw0001l1048djdnsuk	cmajg6nkw0000l104qapuu4hz	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 09:24:35.168	2025-05-11 09:24:35.168
cmajg8ibv0001l404bwhemavs	cmajg8ibt0000l404o11fbj94	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 09:26:01.673	2025-05-11 09:26:01.673
cmajg9sle0003l404y2suoab9	cmajg9sle0002l404dyhvzjyj	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 09:27:01.634	2025-05-11 09:27:01.634
cmajgwxhb0001ky04ybz4ykqk	cmajgwxhb0000ky040fds1xz7	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 09:45:01.055	2025-05-11 09:45:01.055
cmajkax8h0001l704ggv56edq	cmajkax8h0000l704f2oq4qia	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 11:19:52.77	2025-05-11 11:19:52.77
cmajm7vq50001l40450lqgw8b	cmajm7vq50000l404570k88jy	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 12:13:30.077	2025-05-11 12:13:30.077
cmajms1qq0001la04rku9hvrn	cmajms1qq0000la04gr503s2g	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 12:29:10.994	2025-05-11 12:29:10.994
cmajns0fi0001jw045y335b99	cmajns0fi0000jw04bsgkm8dw	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 12:57:08.91	2025-05-11 12:57:08.91
cmajqbg4a0001l404rmt1f7g3	cmajqbg4a0000l404hco9drkx	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 14:08:14.938	2025-05-11 14:08:14.938
cmak0zcuc0001l1047yiqo3sq	cmak0zcuc0000l104docluswp	\N	\N	\N	\N	\N	\N	f	f	2025-05-11 19:06:46.596	2025-05-11 19:06:46.596
\.


--
-- Data for Name: TeamApplication; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."TeamApplication" (id, department, motivation, status, notes, "userId", "createdAt", "updatedAt", "reviewedBy", "reviewedAt", "paymentId") FROM stdin;
cm960hud60007x7p1imte0ueb	pending-payment		PENDING	\N	cm95ov2750004x7sns0vmpzay	2025-04-06 19:04:40.697	2025-04-06 19:04:40.697	\N	\N	e497f2e5-2b3b-4c97-a2cc-cd5bd10f3e0f
cm965crg40001jr04b1x7q1s9	pending-payment		APPROVED	\N	cm95kupb90000x7h53bcapa4d	2025-04-06 21:20:41.717	2025-04-06 21:32:59.637	cm95kupb90000x7h53bcapa4d	2025-04-06 21:32:59.636	89a6fd8e-375b-4c4f-b48d-498f2da61298
cm97lfexu0003jx042ruz27os	pending-payment		PENDING	\N	cm965oiij0000l80457zo1gv1	2025-04-07 21:38:25.507	2025-04-07 21:38:25.507	\N	\N	6ad31b72-634a-42c8-bf20-f7cd861d244b
cm9b0vm770005jp04nwz62fz2	pending-payment		PENDING	\N	cm965tc270008l804yhpn1hom	2025-04-10 07:14:14.179	2025-04-10 07:14:14.179	\N	\N	84e9738b-14b8-4d94-a619-2613b52d66c4
\.


--
-- Data for Name: StripePayment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."StripePayment" (id, "stripeSessionId", "stripePaymentId", amount, currency, status, "paymentType", "userId", "eventId", "teamApplicationId", "createdAt", "updatedAt") FROM stdin;
cm95mhv2h000nx7e6n9ze54rl	cs_test_a1Wx90ZizTMxcq7AxDdt3mw9FVTcfv2gws30YnTLIHbqwTW7Kiv1Z4uq8I	\N	20	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-06 12:32:46.985	2025-04-06 12:32:46.985
cm96hatzb0001x77f9ma1d2ay	cs_live_a1ODzCRx75GvLatVOiEl8fpVlOlgvTIT3JQxnCDhJi8s1YVRF6iIjMV0xE	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 02:55:07.078	2025-04-08 02:55:07.887
cm96igdol0009x7whhakrpg6w	cs_live_a1emG5qU3nScEDXe50jRU124RJvu4RGNaSh6Wjv8WuNWXlmScIDBdkt6BY	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 03:27:25.508	2025-04-08 03:27:27.127
cm960v4gp000bx7p1hx87hr85	cs_live_a1B3VaBJjXTxmFcC97auP99grCkZfrHK5kziqlYy1wEeT8d9hJlT7SnXQp	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 19:15:00.311	2025-04-07 19:15:02.277
cm95mbf0d000bx7e6uihkrhnk	cs_test_a18ZC8ZqwWHYD5LHLlfXhthaEfp7UlHkGUr9vW3JEj4Su8fGcfo917lcj4	\N	10	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-06 12:27:46.237	2025-04-06 12:27:46.237
cm95mgl76000hx7e6wrtd0pq0	cs_test_a1ezrs0O2mBH6t31z1BSYmaVQThxCG0V3rziIGokxbzQCUUUy6W8k8cQVz	\N	10	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-06 12:31:47.537	2025-04-06 12:31:47.537
cm95o0exm0001x7snp5k9yi1w	cs_test_a1cgoQzHPOphvJHBquRwQndjKyAubSMqQQvoQjsQhP9WQPsN9sOCU4E5fT	\N	10	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-06 13:15:12.152	2025-04-06 13:15:12.152
cm95opdhc0003x7snhtjwy83c	cs_test_a18eAfcuJQzI3uS02w4FkVcyOHLM1h1TvJRTsbQ2gP8fyQ5oEWd1Th6QA1	\N	10	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-06 13:34:36.67	2025-04-06 13:34:36.67
cm95ow4ur0007x7snawdjajif	cs_test_a1ydx1XkKaN8j788qmuiEuHAWJqlcWj3QqOanNCbHhGDHrOlWIwfXWbZ4Z	\N	10	eur	PENDING	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 13:39:52.081	2025-04-06 13:39:52.081
cm95puq7k000bx7sn791kv86v	cs_test_a18PxfyQGVSN9ZgaFsYda9Mquv1LAdVQaaesAFu1gAc5IQhZxhRecbxdeg	\N	10	eur	PAID	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 14:06:46.064	2025-04-06 14:06:46.064
cm95py3hv000dx7sne863piwg	cs_test_a1kSijjW8hozGxU7BiRgk8HU7knaey7y0ItAR0Z15EgMTh3ouhX4ljeOeK	\N	10	eur	PENDING	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 14:09:23.251	2025-04-06 14:09:23.251
cm95pyqeh000fx7sntv7gja95	cs_test_a1KjgIr9ynrNWmkMAxI2Z2MEqGMnLB2c5GjZLaNnTQnMdszgDa2UnYwX3k	\N	10	eur	PENDING	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 14:09:52.936	2025-04-06 14:09:52.936
cm95neta0000rx7e6xc8eg080	cs_test_a1gc2f58VyJ38VTS1Jf50U5TprsyZV3YDVGOeKdVRYawzAvAHyw0Hgjzj6	\N	20	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-06 12:58:24.311	2025-04-06 12:58:24.311
cm97719ue0003x771qrv0ppqz	cs_live_a17yrNq2Txd6glHh1u5389tzR4PiVeceAG3NrUxQD1q4AN8JaiXDmTvufx	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 14:55:31.092	2025-04-08 14:55:33.289
cm9754zsz0001x7wvudzov1ot	cs_live_a16qgnnAY1RaONFNT2plr1dsdDKvgYFG4S3X4h4Y3vs4W4qspS8ygVobhK	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-07 14:02:25.468	2025-04-08 14:02:32.891
cm97bir5a0001lb04g7v9t3kj	cs_live_a1MU3Df1sb37btWT2Npbkiac71hotRgaZbYB8g1Xha18x1wyJFeED5tA84	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96ehicc0002lf04chp34rqo	\N	\N	2025-04-07 17:01:05.134	2025-04-08 17:01:07.263
cm97lobe70001le041cgel95p	cs_live_a1Ir5GkZJHDNiDPwlPjOqxvajZZA7Zpjo2LBQ54zJovOfgZXgBwIP1AHzE	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-07 21:45:20.816	2025-04-08 21:45:22.42
cm960g3fo0001x7p1dmsg1h12	cs_live_a1LFbgk2HiIPXM9aFxEHo9BnuG7NChPTaOXa5qzUQpPnxCsF1EgTNlf756	\N	9.91	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 19:03:19.14	2025-04-07 19:03:20.831
e497f2e5-2b3b-4c97-a2cc-cd5bd10f3e0f	cs_live_a18u7KY8wjqio4ObYFxUSjH48W0gDDBKHXOuXbuUFAL9fO1CKrJUOVQwAJ	\N	5	eur	EXPIRED	TEAM_APPLICATION	cm95ov2750004x7sns0vmpzay	\N	cm960hud60007x7p1imte0ueb	2025-04-06 19:04:41.478	2025-04-07 19:04:42.325
cm960vj50000fx7p1diuiz6fn	cs_live_a1FLHeplTi6278sl3g2oXukq7BwDr3YjO57NHd3N9oavyopqdNkhsVzT4r	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 19:15:19.331	2025-04-07 19:15:20.297
cm961i8iw0001x740gav0sn0p	cs_live_a1GUPEElxWs30xdkGEg4iOxK6A1KRf3gjEilHdRewbi4LLsjj7h2GCiGBZ	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 19:32:58.659	2025-04-07 19:33:00.002
cm962evq90003fp4o4is6k4ph	cs_live_a13NtVhEIguqudVJZy7iLGevGmHHJRqq5opo4TjLa4HMesQqhzXweD54XG	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 19:58:21.729	2025-04-07 19:58:25.119
cm963xvf60001l504etpys4dt	cs_live_a1ZQqC5sjwTkKWskspRQuMISwlSM7N5unY4LMvfwti9JFNrcPUxO6M4Rdk	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-06 20:41:07.41	2025-04-07 20:41:08.853
cm9640ls20001l204e54qw55x	cs_live_a1224NLtl0OP6CCgXXksAJ9JXPbXwqTOdvAsn0XrHtvcxVcN9xeIwP0uuk	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 20:43:14.883	2025-04-07 20:43:16.246
cm97opevc0007x7xbjdb4fp45	cs_live_a110RXNuXadCsB9PXJqZpYDTxyC1T7DAXx6p9mcKzptEh7k6OtaRdpPOyx	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 23:10:10.823	2025-04-08 23:10:13.067
cm97rw3300003jr044n9rf1dx	cs_live_a1rO1XIa62v5rVDz3sSixqxvQHh96qvneb4QWE98OZQoXNSNrbpZigFFXH	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	cm97rdoz90001la044naksq9o	\N	2025-04-08 00:39:20.988	2025-04-09 00:39:22.272
cm98p8jg60001jr04lgtjyasz	cs_live_a1yEnanGbbqWrUqAK9WEm9Tg4lRcmEQy08YmqwGieNE0ExIXMCn9FhxTdf	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	cm97rdoz90001la044naksq9o	\N	2025-04-08 16:12:49.398	2025-04-09 16:12:51.395
cm9agzyz40001l2043n39hf39	cs_live_a1ggfXH17CnHQLshee5tqg68gjW9gy4asJT92B4W0yO6AVTb3MzqdbbSk4	\N	5	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm97rdoz90001la044naksq9o	\N	2025-04-09 21:57:45.04	2025-04-09 21:57:45.595
cm97cgfs70001lk04f1c9td4d	802c5b84-2ec1-4648-b3e2-ce4fa0491e5e	\N	0.1	eur	PENDING	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 17:27:16.712	2025-04-07 17:27:16.712
cm97cgh9d0003lk04rxd7uy3o	6ba9bf0c-173b-4973-897b-7c762e62cec6	\N	0.1	eur	PENDING	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 17:27:18.626	2025-04-07 17:27:18.626
cm9b5h5rp0001l8058cf17vvj	cs_live_a1FY9dRhnuvvdve2kG9kIRpoimqdkO8F6UGAukxz4zvNbbV68tnTOE0NtK	\N	5	eur	PENDING	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	cm97rdoz90001la044naksq9o	\N	2025-04-10 09:22:57.782	2025-04-10 09:22:58.352
cm9b7g7710002jn04d8owb69s	cs_live_a1mGxnj6RXspbgIqEs2qSWQ3YboGGUsd2oceQNokmGIlhu9OetM8uCTItl	\N	5	eur	PENDING	TEAM_APPLICATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-10 10:18:12.205	2025-04-10 10:18:12.205
cm9bkrm0i0001js041s8vx1bh	cs_live_a1sUaGcFHd2Zl6aUALdJMF5ximg1wDSxE7619V7d6WaLPqN037g7vCQbpM	\N	5	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm97rdoz90001la044naksq9o	\N	2025-04-10 16:30:59.634	2025-04-10 16:31:00.202
cm96gmicn0001x7qpovmwkobg	cs_live_a1DZoUtPMG1ufkq7rHTCLf4XOijU6cGIQQXGMQffFkhhx9SBwinyzTTkGj	\N	4.88	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 02:36:12.263	2025-04-08 02:36:13.004
cm96gn4xh0003x7qprtc5311a	cs_live_a1h7XqDc0mwrncc6kNzDgcPx4ZacPuY6VlxOJszR3TgfIdO4huYlJ39xhl	\N	4.88	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 02:36:41.524	2025-04-08 02:36:42.333
cm9brvf400001k004z8ex892y	cs_live_a1sLmYX5q0wPsSG0Az1JSs0HyAyvGWpscGo9P1SM7MbDetGe8qA4Dd513r	pi_3RCR7PGbMSNZDc2q0gnLAwsE	5	eur	CANCELLED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm97rdoz90001la044naksq9o	\N	2025-04-10 19:49:54.625	2025-04-10 20:53:21.308
cm9bu5jin0001la04roa04xbl	cs_live_a1kNQxTTIv9umduqvnyIetubIek0xOsrwyn39CxEZnvkhlbYtOoEmGasKh	pi_3RCS6lGbMSNZDc2q1ikmINbV	5	eur	PAID	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	cm97rdoz90001la044naksq9o	\N	2025-04-10 20:53:46.127	2025-04-10 20:54:05.678
cm9egf03q0001x7d62256bjig	cs_live_a1IUXHTZ3t6vd4r8pKGpC4zfMvHN9p65UBvX4CukRoSEZNUt6FrSHJLP4V	\N	5	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm97rdoz90001la044naksq9o	\N	2025-04-12 16:52:31.429	2025-04-12 16:52:32.428
cm9lzz8m10003l304s9at3dcq	cs_live_a1CC9Ye8BUrjbcAnI5NABt4kLymjzqvbrZrEY54LIwyetSDanhZLPzRe70	\N	100	eur	PENDING	EVENT_REGISTRATION	cm9lzaatx0000la04oqmo210w	cm9i37g9i0000fqla41p0whcf	\N	2025-04-17 23:34:31.513	2025-04-17 23:34:32.143
cm964qxjd0003l2044qr4afa6	cs_live_a14qK5lP4F6VuIWqwNDK5f2e4ugNERtVyi3NQdepXtiwg4QVdJADwQ52FK	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 21:03:43.177	2025-04-07 21:03:45.639
cm964r7bl0007l2049g523j31	cs_live_a1E2lBP6EHiBF4hUCjLrYq9RVD7TKfyQYI40AnA1huuvKPLUpTWV3NI3jo	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 21:03:55.858	2025-04-07 21:03:57.338
cm964s4a50009l204jwdxj7d0	cs_live_a1OnN8LOc8eLr7orOjGQMSypJK4T2dUOuS1MGaY4cBi6vB7D699SM6pFa0	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 21:04:38.574	2025-04-07 21:04:39.381
cm964te520003l104ilu3asnd	cs_live_a1dsnot65DPACxARGTPiLceZBNZUDIcynmfgIlPRwVtFrkrjMFttbreIMP	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 21:05:38.006	2025-04-07 21:05:38.778
89a6fd8e-375b-4c4f-b48d-498f2da61298	cs_live_a10fc3olbTBn9nBoDubNH1zaiO1DIEEW4DfCC4LgKsARCeDcRrEHOsGhAb	\N	5	eur	EXPIRED	TEAM_APPLICATION	cm95kupb90000x7h53bcapa4d	\N	cm965crg40001jr04b1x7q1s9	2025-04-06 21:20:42.487	2025-04-07 21:20:43.072
cm965p5i90003l804g115oit9	cs_live_a1WeUuw5dzB9xq6SwEDZpAeYPnJyv7o6bKYXBS5pulHzUotOg7IOcprPnq	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-06 21:30:19.81	2025-04-07 21:30:21.563
cm965ttn00001l104sub971av	cs_live_a1dhPDHgumbhnQGEnoxCDNHJlJ6qKmpbC6x3Q6x1JpuvXbq4KpsqfHhVHy	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-06 21:33:57.708	2025-04-07 21:33:59.085
cm965tx700005l104ke49i282	cs_live_a1uwwcoBzpAscEZKgBVeLBDsq9F6U8mRJmiRXCSQ4GmPFDvsKpTY4c0PiS	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm965tc270008l804yhpn1hom	\N	\N	2025-04-06 21:34:02.316	2025-04-07 21:34:03.469
cm965xt2z0009l104vsri448h	cs_live_a1bi2ECqJdpSkgJhsPJ4J6js2de098n8r3rPV0cyADJyZ0Xu6X8Ddec4XQ	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 21:37:03.612	2025-04-07 21:37:04.739
cm966iyg50001fp3u54mm8cz8	cs_live_a19nSvVBC6HzRHwPkYvpBCipfL3B3X6EOzV8YSBlAN4tKSLdoYhDLNKeky	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 21:53:30.34	2025-04-07 21:53:31.773
cm966l3il0005fp3u2ttd0lb8	cs_live_a1iaRNz3YPj7GtMK6SGHGmQqxE7T6pmF9sq3H2RidfjacFiGBvjluZ4oNb	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-06 21:55:10.221	2025-04-07 21:55:11.68
cm9gueani0001js04rmp0dusq	cs_live_a1ZmvLqNNpLXYdPGgeccBtspYrvHHqwUSyLKR8y8KFvrTvx6dUMplyN18s	\N	5	eur	PENDING	EVENT_REGISTRATION	cm9gud21m0000l70420ze0y7v	cm97rdoz90001la044naksq9o	\N	2025-04-14 08:59:25.422	2025-04-14 08:59:26.011
cm96dfryo0001x76k8dayd3zj	cs_live_a1veZvciqz17vOcwN2egkikVgUT5QPNX5p0OVjTlpgqMDILpVdXjXYmFSG	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-07 01:06:59.279	2025-04-08 01:07:00.572
cm96dg0gk0003x76k1jph16in	cs_live_a1VZuh7tmMbGTXGxkaxpqZ7JdPxjJv6eMGqGlaanOLnO1BgLpQ7Ddd4riQ	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-07 01:07:10.292	2025-04-08 01:07:11.549
cm96dg7kp0005x76k28qxojb0	cs_live_a1mBQ7YlIjDP4PSqP88CDprXFP4WHagfws1CuyuWhsqmA2qvb3THZBwFAB	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-07 01:07:19.513	2025-04-08 01:07:19.979
cm96dupg70003l704x4f880mp	cs_live_a13XsftHfabxsTBo2fr9TtO98lLBGc6Owql7S2hePvOm5pARYjVJ7lxKAN	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-07 01:18:35.863	2025-04-08 01:18:37.714
cm9c7jfe20001l804egrti7ei	cs_live_a12CU1pxApHIrzf8xHAcrhIaDk8ev0DXz3qFAkWwnQeXd9EQgfiwJ5BdQi	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-11 03:08:28.97	2025-04-11 03:08:28.97
cm9c7ji8g0003l804i2qe4qg7	cs_live_a1DjOKnzxyRMwMxsME7VqczF8t2w8xstdGwKFBS5kI7Q4pnJEBakXwuHoU	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-11 03:08:32.656	2025-04-11 03:08:32.656
cm97ryjft0001jr04sns2q2at	cs_live_a1xM7Hj4GyuLYp05FXl2YL5tlBlpvQDDlEGuassQ25ql8eNQRstKFko5oZ	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm97ry7cd0000lb04tlxrkl0n	cm97rdoz90001la044naksq9o	\N	2025-04-08 00:41:15.497	2025-04-09 00:41:16.782
cm98rikx80001jo0423ti0xlp	cs_live_a1L0TAA1dpCpclWMcIcIND1hVfuP6qAM0zpIs8HE0LAFWkErnh1xlPLDTq	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	cm97rdoz90001la044naksq9o	\N	2025-04-08 17:16:37.1	2025-04-09 17:16:40.271
cm9b0cy6o0001jm041c71e5tt	cs_live_a1mAdBhrDTALLuGJYrJMnM6E4geifLIm3C2RZX5wSYGqmIzduVh4QRxKK4	\N	5	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm97rdoz90001la044naksq9o	\N	2025-04-10 06:59:43.249	2025-04-10 06:59:43.83
cm9b5i7qh0001ie04w9yip19e	cs_live_a1L2ca6JQS7fwVR1iD6mvN8hM9Rz4JKAfiFI2NbeAuNQpaRW2yVOMKACEo	\N	5	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm97rdoz90001la044naksq9o	\N	2025-04-10 09:23:46.985	2025-04-10 09:23:47.519
cm9b85djo0001l804i41dtskk	cs_live_a1MzPQ7Z4JI9I1ZBKnrDC3073fuTi3iNB76qeroXlzkujQexLZQSyDwRtT	\N	5	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm97rdoz90001la044naksq9o	\N	2025-04-10 10:37:46.836	2025-04-10 10:37:47.415
cm9b873nu0003l8048p99ayfh	cs_live_a1FBu3FcS63ig2qDLHWUUqcl96mCxMpzGMnKoQdE8PesJ6TRdFzI4mQczw	\N	5	eur	PENDING	TEAM_APPLICATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-10 10:39:07.338	2025-04-10 10:39:07.338
cm9blanlt0001jv043qn7q9vp	cs_live_a1NWrKt90fDkHmR8s21qjPrEemK5yrDoqAzIMC2cAPpZyav1uuABHTNzWQ	\N	5	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm97rdoz90001la044naksq9o	\N	2025-04-10 16:45:48.161	2025-04-10 16:45:48.766
cm9bslp770001l704n4xzgb4n	cs_live_a1Aan3IHkWmhsvcQ5eWZG8qpYLKK794nAEf7OXXZGF9iWXZ7m9q4x4h1wE	pi_3RCRQpGbMSNZDc2q0tDri1q8	1	eur	PAID	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-10 20:10:20.755	2025-04-10 21:11:17.567
cm9fs101u0001kt047z5u76n2	cs_live_a1lcthlTF0kNs1Z5baaJpLjdbmi1EEnRMLhsdETwpbnNTHY6i6CsQGqEak	pi_3RDS86GbMSNZDc2q1m4LMQqO	5	eur	PAID	EVENT_REGISTRATION	cm9frzmyv0000l504vfcsbvh7	cm97rdoz90001la044naksq9o	\N	2025-04-13 15:05:19.744	2025-04-13 15:07:32.755
cm9g0xk480001la04kwsphcc2	cs_live_a1qkrX7asB280jfPoECmCmmQf7ofYxm8ZGeUrYoZbfjp1S8s9pA5LVHodU	pi_3RDW0DGbMSNZDc2q14DPpDQ5	5	eur	PAID	EVENT_REGISTRATION	cm9dv9xxu0000l8043y5x2sxh	cm97rdoz90001la044naksq9o	\N	2025-04-13 19:14:35.672	2025-04-13 19:15:40.521
cm9guthto0007l704ds9s3r0f	cs_live_a1erPWjhpqRDG9vP9cbwJLUU2sr1lFfZB20aVk6H8tG2rpO8NR25h6YS96	pi_3RDj3pGbMSNZDc2q0tEi2Ik6	5	eur	PAID	EVENT_REGISTRATION	cm9gut1t30006js04bu1agj6b	cm97rdoz90001la044naksq9o	\N	2025-04-14 09:11:14.556	2025-04-14 09:12:15.556
cm9h1xglj0001js045gi0f3xh	cs_live_a1Yvyxd5AOFKLZSxWET6HbsjW0DNkDBrjAI0QI4gMDWFGN86NowFUSu7Jj	\N	5	eur	PENDING	EVENT_REGISTRATION	cm9h1whbk0000jx04ykcx2pzq	cm97rdoz90001la044naksq9o	\N	2025-04-14 12:30:16.904	2025-04-14 12:30:17.506
cm9h282am0001le04xdnsi9l3	cs_live_a1rkrUHj4RKSuBrBQQEIHReuQwEq0Jdaw51EfbVhOCL0FUJhMHhPB67hPC	pi_3RDmImGbMSNZDc2q1B8NZY3R	5	eur	PAID	EVENT_REGISTRATION	cm9h277dr0000jr047t451nuw	cm97rdoz90001la044naksq9o	\N	2025-04-14 12:38:31.58	2025-04-14 12:40:54.935
cm9h37r200001ld04wubjitgl	cs_live_a15V0Y7j8Q1r4obYUJItnm8aExXtyH7td1XvtGIao5qSoFnuYmhvmsHqkT	\N	5	eur	PENDING	EVENT_REGISTRATION	cm9h36o890000l504ew6jhpak	cm97rdoz90001la044naksq9o	\N	2025-04-14 13:06:16.632	2025-04-14 13:06:17.192
cm9h47pei0003ih048i6qv25w	cs_live_a1HzH5m7tjiUW4vF8RweZcmBLb8Gh8qxWGxTWCK3IHOmnPPOmG0L6oyol5	\N	5	eur	PENDING	EVENT_REGISTRATION	cm9h474mu0006l504evikx7vn	cm97rdoz90001la044naksq9o	\N	2025-04-14 13:34:14.106	2025-04-14 13:34:14.673
cm9h524pb0003jy04v520hwij	cs_live_a1a9Vfqt7wAKVND8b93sgAd8qQt25RNMqGrk1CFcK8PrENn4VgwlqmDtv1	\N	5	eur	PENDING	EVENT_REGISTRATION	cm9h519bs0000jy04o3sxtjsh	cm97rdoz90001la044naksq9o	\N	2025-04-14 13:57:53.615	2025-04-14 13:57:54.164
cm9h82u890001l70494ewymp0	cs_live_a1C1gIoVCIn1hAzoTgi6y4EBgd8xaC7m5W6MnJFQSMy8VwONf4n5j345qU	pi_3RDospGbMSNZDc2q1fxNkOfj	5	eur	PAID	EVENT_REGISTRATION	cm9h25onw0006js04ggl27m68	cm97rdoz90001la044naksq9o	\N	2025-04-14 15:22:25.545	2025-04-14 15:25:18.166
cm9ha83nt0001kv04vpwv2hkb	cs_live_a1tSxVQD2tmXHNKNGdppTunkVfDLIpS5epp6GFLBUgkshQtyDZ3UgIwZgo	pi_3RDpnqGbMSNZDc2q0xtEpZPd	5	eur	PAID	EVENT_REGISTRATION	cm9h36o890000l504ew6jhpak	cm97rdoz90001la044naksq9o	\N	2025-04-14 16:22:30.281	2025-04-14 16:24:12.941
cm96dvdz30001kz04qpsftd49	cs_live_a1zEMim4j82icApNT5cEYfsEJOlNw109PkbNLLlchnw7YIru7oTmGM453l	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-07 01:19:07.647	2025-04-08 01:19:08.083
cm96dwkyu0005kz04gjbfcsi5	cs_live_a1KwxGCN3rYSbxLhjGgRomixiLpylWpyRv8OGlonZ4mKnbjIbWuPem9AYc	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-07 01:20:03.366	2025-04-08 01:20:04.733
cm96e1edr0001x7nzwujwoifa	cs_live_a1HBnBtAdpMaF1z25vwjw39aTRcczwZHiNXwBuX4n2fJckKmRlfudOi0dk	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-07 01:23:48.11	2025-04-08 01:23:49.298
cm96e2j230003x7nzrl8d2wls	cs_live_a1Z0p8oumf6jqth6JtwSzAgB8prkvWEPLGtfBsmNPTT37XP1STMAid4Huj	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 01:24:40.827	2025-04-08 01:24:42.288
cm96e6re90001x7l276735tv4	cs_live_a1RRFwh2i8VWc05UrIRqlssaGPWQ26iCpKN8pMUdM7fAkIi65XxrAbo3tC	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 01:27:58.256	2025-04-08 01:27:58.82
cm96e7n8n0007kz04qx8heom2	cs_live_a1jp0Jj5fl19EMsYqgq9uUO2ivs29y32xdNEvSibmZpE3jDBi0kGhbHiFf	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-07 01:28:39.527	2025-04-08 01:28:40.682
cm96e7rkk0007l7042c0ad15e	cs_live_a1WcrkxdeCzg0MvnCWizRbr6yP8IacSWRFQd9OaQIOVsJEe0NoVjN89YAG	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-07 01:28:45.14	2025-04-08 01:28:45.633
cm96e9zeg0009l704eej2oe7x	cs_live_a10ZezYtuY7tK7rkPP3Ojddid5UKx1YZ92WhKoujkNnSfu4PdzfsFYBYeN	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-07 01:30:28.6	2025-04-08 01:30:28.709
cm96ea2u60003x7l20xk2n17v	cs_live_a1wTnejQAvvMenx9UBPGP8Z6kgGoTwHTp6idaFzgFjWKzDLavtnO89CId5	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 01:30:33.054	2025-04-08 01:30:34.518
cm96eqqep000bx7eievbfztoz	cs_live_a1J20tJ9UEaaqewzz9mnhWvq9ugqX6sq2H1LpdVmMOmyuUfo0aitaRA6Zv	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96eat2a0004x7l2940yy0mx	\N	\N	2025-04-07 01:43:30.097	2025-04-08 01:43:30.99
cm96erzzf000dx7eigd2fysvr	cs_live_a1TOQUYQHG2v62AjF1xZZSt2sZqkz4RFgcFiVQsdivGW3i64bJfvlsw7D9	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96eat2a0004x7l2940yy0mx	\N	\N	2025-04-07 01:44:29.163	2025-04-08 01:44:30.089
cm96hf2jo0001x7wh4ay35l1n	cs_live_a1ZCz84dWXYD6a7zBg2WiaMqC7kiu7fxqSgriteFDMFyayefGSfWbMur3Q	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 02:58:24.803	2025-04-08 02:58:26.08
cm97cpd6e0001kz04cs3fgn2g	cs_live_a10Chb7pD9l2yaNc9dUY5nj38VCrH801Htgni7030XvAs5UmBNzQ4aoaiI	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 17:34:13.238	2025-04-08 17:34:13.495
cm97cyy5z0001l804zc7teayj	cs_live_a1AuhYRwY8U9NMXwwuaCQFckjQssyyRLrnzLqQJLf1H1pNWbMFeluTSFpa	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 17:41:40.344	2025-04-08 17:41:42.049
cm97k7z4z0001x78q51m3pn2f	cs_live_a1qd7evq3vg4U6gIZ9vfLZP5TOBPpLofmNU4FKvMyyJYI4oXnFYIPbwGA4	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-07 21:04:38.818	2025-04-08 21:04:43.34
6ad31b72-634a-42c8-bf20-f7cd861d244b	cs_live_a1Owy1LLdPumudFiuoYMw8RXwTNGenwVeu2XEldCwR4BNwhSmmzJkrE1g0	\N	5	eur	EXPIRED	TEAM_APPLICATION	cm965oiij0000l80457zo1gv1	\N	cm97lfexu0003jx042ruz27os	2025-04-07 21:38:26.064	2025-04-08 21:38:27.213
cm97ly3l90001x7xbst8tv6qz	cs_live_a1DsglNZK0DwfOYdGNPeEutcD9VqCO7C0pWy1AYNz1hyRu6SpZZcRhmP1A	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 21:52:57.26	2025-04-08 21:52:59.923
cm97ow17z0009x7xbcdax7zm1	cs_live_a10Dcx62LdNE86cnXW5XtjlZDjBf2hTe5pE8xYqkBsgm6s6rMcrHhS0X0T	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 23:15:19.727	2025-04-08 23:15:21.597
cm97sa0aj0001l404esizxoa8	cs_live_a1eyrGEq1Vt56RBkEJ7DIdGOUWlxfHGV3OGH2H4QCJX0dI5E5AqpC2rtgr	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm97rdoz90001la044naksq9o	\N	2025-04-08 00:50:10.555	2025-04-09 00:50:10.992
cm9b6pat30001l504bcztbl0c	cs_live_a1uZms96RUnap90Xx3FVGSsrQVbxlVPX6EKSEdPray8UYrMh4VjdJ7L9MI	pi_3RCHrXGbMSNZDc2q02UDCaqp	5	eur	PAID	EVENT_REGISTRATION	cm9b6oelr0000ih04a9m1e0nq	cm97rdoz90001la044naksq9o	\N	2025-04-10 09:57:17.175	2025-04-11 04:41:08.191
cm9bsnxb80005jw044pi30u36	cs_live_a1nMClTIovF5Fu2pReNUnxko5SB0TSQzBL659huH8DQZSkSYh9xkUymBnU	\N	1	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-10 20:12:04.58	2025-04-10 20:12:05.181
cm96hkbut0003x7whlnm1y6a0	cs_live_a1Ice2jiVn9NVGssbQv142j5YbI3TySyCzPPgp7D3R8LF3mDJuciZZslo8	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 03:02:30.148	2025-04-08 03:02:30.787
cm96jqk8b0001jt04bcd9t0g6	cs_live_a1wXGgJBxlLkqrxXIu05dkMWcew0j3lRnXomVrqrEuD27rrjnFEMujJV74	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96ehicc0002lf04chp34rqo	\N	\N	2025-04-07 04:03:20.171	2025-04-08 04:03:23.109
cm975oqwd0001x7scxlu9bv53	cs_live_a1yZIzFvdI3vk7zQewlOxgxVe3GDUTpR9jDHnyJ0mtAsLhJO4lQnorp7yX	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-07 14:17:47.052	2025-04-08 14:17:49.485
cm9790t600001jl04xrsj49m4	cs_live_a1AhN7xJKbcOUyl8tbOumB6gJ7jVwCef9kSD6c7pJ52TPzlrD0mIq19sCe	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96ehicc0002lf04chp34rqo	\N	\N	2025-04-07 15:51:08.712	2025-04-08 15:51:11.083
cm97buf0i0001l40496swwqv6	cs_live_a18n4gzjmsiP3c9GTeRmV7x1mA2Xayb09NdtGrXonononEXhgn50SjAW6e	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-07 17:10:09.283	2025-04-08 17:10:11.538
cm97cgrp50001lh04oxmbn5oi	cs_live_a1miG6x3Bz906cHpuPvgioZOUCXe3Z8xWFsPTi4NKSX9JWevUlb8lzLIKL	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 17:27:32.153	2025-04-08 17:27:32.801
cm98smaut0001x7uko8sd5uks	cs_live_a1XlTccM9RGALhnE6exYth6EjcNUDn1rEzkhoSjmduYIOpyBM5XpSb9ZjU	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	cm97rdoz90001la044naksq9o	\N	2025-04-08 17:47:30.292	2025-04-09 17:47:33.746
cm9b0l1dj0001jp046zr4v17l	cs_live_a1F1yT5WSJdT72yK36g0nmDzSFiMmVaD5pZ0Xyj1mG8JMpsdtzHh0GO6lV	\N	5	eur	PENDING	EVENT_REGISTRATION	cm965tc270008l804yhpn1hom	cm97rdoz90001la044naksq9o	\N	2025-04-10 07:06:00.631	2025-04-10 07:06:01.184
cm9b89vwf0001jx042i4qx9gq	cs_live_a1fu6kLBgxzhNzKbebitQPObDhtZB3CbaGvCb3d2y1SW6OzFcteXt8sXSD	\N	5	eur	PENDING	TEAM_APPLICATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-10 10:41:17.248	2025-04-10 10:41:17.248
cm9blqbjs0001jj043u6pan6s	cs_live_a1XiwFvoAIH3K8ozLYW8hIa3pLRpnZvQfCC30rBxs0ZD70qJ4Mpm6J0qQi	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-10 16:57:59.032	2025-04-10 16:57:59.032
cm96h4gqp0005x72rsrex1ey0	cs_live_a1hlNqqeJ8ztf1amstooBmnwVBoLU2surJDIfETgBDKn0e1ljF2XbLA9Dp	\N	4.88	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 02:50:09.985	2025-04-08 02:50:11.306
cm96etj66000hx7eise9dgpjb	cs_live_a1skPvG6sYHhrqTXFWp1926ekxYUTcjiIWMgxBtuANQmkNEZ27DDBSDrD8	\N	4.88	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 01:45:40.685	2025-04-08 01:45:40.701
cm96h2omn0001x72rkavd2vsa	cs_live_a1HdwRwHQb2WFABFl0pHZZFoneIjcmw6SuvpzMgDklqAiKp5h5g9BbvfPq	\N	4.88	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 02:48:46.894	2025-04-08 02:48:48.03
cm96h2rsu0003x72ryhlsyrc7	cs_live_a1fXHfajvvlUMt0cq9T0IRK9FxMGtwJFogK4mZJA2wbUOR9cRJlrBkqh3k	\N	4.88	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 02:48:51.006	2025-04-08 02:48:51.925
cm9d40kf20003kw04mel5x1qm	cs_live_a1hfv4tZZx50QkBCuWezUueRbGFY979R1gxsypYZ9WiqapZzrnpK3Ricej	\N	5	eur	PENDING	EVENT_REGISTRATION	cm9d3yi8s0000kw046kvq9xgn	cm97rdoz90001la044naksq9o	\N	2025-04-11 18:17:36.35	2025-04-11 18:17:36.981
cm9fsh15i0003ky04kz7r0loq	cs_live_a1rgBlrLssk67yemIcWJ6nnTxA3vcNMmv72fRRbTKghXNmxjTCBgWKxJFE	pi_3RDSK9GbMSNZDc2q11vmHa4D	5	eur	PAID	EVENT_REGISTRATION	cm9fsgmhl0000ky04zncp2xx0	cm97rdoz90001la044naksq9o	\N	2025-04-13 15:17:47.671	2025-04-13 15:19:59.43
cm9g16q5l0003lg04eqxzgect	cs_live_a11JvSnuAIsJptzlEBuxYGFgLcth7GjUYol9SQhSzj70Nk5rTXy9OxwLGg	pi_3RDW6sGbMSNZDc2q1LlLqoDI	5	eur	PAID	EVENT_REGISTRATION	cm9g151an0000lg04ai6r9eok	cm97rdoz90001la044naksq9o	\N	2025-04-13 19:21:43.401	2025-04-13 19:23:39.692
cm96eb7i90007x7l2nolt920i	cs_live_a1d15yUIm2Q3mSFr34XflmRGuDLygxQe2L9iW7fObCx8dDa85whlldaGQe	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96eat2a0004x7l2940yy0mx	\N	\N	2025-04-07 01:31:25.762	2025-04-08 01:31:26.67
cm96egecb0001lf0400ioesrh	cs_live_a1UpPfZrMY3q0x9kt6hRN7nzuJXDk1jj4V6omNxQGPUqKRtnAlNSNqMBgN	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-07 01:35:27.899	2025-04-08 01:35:29.226
cm96ei41j0005lf04ppe5e1qq	cs_live_a169RfslIKCbhLSj4bYombv2M5fQmdt4uzw5jdfvzNDzP7tPx7KLRZUuGY	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96ehicc0002lf04chp34rqo	\N	\N	2025-04-07 01:36:47.864	2025-04-08 01:36:49.009
cm96ejm330001l704d66xs445	cs_live_a1Rr0j1pBNH5qekSyhbnL3zhJqpNd07W35on4bRBjYmo5GwQ4WP1UTHKA9	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96ehicc0002lf04chp34rqo	\N	\N	2025-04-07 01:37:57.903	2025-04-08 01:37:58.998
cm96ejtlj0009lf04wit0t7si	cs_live_a1K2WQyre7BZt9esGBTJ9N5SJ2LujaIMyEqJzvSZHOYAr0qRvXDdspCaiY	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96ehicc0002lf04chp34rqo	\N	\N	2025-04-07 01:38:07.639	2025-04-08 01:38:07.426
cm96ek8go000blf04kwuxcga1	cs_live_a1wHhbNhIsATknVMvRr0YhCXgWBrWdM5vBPT6FHalRKJ6d9sRNhxB7zB2l	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96ehicc0002lf04chp34rqo	\N	\N	2025-04-07 01:38:26.905	2025-04-08 01:38:27.448
cm976tqz20001x771n3m1gzxj	cs_live_a1VUuDHhtTLjbhEA23P7PUSlaCJsVl5kuqtK4aqMVmRUiCerbf9OK6gZKl	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-07 14:49:40.044	2025-04-08 14:49:40.919
cm960guxa0005x7p17rmbz35s	cs_live_a1qKAaBuX8z0QUSgUwcPWirvUsX0PFVucByjfGJwjLqn1ssdDQsvjd3XBs	\N	10	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-06 19:03:54.766	2025-04-07 19:03:55.379
cm96em2x20003l70490bn3myg	cs_live_a1vdebWivdLjXsjdcNyrqkPIRhONgmm9eS7fxi4V8Qqxx1fXbSvsCycWUy	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96ehicc0002lf04chp34rqo	\N	\N	2025-04-07 01:39:53.031	2025-04-08 01:39:53.88
cm96eo3v60001x7eibkot3lwe	cs_live_a1KVaYHRovB5USpgcdBEaAbIRvcxJ1PGfIKdjsIy9fMvw3Wh95fzk6PMiz	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96eat2a0004x7l2940yy0mx	\N	\N	2025-04-07 01:41:27.569	2025-04-08 01:41:28.426
cm96eo9kl0003x7eiun7eqd80	cs_live_a17UqZe5CK3oT1DXBHZQFjjgngsLpfUgcKgm603qK1V09brco3YtR7hGH3	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96eat2a0004x7l2940yy0mx	\N	\N	2025-04-07 01:41:34.966	2025-04-08 01:41:36.23
cm96eoox30005x7ei3ugfgpv0	cs_live_a1E1nYLHPFInKrY0l98kCF6slb5rweb4JhwjiGd6UrsVjeVjERxdq2Bp9B	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96eat2a0004x7l2940yy0mx	\N	\N	2025-04-07 01:41:54.855	2025-04-08 01:41:55.584
cm97anl8p0001x7byquevd4un	cs_live_a1trjQf4lX9FVhmdJxdFE8rzVrWWGun1hieEl8Sjj9cZ0tbCW5z0FIG8P1	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-07 16:36:51.144	2025-04-08 16:36:52.971
cm97cp2wd0001l504nqzxkb1q	cs_live_a10OPJpqZuKJUp6dxjo40iCmyAKPzv3OcekeulylC8wWq7pfr3FzkNbUJP	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 17:33:59.917	2025-04-08 17:34:01.078
cm994zf9o0003l804mzj2vmqy	cs_live_a1VCCqfv1x75QmKOaMgsE8OBbVKVgnB2yhooKsqhigwYBTJHpc5dLjNvzX	\N	5	eur	PENDING	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	cm97rdoz90001la044naksq9o	\N	2025-04-08 23:33:37.932	2025-04-08 23:33:38.438
cm97scck50003lb04usl0tm66	cs_live_a1OjbmgGjXSxn69SThazxua8a6Vm3HurBXg4k0101AYMUErqPA3rUr4f2c	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	cm97rdoz90001la044naksq9o	\N	2025-04-08 00:51:59.765	2025-04-09 00:52:01.133
cm9b0mdhr0001l404tuxyecw0	cs_live_a1znvfD9joSeMUETHXocXqKFUKdxvcYLUZ0t04vnsvZy8D7kw2fdvcQVxR	\N	5	eur	PENDING	EVENT_REGISTRATION	cm965tc270008l804yhpn1hom	cm97rdoz90001la044naksq9o	\N	2025-04-10 07:07:02.991	2025-04-10 07:07:03.573
cm97cgczu0003l804jwfwqk08	88a75e42-2f09-449f-8db7-d1f4ba0abcaf	\N	0.1	eur	PENDING	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 17:27:13.098	2025-04-07 17:27:13.098
cm97oieic0003x7xbxnn6vxwf	65bb054a-2b08-4662-9754-366f3051160a	\N	0.1	eur	PENDING	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 23:04:43.764	2025-04-07 23:04:43.764
cm9b6pkb30005l504lz78eprj	cs_live_a1KP0AQyqDbplk6LTY3sBaBfpELxXi40Dr3KnMoh0vFi157KnDG1v1QO6D	\N	5	eur	PENDING	TEAM_APPLICATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-10 09:57:29.488	2025-04-10 09:57:29.488
cm97cprec0003l504uo4ohwhi	cs_live_a1ApG74QZTHoJ4hgZyokUrKpPmHDPluEyC9YcQ0Gh6VqzZhrILcy0j3Qf7	pi_3RBJZwGbMSNZDc2q07qafNo5	1	eur	CANCELLED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 17:34:31.669	2025-04-07 23:15:16.534
cm9b6pma70007l504sm2qd9ki	cs_live_a1IV2We2an5nutPoNG5PU8Zr9zKzYeKtdVhfdigqZ1VW3C4eIJFeORm1ky	\N	5	eur	PENDING	TEAM_APPLICATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-10 09:57:32.045	2025-04-10 09:57:32.045
cm96htaq60005x7whkgb0nmqx	cs_live_a1G4oLjRqXxb1LfhLFw468xxD0FbBUIPdxZI5uaD2ROjnAoW9ArGX1sHXP	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 03:09:28.589	2025-04-08 03:09:30.352
cm96htpfl0007x7why1173b8l	cs_live_a1Rz79shwUs5KiJcPYLDqvNXjChMPNkl1mjAs9yHOWanonAeVrqR1vL1ru	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 03:09:47.649	2025-04-08 03:09:48.789
cm96jqsrs0001la04538t1lf5	cs_live_a19oVIYAnsHWoLq1gy4ZeMemzM4TNHNR6rVzKnw8m9HOaeYA3q3f3uHWxP	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96ehicc0002lf04chp34rqo	\N	\N	2025-04-07 04:03:31.241	2025-04-08 04:03:31.868
cm97lhml20001jm04qc7uzz5o	cs_live_a1KW4JOSxySXZNOkTnWOcfrKFSqHc27UxXWAx2Ilk55NM6EzBV0oS8DDqB	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm965oiij0000l80457zo1gv1	\N	\N	2025-04-07 21:40:08.727	2025-04-08 21:40:11.24
cm97oih8d0005x7xbuecvqncj	cs_live_a1QRGlqG706mU81bL2Pvv9lLcwBXmE0z4fqvpzH38HODeZnp7e8UsN37RN	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 23:04:47.293	2025-04-08 23:04:48.626
cm97p2rni000bx7xbg7zo63a0	cs_live_a1NhucS5k5FVdcgqluaIXSBGLaa0UYaG8KVnQtd3Rma9cLpy9jkKS4rpUK	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 23:20:33.918	2025-04-08 23:20:35.645
cm994x3zm0001l804cmni6qya	cs_live_a1FtFSKgmwM3dQzwwZrAdEVMS4DmDRcNVtXWpQ0aFoIT1Z47fRcqFBJQJk	\N	5	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm97rdoz90001la044naksq9o	\N	2025-04-08 23:31:50.002	2025-04-08 23:31:50.582
cm9b8x2l50001le04fpb9k02h	cs_live_a1yJD42iOeLOQlPu0EA6J86HQu9XchUMPa9QGZPUjeQh3mchWP0R9zJFPx	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-10 10:59:19.001	2025-04-10 10:59:19.001
cm96euica000lx7eizwqxhi9i	cs_live_a1vhqKpfqOSxSrEx3qobm3dm4XFSRHrajcgJtkRxzEWvsm0QMe0yqanVnL	\N	4.88	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 01:46:26.266	2025-04-08 01:46:26.524
cm96exz7o000nx7eiat9y596b	cs_live_a1AAfgI7cEn2RxjDXNwNcyQ3gvlrZw45D7WvSEmymRxNcRtvDbOP1diydm	\N	4.88	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 01:49:08.099	2025-04-08 01:49:08.605
cm96eybzs000px7eit93z2ef1	cs_live_a14Cfo0n1Iqi3TYWi271IvoAvFTliTccELIbo8rXHAFey2qm4tpzTDndTg	\N	4.88	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 01:49:24.664	2025-04-08 01:49:25.689
cm96h6ose0001lb04o9u8k6q6	cs_live_a1K5RvEvnphuYZC8I7e9GyVOPnByrHUrVPxPOxJp0mQ9f4AuiXuonQP0jL	\N	4.88	eur	EXPIRED	EVENT_REGISTRATION	cm96ehicc0002lf04chp34rqo	\N	\N	2025-04-07 02:51:53.726	2025-04-08 02:51:55.737
cm9deta3m0005jx045tp2yz83	cs_live_a1tEqftnAvWwkHH4Zw8eYnIJe9BepDAA2ezd6H1e6buro6sNpkF2Ehqv9F	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm9desqm60002jx04gg0hr4q5	\N	\N	2025-04-11 23:19:52.162	2025-04-11 23:19:52.162
cm9bra1jb0001ju04nqiapfmq	cs_live_a1ZTQKStpcZusghDLpiJNHJxAiBxiMzGYRWa6zD0wyl7jpOWxY6ESWhb33	pi_3RCQr8GbMSNZDc2q0kcNiKIq	5	eur	PAID	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	cm97rdoz90001la044naksq9o	\N	2025-04-10 19:33:17.255	2025-04-11 00:37:30.647
cm9bte65m0001js044vmas07y	cs_live_a13AeNLHdFJpGXzldxGRrEVLHYDYdHTAHEY73d4zJ8b7YIMCte1HnFMwAT	pi_3RCRmKGbMSNZDc2q0eqdeebg	1	eur	PAID	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-10 20:32:29.098	2025-04-10 21:33:05.878
cm9detdjk0007jx045449rufd	cs_live_a1szDAMkaUrIJFBjsJkPJCSKR2XWllpSSK2UBlTgVnV44twaHXiQWta3hR	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm9desqm60002jx04gg0hr4q5	\N	\N	2025-04-11 23:19:56.625	2025-04-11 23:19:56.625
cm9fyc5750001jp04jsavox6f	cs_live_a1RdXMoNJxlCtmch4MFUSDDlKjR1IPjiKkf0L0KzmiMg1cVfOSYm6iBRXV	\N	5	eur	PENDING	EVENT_REGISTRATION	cm9fybnce0000jr04adcegjwu	cm97rdoz90001la044naksq9o	\N	2025-04-13 18:01:57.329	2025-04-13 18:01:57.911
cm9guk88h0003l704p8vvcots	cs_live_a1nSAQ3k4YyM4COXYpnUMHBKw34JGg4ytRC17TVQMXcdIbqxUYfd6l56Ug	pi_3RDix8GbMSNZDc2q0y3RO3cK	5	eur	PAID	EVENT_REGISTRATION	cm9gujshz0004js04lqnhp2i5	cm97rdoz90001la044naksq9o	\N	2025-04-14 09:04:02.225	2025-04-14 09:05:25.494
cm9mxy4rq0001l704ewsxun0e	cs_live_a1wDiliToCluVBxzrtAhz3kEao5wReFSAF6Z1k6x1RumJH6nUzfdPcTEpv	\N	100	eur	PENDING	EVENT_REGISTRATION	cm9i1z6hn0000l804lq0g1n15	cm9i37g9i0000fqla41p0whcf	\N	2025-04-18 15:25:26.822	2025-04-18 15:25:27.38
cm96eowra0007x7ei5qppvup2	cs_live_a11iBBkME6LxBmZhq04D13JcAYQ5kHBeuzi8XgtdqET21NOOrW47CARg3v	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96eat2a0004x7l2940yy0mx	\N	\N	2025-04-07 01:42:05.014	2025-04-08 01:42:06.326
cm96eptot0009x7ei3167f97r	cs_live_a1HAJU1XJORGQnwk9Aj05w0xJijYLXVD74V6ejR1jLki0H9kUxryHzCYfn	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm96eat2a0004x7l2940yy0mx	\N	\N	2025-04-07 01:42:47.694	2025-04-08 01:42:48.518
cm97pztbn0001jp049b68hm0e	cs_live_a1bP2PwXHZkZS9nC9mxJlKo5lzqcRgGwukVmLKHnTw7T3VE72A6JXCJ6vL	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-07 23:46:15.731	2025-04-08 23:46:17.851
cm97q1p0a0005jp04rwfw11ub	cs_live_a1SqlcdnF1XJOv1EUKQ8EyDdMCN5w6IN1zzVVrFFl4ZniL3t43L4Db0vi3	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-07 23:47:43.45	2025-04-08 23:47:44.553
cm97qolml0001js04n37hnabx	cs_live_a1ZxbGJwRz3sB7QXq8QBHLCC6oCidZrZBGLSCmOXihNRj2e7rqK98k3tIT	\N	1	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-08 00:05:32.157	2025-04-09 00:05:33.101
cm97sjiuu0001l704yhs0e635	cs_live_a1Equ4gka1Q5C3mmhBF20LSurCwF2jtagSyPMdb1Ej5mryWZKGsuTOoFGQ	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm97rdoz90001la044naksq9o	\N	2025-04-08 00:57:34.519	2025-04-09 00:57:35.952
cm9agv79c0001jv04pwoawqgc	cs_live_a1GjWnD3Rp73LbNRa8mXCNPVgUimAaUGzfFLOgY7hCrZ96zspw8zR2LDRc	\N	5	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm97rdoz90001la044naksq9o	\N	2025-04-09 21:54:02.496	2025-04-09 21:54:03.378
84e9738b-14b8-4d94-a619-2613b52d66c4	cs_live_a1tHV3foGTMmReICscRvCOM4P9po2Vok01Reb0cy00vXwhFxnnS22Jqn7c	\N	5	eur	PENDING	TEAM_APPLICATION	cm965tc270008l804yhpn1hom	\N	cm9b0vm770005jp04nwz62fz2	2025-04-10 07:14:14.711	2025-04-10 07:14:14.711
cm9b77jl50001l804ql5ldp38	cs_live_a1Jb2RBUqZ6427BqcXZvbWwsrxEl5rfPi6Umob32zaBEo09c26RUQxeH5n	\N	5	eur	PENDING	TEAM_APPLICATION	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-10 10:11:28.36	2025-04-10 10:11:28.36
cm9brk6ez0001l40400e4n55w	cs_live_a16pw1ciU0v3arOLgIsi8QQRwpfkD453pLxCOYPIotVNPchUZ2yWURkyVF	\N	5	eur	PENDING	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	cm97rdoz90001la044naksq9o	\N	2025-04-10 19:41:10.139	2025-04-10 19:41:10.692
cm9bu0rhq0001jj04nlftyy92	cs_live_a18kY4m15rvyINzgb0I7uXUpytJGJ1aDu46g1gRqqzcSth30vZ6m9zByfp	pi_3RCS39GbMSNZDc2q0rEcxP5V	1	eur	PAID	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	\N	\N	2025-04-10 20:50:03.182	2025-04-10 20:50:38.622
cm9dvcby00001la04re6jk685	cs_live_a1vX79ZYpXURunTLQU07hIenR7Qm6e62sJ9Ja40wPp2FGFZdkBdfqtsclr	\N	5	eur	PENDING	EVENT_REGISTRATION	cm9dv9xxu0000l8043y5x2sxh	cm97rdoz90001la044naksq9o	\N	2025-04-12 07:02:34.873	2025-04-12 07:02:35.462
cm9g52mr80001jo04f9zuybmb	cs_live_a1Hww5TfPSZ25zovgh9SnQJWoDfSG9CjU5YSfBpPqJO0d8Q7v7lxBoxqcG	\N	5	eur	PENDING	EVENT_REGISTRATION	cm9ec9vtt0000ky049r03ka7i	cm97rdoz90001la044naksq9o	\N	2025-04-13 21:10:30.837	2025-04-13 21:10:31.412
cm9ga8zex0001l604al37fhq0	cs_live_a1CyuQwKKer7vW0cbAFhlURnoA0tVKVb1yxUZCu3TVJW9fUQ6WiDNbYHYn	pi_3RDa4rGbMSNZDc2q0X2jBdH5	5	eur	PAID	EVENT_REGISTRATION	cm97ry7cd0000lb04tlxrkl0n	cm97rdoz90001la044naksq9o	\N	2025-04-13 23:35:25.257	2025-04-13 23:36:43.95
cm9h24cp80005js04ws9ala2r	cs_live_a11MFe9XCfWi2UidTouipz07AHErKfMA07b5LfrskZhLuCK4c7VI8WlRAM	pi_3RDmFpGbMSNZDc2q0upu9c9s	5	eur	PAID	EVENT_REGISTRATION	cm9h1whbk0000jx04ykcx2pzq	cm97rdoz90001la044naksq9o	\N	2025-04-14 12:35:38.445	2025-04-14 12:36:51.467
cm9h314c90001lb04osfh4c82	cs_live_a188T6r3jIjQ41njJieCuR6t6uLsODcgqHLVQjCee38nUztQae4bbT7ONc	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm9d3yi8s0000kw046kvq9xgn	cm97rdoz90001la044naksq9o	\N	2025-04-14 13:01:07.257	2025-04-14 13:06:11.165
cm9h3s02b0001k6044i77hi3y	cs_live_a17zjhMg8wKeykNHsRWkd328WMIW3pknmYgmAQbMn7j2DVipAl6zqp6DCE	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm9h3rd1x0004l504vkvf7p2l	cm97rdoz90001la044naksq9o	\N	2025-04-14 13:22:01.425	2025-04-14 13:31:04.738
cm9h8alfa0005k004q42wl7r4	cs_live_a1s9vz5m943hHTNoMrasz3dJaG2VlFfaDeqS3goiVVYGthHg4KQhkrCT8t	pi_3RDowVGbMSNZDc2q1k4Jlv24	5	eur	PAID	EVENT_REGISTRATION	cm9h8a7uh0002jy04b9imrfly	cm97rdoz90001la044naksq9o	\N	2025-04-14 15:28:27.382	2025-04-14 15:29:06.524
cm9h4nre90007ih0457iar4ft	cs_live_a1RHgmKlh6FWeDDSmXAWKfOEVw64sjPd5vVTsJmNm1bzVptYnb89aW9thl	\N	5	eur	EXPIRED	EVENT_REGISTRATION	cm9h3rd1x0004l504vkvf7p2l	cm97rdoz90001la044naksq9o	\N	2025-04-14 13:46:43.185	2025-04-14 13:53:07.948
cm9h7eo900001k004sb3s46yl	cs_live_a1n4amUOGFezMGt4nUL1pbOHDuwJBaVmCNweh8gC41C5Ntr2RvEJ94dQEr	\N	5	eur	PENDING	EVENT_REGISTRATION	cm9h7cwjc0000jy04mm9ep1l5	cm97rdoz90001la044naksq9o	\N	2025-04-14 15:03:38.053	2025-04-14 15:03:38.619
cm9hbk7rw0001l804eiyscf8x	cs_live_a1Ju4V3b4j2mhPZDEc6C96P05GAXl0xU3vV1w4sttVInvsoGpsdYVDlWHu	pi_3RDqNRGbMSNZDc2q0U3kY0zk	5	eur	PAID	EVENT_REGISTRATION	cm9hbj92w0000i50424n4kprd	cm97rdoz90001la044naksq9o	\N	2025-04-14 16:59:55.1	2025-04-14 17:01:00.13
cm9hcc2xe0001l404jbu3lrrj	cs_live_a1QS5srlbqd543R7LzuA7I9reIb4DDDFukKP9Zn4TZiT9JlOXYzOkc9amS	pi_3RDqieGbMSNZDc2q0yHu02HS	5	eur	PAID	EVENT_REGISTRATION	cm9ec9vtt0000ky049r03ka7i	cm97rdoz90001la044naksq9o	\N	2025-04-14 17:21:35.187	2025-04-14 17:22:54.41
cm9hcwdau0001js04axtkwv50	cs_live_a1kdK1mPaYq8mpEf5MTRN8GBV6svwM1Qb3vUzHJ8DkVA8XyWCTs1cgmmNf	pi_3RDr18GbMSNZDc2q1iuwUhoV	5	eur	PAID	EVENT_REGISTRATION	cm9hc8hgq0002i504ppp3rlq4	cm97rdoz90001la044naksq9o	\N	2025-04-14 17:37:21.75	2025-04-14 17:42:05.106
cm9heom750005kz040nq3e1gz	cs_live_a1sPa1yV9pT6TelxX9DGV7nbeh6qDKstu8sBvHMcxjTlvMM20nuZMfAB1c	pi_3RDrkAGbMSNZDc2q0Ym5CDhG	5	eur	PAID	EVENT_REGISTRATION	cm9hegnay0000kz04d914txrk	cm97rdoz90001la044naksq9o	\N	2025-04-14 18:27:19.266	2025-04-14 18:28:32.483
cm9hg4n0j0001l8045zbu40i2	cs_live_a1wtJwvg8sFFLS50eZ6foYsY4Mt47DhNQMVBOcYOgCrhiEtEvo8kdI0mpT	\N	5	eur	PENDING	EVENT_REGISTRATION	cm9hg3v270000le04x2fmzefa	cm97rdoz90001la044naksq9o	\N	2025-04-14 19:07:46.435	2025-04-14 19:07:46.998
cm9hhltjb0003jy0483bz3pfi	cs_live_a1d9NoNSpEUwnMng9O6qSaPkOVOV3OLPjdbWekFgnXDRKA87JFoUBV1aup	pi_3RDt1CGbMSNZDc2q0pPJQZQL	5	eur	PAID	EVENT_REGISTRATION	cm9hhlb2q0000jy045qi4u2bf	cm97rdoz90001la044naksq9o	\N	2025-04-14 19:49:07.655	2025-04-14 19:50:17.013
cm9hjywz50001ju04527qns4h	cs_live_a13IfhFTELplpv9jVIgvrZQSQt0Ppz77IUPcRLKhxpkRWILh7uvqFTClVs	pi_3RDu4pGbMSNZDc2q1SeZZzCp	5	eur	PAID	EVENT_REGISTRATION	cm9hjy5gq0000lb04wn3gse67	cm97rdoz90001la044naksq9o	\N	2025-04-14 20:55:17.874	2025-04-14 20:58:02.177
cm9hk30if0001l704ork1zjnh	cs_live_a1MirIkY01yklk39q0rNhNk8VQLKw6FNdCFMM7UvTKsoa3rApn6f4brmSb	pi_3RDu5TGbMSNZDc2q1eunnwVi	5	eur	PAID	EVENT_REGISTRATION	cm9hk2khx0004ju04v1mwvo38	cm97rdoz90001la044naksq9o	\N	2025-04-14 20:58:29.079	2025-04-14 20:58:41.937
cm9idzg6e0001jx04ao9xvxc7	cs_live_a17Ljo4MziQL6GwUBM7BsPWsbOwrVQNiyicwd9VFWmpe9gh9P8MEMC75D4	pi_3RE7AeGbMSNZDc2q0hTF7dqg	5	eur	PAID	EVENT_REGISTRATION	cm9h519bs0000jy04o3sxtjsh	cm97rdoz90001la044naksq9o	\N	2025-04-15 10:55:31.238	2025-04-15 10:56:55.603
cm9ilow7k0001l504gvn5qs63	cs_live_a1bd4K2NrrjkNeamOx715Crq0SemDlJeCD01VS1Js11CYpk6ejPDG3vocl	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-15 14:31:15.725	2025-04-15 14:31:15.725
cm9ilpf2a0003l504mx4s09te	cs_live_a1x27sXXYodOV9Gx0ILg1n1Qecou3179l5TuNpKu1C1IaPXkP7KKs1AYk0	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-15 14:31:40.163	2025-04-15 14:31:40.163
cm9ilq6we0005l504uxrbv97k	cs_live_a1a6VH6A75Cso7mag0T10sGGuYXTXWL4kXZwFxVmW59fMsGnOUL0dpO5Ec	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-15 14:32:16.238	2025-04-15 14:32:16.238
cm9ilqek20007l5044x0952wp	cs_live_a1ttPISi9n8zEAxC2YuK0XEBFAJvksUJL9FJ0MFUS0DENtFeMEgcsWjtjL	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-15 14:32:26.162	2025-04-15 14:32:26.162
cm9ilweup0001fq81zfg3087c	cs_live_a1XlqA5HndBWuuKq2hIUOtfV1eqzdMyedStSTRXb6r7kPjy9cMnKLz1HsP	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-15 14:37:06.479	2025-04-15 14:37:06.479
cm9ilwpeg0003fq81f6utihbs	cs_live_a1CUdlskbXEhu6ZjsOp11cDsbA04ocR8ssvH5Z0zGhy5hDjolwOHrFMkhW	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-15 14:37:20.148	2025-04-15 14:37:20.148
cm9im7svw0005fq81jmxxywpd	cs_live_a1FCcaF0sgTUsEnXoZKjbibFjZkhYubQmV93LKvOsA3Q2KOVjihgSYoYux	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-15 14:45:57.844	2025-04-15 14:45:57.844
cm9imbfr90007fq81a1rxuxpj	cs_live_a1gG6Xv2ieRGWKnJv1hii3LBObc0yD9uptsHEe4YEtGQ59L4Ml0HAgzK6f	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-15 14:48:47.463	2025-04-15 14:48:47.463
cm9imbn7c0009fq817victi2d	cs_live_a1xrCyqzf3AkKdRFkD987PO5FV2Wb3j3UWRiGktYrxItuuvTs0GXx66plQ	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-15 14:48:57.144	2025-04-15 14:48:57.144
cm9iry3w00001la04jlf3z25v	cs_live_a1gxSiy5IcVQyvx7BWdvYOxHWziK9yZIxL2NOy1OhEequuJGsRRg8Tg1pa	pi_3REDI1GbMSNZDc2q0MgN2VVp	5	eur	PAID	EVENT_REGISTRATION	cm9ip90aq0000i504sqq6i1nq	cm97rdoz90001la044naksq9o	\N	2025-04-15 17:26:23.28	2025-04-15 17:28:55.553
cm9itkphx0001ib04y7b1a3al	cs_live_a112ZtkHNA7zN96bP4FTVgv9lWV2DKZ47ANT0TEu4hFECDEnLGdRjYVSY7	pi_3REE1XGbMSNZDc2q1RE9kbxL	5	eur	PAID	EVENT_REGISTRATION	cm9ef3oqz0000lh042rjagoet	cm97rdoz90001la044naksq9o	\N	2025-04-15 18:11:57.333	2025-04-15 18:15:58.066
cm9lzbuc50003l504pcu43nw3	cs_live_a18beJZBEtZSaAJVgn8GzuOtccpVxkDUNU2pCtL72QqI0XYkGEudNzuT6S	\N	100	eur	CANCELLED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	cm9i37g9i0000fqla41p0whcf	\N	2025-04-17 23:16:19.926	2025-04-18 08:24:11.493
cm9mgofxz0001jo04cmzncpmk	cs_live_a1JTAfam0wMnJ8y3eQ38KfdLLzFmEOPIEEtHSm3Ka66pUF5N2cA9KqyyAl	\N	100	eur	CANCELLED	EVENT_REGISTRATION	cm9lzaatx0000la04oqmo210w	cm9i37g9i0000fqla41p0whcf	\N	2025-04-18 07:22:01.272	2025-04-18 08:26:31.005
cm9j0aqjg0001jr0431e3zk4p	cs_live_a1eCslA3H6B25mwjoVx0HC4TMvarmHF4Cyl2GUBie0E8NczSuUrvgM1Zr2	pi_3REGujGbMSNZDc2q0eTnmaEx	5	eur	CANCELLED	EVENT_REGISTRATION	cm9j0aags0000js048bu94w7r	cm97rdoz90001la044naksq9o	\N	2025-04-15 21:20:09.436	2025-04-16 17:11:14.77
cm9kqwfdz0001l504sdp0sxki	cs_live_a1WPcNPsLmsZIGQDSFOETdmgpPQgqB17jp82N3Dzlzf84gnhUKwGfNOXZM	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm95ov2750004x7sns0vmpzay	\N	\N	2025-04-17 02:32:37.607	2025-04-17 02:32:37.607
cm9lwl5f20001i804wx1hgyca	cs_live_a1uHPVnvhQNuFjj6SNoafqxu2BsRM6jtzxBDxBtZDGHw9qnoMhzVJEWstQ	\N	5	eur	PENDING	EXCLUSIVE_MEMBERSHIP	cm9lvqo1f0000k004mvszj5wi	\N	\N	2025-04-17 21:59:35.341	2025-04-17 21:59:35.341
cm9n8ufw10001jl04mmajs0mc	cs_live_a1Cy12gvdACV1OzMOJBCmKZBew5102JnUCtc0HcbrGDDpq9HTuTGHF0wcn	\N	100	eur	PENDING	EVENT_REGISTRATION	cm9n8t7ph0000l804cpiqw50x	cm9i37g9i0000fqla41p0whcf	\N	2025-04-18 20:30:30.386	2025-04-18 20:30:30.942
cm9lzbvcl0005l504r44jnjbp	cs_live_a1F4F9C9pEHNWCEINk8NqixIoi7yzwqB5Uf30cerj7t6CcE87B28gCwuDS	\N	100	eur	PENDING	EVENT_REGISTRATION	cm9lzaatx0000la04oqmo210w	cm9i37g9i0000fqla41p0whcf	\N	2025-04-17 23:16:21.237	2025-04-17 23:16:21.636
cm9pwro930001ic04oxdklwj5	cs_live_a10insO00UTrSOwzPNtLUeGrugh5d6d2LQFwJThcF6mSSBgNBvyn7UyWYR	pi_3RG1U1GbMSNZDc2q1tif9zIV	100	eur	PAID	EVENT_REGISTRATION	cm9pp6wv50000lk0493jo1jxe	cm9i37g9i0000fqla41p0whcf	\N	2025-04-20 17:15:44.382	2025-04-20 17:16:50.814
cm9op0q550001l7049k2d8swu	cs_live_a1mzwdRCPh9hLMafpbM43R7emKvmhiKWdVWnurBITqw764nXY36UgyoNk6	\N	100	eur	EXPIRED	EVENT_REGISTRATION	cm9n8t7ph0000l804cpiqw50x	cm9i37g9i0000fqla41p0whcf	\N	2025-04-19 20:51:03.626	2025-04-19 20:56:07.519
cm9op7a410001l104z4bunrvu	cs_live_a1TidBVw2gKfPdLAE6Gmuc0U2Ij7RhcfoEJK9jyyeOvpNOQLuZC0WCRVuk	\N	100	eur	PENDING	EVENT_REGISTRATION	cm9n8t7ph0000l804cpiqw50x	cm9i37g9i0000fqla41p0whcf	\N	2025-04-19 20:56:09.458	2025-04-19 20:56:10.036
cm9opdznj0003l7045mo76vn4	cs_live_a1SDS7HkD8pRwvgbHVkriPLMWexroGhSOb7Wct6sVfxWiG0ZZzVh4sd0mF	pi_3RFiYOGbMSNZDc2q1uxUBYco	100	eur	PAID	EVENT_REGISTRATION	cm9opbqf00002l104mlkyjmye	cm9i37g9i0000fqla41p0whcf	\N	2025-04-19 21:01:22.496	2025-04-19 21:04:03.583
cm9oqwpp70001l804ist5m7zt	cs_live_a10HbUXAqGwWeW8IcPjiNIFFjc1khfQOp47IUbBGNuJFCwH4d4ygHZSESB	\N	100	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	cm9i37g9i0000fqla41p0whcf	\N	2025-04-19 21:43:55.675	2025-04-19 21:49:02.931
cm9ovyc030001jp0440oi6zqk	cs_live_a17kMI7TpzCQH0IKSp7NvEWz4vnaSfLkfBsiWKaNxwBT2hAcxQ2OgWs4GZ	\N	100	eur	EXPIRED	EVENT_REGISTRATION	cm95ov2750004x7sns0vmpzay	cm9i37g9i0000fqla41p0whcf	\N	2025-04-20 00:05:09.294	2025-04-20 00:10:19.968
cm9pp7x2i0003lk04c2fd2j2r	cs_live_a1C53v4pQZEdLxvhpcN7UPJhutOvFo6obNfoWhnlCguDwOZB8x10Rs4BnP	\N	100	eur	PENDING	EVENT_REGISTRATION	cm9pp6wv50000lk0493jo1jxe	cm9i37g9i0000fqla41p0whcf	\N	2025-04-20 13:44:25.386	2025-04-20 13:44:25.979
cm9q70zrm0001l5045nmh97za	cs_live_a140FxeNTqYEqJXVmPj5T3KZyV6hVtCaliZwBPjUcRUel8BuFTUHEOU6U0	\N	100	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm9i37g9i0000fqla41p0whcf	\N	2025-04-20 22:02:55.378	2025-04-20 22:02:55.921
cm9q9ndcb0001ld043h54lgsp	cs_live_a1Z7ynZxWAIKXEKafwNQUBKLv1jXBClozxh3WVjuS8econ0UyqgUqiXKyP	\N	100	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm9i37g9i0000fqla41p0whcf	\N	2025-04-20 23:16:18.633	2025-04-20 23:16:19.217
cm9qbzv050001ju047b94g218	cs_live_a1rl92nbb7SRquwt8OqEZMxn0fibwhS968wjm89wJT3SJ0Aj8kCpH15U2g	\N	100	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm9i37g9i0000fqla41p0whcf	\N	2025-04-21 00:22:00.62	2025-04-21 00:22:01.155
cm9ss5zdf0003l604tj1mcus8	cs_live_a1MNsTbix544jhVtL5KbMYEV1RKXWbkQJipyudh16Mb030Cu4tC7Ry7woo	\N	100	eur	PENDING	EVENT_REGISTRATION	cm9ss4xc80000l604etngtu0u	cm9i37g9i0000fqla41p0whcf	\N	2025-04-22 17:30:12.436	2025-04-22 17:30:13.008
cm9sy9x0h0001jp04oiovppat	cs_live_a1zadgJFluUJNS5x8FYR4zjPH1XBPaUC2TyrYpcJ3snIl3rFiLTWjZKESb	\N	100	eur	EXPIRED	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm9i37g9i0000fqla41p0whcf	\N	2025-04-22 20:21:13.686	2025-04-22 20:36:22.135
cm9y0c2ku0001jm04x0rjllfn	cs_live_a1tWJuESdKyRm7MY2K4VjNuIlhqUP8at0l3UdbGH0EmSsKmryrYzrz9DKe	\N	100	eur	PENDING	EVENT_REGISTRATION	cm9xyr51x0000lg04jkkc2qz7	cm9i37g9i0000fqla41p0whcf	\N	2025-04-26 09:17:44.332	2025-04-26 09:17:44.942
cm9y5ajmy0001l404i3v2s1vt	cs_live_a1O0fyah0xThSp6trO53aS3R3ngqt70T6xbXuB57GhwMDmBBMgacql6FvG	pi_3RI73ZGbMSNZDc2q0k38tLDN	100	eur	PAID	EVENT_REGISTRATION	cm9xyr51x0000lg04jkkc2qz7	cm9i37g9i0000fqla41p0whcf	\N	2025-04-26 11:36:31.21	2025-04-26 11:38:09.639
cma5aci2z0003jp04zn01lya4	cs_live_a1A8ssEWu4qAPUNRgl8ZBLQ46L23P2pt68NhxaliXkAvmslnu7WV7qjE5l	pi_3RJvNoGbMSNZDc2q0YQfDFHN	100	eur	PAID	EVENT_REGISTRATION	cma5abfn00000jp04taeb3et6	cm9i37g9i0000fqla41p0whcf	\N	2025-05-01 11:32:23.819	2025-05-01 11:34:31.343
cma6zd9hu0001l4044di8w6ws	cs_live_a12CHr5kPGd9BNJPspQyT702RMKwVVwKseeeTLfSno1gnu8qXdb46JpVaV	\N	100	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm9i37g9i0000fqla41p0whcf	\N	2025-05-02 16:00:35.922	2025-05-02 16:00:36.472
cma6zmjei0003l404izim7262	cs_live_a1qvgq9XCKg0T6JFEKXZXfjelKx9co6VOCEFHZyasZxe5cuBa5col23pG4	\N	100	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm9i37g9i0000fqla41p0whcf	\N	2025-05-02 16:07:48.667	2025-05-02 16:07:49.175
cma8kr83s0001la04bj2k6x7o	cs_live_a1IMD9L1STTMWnVd20eXBipOTVoPwlhxf8bTo4kdT9Sp6IQRxQ29hJCKQw	\N	100	eur	PENDING	EVENT_REGISTRATION	cm95kupb90000x7h53bcapa4d	cm9i37g9i0000fqla41p0whcf	\N	2025-05-03 18:47:05.414	2025-05-03 18:47:06.02
\.


--
-- Data for Name: Registration; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Registration" (id, "eventId", "userId", status, "createdAt", "updatedAt", "paymentId", "paymentStatus", "expiresAt", name) FROM stdin;
cm9g16qly0005lg045o67pzpo	cm97rdoz90001la044naksq9o	cm9g151an0000lg04ai6r9eok	CONFIRMED	2025-04-13 19:21:43.99	2025-04-13 19:23:39.721	cm9g16q5l0003lg04eqxzgect	PAID	\N	\N
cm9h82umt0003l704e514era2	cm97rdoz90001la044naksq9o	cm9h25onw0006js04ggl27m68	CONFIRMED	2025-04-14 15:22:26.069	2025-04-14 15:25:18.204	cm9h82u890001l70494ewymp0	PAID	\N	\N
cm9h8altp0007k0042158vagf	cm97rdoz90001la044naksq9o	cm9h8a7uh0002jy04b9imrfly	CONFIRMED	2025-04-14 15:28:27.902	2025-04-14 15:29:06.562	cm9h8alfa0005k004q42wl7r4	PAID	\N	\N
cm9b0l1t00003jp04abdpawhs	cm97rdoz90001la044naksq9o	cm965tc270008l804yhpn1hom	CANCELLED	2025-04-10 07:06:01.188	2025-04-10 07:32:24.649	cm9b0mdhr0001l404tuxyecw0	PENDING	2025-04-10 07:12:02.99	\N
cm97ryjvb0003jr04aloihiwh	cm97rdoz90001la044naksq9o	cm97ry7cd0000lb04tlxrkl0n	CONFIRMED	2025-04-08 00:41:16.055	2025-04-13 23:36:44.008	cm9ga8zex0001l604al37fhq0	PAID	\N	\N
cm97rw3j20005jr04fxu6akep	cm97rdoz90001la044naksq9o	cm95ov2750004x7sns0vmpzay	CONFIRMED	2025-04-08 00:39:21.566	2025-04-10 20:54:05.712	cm9bu5jin0001la04roa04xbl	PAID	\N	\N
cm9b6pb910003l504fwtb36th	cm97rdoz90001la044naksq9o	cm9b6oelr0000ih04a9m1e0nq	CONFIRMED	2025-04-10 09:57:17.749	2025-04-11 04:41:08.237	cm9b6pat30001l504bcztbl0c	PAID	\N	\N
cm9guk8ow0005l7044aeea4zn	cm97rdoz90001la044naksq9o	cm9gujshz0004js04lqnhp2i5	CONFIRMED	2025-04-14 09:04:02.817	2025-04-14 09:05:25.53	cm9guk88h0003l704p8vvcots	PAID	\N	\N
cm9f1tyiq0001fp84bpf3kiy7	cm97rdoz90001la044naksq9o	cm96ehicc0002lf04chp34rqo	PENDING	2025-04-13 02:52:01.154	2025-04-14 17:42:01.924	\N	PENDING	\N	\N
cm9guti7r0009l704ul3f15k0	cm97rdoz90001la044naksq9o	cm9gut1t30006js04bu1agj6b	CONFIRMED	2025-04-14 09:11:15.064	2025-04-14 09:12:15.592	cm9guthto0007l704ds9s3r0f	PAID	\N	\N
cm9hcwdqr0003js04cfi525xr	cm97rdoz90001la044naksq9o	cm9hc8hgq0002i504ppp3rlq4	CONFIRMED	2025-04-14 17:37:22.323	2025-04-14 17:42:05.14	cm9hcwdau0001js04axtkwv50	PAID	\N	\N
cm9h37rhq0003ld044dpvnp6j	cm97rdoz90001la044naksq9o	cm9h36o890000l504ew6jhpak	CONFIRMED	2025-04-14 13:06:17.198	2025-04-14 16:24:12.981	cm9ha83nt0001kv04vpwv2hkb	PAID	\N	\N
cm9fs10i80003kt04zttrzzgw	cm97rdoz90001la044naksq9o	cm9frzmyv0000l504vfcsbvh7	CONFIRMED	2025-04-13 15:05:20.336	2025-04-13 15:07:32.792	cm9fs101u0001kt047z5u76n2	PAID	\N	\N
cm9fsh1l20005ky04zegk1jxk	cm97rdoz90001la044naksq9o	cm9fsgmhl0000ky04zncp2xx0	CONFIRMED	2025-04-13 15:17:48.23	2025-04-13 15:19:59.489	cm9fsh15i0003ky04kz7r0loq	PAID	\N	\N
cm9h47pud0005ih04jtgsi08z	cm97rdoz90001la044naksq9o	cm9h474mu0006l504evikx7vn	CONFIRMED	2025-04-14 13:34:14.677	2025-04-14 13:37:07.899	cm9h47pei0003ih048i6qv25w	PAID	2025-04-14 13:39:14.105	\N
cm9h1xh2t0003js04b8qoaut8	cm97rdoz90001la044naksq9o	cm9h1whbk0000jx04ykcx2pzq	CONFIRMED	2025-04-14 12:30:17.526	2025-04-14 12:36:51.5	cm9h24cp80005js04ws9ala2r	PAID	\N	\N
cm9h3sbes0001fq2eu1supdhy	cm97rdoz90001la044naksq9o	cm9h3mu2t0004ld048hexmykd	PENDING	2025-04-14 13:22:16.13	2025-04-14 17:00:26.617	\N	UNPAID	\N	\N
cm9dvcceo0003la043zz1souo	cm97rdoz90001la044naksq9o	cm9dv9xxu0000l8043y5x2sxh	CONFIRMED	2025-04-12 07:02:35.473	2025-04-13 19:15:40.554	cm9g0xk480001la04kwsphcc2	PAID	\N	\N
cm9h282r40003le04aphsnet4	cm97rdoz90001la044naksq9o	cm9h277dr0000jr047t451nuw	CONFIRMED	2025-04-14 12:38:32.176	2025-04-14 12:40:54.963	cm9h282am0001le04xdnsi9l3	PAID	\N	\N
cm9h3qpb20000fq2ekrmliyab	cm97rdoz90001la044naksq9o	cm9h3dt0n0002l50414ztsiip	PENDING	2025-04-14 13:21:00.829	2025-04-14 18:02:41.762	\N	PENDING	\N	\N
cm9gueb480003js04ad1khb4w	cm97rdoz90001la044naksq9o	cm9gud21m0000l70420ze0y7v	CANCELLED	2025-04-14 08:59:26.024	2025-04-14 12:54:47.667	cm9gueani0001js04rmp0dusq	PENDING	2025-04-14 09:04:25.421	\N
cm9h3s0j00003k604srl6r2z3	cm97rdoz90001la044naksq9o	cm9h3rd1x0004l504vkvf7p2l	CANCELLED	2025-04-14 13:22:02.028	2025-04-14 13:53:07.938	cm9h4nre90007ih0457iar4ft	EXPIRED	\N	\N
cm9d40kwq0005kw04ilaricyz	cm97rdoz90001la044naksq9o	cm9d3yi8s0000kw046kvq9xgn	CANCELLED	2025-04-11 18:17:36.986	2025-04-14 13:06:11.161	cm9h314c90001lb04osfh4c82	EXPIRED	\N	\N
cm9f1umi40002fp8451drjjyc	cm97rdoz90001la044naksq9o	cm9bnuo390000ld049j6c9hrc	PENDING	2025-04-13 02:52:32.236	2025-04-14 14:20:49.585	\N	EXPIRED	\N	\N
cm9hbk88y0003l8044ues9joy	cm97rdoz90001la044naksq9o	cm9hbj92w0000i50424n4kprd	CONFIRMED	2025-04-14 16:59:55.715	2025-04-14 17:01:00.163	cm9hbk7rw0001l804eiyscf8x	PAID	\N	\N
cm97sa0r70003l40477cv2eyn	cm97rdoz90001la044naksq9o	cm95kupb90000x7h53bcapa4d	CONFIRMED	2025-04-08 00:50:11.156	2025-05-06 06:49:55.19	cm9egf03q0001x7d62256bjig	PAID	\N	\N
cm9h3w5380002fq2evebseclp	cm97rdoz90001la044naksq9o	cm9h3v8n00000ih04ain0q2og	PENDING	2025-04-14 13:25:14.563	2025-04-14 14:36:49.298	\N	PENDING	\N	\N
cm9iry4cb0003la04ratj8s0b	cm97rdoz90001la044naksq9o	cm9ip90aq0000i504sqq6i1nq	CONFIRMED	2025-04-15 17:26:23.867	2025-04-15 17:28:55.584	cm9iry3w00001la04jlf3z25v	PAID	\N	\N
cm9fyc5nm0003jp045p18yzus	cm97rdoz90001la044naksq9o	cm9fybnce0000jr04adcegjwu	CANCELLED	2025-04-13 18:01:57.922	2025-04-14 15:07:19.743	cm9fyc5750001jp04jsavox6f	EXPIRED	2025-04-13 18:06:57.328	\N
cm9heoml70007kz04sh76fuyg	cm97rdoz90001la044naksq9o	cm9hegnay0000kz04d914txrk	CONFIRMED	2025-04-14 18:27:19.771	2025-04-14 18:28:32.511	cm9heom750005kz040nq3e1gz	PAID	\N	\N
cm9f1rmpn0000fp847te11nao	cm97rdoz90001la044naksq9o	cm96eat2a0004x7l2940yy0mx	PENDING	2025-04-13 02:50:12.538	2025-04-14 17:19:56.441	\N	PENDING	\N	\N
cm9g52n7h0003jo04ag3nckdl	cm97rdoz90001la044naksq9o	cm9ec9vtt0000ky049r03ka7i	CONFIRMED	2025-04-13 21:10:31.421	2025-04-14 17:22:54.471	cm9hcc2xe0001l404jbu3lrrj	PAID	\N	\N
cm9h7eop10003k0049bomdg09	cm97rdoz90001la044naksq9o	cm9h7cwjc0000jy04mm9ep1l5	CONFIRMED	2025-04-14 15:03:38.63	2025-04-14 17:23:29.304	cm9h7eo900001k004sb3s46yl	PAID	2025-04-14 15:08:38.052	\N
cm97scd0q0005lb04kdneyx84	cm97rdoz90001la044naksq9o	cm965oiij0000l80457zo1gv1	PENDING	2025-04-08 00:52:00.362	2025-04-14 17:36:31.621	cm97scck50003lb04usl0tm66	PENDING	\N	\N
cm9hhltzi0005jy04ui1bqunk	cm97rdoz90001la044naksq9o	cm9hhlb2q0000jy045qi4u2bf	CONFIRMED	2025-04-14 19:49:08.238	2025-04-14 19:50:17.056	cm9hhltjb0003jy0483bz3pfi	PAID	\N	\N
cm9hjyxex0003ju04nnftvcia	cm97rdoz90001la044naksq9o	cm9hjy5gq0000lb04wn3gse67	CONFIRMED	2025-04-14 20:55:18.441	2025-04-14 20:58:02.21	cm9hjywz50001ju04527qns4h	PAID	\N	\N
cm9hk30yg0003l704az5uf3w4	cm97rdoz90001la044naksq9o	cm9hk2khx0004ju04v1mwvo38	CONFIRMED	2025-04-14 20:58:29.657	2025-04-14 20:58:41.972	cm9hk30if0001l704ork1zjnh	PAID	\N	\N
cm9hg4ng90003l804sbnjriyv	cm97rdoz90001la044naksq9o	cm9hg3v270000le04x2fmzefa	CANCELLED	2025-04-14 19:07:47.002	2025-04-14 22:32:25.636	cm9hg4n0j0001l8045zbu40i2	PENDING	2025-04-14 19:12:46.434	\N
cm9h5254p0005jy04l3ndylmy	cm97rdoz90001la044naksq9o	cm9h519bs0000jy04o3sxtjsh	CONFIRMED	2025-04-14 13:57:54.169	2025-04-15 10:56:55.635	cm9idzg6e0001jx04ao9xvxc7	PAID	\N	\N
cm9itkpxj0003ib04u03q48s8	cm97rdoz90001la044naksq9o	cm9ef3oqz0000lh042rjagoet	CONFIRMED	2025-04-15 18:11:57.896	2025-04-15 18:15:58.135	cm9itkphx0001ib04y7b1a3al	PAID	\N	\N
cm9j0aqz30003jr0420mdkt69	cm97rdoz90001la044naksq9o	cm9j0aags0000js048bu94w7r	CANCELLED	2025-04-15 21:20:10	2025-04-16 17:11:14.755	cm9j0aqjg0001jr0431e3zk4p	PAID	\N	\N
cm9lzazie0001l5047jrauhhv	cm9i37g9i0000fqla41p0whcf	cm95ov2750004x7sns0vmpzay	CANCELLED	2025-04-17 23:15:39.975	2025-04-20 00:10:19.964	cm9ovyc030001jp0440oi6zqk	EXPIRED	\N	\N
cm9lzazrn0001l304z80oq0lm	cm9i37g9i0000fqla41p0whcf	cm9lzaatx0000la04oqmo210w	CANCELLED	2025-04-17 23:15:40.307	2025-04-18 08:26:31	cm9mgofxz0001jo04cmzncpmk	PAID	\N	\N
cm9mxy57c0003l704rrxue6l4	cm9i37g9i0000fqla41p0whcf	cm9i1z6hn0000l804lq0g1n15	CANCELLED	2025-04-18 15:25:27.384	2025-04-20 04:21:44.107	cm9mxy4rq0001l704ewsxun0e	PENDING	2025-04-18 15:30:26.821	\N
cm9lcxpk50001k704xf4zk29x	cm9i37g9i0000fqla41p0whcf	cm95kupb90000x7h53bcapa4d	CANCELLED	2025-04-17 12:49:28.997	2025-05-03 21:42:27.656	cma8kr83s0001la04bj2k6x7o	PENDING	2025-05-03 18:52:05.413	\N
cmai7ls150001js048eh1d3hj	cmacrvz8u0000fs2txrpjo4cq	cmai7kycb0004l104sqayuy9x	CONFIRMED	2025-05-10 12:36:38.057	2025-05-10 12:36:38.057	\N	PAID	\N	\N
cmai7p4jf0009l104w4zghs22	cmacrvz8u0000fs2txrpjo4cq	cmai7o5dc0002js04ol71by18	CONFIRMED	2025-05-10 12:39:14.235	2025-05-10 12:39:14.235	\N	PAID	\N	\N
cmai7vocw0001jp04wimqb7mv	cmacrvz8u0000fs2txrpjo4cq	cmai7v65a000al10475o67hi8	CONFIRMED	2025-05-10 12:44:19.857	2025-05-10 12:44:19.857	\N	PAID	\N	\N
cm9ope01w0005l704c6phgpim	cm9i37g9i0000fqla41p0whcf	cm9opbqf00002l104mlkyjmye	CONFIRMED	2025-04-19 21:01:23.013	2025-04-19 21:04:03.652	cm9opdznj0003l7045mo76vn4	PAID	\N	\N
cm9n8ugbm0003jl049nfutffx	cm9i37g9i0000fqla41p0whcf	cm9n8t7ph0000l804cpiqw50x	CANCELLED	2025-04-18 20:30:30.946	2025-04-20 04:21:44.107	cm9op7a410001l104z4bunrvu	PENDING	2025-04-19 21:01:09.456	\N
cmai7wgno0005js04uqd86g36	cmacrvz8u0000fs2txrpjo4cq	cm9h7cwjc0000jy04mm9ep1l5	CONFIRMED	2025-05-10 12:44:56.532	2025-05-10 12:44:56.532	\N	PAID	\N	\N
cmai7xn9u000dl104s8rbsash	cmacrvz8u0000fs2txrpjo4cq	cm9h3mu2t0004ld048hexmykd	CONFIRMED	2025-05-10 12:45:51.763	2025-05-10 12:45:51.763	\N	PAID	\N	\N
cm9pp7xj30005lk046qq32vtp	cm9i37g9i0000fqla41p0whcf	cm9pp6wv50000lk0493jo1jxe	CONFIRMED	2025-04-20 13:44:25.984	2025-04-20 17:16:50.856	cm9pwro930001ic04oxdklwj5	PAID	\N	\N
cm9ss5ztg0005l6045ez2tnus	cm9i37g9i0000fqla41p0whcf	cm9ss4xc80000l604etngtu0u	CANCELLED	2025-04-22 17:30:13.013	2025-04-23 00:23:30.3	cm9ss5zdf0003l604tj1mcus8	PENDING	2025-04-22 17:35:12.427	\N
cmai83w8w000hl104w850vfm8	cmacrvz8u0000fs2txrpjo4cq	cmai833wm000el104t9wzo3s2	CONFIRMED	2025-05-10 12:50:43.329	2025-05-10 12:50:43.329	\N	PAID	\N	\N
cmai8auok0005jp049m5k90ox	cmacrvz8u0000fs2txrpjo4cq	cmai8aboc0006js04wy3ipd1s	CONFIRMED	2025-05-10 12:56:07.893	2025-05-10 12:56:07.893	\N	PAID	\N	\N
cm9y0c31w0003jm04ygr6dugp	cm9i37g9i0000fqla41p0whcf	cm9xyr51x0000lg04jkkc2qz7	CONFIRMED	2025-04-26 09:17:44.948	2025-04-26 11:38:09.673	cm9y5ajmy0001l404i3v2s1vt	PAID	\N	\N
cma5acijm0005jp04lu234b2d	cm9i37g9i0000fqla41p0whcf	cma5abfn00000jp04taeb3et6	CONFIRMED	2025-05-01 11:32:24.418	2025-05-01 11:34:31.377	cma5aci2z0003jp04zn01lya4	PAID	\N	\N
cmac5hv520003fs0damm0cn36	cm9i37g9i0000fqla41p0whcf	cm965tc270008l804yhpn1hom	CONFIRMED	2025-05-06 06:50:59.174	2025-05-06 06:50:16.669	\N	PAID	\N	\N
cmac5izs20004fs0dnokofxwg	cm9i37g9i0000fqla41p0whcf	cm9bnuo390000ld049j6c9hrc	CONFIRMED	2025-05-06 06:51:51.843	2025-05-06 06:52:16.848	\N	PAID	\N	\N
cmac5k4av0005fs0dzt2xo62u	cm9i37g9i0000fqla41p0whcf	cm97ry7cd0000lb04tlxrkl0n	CONFIRMED	2025-05-06 06:52:44.359	2025-05-06 06:52:53.845	\N	PAID	\N	\N
cmad6muxz0000x7d95br8agud	cm9i37g9i0000fqla41p0whcf	cm96ehicc0002lf04chp34rqo	CONFIRMED	2025-05-07 00:10:37.99	2025-05-07 00:10:58.191	\N	PAID	\N	\N
cmai8guww0009js04vwnku9y2	cmacrvz8u0000fs2txrpjo4cq	cm9h474mu0006l504evikx7vn	CONFIRMED	2025-05-10 13:00:48.128	2025-05-10 13:00:48.128	\N	PAID	\N	\N
cmah0jkol0001jv04n0bapyjq	cmacrvz8u0000fs2txrpjo4cq	cmah0ipz40000jl04rcq4gsek	CONFIRMED	2025-05-09 16:31:11.734	2025-05-09 16:31:11.734	\N	PAID	\N	\N
cmai8huo10001l40bfz311k0h	cmacrvz8u0000fs2txrpjo4cq	cmai8gzw7000cjs04l6hqo1kg	CONFIRMED	2025-05-10 13:01:34.465	2025-05-10 13:01:34.465	\N	PAID	\N	\N
cmai8huw70003l40bwkycv83c	cmacrvz8u0000fs2txrpjo4cq	cmai8h2z8000ejs044xq5pzvv	CONFIRMED	2025-05-10 13:01:34.759	2025-05-10 13:01:34.759	\N	PAID	\N	\N
cmad8ng540001jm04ndsgb42d	cmacrvz8u0000fs2txrpjo4cq	cm95kupb90000x7h53bcapa4d	CANCELLED	2025-05-07 01:07:04.696	2025-05-09 19:25:10.462	\N	PAID	\N	\N
cmah66zr80001jj04trelgtdy	cmacrvz8u0000fs2txrpjo4cq	cm9lzaatx0000la04oqmo210w	CONFIRMED	2025-05-09 19:09:22.436	2025-05-09 19:26:27.16	\N	PAID	\N	\N
cmai2jmt80001l904wqrmjlkq	cmacrvz8u0000fs2txrpjo4cq	cmai2j2oi0000ju049130nsfx	CONFIRMED	2025-05-10 10:14:59.9	2025-05-10 10:14:59.9	\N	PAID	\N	\N
cmai2vcp40001l404qmxki9fj	cmacrvz8u0000fs2txrpjo4cq	cmai2tohi0000ib04uuspdgd9	CONFIRMED	2025-05-10 10:24:06.664	2025-05-10 10:24:06.664	\N	PAID	\N	\N
cmai366ik0003l104akw1lcoz	cmacrvz8u0000fs2txrpjo4cq	cmai34w110000l1048a2qt4t9	CONFIRMED	2025-05-10 10:32:31.869	2025-05-10 10:32:31.869	\N	PAID	\N	\N
cmai4vioz0001l104kt17kfhm	cmacrvz8u0000fs2txrpjo4cq	cmai4sm2g0000kw04vieio79b	CONFIRMED	2025-05-10 11:20:13.667	2025-05-10 11:20:13.667	\N	PAID	\N	\N
cmai50djt0003l10422mm60oa	cmacrvz8u0000fs2txrpjo4cq	cmai4zrq30002jx04xac7n1y9	CONFIRMED	2025-05-10 11:24:00.281	2025-05-10 11:24:00.281	\N	PAID	\N	\N
cmai7kq3u0003l1044ylfvwx9	cmacrvz8u0000fs2txrpjo4cq	cm9hna37t0000jq04r18hl3lz	CONFIRMED	2025-05-10 12:35:48.907	2025-05-10 12:35:48.907	\N	PAID	\N	\N
cmai7l0e60007l104ntc0kwtx	cmacrvz8u0000fs2txrpjo4cq	cmai7jzcd0000l104jfyhsmrz	CONFIRMED	2025-05-10 12:36:02.238	2025-05-10 12:36:02.238	\N	PAID	\N	\N
cmai8hvq00005l40b47a0htqe	cmacrvz8u0000fs2txrpjo4cq	cmai8gyki000ajs042ux2kuud	CONFIRMED	2025-05-10 13:01:35.832	2025-05-10 13:01:35.832	\N	PAID	\N	\N
cmai8klyk000jl104y6qaotgl	cmacrvz8u0000fs2txrpjo4cq	cmai8k5gb0006l40bg048ppg4	CONFIRMED	2025-05-10 13:03:43.148	2025-05-10 13:03:43.148	\N	PAID	\N	\N
cmai8tfpm000nl104cm50o7wp	cmacrvz8u0000fs2txrpjo4cq	cm9iio0tw0000il04hfn42v97	CONFIRMED	2025-05-10 13:10:34.954	2025-05-10 13:10:34.954	\N	PAID	\N	\N
cmai8tp340001l204g8ts34wg	cmacrvz8u0000fs2txrpjo4cq	cm9buxfvs0002la046kcxcm9s	CONFIRMED	2025-05-10 13:10:47.104	2025-05-10 13:10:47.104	\N	PAID	\N	\N
cmai8ttdt0003l20441ddif0q	cmacrvz8u0000fs2txrpjo4cq	cmai8t67w000kl104m7wkajxy	CONFIRMED	2025-05-10 13:10:52.673	2025-05-10 13:10:52.673	\N	PAID	\N	\N
cmai8u4vl0005l204apa35koq	cmacrvz8u0000fs2txrpjo4cq	cmai8thik000ol104ifdkwnyo	CONFIRMED	2025-05-10 13:11:07.569	2025-05-10 13:11:07.569	\N	PAID	\N	\N
cmai8v65i000tl104iasw2ght	cmacrvz8u0000fs2txrpjo4cq	cmai8ubk10006l2042r9xk0rz	CONFIRMED	2025-05-10 13:11:55.878	2025-05-10 13:11:55.878	\N	PAID	\N	\N
cmai8vs2f000vl10430wf3e42	cmacrvz8u0000fs2txrpjo4cq	cmai8v459000ql104eljn7wcw	CONFIRMED	2025-05-10 13:12:24.279	2025-05-10 13:12:24.279	\N	PAID	\N	\N
cmai8xf0l000dl20470avlbue	cmacrvz8u0000fs2txrpjo4cq	cmai8utmb000al204gwvpqfax	CONFIRMED	2025-05-10 13:13:40.677	2025-05-10 13:13:40.677	\N	PAID	\N	\N
cmai8yipo0001ji04kry2wuy7	cmacrvz8u0000fs2txrpjo4cq	cmai8xxw1000wl104m7aui1ec	CONFIRMED	2025-05-10 13:14:32.125	2025-05-10 13:14:32.125	\N	PAID	\N	\N
cmai8z0vh000ijs042ji0u8cu	cmacrvz8u0000fs2txrpjo4cq	cmai8y1rk000yl104yizi4mkc	CONFIRMED	2025-05-10 13:14:55.662	2025-05-10 13:14:55.662	\N	PAID	\N	\N
cmai8z2j8000kjs042pxfwaqe	cmacrvz8u0000fs2txrpjo4cq	cmai8ymev0002ji045zcskh8n	CONFIRMED	2025-05-10 13:14:57.813	2025-05-10 13:14:57.813	\N	PAID	\N	\N
cmai8zevj000hl2043dwqzyj8	cmacrvz8u0000fs2txrpjo4cq	cmai8xizi000el204nk0m8am4	CONFIRMED	2025-05-10 13:15:13.808	2025-05-10 13:15:13.808	\N	PAID	\N	\N
cmai9041o0005ji04smj4uu5w	cmacrvz8u0000fs2txrpjo4cq	cmai8zgzi000il204qjfaeg1v	CONFIRMED	2025-05-10 13:15:46.428	2025-05-10 13:15:46.428	\N	PAID	\N	\N
cmai93g79000qjs041oiavs5i	cmacrvz8u0000fs2txrpjo4cq	cmai92qoi000ljs04b1blbutj	CONFIRMED	2025-05-10 13:18:22.149	2025-05-10 13:18:22.149	\N	PAID	\N	\N
cmai942d10007ji04t1gjelqy	cmacrvz8u0000fs2txrpjo4cq	cmai930p2000njs04fmmn7gnn	CONFIRMED	2025-05-10 13:18:50.869	2025-05-10 13:18:50.869	\N	PAID	\N	\N
cmai94pmu000ll204mvw0ymaz	cmacrvz8u0000fs2txrpjo4cq	cm9h8a7uh0002jy04b9imrfly	CONFIRMED	2025-05-10 13:19:21.031	2025-05-10 13:19:21.031	\N	PAID	\N	\N
cmai97oyl0009ji04f8hdp3yn	cmacrvz8u0000fs2txrpjo4cq	cmai96fsp000rjs04830ypog7	CONFIRMED	2025-05-10 13:21:40.125	2025-05-10 13:21:40.125	\N	PAID	\N	\N
cmai98dqr000nl204xjwws3zi	cmacrvz8u0000fs2txrpjo4cq	cmai97gup000tjs0419pl8140	CONFIRMED	2025-05-10 13:22:12.244	2025-05-10 13:22:12.244	\N	PAID	\N	\N
cmai9csnh000rl204kyu5rlij	cmacrvz8u0000fs2txrpjo4cq	cm9hc8hgq0002i504ppp3rlq4	CONFIRMED	2025-05-10 13:25:38.19	2025-05-10 13:25:38.19	\N	PAID	\N	\N
cmai9dgp9000tl204r8qldb7y	cmacrvz8u0000fs2txrpjo4cq	cmai9csmy000ol204b2zn6n17	CONFIRMED	2025-05-10 13:26:09.357	2025-05-10 13:26:09.357	\N	PAID	\N	\N
cmah6shfn0001jm04i3x2e0yn	cmacrvz8u0000fs2txrpjo4cq	cm95ov2750004x7sns0vmpzay	CONFIRMED	2025-05-09 19:26:05.124	2025-05-12 01:33:00.047	\N	PAID	\N	\N
cmai9eii3000bji04roxj1ive	cmacrvz8u0000fs2txrpjo4cq	cmai9dvz5000vjs04ozf9x507	CONFIRMED	2025-05-10 13:26:58.347	2025-05-10 13:26:58.347	\N	PAID	\N	\N
cmai9o3ht000dji0472h5vzvh	cmacrvz8u0000fs2txrpjo4cq	cmai9mjt8000ul2042nq5uq58	CONFIRMED	2025-05-10 13:34:25.457	2025-05-10 13:34:25.457	\N	PAID	\N	\N
cmai9odtt000yjs04px5wuyvo	cmacrvz8u0000fs2txrpjo4cq	cmai9n7lb000wl204smmbv1ix	CONFIRMED	2025-05-10 13:34:38.85	2025-05-10 13:34:38.85	\N	PAID	\N	\N
cmai9pi230017l20483xv407s	cmacrvz8u0000fs2txrpjo4cq	cmai9oly4000yl2046vkauaiy	CONFIRMED	2025-05-10 13:35:30.987	2025-05-10 13:35:30.987	\N	PAID	\N	\N
cmai9pntd0019l204nvy5xoc2	cmacrvz8u0000fs2txrpjo4cq	cmai9osno0010l204farnk4hp	CONFIRMED	2025-05-10 13:35:38.449	2025-05-10 13:35:38.449	\N	PAID	\N	\N
cmai9px25000hji04ti4lwae0	cmacrvz8u0000fs2txrpjo4cq	cmai9pcs40014l204xvhrd2hk	CONFIRMED	2025-05-10 13:35:50.429	2025-05-10 13:35:50.429	\N	PAID	\N	\N
cmai9qpak000jji04xsk0ow5m	cmacrvz8u0000fs2txrpjo4cq	cmai9pupp000eji0497g8vlgk	CONFIRMED	2025-05-10 13:36:27.02	2025-05-10 13:36:27.02	\N	PAID	\N	\N
cmai9rkwv001bl204q4n1796b	cmacrvz8u0000fs2txrpjo4cq	cmai9p83y0012l204qwctakt5	CONFIRMED	2025-05-10 13:37:08	2025-05-10 13:37:08	\N	PAID	\N	\N
cmah7z1720003ib04cbgsm9hf	cmacrvz8u0000fs2txrpjo4cq	cmah7yjrb0000ib04675xacki	CONFIRMED	2025-05-09 19:59:10.287	2025-05-10 13:37:46.739	\N	PAID	\N	\N
cmai9tgcq000lji04kzs853cn	cmacrvz8u0000fs2txrpjo4cq	cm9h3dt0n0002l50414ztsiip	CONFIRMED	2025-05-10 13:38:35.403	2025-05-10 13:38:35.403	\N	PAID	\N	\N
cmai9tqby000nji04n44jz2u5	cmacrvz8u0000fs2txrpjo4cq	cmai9t29r000zjs04e4x9mnmk	CONFIRMED	2025-05-10 13:38:48.334	2025-05-10 13:38:48.334	\N	PAID	\N	\N
cmai9v8jm0012js04piaftfda	cmacrvz8u0000fs2txrpjo4cq	cmai9u2ft001cl20416fhd7zr	CONFIRMED	2025-05-10 13:39:58.594	2025-05-10 13:39:58.594	\N	PAID	\N	\N
cmai9vgv8001jl204xw9ghd3s	cmacrvz8u0000fs2txrpjo4cq	cmai9uz7f001gl204caesw2l5	CONFIRMED	2025-05-10 13:40:09.38	2025-05-10 13:40:09.38	\N	PAID	\N	\N
cmai9x5ms001ll204oiqr5mie	cmacrvz8u0000fs2txrpjo4cq	cmai9uw5f001el204b3lfkjju	CONFIRMED	2025-05-10 13:41:28.132	2025-05-10 13:41:28.132	\N	PAID	\N	\N
cmai9xweh001nl204k0nfnyiw	cmacrvz8u0000fs2txrpjo4cq	cm97ry7cd0000lb04tlxrkl0n	CANCELLED	2025-05-10 13:42:02.826	2025-05-10 13:43:09.684	\N	PAID	\N	\N
cmaiae2e6000rji049wgdzdt4	cmacrvz8u0000fs2txrpjo4cq	cm9itv6g90000jx049bm7z77q	CONFIRMED	2025-05-10 13:54:37.086	2025-05-10 13:54:37.086	\N	PAID	\N	\N
cmaiaeo5s000tji04cxu8tp9d	cmacrvz8u0000fs2txrpjo4cq	cmaiad7zr000oji04wx86skc7	CONFIRMED	2025-05-10 13:55:05.296	2025-05-10 13:55:05.296	\N	PAID	\N	\N
cmaiahvka000vji04f041xx6l	cmacrvz8u0000fs2txrpjo4cq	cmaiagxww001ol204ockix90u	CONFIRMED	2025-05-10 13:57:34.859	2025-05-10 13:57:34.859	\N	PAID	\N	\N
cmaiajfu7001rl204nn0cy9j0	cmacrvz8u0000fs2txrpjo4cq	cmaiaii9f000wji04263gtw8y	CONFIRMED	2025-05-10 13:58:47.791	2025-05-10 13:58:47.791	\N	PAID	\N	\N
cmaiap5q8001vl2044w3p58zm	cmacrvz8u0000fs2txrpjo4cq	cmaianlxs001sl204iv70r1gd	CONFIRMED	2025-05-10 14:03:14.624	2025-05-10 14:03:14.624	\N	PAID	\N	\N
cmaiavlrd001xl204k3qklgpo	cmacrvz8u0000fs2txrpjo4cq	cmagf8oyb0000jj04aftbj408	CONFIRMED	2025-05-10 14:08:15.338	2025-05-10 14:08:15.338	\N	PAID	\N	\N
cmaiayou40003l2049w5ys353	cmacrvz8u0000fs2txrpjo4cq	cmaiaxj950000l204xj0c0nv5	CONFIRMED	2025-05-10 14:10:39.293	2025-05-10 14:10:39.293	\N	PAID	\N	\N
cmaib4a9e0021l2048zah7uis	cmacrvz8u0000fs2txrpjo4cq	cmaib3jt7001yl204umfw2dgz	CONFIRMED	2025-05-10 14:15:00.338	2025-05-10 14:15:00.338	\N	PAID	\N	\N
cmaib7wog0005l204gw20cerg	cmacrvz8u0000fs2txrpjo4cq	cmaib75990022l204948tpnf1	CONFIRMED	2025-05-10 14:17:49.36	2025-05-10 14:17:49.36	\N	PAID	\N	\N
cmaibb6fq0025l204wiewj4cy	cmacrvz8u0000fs2txrpjo4cq	cmaibajng0010ji04rt1jg54t	CONFIRMED	2025-05-10 14:20:21.974	2025-05-10 14:20:21.974	\N	PAID	\N	\N
cmaibcu900015ji048ky5kdhx	cmacrvz8u0000fs2txrpjo4cq	cmaib9awr000yji04nv907fo7	CONFIRMED	2025-05-10 14:21:39.492	2025-05-10 14:21:39.492	\N	PAID	\N	\N
cmaibdod70019ji048hu5qyk2	cmacrvz8u0000fs2txrpjo4cq	cmaibcv1j0016ji04v6ug2mu1	CONFIRMED	2025-05-10 14:22:18.523	2025-05-10 14:22:18.523	\N	PAID	\N	\N
cmaibexhc0001jl04292zrsyh	cmacrvz8u0000fs2txrpjo4cq	cmaibeccb001aji04ja9fyiba	CONFIRMED	2025-05-10 14:23:16.993	2025-05-10 14:23:16.993	\N	PAID	\N	\N
cmaibj7q30009l204s3w3hdhu	cmacrvz8u0000fs2txrpjo4cq	cm9hjy5gq0000lb04wn3gse67	CONFIRMED	2025-05-10 14:26:36.892	2025-05-10 14:26:36.892	\N	PAID	\N	\N
cmaibjqsc0003jl044p7d4no8	cmacrvz8u0000fs2txrpjo4cq	cmaibj3rw0006l204vq0lmvhw	CONFIRMED	2025-05-10 14:27:01.596	2025-05-10 14:27:01.596	\N	PAID	\N	\N
cmak0zy7u0001ic04jed7zikk	cmacrvz8u0000fs2txrpjo4cq	cmak0zcuc0000l104docluswp	CONFIRMED	2025-05-11 19:07:14.299	2025-05-11 19:07:14.299	\N	PAID	\N	\N
\.


--
-- Data for Name: ResourceCategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ResourceCategory" (id, name, slug, description, "imageUrl", "order", "createdAt", "updatedAt") FROM stdin;
cm95kuq1l0005x7h5o0ahocb1	Before Arrival	before-arrival	Everything you need to know before coming to Milan - visas, accommodation, and preparation tips.	\N	1	2025-04-06 11:46:47.77	2025-04-06 11:46:47.77
cm95kuqaw0006x7h54q033vyd	Living in Milan	living-in-milan	Resources to help you settle in and navigate daily life in Milan - from transportation to healthcare.	\N	2	2025-04-06 11:46:48.104	2025-04-06 11:46:48.104
cm95kuqh90007x7h512irx9kc	After Graduation	after-graduation	Resources for your next steps after completing your studies - career opportunities, staying in Italy, and more.	\N	3	2025-04-06 11:46:48.333	2025-04-06 11:46:48.333
\.


--
-- Data for Name: Resource; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Resource" (id, title, description, "fileUrl", "thumbnailUrl", "categoryId", featured, "resourceType", "createdAt", "updatedAt", "viewCount", "downloadCount", slug) FROM stdin;
\.


--
-- Data for Name: ResourceView; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ResourceView" (id, "resourceId", "userId", "viewedAt", downloaded) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e2721b88-970f-4ca1-8eb5-e9b8fc0e49f6	5e746c022983682786bd3457faa55758ca886607df71e65e03f6fd065f1a9529	2025-04-06 11:46:43.291194+00	20250319131908_init	\N	\N	2025-04-06 11:46:43.046539+00	1
a75fd562-1c1e-4918-9b31-dddc6553e040	5ad20c780486d251fd1c5eb997bcea78856e8a0cd11d24c2c79049644ceb6328	2025-04-06 11:46:43.633213+00	20250319145433_add_membership_and_resources	\N	\N	2025-04-06 11:46:43.385817+00	1
53e9a93c-ef9e-47f9-a929-0ae5e9f10bf9	acf88a9787778a5470781b1d729e3a55c98bbae402db2ef19ce12d842ef68a6a	2025-04-06 11:46:43.940658+00	20250327004411_add_new_fields	\N	\N	2025-04-06 11:46:43.719629+00	1
f48cf4ee-c56a-4f02-953f-915e82a80b03	3d921924829565ebf663966dde4cda0d608a39bd71362ff7f338a4004d2b60ad	2025-04-06 11:46:44.248969+00	20250402160520_add_resource_slug	\N	\N	2025-04-06 11:46:44.030996+00	1
e691c4e6-4178-44aa-b9d5-b782a6ab2f21	20c328745a274fef877fceb5518bc7a5cefde1e91471245476f6b178b6e1bfd3	2025-04-06 11:46:44.560589+00	20250403011006_add_super_admin_field	\N	\N	2025-04-06 11:46:44.334479+00	1
c742c566-1067-40b5-87a4-74d318f653a5	560ae5a5f65e9a7d50b8efcbc9043347defc3664b5513d1f844a7f436cc0555d	2025-04-06 11:46:44.908998+00	20250404164759_add_password_reset	\N	\N	2025-04-06 11:46:44.654121+00	1
90d17edf-32e6-46ff-a5d3-ebc6f6122b39	ba438e0b1f0b29525576ca0d9a0699b225896c2df1e272ffafc52f17bdb88cfb	2025-04-06 11:46:45.239077+00	20250406003644_add_stripe_payments	\N	\N	2025-04-06 11:46:45.000134+00	1
9e1630e1-231e-40ff-8b3e-09f0659c1abd	f294acd7957d0ca0fdf3a5d0ace13953098fa60865b0463bccd32091761eb5a4	2025-04-06 11:46:45.558672+00	20250406112958_add_registration_expiry	\N	\N	2025-04-06 11:46:45.329338+00	1
f05631fa-a2b1-45f8-a652-8eac1281d178	3c44be79a6a0639bfd415d7ecd74161fbb260b7e6e1197ec293ef9556d707ea5	2025-04-07 14:13:47.424596+00	20250407141346_add_payment_statuses	\N	\N	2025-04-07 14:13:47.166293+00	1
50d18127-e7aa-4504-a092-acad0ea59038	90da11eb156ba9db79c1cb4541126c7215d4e4b5d99b5f7629f20d8ce9a2b5c	2025-04-10 08:33:14.026621+00	20250410083311_add_exclusive_membership	\N	\N	2025-04-10 08:33:13.848518+00	1
11f4cdba-1c19-4ce4-860b-edb18c20467d	5496224612e1b90e23a8590720e1d0b7a7f530278719f0ee776744a64620a753	2025-04-10 08:41:13.125476+00	20250410084110_add_exclusive_membership	\N	\N	2025-04-10 08:41:12.936282+00	1
66cd2f21-8060-4571-ab4f-60ad57252921	e65a6c4d57171b53f9fad4abb54005792a9d4213253b993e87e8dc88aff74111	2025-04-10 10:44:20.19687+00	20250410104418_add_exclusive_membership_payment_type	\N	\N	2025-04-10 10:44:19.833475+00	1
dab8554d-6950-4f9e-b02b-185e73e8d553	146fa761faf3f86714c56ead569b0e8840a7e1395b0400651eff5e11136dbdee	2025-04-14 17:34:57.014603+00	20250414173453_add_user_name_to_registration	\N	\N	2025-04-14 17:34:56.744197+00	1
\.


--
-- PostgreSQL database dump complete
--

