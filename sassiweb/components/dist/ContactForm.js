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
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var sonner_1 = require("sonner");
var zod_1 = require("zod");
var lucide_react_1 = require("lucide-react");
// Form validation schema
var contactFormSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Please enter a valid email address"),
    subject: zod_1.z.string().min(1, "Subject is required"),
    message: zod_1.z.string().min(10, "Message must be at least 10 characters")
});
function ContactForm() {
    var _this = this;
    var _a = react_1.useState(false), isSubmitting = _a[0], setIsSubmitting = _a[1];
    var _b = react_1.useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    }), formData = _b[0], setFormData = _b[1];
    var _c = react_1.useState({}), errors = _c[0], setErrors = _c[1];
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
        // Clear error when field is edited
        if (errors[name]) {
            setErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = undefined, _a)));
            });
        }
    };
    var validateForm = function () {
        try {
            contactFormSchema.parse(formData);
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
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, error, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm()) {
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, fetch("/api/contact", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(formData)
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    error = _a.sent();
                    throw new Error(error.error || "Something went wrong. Please try again.");
                case 4:
                    sonner_1.toast.success("Message sent! We'll get back to you as soon as possible.");
                    // Reset form
                    setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: ""
                    });
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    console.error("Error submitting form:", error_1);
                    sonner_1.toast.error(error_1 instanceof Error ? error_1.message : "Failed to send message. Please try again.");
                    return [3 /*break*/, 7];
                case 6:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("section", { id: "contact-us", className: "py-20 bg-gray-50" },
        React.createElement("div", { className: "container mx-auto px-4" },
            React.createElement("div", { className: "max-w-3xl mx-auto" },
                React.createElement("div", { className: "text-center mb-12" },
                    React.createElement("h2", { className: "text-4xl md:text-5xl font-serif mb-4" }, "Contact Us"),
                    React.createElement("p", { className: "text-lg text-gray-600" }, "Have questions or want to get involved? We'd love to hear from you.")),
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "name", className: "text-sm font-medium" }, "Name"),
                            React.createElement(input_1.Input, { id: "name", name: "name", value: formData.name, onChange: handleChange, placeholder: "Your name", className: "w-full " + (errors.name ? "border-red-500" : "") }),
                            errors.name && React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.name)),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "email", className: "text-sm font-medium" }, "Email"),
                            React.createElement(input_1.Input, { id: "email", name: "email", type: "email", value: formData.email, onChange: handleChange, placeholder: "Your email", className: "w-full " + (errors.email ? "border-red-500" : "") }),
                            errors.email && React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.email))),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("label", { htmlFor: "subject", className: "text-sm font-medium" }, "Subject"),
                        React.createElement(input_1.Input, { id: "subject", name: "subject", value: formData.subject, onChange: handleChange, placeholder: "What is this regarding?", className: "w-full " + (errors.subject ? "border-red-500" : "") }),
                        errors.subject && React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.subject)),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("label", { htmlFor: "message", className: "text-sm font-medium" }, "Message"),
                        React.createElement(textarea_1.Textarea, { id: "message", name: "message", value: formData.message, onChange: handleChange, placeholder: "Your message", className: "min-h-[150px] w-full " + (errors.message ? "border-red-500" : "") }),
                        errors.message && React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.message)),
                    React.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: isSubmitting }, isSubmitting ? (React.createElement(React.Fragment, null,
                        React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                        "Sending...")) : ("Send Message")))))));
}
exports["default"] = ContactForm;
