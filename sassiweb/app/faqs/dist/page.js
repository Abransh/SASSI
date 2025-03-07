"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var faqs = [
    {
        title: "How do I obtain a Tessera Sanitaria?r",
        content: "This is the space to describe the service and explain how customers or clients can benefit from it. It's an opportunity to add a short description that includes relevant details, like pricing, duration, location and how to book the service."
    },
    {
        title: "Plan your itinerary",
        content: "Create a personalized itinerary that matches your interests and travel style. Our local experts will help you plan the perfect route."
    },
    {
        title: "Book your accommodation",
        content: "Find and book verified accommodations that suit your preferences and budget. We ensure you get the best deals."
    },
    {
        title: "Dive into local experiences",
        content: "Discover authentic local experiences and activities that make your trip unique and memorable."
    },
];
function FaqsSection() {
    var _a = react_1.useState(0), openSection = _a[0], setOpenSection = _a[1];
    return (React.createElement("div", { className: "min-h-screen bg-gray-50" },
        React.createElement("div", { className: "mx-auto max-w-7xl px-4 py-24" },
            React.createElement("section", { className: "mb-24" },
                React.createElement("div", { className: "grid gap-8 md:grid-cols-2" },
                    React.createElement("div", { className: "flex flex-col" },
                        React.createElement("div", { className: "mb-6 rounded-2xl  bg-white p-4 shadow-sm" },
                            React.createElement("h2", { className: "text-center text-3xl font-bold  text-navy-blue" }, "FAQs")),
                        React.createElement("div", { className: "flex-1 rounded-3xl bg-white p-6 shadow-sm" },
                            React.createElement("div", { className: "space-y-4" }, faqs.map(function (item, index) { return (React.createElement("div", { key: index },
                                React.createElement("button", { onClick: function () { return setOpenSection(openSection === index ? null : index); }, className: "flex w-full items-center justify-between py-3 text-left" },
                                    React.createElement("span", { className: "text-xl font-medium" }, item.title),
                                    React.createElement(lucide_react_1.ChevronDown, { className: "h-5 w-5 transition-transform duration-300 " + (openSection === index ? "rotate-180" : "") })),
                                React.createElement(framer_motion_1.AnimatePresence, null, openSection === index && (React.createElement(framer_motion_1.motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.3 }, className: "overflow-hidden" },
                                    React.createElement("p", { className: "py-3 text-gray-700" }, item.content)))),
                                index < faqs.length - 1 && React.createElement("div", { className: "border-t border-dashed border-gray-300" }))); })))))))));
}
exports["default"] = FaqsSection;
