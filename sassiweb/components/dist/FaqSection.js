"use client";
"use strict";
exports.__esModule = true;
var accordion_1 = require("@/components/ui/accordion");
var react_markdown_1 = require("react-markdown");
function FAQSection(_a) {
    var title = _a.title, faqs = _a.faqs, subCategories = _a.subCategories;
    return (React.createElement("div", { className: "bg-white rounded-2xl p-6 shadow-md mb-8" },
        title && React.createElement("h2", { className: "text-xl font-bold mb-4" }, title),
        faqs && (React.createElement(accordion_1.Accordion, { type: "single", collapsible: true, className: "w-full" }, faqs.map(function (faq, index) { return (React.createElement(accordion_1.AccordionItem, { key: index, value: "item-" + index, className: "last:border-0" },
            React.createElement(accordion_1.AccordionTrigger, { className: "text-left" }, faq.question),
            React.createElement(accordion_1.AccordionContent, null,
                React.createElement("div", { className: "text-gray-700" },
                    React.createElement(react_markdown_1["default"], null, faq.answer))))); }))),
        subCategories && (React.createElement("div", { className: "space-y-6" }, subCategories.map(function (category, categoryIndex) { return (React.createElement("div", { key: categoryIndex },
            React.createElement("h3", { className: "font-semibold text-lg mb-3" }, category.title),
            React.createElement(accordion_1.Accordion, { type: "single", collapsible: true, className: "w-full" }, category.faqs.map(function (faq, faqIndex) { return (React.createElement(accordion_1.AccordionItem, { key: faqIndex, value: categoryIndex + "-item-" + faqIndex, className: faqIndex === category.faqs.length - 1 ? "border-0" : "" },
                React.createElement(accordion_1.AccordionTrigger, { className: "text-left" }, faq.question),
                React.createElement(accordion_1.AccordionContent, null,
                    React.createElement("div", { className: "text-gray-700" },
                        React.createElement(react_markdown_1["default"], null, faq.answer))))); })))); })))));
}
exports["default"] = FAQSection;
