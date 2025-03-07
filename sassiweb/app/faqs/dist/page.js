"use strict";
exports.__esModule = true;
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var FaqSection_1 = require("@/components/FaqSection");
function FAQsPage() {
    // Sample data for the FAQs
    var generalFAQs = [
        {
            question: "How can I join the Indian Students' Association?",
            answer: "You can join our association by filling out the membership form on our website or by attending one of our welcome events at the beginning of each semester. Membership is free for all Indian students studying in Milan."
        },
        {
            question: "Are there any membership fees?",
            answer: "No, membership to the Indian Students' Association is completely free. We are funded through sponsorships, donations, and university grants."
        },
        {
            question: "How often do you organize events?",
            answer: "We typically organize 2-3 major events each semester, including cultural celebrations, networking sessions, and academic workshops. We also host smaller meetups and gatherings throughout the year."
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
                    question: "What's the best way to get around Milan?",
                    answer: "Milan has an excellent public transportation system including metro, trams, and buses. We recommend getting a monthly ATM pass (€39 for students) which gives unlimited access to all public transport within the city."
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
        React.createElement("div", { className: "pt-32 pb-20" },
            React.createElement("div", { className: "container mx-auto px-4" },
                React.createElement("div", { className: "w-full md:w-[70%] mx-auto" },
                    React.createElement("h1", { className: "text-4xl md:text-5xl font-bold text-navy-800 mb-10 text-center" }, "FAQs"),
                    React.createElement(FaqSection_1["default"], { faqs: generalFAQs }),
                    React.createElement(FaqSection_1["default"], { title: "Living in Milan", subCategories: livingInMilanFAQs }),
                    React.createElement(FaqSection_1["default"], { title: "Academic Questions", faqs: academicFAQs }))))));
}
exports["default"] = FAQsPage;
