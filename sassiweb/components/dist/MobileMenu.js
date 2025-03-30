"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var react_2 = require("next-auth/react");
var navigation_1 = require("next/navigation");
function MobileMenu() {
    var _a = react_1.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var session = react_2.useSession().data;
    var router = navigation_1.useRouter();
    var pathname = navigation_1.usePathname();
    // Close mobile menu when route changes
    react_1.useEffect(function () {
        setIsOpen(false);
    }, [pathname]);
    var toggleMenu = function () {
        setIsOpen(!isOpen);
    };
    var closeMenu = function () {
        setIsOpen(false);
    };
    var handleSignOut = function () {
        react_2.signOut({ callbackUrl: '/' });
        closeMenu();
    };
    // Function to handle smooth scrolling to anchors
    var handleAnchorClick = function (e, anchor) {
        e.preventDefault();
        closeMenu();
        // Find the element to scroll to
        var element = document.getElementById(anchor);
        if (element) {
            // If we're already on the home page, scroll to the element
            if (pathname === "/") {
                element.scrollIntoView({ behavior: "smooth" });
            }
            else {
                // If we're on another page, navigate to home page with the anchor
                router.push("/#" + anchor);
            }
        }
        else {
            // If element not found, just navigate to the anchor
            router.push("/#" + anchor);
        }
    };
    return (React.createElement("div", { className: "md:hidden" },
        React.createElement("button", { onClick: toggleMenu, className: "fixed top-4 right-4 z-50 p-2 text-gray-800 focus:outline-none", "aria-label": "Toggle menu" }, isOpen ? React.createElement(lucide_react_1.X, { size: 24 }) : React.createElement(lucide_react_1.Menu, { size: 24 })),
        React.createElement("div", { className: "fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out " + (isOpen ? "translate-x-0" : "translate-x-full") },
            React.createElement("div", { className: "flex flex-col items-center justify-center h-full pt-16" },
                React.createElement("nav", { className: "flex flex-col items-center space-y-6 text-xl" },
                    React.createElement(link_1["default"], { href: "/", onClick: closeMenu, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Home"),
                    React.createElement("a", { href: "/#life-in-milan", onClick: function (e) { return handleAnchorClick(e, "life-in-milan"); }, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Life in Milan"),
                    React.createElement("a", { href: "/#uni-networks", onClick: function (e) { return handleAnchorClick(e, "uni-networks"); }, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Uni Networks"),
                    React.createElement("a", { href: "/#events", onClick: function (e) { return handleAnchorClick(e, "events"); }, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Events"),
                    React.createElement("a", { href: "/#join-us", onClick: function (e) { return handleAnchorClick(e, "join-us"); }, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Join Us"),
                    React.createElement("a", { href: "/#contact-us", onClick: function (e) { return handleAnchorClick(e, "contact-us"); }, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Contact Us"),
                    React.createElement(link_1["default"], { href: "/faqs", onClick: closeMenu, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "FAQs"),
                    !session ? (React.createElement(link_1["default"], { href: "/auth/signin", onClick: closeMenu, className: "px-5 py-2 bg-yellow-400 text-black font-medium rounded-md hover:bg-yellow-500 transition-colors" }, "Login / Register")) : (React.createElement(React.Fragment, null,
                        React.createElement(link_1["default"], { href: "/dashboard", onClick: closeMenu, className: "text-gray-800 hover:text-orange-600 transition-colors" }, "Dashboard"),
                        React.createElement("button", { onClick: handleSignOut, className: "flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors" },
                            React.createElement(lucide_react_1.LogOut, { size: 18, className: "mr-2" }),
                            React.createElement("span", null, "Logout")))),
                    React.createElement("div", { className: "flex items-center space-x-6 mt-8" },
                        React.createElement(link_1["default"], { href: "https://www.instagram.com/sassi.milan/", target: "_blank", className: "text-gray-800 hover:text-pink-600 transition-colors", onClick: closeMenu },
                            React.createElement(lucide_react_1.Instagram, { size: 24 })),
                        React.createElement(link_1["default"], { href: "mailto:support@sassimilan.com", className: "text-gray-800 hover:text-blue-600 transition-colors", onClick: closeMenu },
                            React.createElement(lucide_react_1.Mail, { size: 24 })),
                        React.createElement(link_1["default"], { href: "https://twitter.com", target: "_blank", className: "text-gray-800 hover:text-blue-400 transition-colors", onClick: closeMenu },
                            React.createElement(lucide_react_1.Twitter, { size: 24 }))))))));
}
exports["default"] = MobileMenu;
