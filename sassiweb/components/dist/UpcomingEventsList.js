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
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
var event_service_1 = require("@/lib/event-service");
var sonner_1 = require("sonner");
var button_1 = require("@/components/ui/button");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
function UpcomingEventsList(_a) {
    var _this = this;
    var registrations = _a.registrations;
    var router = navigation_1.useRouter();
    var _b = react_1.useState(null), cancellingId = _b[0], setCancellingId = _b[1];
    var handleCancelRegistration = function (eventId) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm("Are you sure you want to cancel your registration for this event?")) {
                        return [2 /*return*/];
                    }
                    setCancellingId(eventId);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, event_service_1.cancelRegistration(eventId)];
                case 2:
                    _a.sent();
                    sonner_1.toast.success("Registration cancelled successfully");
                    router.refresh(); // Refresh the page to update the list
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error cancelling registration:", error_1);
                    sonner_1.toast.error(error_1 instanceof Error
                        ? error_1.message
                        : "Failed to cancel registration");
                    return [3 /*break*/, 5];
                case 4:
                    setCancellingId(null);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "space-y-4" }, registrations.map(function (registration) { return (React.createElement("div", { key: registration.id, className: "border rounded-lg p-4 hover:shadow-md transition-shadow bg-white" },
        React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4" },
            React.createElement("div", null,
                React.createElement("h3", { className: "font-semibold text-lg mb-1" }, registration.event.title),
                React.createElement("div", { className: "text-sm text-gray-500 space-y-1" },
                    React.createElement("div", { className: "flex items-center" },
                        React.createElement(lucide_react_1.Calendar, { size: 16, className: "mr-2" }),
                        React.createElement("span", null, date_fns_1.format(new Date(registration.event.startDate), "EEEE, MMMM d, yyyy"))),
                    React.createElement("div", { className: "flex items-center" },
                        React.createElement("span", { className: "inline-block w-4 mr-2" }),
                        React.createElement("span", null,
                            date_fns_1.format(new Date(registration.event.startDate), "h:mm a"),
                            " -",
                            " ",
                            date_fns_1.format(new Date(registration.event.endDate), "h:mm a"))),
                    React.createElement("div", { className: "flex items-center" },
                        React.createElement(lucide_react_1.MapPin, { size: 16, className: "mr-2" }),
                        React.createElement("span", null, registration.event.location)))),
            React.createElement("div", { className: "flex flex-col sm:flex-row gap-2 self-end sm:self-auto" },
                React.createElement(link_1["default"], { href: "/events/" + registration.event.id, className: "px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm text-center" }, "View Details"),
                React.createElement(button_1.Button, { variant: "outline", className: "border-red-500 text-red-500 hover:bg-red-50", onClick: function () { return handleCancelRegistration(registration.event.id); }, disabled: cancellingId === registration.event.id }, cancellingId === registration.event.id ? (React.createElement(React.Fragment, null,
                    React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                    "Cancelling...")) : (React.createElement(React.Fragment, null,
                    React.createElement(lucide_react_1.X, { className: "mr-1 h-4 w-4" }),
                    "Cancel"))))))); })));
}
exports["default"] = UpcomingEventsList;
