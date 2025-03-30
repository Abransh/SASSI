// // components/LifeInMilan.tsx - Updated version
// import Link from "next/link"
// import Image from "next/image"
// export default function LifeInMilanSection() {
//   return (
//     <section id="life-in-milan" className="py-20 relative">
//       {/* Background image with Milan skyline outline */}
//       <div className="absolute inset-0 opacity-10 pointer-events-none">
//       <Image
//                  src="/assests/milan.png"
//                  alt="Milan"
//                  layout="fill"
//                  objectFit="cover"
//                  className="rounded-lg"
//                  />
//       </div>
//       <div className="container mx-auto px-4 relative z-10">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold mb-4">Life in Milan</h2>
//           <h3 className="text-2xl mb-6">Your Guide to Life in Italy</h3>
//           <p className="max-w-4xl mx-auto text-lg text-gray-700">
//             Explore resources to make your journey to Milan seamless, welcoming, and enriching.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {/* Before Arrival */}
//           <div className="flex flex-col items-center">
//             <Link
//               href="/resources/before-arrival"
//               className="mb-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
//             >
//               BEFORE ARRIVAL
//             </Link>
//             <p className="text-center text-gray-700">Essential tips to prepare before you arrive in Italy.</p>
//           </div>
//           {/* Living in Milan */}
//           <div className="flex flex-col items-center">
//             <Link
//               href="/resources/living-in-milan"
//               className="mb-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
//             >
//               LIVING IN MILAN
//             </Link>
//             <p className="text-center text-gray-700">A guide to settling in and navigating life in Milan.</p>
//           </div>
//           {/* After Graduation */}
//           <div className="flex flex-col items-center">
//             <Link
//               href="/resources/after-graduation"
//               className="mb-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
//             >
//               AFTER GRADUATION
//             </Link>
//             <p className="text-center text-gray-700">Resources for your next steps after completing your studies.</p>
//           </div>
//            {/* FAQs */}
//            <div className="flex flex-col items-center">
//             <Link
//               href="/faqs"
//               className="mb-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
//             >
//               FAQS
//             </Link>
//             <p className="text-center text-gray-700">Our comprehensive Frequently Asked Questions.</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var image_1 = require("next/image");
var lucide_react_1 = require("lucide-react");
function LifeInMilanSection() {
    var sectionRef = react_1.useRef(null);
    var elementsRef = react_1.useRef([]);
    react_1.useEffect(function () {
        var section = sectionRef.current;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // When section enters viewport, animate heading
                    var heading = entry.target.querySelector("[data-animate='heading']");
                    if (heading) {
                        heading.classList.add("opacity-100", "translate-y-0");
                        heading.classList.remove("opacity-0", "translate-y-10");
                    }
                    // Animate cards with delay
                    var cards = entry.target.querySelectorAll("[data-animate='card']");
                    cards.forEach(function (card, index) {
                        setTimeout(function () {
                            card.classList.add("opacity-100", "translate-y-0");
                            card.classList.remove("opacity-0", "translate-y-10");
                        }, 300 + (index * 150));
                    });
                }
            });
        }, { threshold: 0.2 });
        if (section) {
            observer.observe(section);
        }
        return function () {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);
    return (React.createElement("section", { ref: sectionRef, id: "life-in-milan", className: "py-24 relative bg-gradient-to-b from-[#FDF8F4] to-gray-50" },
        React.createElement("div", { className: "absolute inset-0 opacity-8 pointer-events-none overflow-hidden" },
            React.createElement(image_1["default"], { src: "/assests/milan.png", alt: "Milan Skyline", layout: "fill", objectFit: "cover", className: "opacity-10" })),
        React.createElement("div", { className: "container mx-auto px-4 relative z-10" },
            React.createElement("div", { "data-animate": "heading", className: "text-center mb-16 opacity-0 translate-y-10 transition-all duration-1000" },
                React.createElement("span", { className: "inline-block py-1 px-3 text-sm bg-blue-100 text-blue-800 rounded-full mb-4 font-medium" }, "Resources Hub"),
                React.createElement("h2", { className: "text-4xl font-bold mb-4 text-gray-900" }, "Life in Milan"),
                React.createElement("p", { className: "max-w-2xl mx-auto text-lg text-gray-700" }, "Explore resources to make your journey to Milan seamless, welcoming, and enriching.")),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" },
                React.createElement("div", { "data-animate": "card", ref: function (el) { elementsRef.current[0] = el; }, className: "bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 opacity-0 translate-y-10" },
                    React.createElement("div", { className: "p-6" },
                        React.createElement("div", { className: "w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-6" },
                            React.createElement(lucide_react_1.Plane, { className: "h-6 w-6 text-yellow-600" })),
                        React.createElement("h3", { className: "text-xl font-bold mb-3 text-gray-900" }, "Before Arrival"),
                        React.createElement("p", { className: "text-gray-700 mb-6" }, "Essential tips to prepare before you arrive in Italy - visas, documentation, and pre-departure checklist."),
                        React.createElement(link_1["default"], { href: "/resources/before-arrival", className: "inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700" },
                            "Explore Resources",
                            React.createElement("svg", { className: "ml-2 w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }))))),
                React.createElement("div", { "data-animate": "card", ref: function (el) { elementsRef.current[1] = el; }, className: "bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 opacity-0 translate-y-10" },
                    React.createElement("div", { className: "p-6" },
                        React.createElement("div", { className: "w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6" },
                            React.createElement(lucide_react_1.Home, { className: "h-6 w-6 text-blue-600" })),
                        React.createElement("h3", { className: "text-xl font-bold mb-3 text-gray-900" }, "Living in Milan"),
                        React.createElement("p", { className: "text-gray-700 mb-6" }, "A guide to settling in and navigating life in Milan - housing, transportation, healthcare, and daily life."),
                        React.createElement(link_1["default"], { href: "/resources/living-in-milan", className: "inline-flex items-center text-blue-600 font-medium hover:text-blue-700" },
                            "Explore Resources",
                            React.createElement("svg", { className: "ml-2 w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }))))),
                React.createElement("div", { "data-animate": "card", ref: function (el) { elementsRef.current[2] = el; }, className: "bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 opacity-0 translate-y-10" },
                    React.createElement("div", { className: "p-6" },
                        React.createElement("div", { className: "w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6" },
                            React.createElement(lucide_react_1.FileText, { className: "h-6 w-6 text-green-600" })),
                        React.createElement("h3", { className: "text-xl font-bold mb-3 text-gray-900" }, "After Graduation"),
                        React.createElement("p", { className: "text-gray-700 mb-6" }, "Resources for your next steps after completing your studies - career opportunities, staying in Italy, and more."),
                        React.createElement(link_1["default"], { href: "/resources/after-graduation", className: "inline-flex items-center text-green-600 font-medium hover:text-green-700" },
                            "Explore Resources",
                            React.createElement("svg", { className: "ml-2 w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }))))),
                React.createElement("div", { "data-animate": "card", ref: function (el) { elementsRef.current[3] = el; }, className: "bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 opacity-0 translate-y-10" },
                    React.createElement("div", { className: "p-6" },
                        React.createElement("div", { className: "w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6" },
                            React.createElement(lucide_react_1.HelpCircle, { className: "h-6 w-6 text-purple-600" })),
                        React.createElement("h3", { className: "text-xl font-bold mb-3 text-gray-900" }, "FAQs"),
                        React.createElement("p", { className: "text-gray-700 mb-6" }, "Our comprehensive Frequently Asked Questions covering everything from visas to daily life in Milan."),
                        React.createElement(link_1["default"], { href: "/faqs", className: "inline-flex items-center text-purple-600 font-medium hover:text-purple-700" },
                            "View FAQs",
                            React.createElement("svg", { className: "ml-2 w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" })))))))));
}
exports["default"] = LifeInMilanSection;
