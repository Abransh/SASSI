"use client";
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
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var react_2 = require("next-auth/react");
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var Footer_1 = require("@/components/Footer");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var date_fns_1 = require("date-fns");
function UserDashboard() {
    var _this = this;
    var _a;
    var router = navigation_1.useRouter();
    var _b = react_2.useSession(), session = _b.data, status = _b.status;
    var _c = react_1.useState(null), membershipStatus = _c[0], setMembershipStatus = _c[1];
    var _d = react_1.useState(null), teamApplication = _d[0], setTeamApplication = _d[1];
    var _e = react_1.useState([]), upcomingEvents = _e[0], setUpcomingEvents = _e[1];
    var _f = react_1.useState(true), isLoading = _f[0], setIsLoading = _f[1];
    react_1.useEffect(function () {
        // Check if user is authenticated
        if (status === "unauthenticated") {
            router.push("/auth/signin?callbackUrl=/dashboard");
        }
        else if (status === "authenticated") {
            fetchUserData();
        }
    }, [status, router]);
    var fetchUserData = function () { return __awaiter(_this, void 0, void 0, function () {
        var membershipResponse, membershipData, teamResponse, teamData, eventsResponse, eventsData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, 12, 13]);
                    return [4 /*yield*/, fetch('/api/user/payment-status')];
                case 2:
                    membershipResponse = _a.sent();
                    if (!membershipResponse.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, membershipResponse.json()];
                case 3:
                    membershipData = _a.sent();
                    setMembershipStatus(membershipData);
                    _a.label = 4;
                case 4: return [4 /*yield*/, fetch('/api/user/team-status')];
                case 5:
                    teamResponse = _a.sent();
                    if (!teamResponse.ok) return [3 /*break*/, 7];
                    return [4 /*yield*/, teamResponse.json()];
                case 6:
                    teamData = _a.sent();
                    if (teamData.application) {
                        setTeamApplication(teamData.application);
                    }
                    _a.label = 7;
                case 7: return [4 /*yield*/, fetch('/api/user/events')];
                case 8:
                    eventsResponse = _a.sent();
                    if (!eventsResponse.ok) return [3 /*break*/, 10];
                    return [4 /*yield*/, eventsResponse.json()];
                case 9:
                    eventsData = _a.sent();
                    setUpcomingEvents(eventsData.events);
                    _a.label = 10;
                case 10: return [3 /*break*/, 13];
                case 11:
                    error_1 = _a.sent();
                    console.error("Error fetching user data:", error_1);
                    return [3 /*break*/, 13];
                case 12:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    }); };
    // Format department name
    var formatDepartment = function (departmentId) {
        return departmentId
            .split('-')
            .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); })
            .join(' ');
    };
    // If loading session or data
    if (status === "loading" || isLoading) {
        return (React.createElement("main", { className: "min-h-screen bg-gray-50" },
            React.createElement(Header_1["default"], null),
            React.createElement(MobileMenu_1["default"], null),
            React.createElement("div", { className: "pt-32 pb-20 flex justify-center items-center" },
                React.createElement("div", { className: "flex flex-col items-center" },
                    React.createElement(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-orange-600" }),
                    React.createElement("p", { className: "mt-4 text-gray-600" }, "Loading..."))),
            React.createElement(Footer_1["default"], null)));
    }
    return (React.createElement("main", { className: "min-h-screen bg-gray-50" },
        React.createElement(Header_1["default"], null),
        React.createElement(MobileMenu_1["default"], null),
        React.createElement("div", { className: "pt-32 pb-20" },
            React.createElement("div", { className: "container mx-auto px-4" },
                React.createElement("div", { className: "mb-8" },
                    React.createElement("h1", { className: "text-3xl font-bold mb-2" }, "Your Dashboard"),
                    React.createElement("p", { className: "text-gray-600" },
                        "Welcome back, ",
                        ((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.name) || "Member")),
                React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" },
                    React.createElement("div", { className: "lg:col-span-2 space-y-6" },
                        React.createElement("div", { className: "bg-white rounded-lg shadow-md overflow-hidden" },
                            React.createElement("div", { className: "p-6 border-b" },
                                React.createElement("h2", { className: "text-xl font-bold" }, "Membership Status")),
                            React.createElement("div", { className: "p-6" }, membershipStatus ? (React.createElement("div", { className: "space-y-4" },
                                React.createElement("div", { className: "flex items-center gap-3" },
                                    membershipStatus.paymentVerified ? (React.createElement("div", { className: "w-12 h-12 rounded-full bg-green-100 flex items-center justify-center" },
                                        React.createElement(lucide_react_1.UserCheck, { size: 24, className: "text-green-600" }))) : (React.createElement("div", { className: "w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center" },
                                        React.createElement(lucide_react_1.AlertTriangle, { size: 24, className: "text-yellow-600" }))),
                                    React.createElement("div", null,
                                        React.createElement("h3", { className: "font-medium text-lg" }, membershipStatus.paymentVerified
                                            ? "Active Member"
                                            : "Membership Pending"),
                                        React.createElement("p", { className: "text-gray-600 text-sm" }, membershipStatus.paymentVerified
                                            ? membershipStatus.membershipExpiryDate
                                                ? "Valid until " + date_fns_1.format(new Date(membershipStatus.membershipExpiryDate), 'MMMM d, yyyy')
                                                : "Active membership"
                                            : "Payment verification pending"))),
                                !membershipStatus.paymentVerified && (React.createElement("div", { className: "bg-yellow-50 p-4 rounded-lg border border-yellow-200" },
                                    React.createElement("h4", { className: "font-medium mb-2 flex items-center" },
                                        React.createElement(lucide_react_1.CreditCard, { size: 18, className: "mr-2 text-yellow-600" }),
                                        "Complete Your Payment"),
                                    React.createElement("p", { className: "text-sm text-gray-700 mb-3" }, "Your membership payment is still pending. Please complete the payment to access all member benefits."),
                                    React.createElement(link_1["default"], { href: "https://revolut.me/harshnj", className: "inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm" }, "Pay Membership Fee (\u20AC20)"))),
                                membershipStatus.paymentVerified && membershipStatus.isExpired && (React.createElement("div", { className: "bg-yellow-50 p-4 rounded-lg border border-yellow-200" },
                                    React.createElement("h4", { className: "font-medium mb-2 flex items-center" },
                                        React.createElement(lucide_react_1.Clock, { size: 18, className: "mr-2 text-yellow-600" }),
                                        "Membership Expired"),
                                    React.createElement("p", { className: "text-sm text-gray-700 mb-3" }, "Your membership has expired. Please renew to continue accessing all member benefits."),
                                    React.createElement(link_1["default"], { href: "https://revolut.me/harshnj", className: "inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm" }, "Renew Membership (\u20AC20)"))))) : (React.createElement("p", { className: "text-gray-500" }, "Unable to load membership status.")))),
                        React.createElement("div", { className: "bg-white rounded-lg shadow-md overflow-hidden" },
                            React.createElement("div", { className: "p-6 border-b" },
                                React.createElement("h2", { className: "text-xl font-bold" }, "Your Upcoming Events")),
                            React.createElement("div", { className: "p-6" }, upcomingEvents.length > 0 ? (React.createElement("div", { className: "divide-y" }, upcomingEvents.map(function (event, index) { return (React.createElement("div", { key: index, className: "py-4 first:pt-0 last:pb-0" },
                                React.createElement("div", { className: "flex items-start gap-4" },
                                    React.createElement("div", { className: "w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center" },
                                        React.createElement(lucide_react_1.CalendarDays, { size: 24, className: "text-orange-600" })),
                                    React.createElement("div", { className: "flex-1" },
                                        React.createElement("h3", { className: "font-medium" }, event.title),
                                        React.createElement("p", { className: "text-sm text-gray-600" },
                                            date_fns_1.format(new Date(event.startDate), 'MMMM d, yyyy'),
                                            " at ",
                                            date_fns_1.format(new Date(event.startDate), 'h:mm a')),
                                        React.createElement("p", { className: "text-sm text-gray-500 mt-1" }, event.location)),
                                    React.createElement(link_1["default"], { href: "/events/" + event.id, className: "px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md" }, "View")))); }))) : (React.createElement("div", { className: "text-center py-6" },
                                React.createElement(lucide_react_1.CalendarDays, { size: 40, className: "mx-auto text-gray-300 mb-3" }),
                                React.createElement("p", { className: "text-gray-500 mb-4" }, "You haven't registered for any upcoming events yet."),
                                React.createElement(link_1["default"], { href: "/events", className: "inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm" }, "Browse Events")))))),
                    React.createElement("div", { className: "space-y-6" },
                        React.createElement("div", { className: "bg-white rounded-lg shadow-md overflow-hidden" },
                            React.createElement("div", { className: "p-6 border-b" },
                                React.createElement("h2", { className: "text-xl font-bold" }, "Team Status")),
                            React.createElement("div", { className: "p-6" }, teamApplication ? (React.createElement("div", { className: "space-y-4" },
                                React.createElement("div", { className: "flex items-center gap-3" },
                                    teamApplication.status === "APPROVED" ? (React.createElement("div", { className: "w-10 h-10 rounded-full bg-green-100 flex items-center justify-center" },
                                        React.createElement(lucide_react_1.CheckCircle2, { size: 20, className: "text-green-600" }))) : teamApplication.status === "REJECTED" ? (React.createElement("div", { className: "w-10 h-10 rounded-full bg-red-100 flex items-center justify-center" },
                                        React.createElement(lucide_react_1.Circle, { size: 20, className: "text-red-600" }))) : (React.createElement("div", { className: "w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center" },
                                        React.createElement(lucide_react_1.Clock, { size: 20, className: "text-yellow-600" }))),
                                    React.createElement("div", null,
                                        React.createElement("p", { className: "text-sm text-gray-600" }, "Team Application"),
                                        React.createElement("h3", { className: "font-medium" }, formatDepartment(teamApplication.department)))),
                                React.createElement("div", { className: "rounded-md p-3 text-sm " + (teamApplication.status === "APPROVED"
                                        ? "bg-green-50 text-green-800"
                                        : teamApplication.status === "REJECTED"
                                            ? "bg-red-50 text-red-800"
                                            : "bg-yellow-50 text-yellow-800") }, teamApplication.status === "APPROVED"
                                    ? "Congratulations! Your application has been approved."
                                    : teamApplication.status === "REJECTED"
                                        ? "Your application was not approved at this time."
                                        : "Your application is currently under review."),
                                React.createElement("div", { className: "text-xs text-gray-500" },
                                    "Applied on ",
                                    date_fns_1.format(new Date(teamApplication.createdAt), 'MMMM d, yyyy')))) : (React.createElement("div", { className: "text-center py-6" },
                                React.createElement(lucide_react_1.Users, { size: 40, className: "mx-auto text-gray-300 mb-3" }),
                                React.createElement("p", { className: "text-gray-500 mb-4" }, "You haven't applied to join a team yet."),
                                React.createElement(link_1["default"], { href: "/join/team", className: "inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm" }, "Join a Team"))))),
                        React.createElement("div", { className: "bg-white rounded-lg shadow-md overflow-hidden" },
                            React.createElement("div", { className: "p-6 border-b" },
                                React.createElement("h2", { className: "text-xl font-bold" }, "Quick Links")),
                            React.createElement("div", { className: "p-4" },
                                React.createElement("div", { className: "grid grid-cols-1 gap-3" },
                                    React.createElement(link_1["default"], { href: "/profile", className: "flex items-center p-3 hover:bg-gray-50 rounded-md" },
                                        React.createElement("div", { className: "mr-3 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center" },
                                            React.createElement(lucide_react_1.UserCheck, { size: 18, className: "text-blue-600" })),
                                        React.createElement("span", null, "Edit Profile")),
                                    React.createElement(link_1["default"], { href: "/resources", className: "flex items-center p-3 hover:bg-gray-50 rounded-md" },
                                        React.createElement("div", { className: "mr-3 h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center" },
                                            React.createElement(lucide_react_1.CreditCard, { size: 18, className: "text-orange-600" })),
                                        React.createElement("span", null, "Member Resources")),
                                    React.createElement(link_1["default"], { href: "/events", className: "flex items-center p-3 hover:bg-gray-50 rounded-md" },
                                        React.createElement("div", { className: "mr-3 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center" },
                                            React.createElement(lucide_react_1.CalendarDays, { size: 18, className: "text-green-600" })),
                                        React.createElement("span", null, "Event Calendar")),
                                    React.createElement(link_1["default"], { href: "/members", className: "flex items-center p-3 hover:bg-gray-50 rounded-md" },
                                        React.createElement("div", { className: "mr-3 h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center" },
                                            React.createElement(lucide_react_1.Users, { size: 18, className: "text-purple-600" })),
                                        React.createElement("span", null, "Member Directory"))))))))),
        React.createElement(Footer_1["default"], null)));
}
exports["default"] = UserDashboard;
