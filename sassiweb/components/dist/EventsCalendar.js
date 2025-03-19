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
var react_big_calendar_1 = require("react-big-calendar");
var moment_1 = require("moment");
var event_service_1 = require("@/lib/event-service");
require("react-big-calendar/lib/css/react-big-calendar.css");
// Setup the localizer for react-big-calendar
var localizer = react_big_calendar_1.momentLocalizer(moment_1["default"]);
function EventsCalendar() {
    var _this = this;
    var _a = react_1.useState([]), events = _a[0], setEvents = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(null), error = _c[0], setError = _c[1];
    react_1.useEffect(function () {
        var fetchEvents = function () { return __awaiter(_this, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, event_service_1.getEvents({ publishedOnly: true })];
                    case 1:
                        data = _a.sent();
                        setEvents(data);
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        setError('Failed to load events. Please try again later.');
                        console.error(err_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchEvents();
    }, []);
    // Format events for the calendar
    var calendarEvents = events.map(function (event) { return ({
        id: event.id,
        title: event.title,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
        allDay: false,
        resource: event
    }); });
    if (loading) {
        return (React.createElement("div", { className: "flex justify-center items-center h-96" },
            React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" })));
    }
    if (error) {
        return (React.createElement("div", { className: "p-4 bg-red-50 border border-red-200 rounded-md" },
            React.createElement("p", { className: "text-red-700" }, error)));
    }
    return (React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-md" },
        React.createElement("div", { className: "h-[600px]" },
            React.createElement(react_big_calendar_1.Calendar, { localizer: localizer, events: calendarEvents, startAccessor: "start", endAccessor: "end", style: { height: '100%' }, views: ['month', 'week', 'day', 'agenda'], onSelectEvent: function (event) {
                    // Navigate to event details page
                    window.location.href = "/events/" + event.id;
                }, eventPropGetter: function (event) {
                    return {
                        className: 'bg-orange-600 border-orange-700',
                        style: {
                            backgroundColor: '#ff6700',
                            borderColor: '#e65c00',
                            color: 'white',
                            borderRadius: '4px'
                        }
                    };
                }, components: {
                    event: function (_a) {
                        var event = _a.event;
                        return (React.createElement("div", { className: "text-sm font-medium text-white truncate p-1" }, event.title));
                    }
                } }))));
}
exports["default"] = EventsCalendar;
