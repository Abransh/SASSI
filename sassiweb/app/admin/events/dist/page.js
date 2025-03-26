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
var route_1 = require("@/app/api/auth/[...nextauth]/route");
var link_1 = require("next/link");
var event_service_1 = require("@/lib/event-service");
var date_fns_1 = require("date-fns");
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var Footer_1 = require("@/components/Footer");
var lucide_react_1 = require("lucide-react");
function AdminEventsList() {
    return __awaiter(this, void 0, void 0, function () {
        var session, events, upcomingEvents, pastEvents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, next_1.getServerSession(route_1.authOptions)];
                case 1:
                    session = _a.sent();
                    if (!session || session.user.role !== "ADMIN") {
                        navigation_1.redirect("/auth/signin?callbackUrl=/admin/events");
                    }
                    return [4 /*yield*/, event_service_1.getEvents()];
                case 2:
                    events = _a.sent();
                    upcomingEvents = events.filter(function (event) { return new Date(event.startDate) > new Date(); });
                    pastEvents = events.filter(function (event) { return new Date(event.endDate) < new Date(); });
                    // Sort events by date (upcoming: nearest first, past: most recent first)
                    upcomingEvents.sort(function (a, b) {
                        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
                    });
                    pastEvents.sort(function (a, b) {
                        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                    });
                    return [2 /*return*/, (React.createElement("main", { className: "min-h-screen bg-gray-50" },
                            React.createElement(Header_1["default"], null),
                            React.createElement(MobileMenu_1["default"], null),
                            React.createElement("section", { className: "pt-32 pb-20" },
                                React.createElement("div", { className: "container mx-auto px-4" },
                                    React.createElement("div", { className: "mb-8 flex flex-col md:flex-row md:items-center md:justify-between" },
                                        React.createElement("div", null,
                                            React.createElement("h1", { className: "text-3xl font-bold mb-2" }, "Manage Events"),
                                            React.createElement("p", { className: "text-gray-600" }, "Create, edit and manage all SASSI events")),
                                        React.createElement("div", { className: "mt-4 md:mt-0 flex flex-col sm:flex-row gap-3" },
                                            React.createElement("div", { className: "relative" },
                                                React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 18 }),
                                                React.createElement("input", { type: "text", placeholder: "Search events...", className: "pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full" })),
                                            React.createElement(link_1["default"], { href: "/admin/events/new", className: "flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md" },
                                                React.createElement(lucide_react_1.CalendarPlus, { size: 18, className: "mr-2" }),
                                                "Create Event"))),
                                    React.createElement("div", { className: "bg-white rounded-lg shadow-md overflow-hidden" },
                                        React.createElement("div", { className: "border-b border-gray-200" },
                                            React.createElement("nav", { className: "flex -mb-px" },
                                                React.createElement("button", { className: "w-1/3 py-4 px-1 text-center border-b-2 border-orange-500 font-medium text-orange-600" },
                                                    "Upcoming Events (",
                                                    upcomingEvents.length,
                                                    ")"),
                                                React.createElement("button", { className: "w-1/3 py-4 px-1 text-center border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300" },
                                                    "Past Events (",
                                                    pastEvents.length,
                                                    ")"),
                                                React.createElement("button", { className: "w-1/3 py-4 px-1 text-center border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300" },
                                                    "All Events (",
                                                    events.length,
                                                    ")"))),
                                        React.createElement("div", { className: "overflow-x-auto" },
                                            React.createElement("table", { className: "w-full" },
                                                React.createElement("thead", { className: "bg-gray-50" },
                                                    React.createElement("tr", null,
                                                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Event"),
                                                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Date & Time"),
                                                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Location"),
                                                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Registrations"),
                                                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                                                        React.createElement("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions"))),
                                                React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" },
                                                    upcomingEvents.map(function (event) {
                                                        var _a;
                                                        return (React.createElement("tr", { key: event.id, className: "hover:bg-gray-50" },
                                                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                                                React.createElement("div", { className: "flex items-center" },
                                                                    React.createElement("div", { className: "ml-4" },
                                                                        React.createElement("div", { className: "text-sm font-medium text-gray-900" }, event.title),
                                                                        React.createElement("div", { className: "text-sm text-gray-500 line-clamp-1" },
                                                                            event.description.substring(0, 60),
                                                                            "...")))),
                                                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                                                React.createElement("div", { className: "text-sm text-gray-900" }, date_fns_1.format(new Date(event.startDate), "MMM d, yyyy")),
                                                                React.createElement("div", { className: "text-sm text-gray-500" },
                                                                    date_fns_1.format(new Date(event.startDate), "h:mm a"),
                                                                    " -",
                                                                    date_fns_1.format(new Date(event.endDate), "h:mm a"))),
                                                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                                                React.createElement("div", { className: "text-sm text-gray-900" }, event.location)),
                                                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                                                React.createElement("div", { className: "text-sm text-gray-900" },
                                                                    ((_a = event._count) === null || _a === void 0 ? void 0 : _a.registrations) || 0,
                                                                    event.maxAttendees && " / " + event.maxAttendees)),
                                                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" }, event.published ? (React.createElement("span", { className: "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" }, "Published")) : (React.createElement("span", { className: "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800" }, "Draft"))),
                                                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" },
                                                                React.createElement(link_1["default"], { href: "/events/" + event.id, className: "text-blue-600 hover:text-blue-900 mr-4" }, "View"),
                                                                React.createElement(link_1["default"], { href: "/admin/events/" + event.id, className: "text-orange-600 hover:text-orange-900" }, "Edit"))));
                                                    }),
                                                    upcomingEvents.length === 0 && (React.createElement("tr", null,
                                                        React.createElement("td", { colSpan: 6, className: "px-6 py-10 text-center text-gray-500" },
                                                            "No upcoming events.",
                                                            React.createElement(link_1["default"], { href: "/admin/events/new", className: "text-orange-600 hover:text-orange-800 ml-1" }, "Create your first event")))))))))),
                            React.createElement(Footer_1["default"], null)))];
            }
        });
    });
}
exports["default"] = AdminEventsList;
