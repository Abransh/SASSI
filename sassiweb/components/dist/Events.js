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
var link_1 = require("next/link");
var event_service_1 = require("@/lib/event-service");
var date_fns_1 = require("date-fns");
var image_1 = require("next/image");
var lucide_react_1 = require("lucide-react");
function EventsSection() {
    return __awaiter(this, void 0, void 0, function () {
        var upcomingEvents, eventsToDisplay, pastEvents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, event_service_1.getEvents({
                        publishedOnly: true,
                        upcoming: true
                    })];
                case 1:
                    upcomingEvents = _a.sent();
                    eventsToDisplay = upcomingEvents;
                    if (!(upcomingEvents.length === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, event_service_1.getEvents({
                            publishedOnly: true,
                            past: true
                        })];
                case 2:
                    pastEvents = _a.sent();
                    eventsToDisplay = pastEvents.slice(0, 3);
                    return [3 /*break*/, 4];
                case 3:
                    eventsToDisplay = upcomingEvents.slice(0, 3);
                    _a.label = 4;
                case 4: return [2 /*return*/, (React.createElement("section", { id: "events", className: "py-20" },
                        React.createElement("div", { className: "container mx-auto px-4" },
                            React.createElement("div", { className: "text-center mb-12" },
                                React.createElement("h2", { className: "text-3xl md:text-4xl font-bold mb-4" }, "Events"),
                                React.createElement("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto" }, "Join us for cultural celebrations, networking opportunities, and community building events throughout the year.")),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" }, eventsToDisplay.length > 0 ? (eventsToDisplay.map(function (event) { return (React.createElement("div", { key: event.id, className: "bg-white rounded-lg shadow-lg overflow-hidden" },
                                React.createElement("div", { className: "h-48 relative" }, event.imageUrl ? (React.createElement(image_1["default"], { src: event.imageUrl, alt: event.title, layout: "fill", objectFit: "cover" })) : (React.createElement("div", { className: "w-full h-full bg-orange-100 flex items-center justify-center" },
                                    React.createElement(lucide_react_1.Calendar, { size: 36, className: "text-orange-400" })))),
                                React.createElement("div", { className: "p-6" },
                                    React.createElement("h3", { className: "text-xl font-bold mb-2" }, event.title),
                                    React.createElement("p", { className: "text-gray-600 mb-4 line-clamp-2" }, event.description),
                                    React.createElement("div", { className: "flex items-center text-sm text-gray-500 mb-2" },
                                        React.createElement("span", { className: "mr-2" },
                                            React.createElement(lucide_react_1.Calendar, { size: 16 })),
                                        date_fns_1.format(new Date(event.startDate), "MMMM d, yyyy • h:mm a")),
                                    React.createElement("div", { className: "flex items-center text-sm text-gray-500 mb-4" },
                                        React.createElement("span", { className: "mr-2" },
                                            React.createElement(lucide_react_1.MapPin, { size: 16 })),
                                        event.location),
                                    React.createElement(link_1["default"], { href: "/events/" + event.id, className: "inline-block mt-2 text-orange-600 hover:text-orange-700 font-medium" }, "View Details \u2192")))); })) : (React.createElement("div", { className: "col-span-3 text-center py-10" },
                                React.createElement("p", { className: "text-gray-500" }, "No upcoming events at the moment. Check back soon!")))),
                            React.createElement("div", { className: "text-center" },
                                React.createElement(link_1["default"], { href: "/events", className: "inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition-colors" }, "View All Events")))))];
            }
        });
    });
}
exports["default"] = EventsSection;
