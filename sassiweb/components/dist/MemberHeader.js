"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_1 = require("next-auth/react");
var MemberNav_1 = require("./MemberNav");
var lucide_react_1 = require("lucide-react");
var image_1 = require("next/image");
function MemberHeader() {
    var _a = react_1.useSession(), session = _a.data, status = _a.status;
    return (React.createElement("header", { className: "fixed top-0 left-0 right-0 z-50 bg-white shadow-sm" },
        React.createElement("div", { className: "container mx-auto px-4 py-4" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("div", { className: "flex items-center" },
                    React.createElement(link_1["default"], { href: "/#home", className: "font-bold text-2xl" },
                        React.createElement(image_1["default"], { src: "/assests/SASSI.png", alt: "SASSI Logo", height: 160, width: 160, objectFit: "cover", className: "rounded-lg" }))),
                React.createElement("nav", { className: "hidden md:flex items-center space-x-6" },
                    React.createElement(link_1["default"], { href: "/", className: "text-gray-800 hover:text-primary transition-colors" }, "Home"),
                    React.createElement(link_1["default"], { href: "/#about", className: "text-gray-800 hover:text-primary transition-colors" }, "About"),
                    React.createElement(link_1["default"], { href: "/events", className: "text-gray-800 hover:text-primary transition-colors" }, "Events"),
                    !session && (React.createElement(link_1["default"], { href: "/auth/signin", className: "text-gray-800 hover:text-primary transition-colors" }, "Sign In"))),
                React.createElement("div", { className: "hidden md:flex items-center space-x-4" },
                    React.createElement(link_1["default"], { href: "https://www.instagram.com/sassi.milan/", target: "_blank", className: "text-gray-800 hover:text-pink-600 transition-colors" },
                        React.createElement(lucide_react_1.Instagram, { size: 20 })),
                    React.createElement(link_1["default"], { href: "mailto:support@sassimilan.com", className: "text-gray-800 hover:text-yellow-500 transition-colors" },
                        React.createElement(lucide_react_1.Mail, { size: 20 })),
                    React.createElement(link_1["default"], { href: "https://twitter.com", target: "_blank", className: "text-gray-800 hover:text-blue-400 transition-colors" },
                        React.createElement(lucide_react_1.Twitter, { size: 20 }))))),
        session && React.createElement(MemberNav_1["default"], null)));
}
exports["default"] = MemberHeader;
