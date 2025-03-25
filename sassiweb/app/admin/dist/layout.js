"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var react_2 = require("next-auth/react");
var lucide_react_1 = require("lucide-react");
var AdminNavigation_1 = require("@/components/admin/AdminNavigation");
var button_1 = require("@/components/ui/button");
var react_3 = require("next-auth/react");
var sonner_1 = require("sonner");
function AdminLayout(_a) {
    var _b, _c;
    var children = _a.children;
    var _d = react_2.useSession(), session = _d.data, status = _d.status;
    var _e = react_1.useState(false), sidebarOpen = _e[0], setSidebarOpen = _e[1];
    // Check if user is authenticated and is an admin
    if (status === "unauthenticated") {
        navigation_1.redirect("/auth/signin?callbackUrl=/admin/dashboard");
    }
    if (status === "authenticated" && ((_b = session === null || session === void 0 ? void 0 : session.user) === null || _b === void 0 ? void 0 : _b.role) !== "ADMIN") {
        navigation_1.redirect("/");
    }
    var toggleSidebar = function () {
        setSidebarOpen(!sidebarOpen);
    };
    if (status === "loading") {
        return (React.createElement("div", { className: "flex h-screen items-center justify-center bg-gray-50" },
            React.createElement("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-gray-900 border-t-transparent" })));
    }
    return (React.createElement("div", { className: "flex h-screen bg-gray-100" },
        sidebarOpen && (React.createElement("div", { className: "fixed inset-0 z-40 bg-gray-900/50 md:hidden", onClick: toggleSidebar })),
        React.createElement("div", { className: "fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-gray-900 transition-transform duration-300 md:static md:translate-x-0 " + (sidebarOpen ? "translate-x-0" : "-translate-x-full") },
            React.createElement(AdminNavigation_1["default"], null)),
        React.createElement("div", { className: "flex-1 flex flex-col overflow-hidden" },
            React.createElement("header", { className: "bg-white shadow-sm z-10" },
                React.createElement("div", { className: "flex h-16 items-center justify-between px-4" },
                    React.createElement("div", { className: "flex items-center" },
                        React.createElement("button", { onClick: toggleSidebar, className: "text-gray-500 focus:outline-none md:hidden" }, sidebarOpen ? React.createElement(lucide_react_1.X, { size: 24 }) : React.createElement(lucide_react_1.Menu, { size: 24 })),
                        React.createElement("h1", { className: "ml-4 text-xl font-semibold text-gray-800 md:ml-0" }, "Admin Dashboard")),
                    React.createElement("div", { className: "flex items-center space-x-4" },
                        React.createElement("button", { className: "text-gray-500 hover:text-gray-700" },
                            React.createElement(lucide_react_1.Bell, { size: 20 })),
                        React.createElement("div", { className: "relative" },
                            React.createElement("button", { className: "flex items-center space-x-2 text-gray-700" },
                                React.createElement("div", { className: "h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center" },
                                    React.createElement(lucide_react_1.User, { size: 18, className: "text-gray-600" })),
                                React.createElement("span", { className: "hidden md:inline-block font-medium" }, ((_c = session === null || session === void 0 ? void 0 : session.user) === null || _c === void 0 ? void 0 : _c.name) || "Admin User"))),
                        React.createElement(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return react_3.signOut({ callbackUrl: "/" }); }, className: "text-gray-700" },
                            React.createElement(lucide_react_1.LogOut, { size: 18, className: "mr-2" }),
                            React.createElement("span", { className: "hidden md:inline" }, "Logout"))))),
            React.createElement("main", { className: "flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6" }, children)),
        React.createElement(sonner_1.Toaster, { position: "top-right" })));
}
exports["default"] = AdminLayout;
