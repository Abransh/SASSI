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
var prisma_1 = require("@/lib/prisma");
var date_fns_1 = require("date-fns");
var link_1 = require("next/link");
var event_service_1 = require("@/lib/event-service");
var lucide_react_1 = require("lucide-react");
function AdminDashboard() {
    return __awaiter(this, void 0, void 0, function () {
        var events, contactSubmissions, pendingMembershipRequests, pendingTeamApplications, userStats, now, upcomingEvents, resourcesCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, event_service_1.getEvents()];
                case 1:
                    events = _a.sent();
                    return [4 /*yield*/, prisma_1["default"].contactSubmission.findMany({
                            where: {
                                responded: false
                            },
                            orderBy: {
                                createdAt: "desc"
                            },
                            take: 5
                        })];
                case 2:
                    contactSubmissions = _a.sent();
                    return [4 /*yield*/, prisma_1["default"].membershipRequest.count({
                            where: {
                                status: "PENDING"
                            }
                        })];
                case 3:
                    pendingMembershipRequests = _a.sent();
                    return [4 /*yield*/, prisma_1["default"].teamApplication.count({
                            where: {
                                status: "PENDING"
                            }
                        })];
                case 4:
                    pendingTeamApplications = _a.sent();
                    return [4 /*yield*/, prisma_1["default"].$transaction([
                            prisma_1["default"].user.count(),
                            prisma_1["default"].user.count({
                                where: {
                                    paymentVerified: true
                                }
                            }),
                            prisma_1["default"].user.count({
                                where: {
                                    membershipExpiryDate: {
                                        lt: new Date()
                                    }
                                }
                            }),
                        ])];
                case 5:
                    userStats = _a.sent();
                    now = new Date();
                    upcomingEvents = events.filter(function (event) { return new Date(event.startDate) > now; }).length;
                    return [4 /*yield*/, prisma_1["default"].resource.count()];
                case 6:
                    resourcesCount = _a.sent();
                    return [2 /*return*/, (React.createElement("div", null,
                            React.createElement("h1", { className: "text-2xl font-bold mb-6" }, "Admin Dashboard"),
                            (pendingMembershipRequests > 0 || pendingTeamApplications > 0) && (React.createElement("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6" },
                                React.createElement("div", { className: "flex" },
                                    React.createElement("div", { className: "flex-shrink-0" },
                                        React.createElement(lucide_react_1.AlertTriangle, { className: "h-5 w-5 text-yellow-400" })),
                                    React.createElement("div", { className: "ml-3" },
                                        React.createElement("p", { className: "text-sm text-yellow-700" },
                                            "You have pending requests that need attention:",
                                            pendingMembershipRequests > 0 && (React.createElement("span", { className: "font-medium ml-1" },
                                                pendingMembershipRequests,
                                                " membership ",
                                                pendingMembershipRequests === 1 ? 'request' : 'requests')),
                                            pendingMembershipRequests > 0 && pendingTeamApplications > 0 && (React.createElement("span", null, " and ")),
                                            pendingTeamApplications > 0 && (React.createElement("span", { className: "font-medium" },
                                                pendingTeamApplications,
                                                " team ",
                                                pendingTeamApplications === 1 ? 'application' : 'applications'))))))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" },
                                React.createElement("div", { className: "bg-white rounded-lg shadow p-6" },
                                    React.createElement("div", { className: "flex items-start" },
                                        React.createElement("div", { className: "p-3 rounded-full bg-orange-100 text-orange-600 mr-4" },
                                            React.createElement(lucide_react_1.UserPlus, { className: "h-6 w-6" })),
                                        React.createElement("div", null,
                                            React.createElement("p", { className: "text-sm text-gray-600 mb-1" }, "Members"),
                                            React.createElement("div", { className: "flex items-baseline" },
                                                React.createElement("p", { className: "text-2xl font-bold" }, userStats[0]),
                                                React.createElement("p", { className: "text-sm text-gray-600 ml-2" },
                                                    "(",
                                                    userStats[1],
                                                    " verified)")),
                                            userStats[2] > 0 && (React.createElement("p", { className: "text-xs text-red-500 mt-1" },
                                                userStats[2],
                                                " expired memberships"))))),
                                React.createElement("div", { className: "bg-white rounded-lg shadow p-6" },
                                    React.createElement("div", { className: "flex items-start" },
                                        React.createElement("div", { className: "p-3 rounded-full bg-purple-100 text-purple-600 mr-4" },
                                            React.createElement(lucide_react_1.Calendar, { className: "h-6 w-6" })),
                                        React.createElement("div", null,
                                            React.createElement("p", { className: "text-sm text-gray-600 mb-1" }, "Events"),
                                            React.createElement("div", { className: "flex items-baseline" },
                                                React.createElement("p", { className: "text-2xl font-bold" }, events.length),
                                                React.createElement("p", { className: "text-sm text-gray-600 ml-2" },
                                                    "(",
                                                    upcomingEvents,
                                                    " upcoming)"))))),
                                React.createElement("div", { className: "bg-white rounded-lg shadow p-6" },
                                    React.createElement("div", { className: "flex items-start" },
                                        React.createElement("div", { className: "p-3 rounded-full bg-blue-100 text-blue-600 mr-4" },
                                            React.createElement(lucide_react_1.FileText, { className: "h-6 w-6" })),
                                        React.createElement("div", null,
                                            React.createElement("p", { className: "text-sm text-gray-600 mb-1" }, "Resources"),
                                            React.createElement("div", { className: "flex items-baseline" },
                                                React.createElement("p", { className: "text-2xl font-bold" }, resourcesCount))))),
                                React.createElement("div", { className: "bg-white rounded-lg shadow p-6" },
                                    React.createElement("div", { className: "flex items-start" },
                                        React.createElement("div", { className: "p-3 rounded-full bg-red-100 text-red-600 mr-4" },
                                            React.createElement(lucide_react_1.Bell, { className: "h-6 w-6" })),
                                        React.createElement("div", null,
                                            React.createElement("p", { className: "text-sm text-gray-600 mb-1" }, "Notifications"),
                                            React.createElement("div", { className: "flex items-baseline" },
                                                React.createElement("p", { className: "text-2xl font-bold" }, contactSubmissions.length),
                                                React.createElement("p", { className: "text-sm text-gray-600 ml-2" }, "unread messages")))))),
                            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" },
                                React.createElement("div", { className: "bg-white rounded-lg shadow overflow-hidden" },
                                    React.createElement("div", { className: "p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white flex justify-between items-center" },
                                        React.createElement("h2", { className: "font-bold text-lg" }, "Pending Membership Requests"),
                                        React.createElement("span", { className: "bg-white text-orange-600 text-sm font-bold px-2 py-1 rounded-full" }, pendingMembershipRequests)),
                                    React.createElement("div", { className: "p-5" },
                                        pendingMembershipRequests > 0 ? (React.createElement("p", { className: "text-gray-600 mb-4" },
                                            "You have ",
                                            pendingMembershipRequests,
                                            " membership ",
                                            pendingMembershipRequests === 1 ? 'request' : 'requests',
                                            " waiting for your review.")) : (React.createElement("p", { className: "text-gray-600 mb-4" }, "No pending membership requests at this time.")),
                                        React.createElement(link_1["default"], { href: "/admin/membership-requests", className: "inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200 transition-colors text-sm" },
                                            "View All Requests",
                                            React.createElement(lucide_react_1.ArrowRight, { size: 16, className: "ml-2" })))),
                                React.createElement("div", { className: "bg-white rounded-lg shadow overflow-hidden" },
                                    React.createElement("div", { className: "p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white flex justify-between items-center" },
                                        React.createElement("h2", { className: "font-bold text-lg" }, "Pending Team Applications"),
                                        React.createElement("span", { className: "bg-white text-blue-600 text-sm font-bold px-2 py-1 rounded-full" }, pendingTeamApplications)),
                                    React.createElement("div", { className: "p-5" },
                                        pendingTeamApplications > 0 ? (React.createElement("p", { className: "text-gray-600 mb-4" },
                                            "You have ",
                                            pendingTeamApplications,
                                            " team ",
                                            pendingTeamApplications === 1 ? 'application' : 'applications',
                                            " waiting for your review.")) : (React.createElement("p", { className: "text-gray-600 mb-4" }, "No pending team applications at this time.")),
                                        React.createElement(link_1["default"], { href: "/admin/team-applications", className: "inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors text-sm" },
                                            "View All Applications",
                                            React.createElement(lucide_react_1.ArrowRight, { size: 16, className: "ml-2" }))))),
                            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
                                React.createElement("div", { className: "bg-white rounded-lg shadow overflow-hidden" },
                                    React.createElement("div", { className: "p-4 bg-gray-50 border-b flex justify-between items-center" },
                                        React.createElement("h2", { className: "font-bold text-lg" }, "Recent Messages"),
                                        React.createElement(link_1["default"], { href: "/admin/contact", className: "text-sm text-blue-600 hover:text-blue-800" }, "View All")),
                                    React.createElement("div", { className: "divide-y" }, contactSubmissions.length > 0 ? (contactSubmissions.map(function (submission) { return (React.createElement("div", { key: submission.id, className: "p-4 hover:bg-gray-50" },
                                        React.createElement("div", { className: "flex justify-between items-start mb-1" },
                                            React.createElement("h3", { className: "font-medium" }, submission.subject),
                                            React.createElement("span", { className: "text-xs text-gray-500" }, date_fns_1.format(new Date(submission.createdAt), "MMM d, yyyy"))),
                                        React.createElement("p", { className: "text-sm text-gray-600 mb-1" },
                                            "From: ",
                                            submission.name,
                                            " (",
                                            submission.email,
                                            ")"),
                                        React.createElement("p", { className: "text-sm text-gray-800 line-clamp-1" }, submission.message))); })) : (React.createElement("div", { className: "p-6 text-center text-gray-500" },
                                        React.createElement(lucide_react_1.MessageCircle, { className: "h-10 w-10 mx-auto opacity-25 mb-2" }),
                                        React.createElement("p", null, "No pending messages"))))),
                                React.createElement("div", { className: "bg-white rounded-lg shadow overflow-hidden" },
                                    React.createElement("div", { className: "p-4 bg-gray-50 border-b flex justify-between items-center" },
                                        React.createElement("h2", { className: "font-bold text-lg" }, "Upcoming Events"),
                                        React.createElement(link_1["default"], { href: "/admin/events", className: "text-sm text-blue-600 hover:text-blue-800" }, "View All")),
                                    React.createElement("div", { className: "divide-y" },
                                        events
                                            .filter(function (event) { return new Date(event.startDate) > now; })
                                            .slice(0, 5)
                                            .map(function (event) { return (React.createElement("div", { key: event.id, className: "p-4 hover:bg-gray-50" },
                                            React.createElement("div", { className: "flex justify-between items-start mb-1" },
                                                React.createElement("h3", { className: "font-medium" }, event.title),
                                                React.createElement("span", { className: "text-xs px-2 py-0.5 rounded-full " + (event.published
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800") }, event.published ? "Published" : "Draft")),
                                            React.createElement("p", { className: "text-sm text-gray-600 mb-1" }, date_fns_1.format(new Date(event.startDate), "MMMM d, yyyy 'at' h:mm a")),
                                            React.createElement("p", { className: "text-sm text-gray-600" }, event.location))); }),
                                        events.filter(function (event) { return new Date(event.startDate) > now; }).length === 0 && (React.createElement("div", { className: "p-6 text-center text-gray-500" },
                                            React.createElement(lucide_react_1.Calendar, { className: "h-10 w-10 mx-auto opacity-25 mb-2" }),
                                            React.createElement("p", null, "No upcoming events"))))))))];
            }
        });
    });
}
exports["default"] = AdminDashboard;
