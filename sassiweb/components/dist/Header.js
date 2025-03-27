"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var image_1 = require("next/image");
var react_1 = require("next-auth/react");
function Header() {
    var session = react_1.useSession().data;
    return (React.createElement("header", { className: "fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm" },
        React.createElement("div", { className: "container mx-auto px-4 py-4" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("div", { className: "flex items-center" },
                    React.createElement(link_1["default"], { href: "/#home", className: "font-bold text-2xl" },
                        React.createElement(image_1["default"], { src: "/assests/SASSI.png", alt: "SASSI Logo", height: 200, width: 200, objectFit: "cover", className: "rounded-lg" }))),
                React.createElement("nav", { className: "hidden md:flex items-center space-x-6" },
                    React.createElement(link_1["default"], { href: "#home", className: "text-gray-800 hover:text-primary transition-colors" }, "Home"),
                    React.createElement(link_1["default"], { href: "#life-in-milan", className: "text-gray-800 hover:text-primary transition-colors" }, "Life in Milan"),
                    React.createElement(link_1["default"], { href: "#uni-networks", className: "text-gray-800 hover:text-primary transition-colors" }, "Uni Networks"),
                    React.createElement(link_1["default"], { href: "#events", className: "text-gray-800 hover:text-primary transition-colors" }, "Events"),
                    React.createElement(link_1["default"], { href: "#join-us", className: "text-gray-800 hover:text-primary transition-colors" }, "Join Us"),
                    React.createElement(link_1["default"], { href: "#contact-us", className: "text-gray-800 hover:text-primary transition-colors" }, "Contact Us"),
                    React.createElement(link_1["default"], { href: "/faqs", className: "text-gray-800 hover:text-primary transition-colors" }, "FAQs"),
                    !session ? (React.createElement(link_1["default"], { href: "/auth/signin", className: "px-4 py-2 bg-yellow-400 text-black font-medium rounded-md hover:bg-yellow-500 transition-colors" }, "Login / Register")) : (React.createElement("div", { className: "flex items-center space-x-3" },
                        React.createElement(link_1["default"], { href: "/dashboard", className: "text-gray-800 hover:text-primary transition-colors" }, "Dashboard"),
                        React.createElement("button", { onClick: function () { return react_1.signOut({ callbackUrl: '/' }); }, className: "flex items-center px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors" },
                            React.createElement(lucide_react_1.LogOut, { size: 16, className: "mr-1" }),
                            React.createElement("span", null, "Logout"))))),
                React.createElement("div", { className: "md:hidden" }),
                React.createElement("div", { className: "hidden md:flex items-center space-x-4" },
                    React.createElement(link_1["default"], { href: "https://www.instagram.com/sassi.milan/", target: "_blank", className: "text-gray-800 hover:text-pink-600 transition-colors" },
                        React.createElement(lucide_react_1.Instagram, { size: 20 })),
                    React.createElement(link_1["default"], { href: "mailto:support@sassimilan.com", className: "text-gray-800 hover:text-yellow-500 transition-colors" },
                        React.createElement(lucide_react_1.Mail, { size: 20 })),
                    React.createElement(link_1["default"], { href: "https://twitter.com", target: "_blank", className: "text-gray-800 hover:text-blue-400 transition-colors" },
                        React.createElement(lucide_react_1.Twitter, { size: 20 })))))));
}
exports["default"] = Header;
