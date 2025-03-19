"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var navigation_1 = require("next/navigation");
var next_1 = require("next-auth/next");
var route_1 = require("../../api/auth/[...nextauth]/route");
var link_1 = require("next/link");
var event_service_1 = require("@/lib/event-service");
var prisma_1 = require("@/lib/prisma");
var date_fns_1 = require("date-fns");
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var Footer_1 = require("@/components/Footer");
function AdminDashboard() {
    return __awaiter(this, void 0, void 0, function () {
        var session, events, contactSubmissions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, next_1.getServerSession(route_1.authOptions)];
                case 1:
                    session = _a.sent();
                    if (!session || session.user.role !== "ADMIN") {
                        navigation_1.redirect("/auth/signin?callbackUrl=/admin/dashboard");
                    }
                    return [4 /*yield*/, event_service_1.getEvents()];
                case 2:
                    events = _a.sent();
                    return [4 /*yield*/, prisma_1["default"].contactSubmission.findMany({
                            orderBy: {
                                createdAt: "desc"
                            },
                            take: 10
                        })];
                case 3:
                    contactSubmissions = _a.sent();
                    return [2 /*return*/, (React.createElement("main", { className: "min-h-screen bg-gray-50" },
                            React.createElement(Header_1["default"], null),
                            React.createElement(MobileMenu_1["default"], null),
                            React.createElement("section", { className: "pt-32 pb-20" },
                                React.createElement("div", { className: "container mx-auto px-4" },
                                    React.createElement("div", { className: "mb-8" },
                                        React.createElement("h1", { className: "text-3xl font-bold mb-2" }, "Admin Dashboard"),
                                        React.createElement("p", { className: "text-gray-600" },
                                            "Welcome back, ",
                                            session.user.name || session.user.email)),
                                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" },
                                        React.createElement("div", { className: "bg-white rounded-lg shadow p-6" },
                                            React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Quick Stats"),
                                            React.createElement("div", { className: "grid grid-cols-2 gap-4" },
                                                React.createElement("div", { className: "bg-orange-50 p-4 rounded-lg" },
                                                    React.createElement("p", { className: "text-sm text-gray-600" }, "Total Events"),
                                                    React.createElement("p", { className: "text-2xl font-bold" }, events.length)),
                                                React.createElement("div", { className: "bg-green-50 p-4 rounded-lg" },
                                                    React.createElement("p", { className: "text-sm text-gray-600" }, "Published Events"),
                                                    React.createElement("p", { className: "text-2xl font-bold" }, events.filter(function (event) { return event.published; }).length)),
                                                React.createElement("div", { className: "bg-blue-50 p-4 rounded-lg" },
                                                    React.createElement("p", { className: "text-sm text-gray-600" }, "Upcoming Events"),
                                                    React.createElement("p", { className: "text-2xl font-bold" }, events.filter(function (event) { return new Date(event.startDate) > new Date(); }).length)),
                                                React.createElement("div", { className: "bg-purple-50 p-4 rounded-lg" },
                                                    React.createElement("p", { className: "text-sm text-gray-600" }, "New Messages"),
                                                    React.createElement("p", { className: "text-2xl font-bold" }, contactSubmissions.filter(function (submission) { return !submission.responded; }).length)))),
                                        React.createElement("div", { className: "bg-white rounded-lg shadow p-6" },
                                            React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Quick Actions"),
                                            React.createElement("div", { className: "space-y-2" },
                                                React.createElement(link_1["default"], { href: "/admin/events/new", className: "block w-full p-3 bg-orange-600 hover:bg-orange-700 text-white text-center rounded-md" }, "Create New Event"),
                                                React.createElement(link_1["default"], { href: "/admin/events", className: "block w-full p-3 bg-gray-800 hover:bg-gray-900 text-white text-center rounded-md" }, "Manage Events"),
                                                React.createElement(link_1["default"], { href: "/admin/contact", className: "block w-full p-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-md" }, "View Contact Submissions")))),
                                    React.createElement("div", { className: "bg-white rounded-lg shadow overflow-hidden mb-8" },
                                        React.createElement("div", { className: "p-4 bg-gray-50 border-b" },
                                            React.createElement("h2", { className: "text-xl font-bold" }, "Recent Events")),
                                        React.createElement("div", { className: "overflow-x-auto" },
                                            React.createElement("table", { className: "w-full" },
                                                React.createElement("thead", { className: "bg-gray-100" },
                                                    React.createElement("tr", null,
                                                        React.createElement("th", { className: "px-4 py-3 text-left text-sm font-medium text-gray-700" }, "Title"),
                                                        React.createElement("th", { className: "px-4 py-3 text-left text-sm font-medium text-gray-700" }, "Date"),
                                                        React.createElement("th", { className: "px-4 py-3 text-left text-sm font-medium text-gray-700" }, "Location"),
                                                        React.createElement("th", { className: "px-4 py-3 text-left text-sm font-medium text-gray-700" }, "Status"),
                                                        React.createElement("th", { className: "px-4 py-3 text-right text-sm font-medium text-gray-700" }, "Actions"))),
                                                React.createElement("tbody", { className: "divide-y divide-gray-200" }, events.slice(0, 5).map(function (event) { return (React.createElement("tr", { key: event.id },
                                                    React.createElement("td", { className: "px-4 py-3 text-sm text-gray-900" }, event.title),
                                                    React.createElement("td", { className: "px-4 py-3 text-sm text-gray-600" }, date_fns_1.format(new Date(event.startDate), "MMM d, yyyy")),
                                                    React.createElement("td", { className: "px-4 py-3 text-sm text-gray-600" }, event.location),
                                                    React.createElement("td", { className: "px-4 py-3 text-sm" }, event.published ? (React.createElement("span", { className: "px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs" }, "Published")) : (React.createElement("span", { className: "px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs" }, "Draft"))),
                                                    React.createElement("td", { className: "px-4 py-3 text-sm text-right" },
                                                        React.createElement(link_1["default"], { href: "/admin/events/" + event.id, className: "text-orange-600 hover:text-orange-800" }, "Edit")))); })))),
                                        events.length > 5 && (React.createElement("div", { className: "p-4 border-t" },
                                            React.createElement(link_1["default"], { href: "/admin/events", className: "text-orange-600 hover:text-orange-800" }, "View all events \u2192")))),
                                    React.createElement("div", { className: "bg-white rounded-lg shadow overflow-hidden" },
                                        React.createElement("div", { className: "p-4 bg-gray-50 border-b" },
                                            React.createElement("h2", { className: "text-xl font-bold" }, "Recent Contact Submissions")),
                                        React.createElement("div", { className: "divide-y divide-gray-200" }, contactSubmissions.slice(0, 3).map(function (submission) { return (React.createElement("div", { key: submission.id, className: "p-4" },
                                            React.createElement("div", { className: "flex justify-between items-start mb-2" },
                                                React.createElement("div", null,
                                                    React.createElement("h3", { className: "font-medium" }, submission.name),
                                                    React.createElement("p", { className: "text-sm text-gray-600" }, submission.email)),
                                                React.createElement("span", { className: "text-xs text-gray-500" }, date_fns_1.format(new Date(submission.createdAt), "MMM d, yyyy"))),
                                            React.createElement("p", { className: "text-sm font-medium text-gray-700 mb-1" }, submission.subject),
                                            React.createElement("p", { className: "text-sm text-gray-600 line-clamp-2" }, submission.message))); })),
                                        contactSubmissions.length > 3 && (React.createElement("div", { className: "p-4 border-t" },
                                            React.createElement(link_1["default"], { href: "/admin/contact", className: "text-orange-600 hover:text-orange-800" }, "View all messages \u2192")))))),
                            React.createElement(Footer_1["default"], null)))];
            }
        });
    });
}
exports["default"] = AdminDashboard;
