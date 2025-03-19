"use strict";
exports.__esModule = true;
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var FaqSection_1 = require("@/components/FaqSection");
function FAQsPage() {
    // Sample data for the FAQs
    var generalFAQs = [
        {
            question: "How do I obtain a Tessera Sanitaria?",
            answer: "**Tessera Sanitaria**\n\n            A step-by-step guide to obtaining a Tessera Sanitaria\n\n          Pay the Annual Fee: Head to a Post Office and pay the annual fee using a postal order (Bollettino Postale) for SSN. Keep the receipt.\n\n        If you are staying for study purposes you are entitled to two major benefits. You can:\n  \n  -1. Apply for registration to the Italian National Health Service (SSN \u2013 Servizio Sanitario Nazionale) even if staying for less than 3 months\n-2. Pay a fixed yearly lump sum: \u20AC149.77 for students\nNote: The paid health care is an annual registration (January\u2013December) and expires on December 31st of each year. It does not get prorated \u2013 meaning if you arrive in Italy in October and register with payment, you still pay the full year amount.\nGather the Required Documents:\n\nPassport\nPermit to Stay or Receipt\nCodice Fiscale\nSelf-declaration of Residency (Residence certificate [Residenza]) \u2013 must match the address on your permit. A Rental Contract registered with Agenzia delle Entrate is necessary.\nReceipt of Payment (annual fee at the Post Office)\nPassport-size photos\nAdditional Documents (depending on your status, e.g., student, relative, au pair, etc.)\nComplete Registration: Submit the required documents to your ASL office and complete the registration. You will receive a receipt as proof until your Tessera Sanitaria arrives by mail.\n\nAn appointment must be booked at the nearby ASL office to complete registration:\nUse: prenota.zerocoda.it\nIn Cosa vuoi prenotare? select \u201CScelta / Revoca / Cambio del medico (Choice / Revocation / Change of doctor)\u201D\nIn Dove?, provide the name of your city\nSelect the nearby ASL and book an appointment\nSource of Information:\nInformation last updated on: 20 December 2023\n"
        },
        {
            question: "How do I obtain a Tax Code (Codice Fiscale)?",
            answer: "**Tax Code**\n   \nSteps to fill the form\n\nDownload the pdf form AA4/8 from the Agenzia delle Entrate website and print it, or open it with an app that allows you to fill it in\nTick \u201CAllocation of a tax code\u201D\nYou have to fill in part B (personal data \u2013 exactly as in your ID) and part D (your current address)\nIn part C, you can list your address in Milano (if known) as a domicile for fiscal communications. If not, leave it blank\nUnder \u201Csignatures\u201D, date and place your signature in pen\nReceive in-person:\n\nMake a copy of your ID document (passport or an ID card issued by your municipality)\nBring everything to the closest Agenzia delle Entrate (Italian Revenue Agency). Find the closest office on their website.\nTake a number, wait your turn, and they will type in your data and give you an official paper version of your unique Codice Fiscale immediately.\nReceive online:\n\nSend an e-mail to the proper Consulate address with the signed/scanned form plus a copy of your ID/Passport\nThe Consulate will reply with a .pdf tax code certificate you can use as needed\nSource:\n\nYesMilano\nDoctorsInItaly"
        },
        {
            question: "How do I obtain or renew my Residence Permit (Permesso di Soggiorno)?",
            answer: "**Residence Permit**\n\nPermesso di Soggiorno kit:\nLink to the list of Poste Italiane with Sportello Amico: Google Maps\n\nPermesso di Soggiorno student new:\nSample to fill the kit: Polimi Example\nNote: Remember to take the original documents for verification.\nDocuments to be submitted in Poste Italiane:\n\nCopy of Passport\nCopy of Visa\nCopy of Codice Fiscale (Tax code)\nDocument to be submitted in Questura:\nCopy of Medical Insurance\nCopy of Passport\nCopy of Tax code\nCopy of Admission letter from the university\nPassport size photos\nPermesso di Soggiorno student renewal:\nSample to fill the kit: Unicatt Example\nNote: Remember to take the original documents for verification.\nDocuments to be submitted in Poste Italiane:\n\nCopy of Passport\nCopy of old Permesso di Soggiorno\nCopy of Codice Fiscale (Tax code)\nDocument to be submitted in Questura:\nCopy of Medical Insurance\nCopy of old Permesso di Soggiorno\nCopy of Bank balance (Not less than 6000 euro)/scholarship certificate\nCopy of Passport\nCopy of Tax code\nEnrollment certificate received from the university\nPassport size photos\nCopy of Carta d'identit\u00E0 (some Questura ask this)\nPermesso di Soggiorno for work search:\nSample to fill the kit: Sample kit\nNote: Remember to take the original documents for verification.\nDocuments to be submitted in Poste Italiane:\n\nCopy of Passport\nCopy of old Permesso di Soggiorno\nCopy of Codice Fiscale (Tax code)\nDocument to be submitted in Questura:\nCopy of DID online\nCopy of Medical Insurance\nCopy of old Permesso di Soggiorno\nCopy of Bank balance (Not less than 6000 euro)\nCopy of Passport\nCopy of Tax code\nCopy of Degree Certificate\nPassport size photos\nCopy of Carta d'identit\u00E0 (some Questura ask this)\nPermesso di Soggiorno for work (with work contract):\nSample to fill the kit: YesMilano Guide\nNote: Remember to take the original documents for verification.\nDocuments to be submitted in Poste Italiane:\n\nCopy of Passport\nCopy of old Permesso di Soggiorno\nCopy of Codice Fiscale (Tax code)\nDocument to be submitted in Questura:\nCopy of Work Contract\nCopy of old Permesso di Soggiorno\nCopy of Passport\nCopy of Tax code\nPassport size photos\nCopy of last three months' pay slip (some Questura ask)\nCopy of Medical Insurance (some Questura ask)\nCopy of Carta d'identit\u00E0 (some Questura ask)\nReturning from India with Residence permit slip:\nForeigners awaiting renewal of their residence permits can leave and re-enter Italy if they hold:\n\nthe receipt issued by Italian Post offices (Poste Italiane S.p.A) certifying the submission of the application\nthe expired residence permit\ntheir passport or other equivalent travel document\nThe same facilitated procedure is granted to foreigners who have submitted their application for their first residence permits (employment, self-employment, or family reunification), provided that:\nthey leave and re-enter Italy through any Italian external border crossing point (circular letter 11th March 2009);\nthey show their passport or other equivalent travel document, along with the entry visa specifying the reasons for their stay and the receipt issued by Poste Italiane;\nthey do not transit through other Schengen countries, as this is not allowed.\nThe circular letter (pdf 35 Kb) of 27 June 2007 states that foreigners who have children under 14 may request Questura to issue a temporary residence permit with limited validity, containing the children's personal details, allowing them to leave Italy temporarily.\n\nNote: The only catch is not to transit or travel through/from any Schengen countries other than Italy.\n\nSource: Polizia di Stato"
        },
        {
            question: "Can non-Indian students join the association?",
            answer: "While our focus is on supporting Indian students, we welcome students from all backgrounds who are interested in Indian culture and want to be part of our community."
        },
        {
            question: "How can I volunteer or take a leadership role?",
            answer: "We're always looking for enthusiastic members to join our organizing committee. You can express your interest by emailing us or speaking to any of our current committee members at events."
        },
    ];
    var livingInMilanFAQs = [
        {
            title: "Accommodation",
            faqs: [
                {
                    question: "What are the best areas for students to live in Milan?",
                    answer: "Popular student areas include Città Studi (near Politecnico), Lambrate, Bicocca (near University of Milano-Bicocca), and areas around Navigli for those studying at Bocconi. These areas offer good public transport connections and student-friendly amenities."
                },
                {
                    question: "How much should I budget for accommodation in Milan?",
                    answer: "For a shared apartment, budget between €400-600 per month. For a private studio, prices typically range from €700-1000 per month, depending on the location and condition of the property."
                },
                {
                    question: "How can I find student accommodation in Milan?",
                    answer: "You can look for accommodation through university housing offices, Facebook groups for international students, websites like Idealista or Immobiliare, or through our association's housing resources and network."
                },
            ]
        },
        {
            title: "Travel",
            faqs: [
                {
                    question: "How to Get the Reduced ATM Mobility Pass for Indian Students in Milan?",
                    answer: "\nThe **annual ATM mobility** pass allows students to access all public transportation in Milan,\nincluding **trains, buses, trams, and the metro,** starting at **\u20AC50 per year** (depending on the\ntravel zones). To be eligible for this discounted rate, your ISEEO (Indicatore della\nSituazione Economica Equivalente per l\u2019Orientamento) value must be less than \u20AC6,000.\nAlmost all Indian students qualify under this threshold. However, you must obtain an\nofficial ISEEO certificate, which is issued by authorized CAF (Centro di Assistenza\nFiscale) offices. The list of authorized CAF offices can be found at the link below.\nList of Authorized CAF Offices\nImportant: Most authorized CAF offices only accept cash payments, so make sure to carry\nsufficient cash when visiting.\nAdditionally, it is strongly recommended not to use unregistered CAF offices or\nagents outside of the list provided by ATM. Some unauthorized agents charge extra fees, and\nthere have been reports of data theft and misuse.\nImportant Information & Deadlines\n1. 2. 3. 4. The subscription starts on the 1st of each month and is valid for 12 months.\nHowever, you must apply before the 10th of the previous month.\nIf you do not already have an ISEEO certificate (which can be obtained online for\nfree through the INPS website), it will take an additional week or more for the CAF\noffice to issue one, usually at a cost of \u20AC10.\nMost CAF offices operate by appointment only, so be sure to book your\nappointment in advance.\nExample: If you want your ATM card to be valid from November 1, 2025, you must\ncomplete the process by October 10, 2025. To do this, email the CAF office by\nSeptember 15, 2025, requesting an appointment and mentioning that you also need\nan ISEEO certificate.\nDocuments Required for the ATM Mobility Pass\nFor First-Time Applications:\n1. Passport (original + copy)\n2. Visa (original + copy) (only for first-year students; not required for renewal)\n3. Valid Permesso di Soggiorno (if expired, attach the ricevuta)\n4. Codice Fiscale\n5. ISEEO Certificate\n6. A passport-sized photograph (only required for first-time applicants; for renewals,\nthe existing ATM card will be used)\n"
                },
                {
                    question: "How do I travel to other cities in Italy from Milan?",
                    answer: "Milan is well-connected by train to other major Italian cities. Trenitalia and Italo offer high-speed services. For budget travel, FlixBus provides affordable coach services. Milan also has three airports for international and domestic flights."
                },
                {
                    question: "Is it worth getting an Italian driving license?",
                    answer: "Unless you plan to live in a remote area or travel extensively outside the city, a driving license isn't necessary in Milan. The public transport system is comprehensive, and car-sharing services like Enjoy and ShareNow are available for occasional use."
                },
            ]
        },
        {
            title: "Food and Groceries",
            faqs: [
                {
                    question: "Where can I find Indian groceries in Milan?",
                    answer: "There are several Indian grocery stores in Milan, primarily in the Central Station area and Paolo Sarpi. Popular stores include Kathay Shop, Asia Market, and various smaller shops on Via Padova and Via Vittorio Emanuele."
                },
                {
                    question: "What are affordable supermarket options in Milan?",
                    answer: "Budget-friendly supermarkets include Lidl, Eurospin, and Penny Market. Mid-range options include Esselunga, Carrefour, and Coop. For fresh produce, local markets like Mercato Comunale are excellent options."
                },
                {
                    question: "Are there good Indian restaurants in Milan?",
                    answer: "Yes, Milan has several authentic Indian restaurants. Some popular options include Indian Restaurant Milan, Rangoli, Shiva, and Tandoori Bites. Our association also organizes Indian food festivals throughout the year."
                },
            ]
        },
    ];
    var academicFAQs = [
        {
            question: "How does the Italian university grading system work?",
            answer: "Italian universities use a 30-point grading scale. The passing grade is typically 18/30, with 30/30 being the highest. Exceptional performance may be awarded '30 e lode' (30 with honors)."
        },
        {
            question: "Are classes taught in English or Italian?",
            answer: "This depends on your program. Many graduate programs, especially in business, engineering, and international studies, are taught entirely in English. Undergraduate programs are more commonly taught in Italian, though this is changing with more English options becoming available."
        },
        {
            question: "How can I improve my Italian language skills?",
            answer: "Most universities offer Italian language courses for international students. There are also language exchange programs, apps like Duolingo or Babbel, and our association organizes language tandems with Italian students."
        },
        {
            question: "What academic support services are available?",
            answer: "Universities offer tutoring, writing centers, and academic advisors. Our association also organizes study groups and connects new students with senior students in similar programs for mentorship."
        },
        {
            question: "How do I get my Indian academic credentials recognized in Italy?",
            answer: "You'll need to go through a process called 'dichiarazione di valore' (declaration of value), which is handled by the Italian embassy in India. This process validates your previous education for Italian institutions."
        },
    ];
    return (React.createElement("main", { className: "min-h-screen bg-gray-50" },
        React.createElement(Header_1["default"], null),
        React.createElement(MobileMenu_1["default"], null),
        React.createElement("div", { className: "pt-60 pb-20" },
            React.createElement("div", { className: "container mx-auto px-4" },
                React.createElement("div", { className: "w-full md:w-[70%] mx-auto" },
                    React.createElement("h1", { className: "text-4xl md:text-5xl font-bold text-[#0a2463] mb-10 text-center" }, "Frequently asked questions"),
                    React.createElement(FaqSection_1["default"], { faqs: generalFAQs }),
                    React.createElement(FaqSection_1["default"], { title: "Living in Milan", subCategories: livingInMilanFAQs }),
                    React.createElement(FaqSection_1["default"], { title: "Academic Questions", faqs: academicFAQs }))))));
}
exports["default"] = FAQsPage;
