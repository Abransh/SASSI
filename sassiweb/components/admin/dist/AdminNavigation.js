"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
function AdminNavigation() {
    var pathname = navigation_1.usePathname();
    var _a = react_1.useState({
        users: false,
        events: false,
        resources: false
    }), menuOpen = _a[0], setMenuOpen = _a[1];
    var isActive = function (path) { return pathname === path; };
    var isGroupActive = function (prefix) { return pathname.startsWith(prefix); };
    var toggleMenu = function (menu) {
        setMenuOpen(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[menu] = !prev[menu], _a)));
        });
    };
    return (React.createElement("div", { className: "bg-gray-900 text-gray-300 min-h-screen w-64 flex-shrink-0 hidden md:block" },
        React.createElement("div", { className: "p-4 border-b border-gray-800" },
            React.createElement("h2", { className: "text-xl font-bold text-white flex items-center" },
                React.createElement(lucide_react_1.Shield, { size: 20, className: "mr-2" }),
                "Admin Panel")),
        React.createElement("div", { className: "p-4" },
            React.createElement("nav", { className: "space-y-1" },
                React.createElement(link_1["default"], { href: "/admin/dashboard", className: "flex items-center px-4 py-2.5 rounded-md " + (isActive("/admin/dashboard")
                        ? "bg-gray-800 text-white"
                        : "hover:bg-gray-800 hover:text-white") },
                    React.createElement(lucide_react_1.LayoutDashboard, { size: 18, className: "mr-3" }),
                    React.createElement("span", null, "Dashboard")),
                React.createElement(link_1["default"], { href: "/admin/membership-requests", className: "flex items-center px-4 py-2.5 rounded-md " + (isActive("/admin/membership-requests")
                        ? "bg-gray-800 text-white"
                        : "hover:bg-gray-800 hover:text-white") },
                    React.createElement(lucide_react_1.UserPlus, { size: 18, className: "mr-3" }),
                    React.createElement("span", null, "Membership Requests")),
                React.createElement(link_1["default"], { href: "/admin/team-applications", className: "flex items-center px-4 py-2.5 rounded-md " + (isActive("/admin/team-applications")
                        ? "bg-gray-800 text-white"
                        : "hover:bg-gray-800 hover:text-white") },
                    React.createElement(lucide_react_1.Users, { size: 18, className: "mr-3" }),
                    React.createElement("span", null, "Team Applications")),
                React.createElement("div", null,
                    React.createElement("button", { onClick: function () { return toggleMenu("events"); }, className: "flex items-center w-full px-4 py-2.5 rounded-md " + (isGroupActive("/admin/events")
                            ? "bg-gray-800 text-white"
                            : "hover:bg-gray-800 hover:text-white") },
                        React.createElement(lucide_react_1.Calendar, { size: 18, className: "mr-3" }),
                        React.createElement("span", null, "Events"),
                        menuOpen.events ? (React.createElement(lucide_react_1.ChevronDown, { size: 16, className: "ml-auto" })) : (React.createElement(lucide_react_1.ChevronRight, { size: 16, className: "ml-auto" }))),
                    menuOpen.events && (React.createElement("div", { className: "ml-7 mt-1 space-y-1" },
                        React.createElement(link_1["default"], { href: "/admin/events", className: "flex items-center px-4 py-2 rounded-md " + (isActive("/admin/events")
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white") },
                            React.createElement("span", null, "All Events")),
                        React.createElement(link_1["default"], { href: "/admin/events/new", className: "flex items-center px-4 py-2 rounded-md " + (isActive("/admin/events/new")
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white") },
                            React.createElement("span", null, "Create Event"))))),
                React.createElement("div", null,
                    React.createElement("button", { onClick: function () { return toggleMenu("resources"); }, className: "flex items-center w-full px-4 py-2.5 rounded-md " + (isGroupActive("/admin/resources")
                            ? "bg-gray-800 text-white"
                            : "hover:bg-gray-800 hover:text-white") },
                        React.createElement(lucide_react_1.FileText, { size: 18, className: "mr-3" }),
                        React.createElement("span", null, "Resources"),
                        menuOpen.resources ? (React.createElement(lucide_react_1.ChevronDown, { size: 16, className: "ml-auto" })) : (React.createElement(lucide_react_1.ChevronRight, { size: 16, className: "ml-auto" }))),
                    menuOpen.resources && (React.createElement("div", { className: "ml-7 mt-1 space-y-1" },
                        React.createElement(link_1["default"], { href: "/admin/resources", className: "flex items-center px-4 py-2 rounded-md " + (isActive("/admin/resources")
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white") },
                            React.createElement("span", null, "All Resources")),
                        React.createElement(link_1["default"], { href: "/admin/resources/categories", className: "flex items-center px-4 py-2 rounded-md " + (isActive("/admin/resources/categories")
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white") },
                            React.createElement("span", null, "Categories")),
                        React.createElement(link_1["default"], { href: "/admin/resources/new", className: "flex items-center px-4 py-2 rounded-md " + (isActive("/admin/resources/new")
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white") },
                            React.createElement("span", null, "Upload Resource"))))),
                React.createElement("div", null,
                    React.createElement("button", { onClick: function () { return toggleMenu("users"); }, className: "flex items-center w-full px-4 py-2.5 rounded-md " + (isGroupActive("/admin/users")
                            ? "bg-gray-800 text-white"
                            : "hover:bg-gray-800 hover:text-white") },
                        React.createElement(lucide_react_1.Users, { size: 18, className: "mr-3" }),
                        React.createElement("span", null, "Users"),
                        menuOpen.users ? (React.createElement(lucide_react_1.ChevronDown, { size: 16, className: "ml-auto" })) : (React.createElement(lucide_react_1.ChevronRight, { size: 16, className: "ml-auto" }))),
                    menuOpen.users && (React.createElement("div", { className: "ml-7 mt-1 space-y-1" },
                        React.createElement(link_1["default"], { href: "/admin/users", className: "flex items-center px-4 py-2 rounded-md " + (isActive("/admin/users")
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white") },
                            React.createElement("span", null, "All Users")),
                        React.createElement(link_1["default"], { href: "/admin/users/roles", className: "flex items-center px-4 py-2 rounded-md " + (isActive("/admin/users/roles")
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white") },
                            React.createElement("span", null, "Manage Roles"))))),
                React.createElement(link_1["default"], { href: "/admin/contact", className: "flex items-center px-4 py-2.5 rounded-md " + (isActive("/admin/contact")
                        ? "bg-gray-800 text-white"
                        : "hover:bg-gray-800 hover:text-white") },
                    React.createElement(lucide_react_1.MessageCircle, { size: 18, className: "mr-3" }),
                    React.createElement("span", null, "Contact Submissions"))))));
}
exports["default"] = AdminNavigation;
