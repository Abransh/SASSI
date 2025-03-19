"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var zod_1 = require("zod");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var popover_1 = require("@/components/ui/popover");
var calendar_1 = require("@/components/ui/calendar");
var switch_1 = require("@/components/ui/switch");
var sonner_1 = require("sonner");
var event_service_1 = require("@/lib/event-service");
// Form validation schema
var eventFormSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    content: zod_1.z.string().optional(),
    location: zod_1.z.string().min(1, "Location is required"),
    startDate: zod_1.z.date(),
    endDate: zod_1.z.date(),
    imageUrl: zod_1.z.string().optional().nullable(),
    maxAttendees: zod_1.z.number().optional().nullable(),
    published: zod_1.z.boolean()["default"](false)
});
function EventForm(_a) {
    var _this = this;
    var event = _a.event, _b = _a.isEdit, isEdit = _b === void 0 ? false : _b;
    var router = navigation_1.useRouter();
    var _c = react_1.useState(false), isSubmitting = _c[0], setIsSubmitting = _c[1];
    var _d = react_1.useState(false), isDeleting = _d[0], setIsDeleting = _d[1];
    // Default form values
    var defaultStartDate = event ? new Date(event.startDate) : new Date();
    defaultStartDate.setMinutes(0);
    defaultStartDate.setSeconds(0);
    defaultStartDate.setMilliseconds(0);
    var defaultEndDate = event ? new Date(event.endDate) : new Date();
    defaultEndDate.setHours(defaultStartDate.getHours() + 2);
    defaultEndDate.setMinutes(0);
    defaultEndDate.setSeconds(0);
    defaultEndDate.setMilliseconds(0);
    var _e = react_1.useState({
        title: (event === null || event === void 0 ? void 0 : event.title) || "",
        description: (event === null || event === void 0 ? void 0 : event.description) || "",
        content: (event === null || event === void 0 ? void 0 : event.content) || "",
        location: (event === null || event === void 0 ? void 0 : event.location) || "",
        startDate: defaultStartDate,
        endDate: defaultEndDate,
        imageUrl: (event === null || event === void 0 ? void 0 : event.imageUrl) || "",
        maxAttendees: (event === null || event === void 0 ? void 0 : event.maxAttendees) || null,
        published: (event === null || event === void 0 ? void 0 : event.published) || false
    }), formData = _e[0], setFormData = _e[1];
    var _f = react_1.useState(event ? date_fns_1.format(new Date(event.startDate), "HH:mm") : "18:00"), startTime = _f[0], setStartTime = _f[1];
    var _g = react_1.useState(event ? date_fns_1.format(new Date(event.endDate), "HH:mm") : "20:00"), endTime = _g[0], setEndTime = _g[1];
    // Error handling
    var _h = react_1.useState({}), errors = _h[0], setErrors = _h[1];
    var validateForm = function () {
        try {
            // Combine date and time
            var updatedFormData = __assign(__assign({}, formData), { startDate: combineDateTime(formData.startDate, startTime), endDate: combineDateTime(formData.endDate, endTime) });
            // Check if end date is after start date
            if (updatedFormData.endDate <= updatedFormData.startDate) {
                setErrors({
                    endDate: "End date must be after start date"
                });
                return false;
            }
            eventFormSchema.parse(updatedFormData);
            setErrors({});
            return true;
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                var newErrors_1 = {};
                error.errors.forEach(function (err) {
                    if (err.path[0]) {
                        newErrors_1[err.path[0]] = err.message;
                    }
                });
                setErrors(newErrors_1);
            }
            return false;
        }
    };
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        var parsedValue = value;
        // Parse number fields
        if (name === "maxAttendees") {
            parsedValue = value ? parseInt(value, 10) : null;
        }
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = parsedValue, _a)));
        });
        // Clear error when field is edited
        if (errors[name]) {
            setErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = undefined, _a)));
            });
        }
    };
    var handleDateChange = function (field, date) {
        if (date) {
            setFormData(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[field] = date, _a)));
            });
            // Clear error when field is edited
            if (errors[field]) {
                setErrors(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[field] = undefined, _a)));
                });
            }
        }
    };
    var handleTimeChange = function (field, e) {
        var value = e.target.value;
        if (field === "startTime") {
            setStartTime(value);
        }
        else {
            setEndTime(value);
        }
        // Clear related date errors
        if (errors.startDate || errors.endDate) {
            setErrors(function (prev) { return (__assign(__assign({}, prev), { startDate: undefined, endDate: undefined })); });
        }
    };
    var handlePublishedChange = function (checked) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { published: checked })); });
    };
    // Helper to combine date and time values
    var combineDateTime = function (date, timeString) {
        var _a = timeString.split(":").map(Number), hours = _a[0], minutes = _a[1];
        var result = new Date(date);
        result.setHours(hours);
        result.setMinutes(minutes);
        return result;
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var eventData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm()) {
                        sonner_1.toast.error("Please fix the errors in the form");
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    eventData = __assign(__assign({}, formData), { startDate: combineDateTime(formData.startDate, startTime), endDate: combineDateTime(formData.endDate, endTime) });
                    if (!(isEdit && event)) return [3 /*break*/, 3];
                    // Update existing event
                    return [4 /*yield*/, event_service_1.updateEvent(event.id, eventData)];
                case 2:
                    // Update existing event
                    _a.sent();
                    sonner_1.toast.success("Event updated successfully");
                    return [3 /*break*/, 5];
                case 3: 
                // Create new event
                return [4 /*yield*/, event_service_1.createEvent(eventData)];
                case 4:
                    // Create new event
                    _a.sent();
                    sonner_1.toast.success("Event created successfully");
                    _a.label = 5;
                case 5:
                    // Redirect to events list
                    router.push("/admin/events");
                    router.refresh();
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    console.error("Error saving event:", error_1);
                    sonner_1.toast.error(error_1 instanceof Error
                        ? error_1.message
                        : "Failed to save event. Please try again.");
                    return [3 /*break*/, 8];
                case 7:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!event || !confirm("Are you sure you want to delete this event?")) {
                        return [2 /*return*/];
                    }
                    setIsDeleting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, event_service_1.deleteEvent(event.id)];
                case 2:
                    _a.sent();
                    sonner_1.toast.success("Event deleted successfully");
                    router.push("/admin/events");
                    router.refresh();
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error deleting event:", error_2);
                    sonner_1.toast.error(error_2 instanceof Error
                        ? error_2.message
                        : "Failed to delete event. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setIsDeleting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("form", { onSubmit: handleSubmit, className: "space-y-8" },
        React.createElement("div", { className: "grid gap-6" },
            React.createElement("div", { className: "space-y-2" },
                React.createElement("label", { htmlFor: "title", className: "text-sm font-medium" }, "Event Title"),
                React.createElement(input_1.Input, { id: "title", name: "title", value: formData.title, onChange: handleChange, className: errors.title ? "border-red-500" : "" }),
                errors.title && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.title))),
            React.createElement("div", { className: "space-y-2" },
                React.createElement("label", { htmlFor: "description", className: "text-sm font-medium" }, "Short Description"),
                React.createElement(textarea_1.Textarea, { id: "description", name: "description", value: formData.description, onChange: handleChange, rows: 3, className: errors.description ? "border-red-500" : "" }),
                errors.description && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.description)),
                React.createElement("p", { className: "text-xs text-gray-500" }, "A brief summary of the event (shown in event listings)")),
            React.createElement("div", { className: "space-y-2" },
                React.createElement("label", { htmlFor: "content", className: "text-sm font-medium" }, "Full Description (Optional)"),
                React.createElement(textarea_1.Textarea, { id: "content", name: "content", value: formData.content || "", onChange: handleChange, rows: 6, className: errors.content ? "border-red-500" : "" }),
                errors.content && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.content)),
                React.createElement("p", { className: "text-xs text-gray-500" }, "Detailed information about the event (shown on the event detail page)"))),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
            React.createElement("div", { className: "space-y-2" },
                React.createElement("label", { className: "text-sm font-medium flex items-center" },
                    React.createElement(lucide_react_1.Calendar, { size: 16, className: "mr-2" }),
                    "Start Date"),
                React.createElement("div", { className: "flex flex-col sm:flex-row gap-2" },
                    React.createElement(popover_1.Popover, null,
                        React.createElement(popover_1.PopoverTrigger, { asChild: true },
                            React.createElement(button_1.Button, { variant: "outline", className: "w-full justify-start text-left font-normal " + (errors.startDate ? "border-red-500" : "") }, date_fns_1.format(formData.startDate, "PPP"))),
                        React.createElement(popover_1.PopoverContent, { className: "w-auto p-0" },
                            React.createElement(calendar_1.Calendar, { mode: "single", selected: formData.startDate, onSelect: function (date) { return handleDateChange("startDate", date); }, initialFocus: true }))),
                    React.createElement("div", { className: "relative flex items-center" },
                        React.createElement(lucide_react_1.Clock, { size: 16, className: "absolute left-3 text-gray-500" }),
                        React.createElement(input_1.Input, { type: "time", value: startTime, onChange: function (e) { return handleTimeChange("startTime", e); }, className: "pl-10" }))),
                errors.startDate && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.startDate))),
            React.createElement("div", { className: "space-y-2" },
                React.createElement("label", { className: "text-sm font-medium flex items-center" },
                    React.createElement(lucide_react_1.Calendar, { size: 16, className: "mr-2" }),
                    "End Date"),
                React.createElement("div", { className: "flex flex-col sm:flex-row gap-2" },
                    React.createElement(popover_1.Popover, null,
                        React.createElement(popover_1.PopoverTrigger, { asChild: true },
                            React.createElement(button_1.Button, { variant: "outline", className: "w-full justify-start text-left font-normal " + (errors.endDate ? "border-red-500" : "") }, date_fns_1.format(formData.endDate, "PPP"))),
                        React.createElement(popover_1.PopoverContent, { className: "w-auto p-0" },
                            React.createElement(calendar_1.Calendar, { mode: "single", selected: formData.endDate, onSelect: function (date) { return handleDateChange("endDate", date); }, initialFocus: true }))),
                    React.createElement("div", { className: "relative flex items-center" },
                        React.createElement(lucide_react_1.Clock, { size: 16, className: "absolute left-3 text-gray-500" }),
                        React.createElement(input_1.Input, { type: "time", value: endTime, onChange: function (e) { return handleTimeChange("endTime", e); }, className: "pl-10" }))),
                errors.endDate && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.endDate)))),
        React.createElement("div", { className: "space-y-2" },
            React.createElement("label", { htmlFor: "location", className: "text-sm font-medium flex items-center" },
                React.createElement(lucide_react_1.MapPin, { size: 16, className: "mr-2" }),
                "Location"),
            React.createElement(input_1.Input, { id: "location", name: "location", value: formData.location, onChange: handleChange, className: errors.location ? "border-red-500" : "" }),
            errors.location && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.location))),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
            React.createElement("div", { className: "space-y-2" },
                React.createElement("label", { htmlFor: "imageUrl", className: "text-sm font-medium flex items-center" },
                    React.createElement(lucide_react_1.Image, { size: 16, className: "mr-2" }),
                    "Image URL (Optional)"),
                React.createElement(input_1.Input, { id: "imageUrl", name: "imageUrl", value: formData.imageUrl || "", onChange: handleChange, className: errors.imageUrl ? "border-red-500" : "" }),
                errors.imageUrl && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.imageUrl)),
                React.createElement("p", { className: "text-xs text-gray-500" }, "Add a URL to an image for this event")),
            React.createElement("div", { className: "space-y-2" },
                React.createElement("label", { htmlFor: "maxAttendees", className: "text-sm font-medium flex items-center" },
                    React.createElement(lucide_react_1.Users, { size: 16, className: "mr-2" }),
                    "Maximum Attendees (Optional)"),
                React.createElement(input_1.Input, { id: "maxAttendees", name: "maxAttendees", type: "number", min: "1", value: formData.maxAttendees || "", onChange: handleChange, className: errors.maxAttendees ? "border-red-500" : "" }),
                errors.maxAttendees && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.maxAttendees)),
                React.createElement("p", { className: "text-xs text-gray-500" }, "Leave empty for unlimited attendees"))),
        React.createElement("div", { className: "flex items-center space-x-2" },
            React.createElement(switch_1.Switch, { id: "published", checked: formData.published, onCheckedChange: handlePublishedChange }),
            React.createElement("label", { htmlFor: "published", className: "text-sm font-medium" }, formData.published ? "Published" : "Draft"),
            React.createElement("p", { className: "text-xs text-gray-500 ml-2" }, formData.published
                ? "Event is visible to all users"
                : "Event is only visible to admins until published")),
        React.createElement("div", { className: "flex justify-between" },
            React.createElement("div", null, isEdit && (React.createElement(button_1.Button, { type: "button", variant: "outline", onClick: handleDelete, className: "text-red-500 border-red-500 hover:bg-red-50", disabled: isSubmitting || isDeleting }, isDeleting ? (React.createElement(React.Fragment, null,
                React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                "Deleting...")) : (React.createElement(React.Fragment, null,
                React.createElement(lucide_react_1.Trash, { className: "mr-2 h-4 w-4" }),
                "Delete Event"))))),
            React.createElement("div", { className: "flex gap-4" },
                React.createElement(button_1.Button, { type: "button", variant: "outline", onClick: function () { return router.push("/admin/events"); }, disabled: isSubmitting }, "Cancel"),
                React.createElement(button_1.Button, { type: "submit", className: "bg-orange-600 hover:bg-orange-700", disabled: isSubmitting }, isSubmitting ? (React.createElement(React.Fragment, null,
                    React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                    "Saving...")) : (React.createElement(React.Fragment, null,
                    React.createElement(lucide_react_1.Save, { className: "mr-2 h-4 w-4" }),
                    isEdit ? "Update Event" : "Create Event")))))));
}
exports["default"] = EventForm;
