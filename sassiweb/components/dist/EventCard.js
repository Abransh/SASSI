"use client";
"use strict";
exports.__esModule = true;
var date_fns_1 = require("date-fns");
var image_1 = require("next/image");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
function EventCard(_a) {
    var event = _a.event, className = _a.className, _b = _a.featured, featured = _b === void 0 ? false : _b;
    var isUpcoming = new Date(event.startDate) > new Date();
    var isPast = new Date(event.endDate) < new Date();
    // Format dates
    var formattedDate = date_fns_1.format(new Date(event.startDate), 'MMM d, yyyy');
    var formattedTime = date_fns_1.format(new Date(event.startDate), 'h:mm a');
    return (React.createElement("div", { className: utils_1.cn("bg-white rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg", featured ? "md:flex" : "", className) },
        React.createElement("div", { className: utils_1.cn("relative overflow-hidden", featured ? "md:w-2/5 h-64 md:h-auto" : "h-52") },
            event.imageUrl ? (React.createElement(image_1["default"], { src: event.imageUrl, alt: event.title, layout: "fill", objectFit: "cover", className: "transition-transform hover:scale-105 duration-500" })) : (React.createElement("div", { className: utils_1.cn("w-full h-full flex items-center justify-center bg-orange-100", featured ? "md:h-full" : "h-52") },
                React.createElement(lucide_react_1.Calendar, { size: 48, className: "text-orange-400" }))),
            isPast && (React.createElement("div", { className: "absolute top-3 right-3 bg-gray-800 text-white text-xs px-2 py-1 rounded-full" }, "Past")),
            isUpcoming && (React.createElement("div", { className: "absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full" }, "Upcoming"))),
        React.createElement("div", { className: utils_1.cn("p-6", featured ? "md:w-3/5" : "") },
            React.createElement("h3", { className: "text-xl font-bold mb-2 text-gray-900" }, event.title),
            React.createElement("div", { className: "flex items-center text-sm text-gray-600 mb-2" },
                React.createElement(lucide_react_1.Calendar, { size: 16, className: "mr-1" }),
                React.createElement("span", null,
                    formattedDate,
                    " at ",
                    formattedTime)),
            React.createElement("div", { className: "flex items-center text-sm text-gray-600 mb-4" },
                React.createElement(lucide_react_1.MapPin, { size: 16, className: "mr-1" }),
                React.createElement("span", null, event.location)),
            React.createElement("p", { className: "text-gray-700 mb-4 line-clamp-3" }, event.description),
            React.createElement("div", { className: "flex justify-between items-center" },
                event._count && (React.createElement("div", { className: "flex items-center text-sm text-gray-600" },
                    React.createElement(lucide_react_1.Users, { size: 16, className: "mr-1" }),
                    React.createElement("span", null,
                        event._count.registrations,
                        event.maxAttendees && " / " + event.maxAttendees,
                        " attendees"))),
                React.createElement(link_1["default"], { href: "/events/" + event.id, className: "inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-md transition-colors" }, "View Details")))));
}
exports["default"] = EventCard;
