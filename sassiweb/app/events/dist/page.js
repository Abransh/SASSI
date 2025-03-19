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
exports.metadata = void 0;
var event_service_1 = require("@/lib/event-service");
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var Footer_1 = require("@/components/Footer");
var EventCard_1 = require("@/components/EventCard");
var EventsCalendar_1 = require("@/components/EventsCalendar");
var tabs_1 = require("@/components/ui/tabs");
exports.metadata = {
    title: "Events - Students' Association of Indians in Milan",
    description: "Discover upcoming events, cultural celebrations, workshops, and social gatherings organized by SASSI in Milan"
};
function EventsPage() {
    return __awaiter(this, void 0, void 0, function () {
        var upcomingEvents, pastEvents, featuredEvent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, event_service_1.getEvents({
                        publishedOnly: true,
                        upcoming: true
                    })];
                case 1:
                    upcomingEvents = _a.sent();
                    return [4 /*yield*/, event_service_1.getEvents({
                            publishedOnly: true,
                            past: true
                        })];
                case 2:
                    pastEvents = _a.sent();
                    featuredEvent = upcomingEvents.length > 0
                        ? upcomingEvents[0]
                        : pastEvents.length > 0
                            ? pastEvents[0]
                            : null;
                    return [2 /*return*/, (React.createElement("main", { className: "min-h-screen bg-gray-50" },
                            React.createElement(Header_1["default"], null),
                            React.createElement(MobileMenu_1["default"], null),
                            React.createElement("section", { className: "pt-32 pb-20 bg-gray-900 text-white" },
                                React.createElement("div", { className: "container mx-auto px-4" },
                                    React.createElement("div", { className: "max-w-3xl mx-auto text-center" },
                                        React.createElement("h1", { className: "text-4xl md:text-5xl font-bold mb-6" }, "SASSI Events"),
                                        React.createElement("p", { className: "text-lg md:text-xl mb-8 text-gray-300" }, "Join us for cultural celebrations, networking opportunities, and community building.")))),
                            React.createElement("section", { className: "py-12 md:py-20" },
                                React.createElement("div", { className: "container mx-auto px-4" },
                                    featuredEvent && (React.createElement("div", { className: "mb-16" },
                                        React.createElement("h2", { className: "text-3xl font-bold mb-8 text-center" }, "Featured Event"),
                                        React.createElement(EventCard_1["default"], { event: featuredEvent, featured: true }))),
                                    React.createElement(tabs_1.Tabs, { defaultValue: "upcoming", className: "w-full" },
                                        React.createElement(tabs_1.TabsList, { className: "grid w-full grid-cols-3 mb-8" },
                                            React.createElement(tabs_1.TabsTrigger, { value: "upcoming" }, "Upcoming Events"),
                                            React.createElement(tabs_1.TabsTrigger, { value: "past" }, "Past Events"),
                                            React.createElement(tabs_1.TabsTrigger, { value: "calendar" }, "Calendar View")),
                                        React.createElement(tabs_1.TabsContent, { value: "upcoming", className: "space-y-6" }, upcomingEvents.length > 0 ? (React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, upcomingEvents.map(function (event) { return (React.createElement(EventCard_1["default"], { key: event.id, event: event })); }))) : (React.createElement("div", { className: "text-center py-12" },
                                            React.createElement("p", { className: "text-gray-600 mb-6" }, "No upcoming events scheduled at the moment."),
                                            React.createElement("p", { className: "text-gray-600" }, "Check back soon or subscribe to our newsletter for updates!")))),
                                        React.createElement(tabs_1.TabsContent, { value: "past", className: "space-y-6" }, pastEvents.length > 0 ? (React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, pastEvents.map(function (event) { return (React.createElement(EventCard_1["default"], { key: event.id, event: event })); }))) : (React.createElement("div", { className: "text-center py-12" },
                                            React.createElement("p", { className: "text-gray-600" }, "No past events to display.")))),
                                        React.createElement(tabs_1.TabsContent, { value: "calendar" },
                                            React.createElement("div", { className: "bg-white rounded-xl shadow p-6" },
                                                React.createElement(EventsCalendar_1["default"], null)))))),
                            React.createElement(Footer_1["default"], null)))];
            }
        });
    });
}
exports["default"] = EventsPage;
