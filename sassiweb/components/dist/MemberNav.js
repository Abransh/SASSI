"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("next-auth/react");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var react_3 = require("next-auth/react");
function MemberNav() {
    var session = react_2.useSession().data;
    var pathname = navigation_1.usePathname();
    var _a = react_1.useState(false), mobileMenuOpen = _a[0], setMobileMenuOpen = _a[1];
    var _b = react_1.useState(false), resourcesDropdownOpen = _b[0], setResourcesDropdownOpen = _b[1];
    // Close mobile menu on route change
    react_1.useEffect(function () {
        setMobileMenuOpen(false);
    }, [pathname]);
    if (!session) {
        return null;
    }
    var isActive = function (path) { return pathname.startsWith(path); };
    return (React.createElement("div", { className: "bg-white shadow-sm border-b" },
        React.createElement("div", { className: "container mx-auto px-4" },
            React.createElement("div", { className: "flex items-center justify-between py-2" },
                React.createElement("div", { className: "hidden md:flex items-center space-x-6" },
                    React.createElement(link_1["default"], { href: "/profile", className: "flex items-center px-3 py-2 rounded-md " + (isActive("/profile")
                            ? "bg-orange-100 text-orange-700"
                            : "hover:bg-gray-100") },
                        React.createElement(lucide_react_1.User, { size: 18, className: "mr-2" }),
                        React.createElement("span", null, "My Profile")),
                    React.createElement(link_1["default"], { href: "/members", className: "flex items-center px-3 py-2 rounded-md " + (isActive("/members")
                            ? "bg-orange-100 text-orange-700"
                            : "hover:bg-gray-100") },
                        React.createElement(lucide_react_1.Users, { size: 18, className: "mr-2" }),
                        React.createElement("span", null, "Members")),
                    React.createElement("div", { className: "relative" },
                        React.createElement("button", { onClick: function () { return setResourcesDropdownOpen(!resourcesDropdownOpen); }, className: "flex items-center px-3 py-2 rounded-md " + (isActive("/resources")
                                ? "bg-orange-100 text-orange-700"
                                : "hover:bg-gray-100") },
                            React.createElement(lucide_react_1.FileText, { size: 18, className: "mr-2" }),
                            React.createElement("span", null, "Resources"),
                            React.createElement(lucide_react_1.ChevronDown, { size: 16, className: "ml-2" })),
                        resourcesDropdownOpen && (React.createElement("div", { className: "absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg z-10 w-48 py-1" },
                            React.createElement(link_1["default"], { href: "/resources", className: "block px-4 py-2 hover:bg-gray-100" }, "All Resources"),
                            React.createElement(link_1["default"], { href: "/resources/before-arrival", className: "block px-4 py-2 hover:bg-gray-100" }, "Before Arrival"),
                            React.createElement(link_1["default"], { href: "/resources/living-in-milan", className: "block px-4 py-2 hover:bg-gray-100" }, "Living in Milan"),
                            React.createElement(link_1["default"], { href: "/resources/templates", className: "block px-4 py-2 hover:bg-gray-100" }, "Templates"))))),
                React.createElement("div", { className: "hidden md:flex items-center space-x-3" },
                    React.createElement(link_1["default"], { href: "/notifications", className: "p-2 rounded-full hover:bg-gray-100" },
                        React.createElement(lucide_react_1.Bell, { size: 20 })),
                    React.createElement("div", { className: "flex items-center space-x-3" },
                        React.createElement("div", { className: "text-sm" },
                            React.createElement("div", { className: "font-medium" }, session.user.name),
                            React.createElement("div", { className: "text-gray-500" }, session.user.email)),
                        React.createElement("button", { onClick: function () { return react_3.signOut({ callbackUrl: "/" }); }, className: "p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700", title: "Sign Out" },
                            React.createElement(lucide_react_1.LogOut, { size: 20 })))),
                React.createElement("button", { className: "md:hidden p-2", onClick: function () { return setMobileMenuOpen(!mobileMenuOpen); } }, mobileMenuOpen ? (React.createElement(lucide_react_1.X, { size: 24 })) : (React.createElement(lucide_react_1.Menu, { size: 24 }))))),
        mobileMenuOpen && (React.createElement("div", { className: "md:hidden py-2 border-t" },
            React.createElement("div", { className: "container mx-auto px-4 space-y-2" },
                React.createElement(link_1["default"], { href: "/profile", className: "flex items-center px-3 py-2 rounded-md " + (isActive("/profile")
                        ? "bg-orange-100 text-orange-700"
                        : "hover:bg-gray-100") },
                    React.createElement(lucide_react_1.User, { size: 18, className: "mr-2" }),
                    React.createElement("span", null, "My Profile")),
                React.createElement(link_1["default"], { href: "/members", className: "flex items-center px-3 py-2 rounded-md " + (isActive("/members")
                        ? "bg-orange-100 text-orange-700"
                        : "hover:bg-gray-100") },
                    React.createElement(lucide_react_1.Users, { size: 18, className: "mr-2" }),
                    React.createElement("span", null, "Members")),
                React.createElement("div", null,
                    React.createElement("button", { onClick: function () { return setResourcesDropdownOpen(!resourcesDropdownOpen); }, className: "flex items-center w-full px-3 py-2 rounded-md " + (isActive("/resources")
                            ? "bg-orange-100 text-orange-700"
                            : "hover:bg-gray-100") },
                        React.createElement(lucide_react_1.FileText, { size: 18, className: "mr-2" }),
                        React.createElement("span", null, "Resources"),
                        React.createElement(lucide_react_1.ChevronDown, { size: 16, className: "ml-2" })),
                    resourcesDropdownOpen && (React.createElement("div", { className: "pl-8 mt-1 space-y-1" },
                        React.createElement(link_1["default"], { href: "/resources", className: "block px-3 py-2 rounded-md hover:bg-gray-100" }, "All Resources"),
                        React.createElement(link_1["default"], { href: "/resources/before-arrival", className: "block px-3 py-2 rounded-md hover:bg-gray-100" }, "Before Arrival"),
                        React.createElement(link_1["default"], { href: "/resources/living-in-milan", className: "block px-3 py-2 rounded-md hover:bg-gray-100" }, "Living in Milan"),
                        React.createElement(link_1["default"], { href: "/resources/templates", className: "block px-3 py-2 rounded-md hover:bg-gray-100" }, "Templates")))),
                React.createElement(link_1["default"], { href: "/notifications", className: "flex items-center px-3 py-2 rounded-md hover:bg-gray-100" },
                    React.createElement(lucide_react_1.Bell, { size: 18, className: "mr-2" }),
                    React.createElement("span", null, "Notifications")),
                React.createElement("button", { onClick: function () { return react_3.signOut({ callbackUrl: "/" }); }, className: "flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-100 text-red-600" },
                    React.createElement(lucide_react_1.LogOut, { size: 18, className: "mr-2" }),
                    React.createElement("span", null, "Sign Out")))))));
}
exports["default"] = MemberNav;
