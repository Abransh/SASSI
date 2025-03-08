import Header from "@/components/Header"
import MobileMenu from "@/components/MobileMenu"
import FAQSection from "@/components/FaqSection"

export default function FAQsPage() {
  // Sample data for the FAQs
  const generalFAQs = [
    {
      question: "How do I obtain a Tessera Sanitaria?",
      answer: `**Tessera Sanitaria**

            A step-by-step guide to obtaining a Tessera Sanitaria

          Pay the Annual Fee: Head to a Post Office and pay the annual fee using a postal order (Bollettino Postale) for SSN. Keep the receipt.

        If you are staying for study purposes you are entitled to two major benefits. You can:
  
  -1. Apply for registration to the Italian National Health Service (SSN – Servizio Sanitario Nazionale) even if staying for less than 3 months
-2. Pay a fixed yearly lump sum: €149.77 for students
Note: The paid health care is an annual registration (January–December) and expires on December 31st of each year. It does not get prorated – meaning if you arrive in Italy in October and register with payment, you still pay the full year amount.
Gather the Required Documents:

Passport
Permit to Stay or Receipt
Codice Fiscale
Self-declaration of Residency (Residence certificate [Residenza]) – must match the address on your permit. A Rental Contract registered with Agenzia delle Entrate is necessary.
Receipt of Payment (annual fee at the Post Office)
Passport-size photos
Additional Documents (depending on your status, e.g., student, relative, au pair, etc.)
Complete Registration: Submit the required documents to your ASL office and complete the registration. You will receive a receipt as proof until your Tessera Sanitaria arrives by mail.

An appointment must be booked at the nearby ASL office to complete registration:
Use: prenota.zerocoda.it
In Cosa vuoi prenotare? select “Scelta / Revoca / Cambio del medico (Choice / Revocation / Change of doctor)”
In Dove?, provide the name of your city
Select the nearby ASL and book an appointment
Source of Information:
Information last updated on: 20 December 2023
`
    },
    {
      question: "How do I obtain a Tax Code (Codice Fiscale)?",
      answer:

`**Tax Code**
   
Steps to fill the form

Download the pdf form AA4/8 from the Agenzia delle Entrate website and print it, or open it with an app that allows you to fill it in
Tick “Allocation of a tax code”
You have to fill in part B (personal data – exactly as in your ID) and part D (your current address)
In part C, you can list your address in Milano (if known) as a domicile for fiscal communications. If not, leave it blank
Under “signatures”, date and place your signature in pen
Receive in-person:

Make a copy of your ID document (passport or an ID card issued by your municipality)
Bring everything to the closest Agenzia delle Entrate (Italian Revenue Agency). Find the closest office on their website.
Take a number, wait your turn, and they will type in your data and give you an official paper version of your unique Codice Fiscale immediately.
Receive online:

Send an e-mail to the proper Consulate address with the signed/scanned form plus a copy of your ID/Passport
The Consulate will reply with a .pdf tax code certificate you can use as needed
Source:

YesMilano
DoctorsInItaly`    
 },


    {
      question: "How do I obtain or renew my Residence Permit (Permesso di Soggiorno)?",
      answer: `**Residence Permit**

Permesso di Soggiorno kit:
Link to the list of Poste Italiane with Sportello Amico: Google Maps

Permesso di Soggiorno student new:
Sample to fill the kit: Polimi Example
Note: Remember to take the original documents for verification.
Documents to be submitted in Poste Italiane:

Copy of Passport
Copy of Visa
Copy of Codice Fiscale (Tax code)
Document to be submitted in Questura:
Copy of Medical Insurance
Copy of Passport
Copy of Tax code
Copy of Admission letter from the university
Passport size photos
Permesso di Soggiorno student renewal:
Sample to fill the kit: Unicatt Example
Note: Remember to take the original documents for verification.
Documents to be submitted in Poste Italiane:

Copy of Passport
Copy of old Permesso di Soggiorno
Copy of Codice Fiscale (Tax code)
Document to be submitted in Questura:
Copy of Medical Insurance
Copy of old Permesso di Soggiorno
Copy of Bank balance (Not less than 6000 euro)/scholarship certificate
Copy of Passport
Copy of Tax code
Enrollment certificate received from the university
Passport size photos
Copy of Carta d'identità (some Questura ask this)
Permesso di Soggiorno for work search:
Sample to fill the kit: Sample kit
Note: Remember to take the original documents for verification.
Documents to be submitted in Poste Italiane:

Copy of Passport
Copy of old Permesso di Soggiorno
Copy of Codice Fiscale (Tax code)
Document to be submitted in Questura:
Copy of DID online
Copy of Medical Insurance
Copy of old Permesso di Soggiorno
Copy of Bank balance (Not less than 6000 euro)
Copy of Passport
Copy of Tax code
Copy of Degree Certificate
Passport size photos
Copy of Carta d'identità (some Questura ask this)
Permesso di Soggiorno for work (with work contract):
Sample to fill the kit: YesMilano Guide
Note: Remember to take the original documents for verification.
Documents to be submitted in Poste Italiane:

Copy of Passport
Copy of old Permesso di Soggiorno
Copy of Codice Fiscale (Tax code)
Document to be submitted in Questura:
Copy of Work Contract
Copy of old Permesso di Soggiorno
Copy of Passport
Copy of Tax code
Passport size photos
Copy of last three months' pay slip (some Questura ask)
Copy of Medical Insurance (some Questura ask)
Copy of Carta d'identità (some Questura ask)
Returning from India with Residence permit slip:
Foreigners awaiting renewal of their residence permits can leave and re-enter Italy if they hold:

the receipt issued by Italian Post offices (Poste Italiane S.p.A) certifying the submission of the application
the expired residence permit
their passport or other equivalent travel document
The same facilitated procedure is granted to foreigners who have submitted their application for their first residence permits (employment, self-employment, or family reunification), provided that:
they leave and re-enter Italy through any Italian external border crossing point (circular letter 11th March 2009);
they show their passport or other equivalent travel document, along with the entry visa specifying the reasons for their stay and the receipt issued by Poste Italiane;
they do not transit through other Schengen countries, as this is not allowed.
The circular letter (pdf 35 Kb) of 27 June 2007 states that foreigners who have children under 14 may request Questura to issue a temporary residence permit with limited validity, containing the children's personal details, allowing them to leave Italy temporarily.

Note: The only catch is not to transit or travel through/from any Schengen countries other than Italy.

Source: Polizia di Stato`   },


    {
      question: "Can non-Indian students join the association?",
      answer:
        "While our focus is on supporting Indian students, we welcome students from all backgrounds who are interested in Indian culture and want to be part of our community.",
    },
    {
      question: "How can I volunteer or take a leadership role?",
      answer:
        "We're always looking for enthusiastic members to join our organizing committee. You can express your interest by emailing us or speaking to any of our current committee members at events.",
    },
  ]

  const livingInMilanFAQs = [
    {
      title: "Accommodation",
      faqs: [
        {
          question: "What are the best areas for students to live in Milan?",
          answer:
            "Popular student areas include Città Studi (near Politecnico), Lambrate, Bicocca (near University of Milano-Bicocca), and areas around Navigli for those studying at Bocconi. These areas offer good public transport connections and student-friendly amenities.",
        },
        {
          question: "How much should I budget for accommodation in Milan?",
          answer:
            "For a shared apartment, budget between €400-600 per month. For a private studio, prices typically range from €700-1000 per month, depending on the location and condition of the property.",
        },
        {
          question: "How can I find student accommodation in Milan?",
          answer:
            "You can look for accommodation through university housing offices, Facebook groups for international students, websites like Idealista or Immobiliare, or through our association's housing resources and network.",
        },
      ],
    },
    {
      title: "Travel",
      faqs: [
        {
          question: "How to Get the Reduced ATM Mobility Pass for Indian Students in Milan?",
          answer:
`
The **annual ATM mobility** pass allows students to access all public transportation in Milan,
including **trains, buses, trams, and the metro,** starting at **€50 per year** (depending on the
travel zones). To be eligible for this discounted rate, your ISEEO (Indicatore della
Situazione Economica Equivalente per l’Orientamento) value must be less than €6,000.
Almost all Indian students qualify under this threshold. However, you must obtain an
official ISEEO certificate, which is issued by authorized CAF (Centro di Assistenza
Fiscale) offices. The list of authorized CAF offices can be found at the link below.
List of Authorized CAF Offices
Important: Most authorized CAF offices only accept cash payments, so make sure to carry
sufficient cash when visiting.
Additionally, it is strongly recommended not to use unregistered CAF offices or
agents outside of the list provided by ATM. Some unauthorized agents charge extra fees, and
there have been reports of data theft and misuse.
Important Information & Deadlines
1. 2. 3. 4. The subscription starts on the 1st of each month and is valid for 12 months.
However, you must apply before the 10th of the previous month.
If you do not already have an ISEEO certificate (which can be obtained online for
free through the INPS website), it will take an additional week or more for the CAF
office to issue one, usually at a cost of €10.
Most CAF offices operate by appointment only, so be sure to book your
appointment in advance.
Example: If you want your ATM card to be valid from November 1, 2025, you must
complete the process by October 10, 2025. To do this, email the CAF office by
September 15, 2025, requesting an appointment and mentioning that you also need
an ISEEO certificate.
Documents Required for the ATM Mobility Pass
For First-Time Applications:
1. Passport (original + copy)
2. Visa (original + copy) (only for first-year students; not required for renewal)
3. Valid Permesso di Soggiorno (if expired, attach the ricevuta)
4. Codice Fiscale
5. ISEEO Certificate
6. A passport-sized photograph (only required for first-time applicants; for renewals,
the existing ATM card will be used)
`        },
        {
          question: "How do I travel to other cities in Italy from Milan?",
          answer:
            "Milan is well-connected by train to other major Italian cities. Trenitalia and Italo offer high-speed services. For budget travel, FlixBus provides affordable coach services. Milan also has three airports for international and domestic flights.",
        },
        {
          question: "Is it worth getting an Italian driving license?",
          answer:
            "Unless you plan to live in a remote area or travel extensively outside the city, a driving license isn't necessary in Milan. The public transport system is comprehensive, and car-sharing services like Enjoy and ShareNow are available for occasional use.",
        },
      ],
    },
    {
      title: "Food and Groceries",
      faqs: [
        {
          question: "Where can I find Indian groceries in Milan?",
          answer:
            "There are several Indian grocery stores in Milan, primarily in the Central Station area and Paolo Sarpi. Popular stores include Kathay Shop, Asia Market, and various smaller shops on Via Padova and Via Vittorio Emanuele.",
        },
        {
          question: "What are affordable supermarket options in Milan?",
          answer:
            "Budget-friendly supermarkets include Lidl, Eurospin, and Penny Market. Mid-range options include Esselunga, Carrefour, and Coop. For fresh produce, local markets like Mercato Comunale are excellent options.",
        },
        {
          question: "Are there good Indian restaurants in Milan?",
          answer:
            "Yes, Milan has several authentic Indian restaurants. Some popular options include Indian Restaurant Milan, Rangoli, Shiva, and Tandoori Bites. Our association also organizes Indian food festivals throughout the year.",
        },
      ],
    },
  ]

  const academicFAQs = [
    {
      question: "How does the Italian university grading system work?",
      answer:
        "Italian universities use a 30-point grading scale. The passing grade is typically 18/30, with 30/30 being the highest. Exceptional performance may be awarded '30 e lode' (30 with honors).",
    },
    {
      question: "Are classes taught in English or Italian?",
      answer:
        "This depends on your program. Many graduate programs, especially in business, engineering, and international studies, are taught entirely in English. Undergraduate programs are more commonly taught in Italian, though this is changing with more English options becoming available.",
    },
    {
      question: "How can I improve my Italian language skills?",
      answer:
        "Most universities offer Italian language courses for international students. There are also language exchange programs, apps like Duolingo or Babbel, and our association organizes language tandems with Italian students.",
    },
    {
      question: "What academic support services are available?",
      answer:
        "Universities offer tutoring, writing centers, and academic advisors. Our association also organizes study groups and connects new students with senior students in similar programs for mentorship.",
    },
    {
      question: "How do I get my Indian academic credentials recognized in Italy?",
      answer:
        "You'll need to go through a process called 'dichiarazione di valore' (declaration of value), which is handled by the Italian embassy in India. This process validates your previous education for Italian institutions.",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      {/* Increased padding-top to account for fixed header */}
      <div className="pt-60 pb-20">
        <div className="container mx-auto px-4">
          <div className="w-full md:w-[70%] mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a2463] mb-10 text-center">FAQs</h1>

            <FAQSection faqs={generalFAQs} />

            <FAQSection title="Living in Milan" subCategories={livingInMilanFAQs} />

            <FAQSection title="Academic Questions" faqs={academicFAQs} />
          </div>
        </div>
      </div>
    </main>
  )
}

