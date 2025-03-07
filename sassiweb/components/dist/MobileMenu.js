"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
function MobileMenu() {
    var _a = react_1.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var toggleMenu = function () {
        setIsOpen(!isOpen);
    };
    var closeMenu = function () {
        setIsOpen(false);
    };
    return (React.createElement("div", { className: "md:hidden" },
        React.createElement("button", { onClick: toggleMenu, className: "fixed top-4 right-4 z-50 p-2 text-gray-800 focus:outline-none", "aria-label": "Toggle menu" }, isOpen ? React.createElement(lucide_react_1.X, { size: 24 }) : React.createElement(lucide_react_1.Menu, { size: 24 })),
        React.createElement("div", { className: "fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out " + (isOpen ? "translate-x-0" : "translate-x-full") },
            React.createElement("div", { className: "flex flex-col items-center justify-center h-full pt-16" },
                React.createElement("nav", { className: "flex flex-col items-center space-y-6 text-xl" },
                    React.createElement(link_1["default"], { href: "/", onClick: closeMenu, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Home"),
                    React.createElement(link_1["default"], { href: "#about", onClick: closeMenu, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "About"),
                    React.createElement(link_1["default"], { href: "#life-in-milan", onClick: closeMenu, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Life in Milan"),
                    React.createElement(link_1["default"], { href: "#uni-networks", onClick: closeMenu, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Uni Networks"),
                    React.createElement(link_1["default"], { href: "#events", onClick: closeMenu, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Events"),
                    React.createElement(link_1["default"], { href: "#join-us", onClick: closeMenu, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Join Us"),
                    React.createElement(link_1["default"], { href: "#support-us", onClick: closeMenu, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Support Us"),
                    React.createElement(link_1["default"], { href: "#contact-us", onClick: closeMenu, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Contact Us"),
                    React.createElement(link_1["default"], { href: "/faqs", onClick: closeMenu, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "FAQs"),
                    React.createElement("div", { className: "flex items-center space-x-6 mt-8" },
                        React.createElement(link_1["default"], { href: "https://instagram.com", target: "_blank", className: "text-gray-800 hover:text-pink-600 transition-colors" },
                            React.createElement(lucide_react_1.Instagram, { size: 24 })),
                        React.createElement(link_1["default"], { href: "mailto:contact@indianstudents.it", className: "text-gray-800 hover:text-blue-600 transition-colors" },
                            React.createElement(lucide_react_1.Mail, { size: 24 })),
                        React.createElement(link_1["default"], { href: "https://twitter.com", target: "_blank", className: "text-gray-800 hover:text-blue-400 transition-colors" },
                            React.createElement(lucide_react_1.Twitter, { size: 24 }))))))));
}
exports["default"] = MobileMenu;
