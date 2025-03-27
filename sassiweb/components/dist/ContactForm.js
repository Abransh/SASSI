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
    var _b = react_1.useState(false), isSuccess = _b[0], setIsSuccess = _b[1];
    var _c = react_1.useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    }), formData = _c[0], setFormData = _c[1];
    var _d = react_1.useState({}), errors = _d[0], setErrors = _d[1];
    var _e = react_1.useState({}), formTouched = _e[0], setFormTouched = _e[1];
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
        // Mark field as touched
        setFormTouched(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = true, _a)));
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
    var handleBlur = function (e) {
        var name = e.target.name;
        // Validate only the current field
        try {
            var fieldSchema = contactFormSchema.shape[name];
            fieldSchema.parse(formData[name]);
            setErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = undefined, _a)));
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                setErrors(function (prev) {
                    var _a;
                    var _b;
                    return (__assign(__assign({}, prev), (_a = {}, _a[name] = ((_b = error.errors[0]) === null || _b === void 0 ? void 0 : _b.message) || "Invalid " + name, _a)));
                });
            }
        }
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var allTouched, response, error, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    allTouched = Object.keys(formData).reduce(function (acc, key) {
                        acc[key] = true;
                        return acc;
                    }, {});
                    setFormTouched(allTouched);
                    if (!validateForm()) {
                        sonner_1.toast.error("Please fix the errors in the form");
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
                    // Show success state
                    setIsSuccess(true);
                    sonner_1.toast.success("Message sent! We'll get back to you as soon as possible.");
                    // Reset form after delay
                    setTimeout(function () {
                        setFormData({
                            name: "",
                            email: "",
                            subject: "",
                            message: ""
                        });
                        setFormTouched({});
                        setIsSuccess(false);
                    }, 5000);
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
    return (React.createElement("section", { id: "contact-us", className: "py-24 relative overflow-hidden" },
        React.createElement("div", { className: "absolute left-0 top-1/3 w-64 h-64 bg-orange-100 rounded-full opacity-70 blur-3xl" }),
        React.createElement("div", { className: "absolute right-0 bottom-1/4 w-96 h-96 bg-yellow-100 rounded-full opacity-70 blur-3xl" }),
        React.createElement("div", { className: "container mx-auto px-4 relative" },
            React.createElement("div", { className: "max-w-6xl mx-auto" },
                React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" },
                    React.createElement("div", { className: "space-y-8" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "inline-block px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-3" }, "Get In Touch"),
                            React.createElement("h2", { className: "text-4xl md:text-5xl font-bold mb-6" }, "Contact Us"),
                            React.createElement("p", { className: "text-lg text-gray-600" }, "Have questions about SASSI or want to get involved? We'd love to hear from you! Fill out the form and our team will get back to you as soon as possible.")),
                        React.createElement("div", { className: "space-y-6" },
                            React.createElement("div", { className: "flex items-start" },
                                React.createElement("div", { className: "w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4 shrink-0" },
                                    React.createElement(lucide_react_1.Mail, { className: "h-6 w-6 text-orange-600" })),
                                React.createElement("div", null,
                                    React.createElement("h3", { className: "text-lg font-semibold mb-1" }, "Email Us"),
                                    React.createElement("p", { className: "text-gray-600 mb-1" }, "For general inquiries:"),
                                    React.createElement("a", { href: "mailto:support@sassimilan.com", className: "text-orange-600 hover:underline" }, "support@sassimilan.com"))),
                            React.createElement("div", { className: "flex items-start" },
                                React.createElement("div", { className: "w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4 shrink-0" },
                                    React.createElement(lucide_react_1.User, { className: "h-6 w-6 text-orange-600" })),
                                React.createElement("div", null,
                                    React.createElement("h3", { className: "text-lg font-semibold mb-1" }, "Follow Us"),
                                    React.createElement("p", { className: "text-gray-600 mb-1" }, "Stay connected:"),
                                    React.createElement("a", { href: "https://www.instagram.com/sassi.milan/", target: "_blank", rel: "noopener noreferrer", className: "text-orange-600 hover:underline" }, "@sassi.milan"))),
                            React.createElement("div", { className: "flex items-start" },
                                React.createElement("div", { className: "w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4 shrink-0" },
                                    React.createElement(lucide_react_1.MessageSquare, { className: "h-6 w-6 text-orange-600" })),
                                React.createElement("div", null,
                                    React.createElement("h3", { className: "text-lg font-semibold mb-1" }, "Response Time"),
                                    React.createElement("p", { className: "text-gray-600" }, "We aim to respond to all inquiries within 24-48 hours during weekdays."))))),
                    React.createElement("div", { className: "bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative z-10 transition-all duration-300 hover:shadow-xl" }, isSuccess ? (React.createElement("div", { className: "text-center py-12" },
                        React.createElement("div", { className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6" },
                            React.createElement(lucide_react_1.CheckCircle, { className: "h-10 w-10 text-green-600" })),
                        React.createElement("h3", { className: "text-2xl font-bold mb-4" }, "Message Sent!"),
                        React.createElement("p", { className: "text-gray-600 mb-6" }, "Thank you for reaching out. We've received your message and will get back to you as soon as possible."),
                        React.createElement("button", { onClick: function () { return setIsSuccess(false); }, className: "px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 font-medium transition-colors" }, "Send Another Message"))) : (React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
                        React.createElement("h3", { className: "text-2xl font-bold mb-6" }, "Send a Message"),
                        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                            React.createElement("div", { className: "space-y-2" },
                                React.createElement("label", { htmlFor: "name", className: "text-sm font-medium flex items-center" },
                                    React.createElement(lucide_react_1.User, { className: "h-4 w-4 mr-2 text-gray-500" }),
                                    "Name ",
                                    React.createElement("span", { className: "text-red-500 ml-1" }, "*")),
                                React.createElement(input_1.Input, { id: "name", name: "name", value: formData.name, onChange: handleChange, onBlur: handleBlur, placeholder: "Your name", className: "w-full transition-all duration-300 " + (errors.name && formTouched.name ? "border-red-500 bg-red-50" :
                                        formTouched.name ? "border-green-500" : "") }),
                                errors.name && formTouched.name && (React.createElement("p", { className: "text-red-500 text-xs mt-1 animate-in fade-in-50" }, errors.name))),
                            React.createElement("div", { className: "space-y-2" },
                                React.createElement("label", { htmlFor: "email", className: "text-sm font-medium flex items-center" },
                                    React.createElement(lucide_react_1.Mail, { className: "h-4 w-4 mr-2 text-gray-500" }),
                                    "Email ",
                                    React.createElement("span", { className: "text-red-500 ml-1" }, "*")),
                                React.createElement(input_1.Input, { id: "email", name: "email", type: "email", value: formData.email, onChange: handleChange, onBlur: handleBlur, placeholder: "Your email", className: "w-full transition-all duration-300 " + (errors.email && formTouched.email ? "border-red-500 bg-red-50" :
                                        formTouched.email ? "border-green-500" : "") }),
                                errors.email && formTouched.email && (React.createElement("p", { className: "text-red-500 text-xs mt-1 animate-in fade-in-50" }, errors.email)))),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "subject", className: "text-sm font-medium flex items-center" },
                                React.createElement(lucide_react_1.MessageSquare, { className: "h-4 w-4 mr-2 text-gray-500" }),
                                "Subject ",
                                React.createElement("span", { className: "text-red-500 ml-1" }, "*")),
                            React.createElement(input_1.Input, { id: "subject", name: "subject", value: formData.subject, onChange: handleChange, onBlur: handleBlur, placeholder: "What is this regarding?", className: "w-full transition-all duration-300 " + (errors.subject && formTouched.subject ? "border-red-500 bg-red-50" :
                                    formTouched.subject ? "border-green-500" : "") }),
                            errors.subject && formTouched.subject && (React.createElement("p", { className: "text-red-500 text-xs mt-1 animate-in fade-in-50" }, errors.subject))),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "message", className: "text-sm font-medium flex items-center" },
                                React.createElement(lucide_react_1.MessageSquare, { className: "h-4 w-4 mr-2 text-gray-500" }),
                                "Message ",
                                React.createElement("span", { className: "text-red-500 ml-1" }, "*")),
                            React.createElement(textarea_1.Textarea, { id: "message", name: "message", value: formData.message, onChange: handleChange, onBlur: handleBlur, placeholder: "Your message", className: "min-h-[150px] w-full transition-all duration-300 " + (errors.message && formTouched.message ? "border-red-500 bg-red-50" :
                                    formTouched.message ? "border-green-500" : "") }),
                            errors.message && formTouched.message && (React.createElement("p", { className: "text-red-500 text-xs mt-1 animate-in fade-in-50" }, errors.message))),
                        React.createElement(button_1.Button, { type: "submit", className: "w-full bg-orange-600 hover:bg-orange-700 transition-colors group relative overflow-hidden", disabled: isSubmitting },
                            React.createElement("span", { className: "relative z-10 flex items-center justify-center" }, isSubmitting ? (React.createElement(React.Fragment, null,
                                React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                                "Sending...")) : (React.createElement(React.Fragment, null,
                                React.createElement(lucide_react_1.Send, { className: "mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" }),
                                "Send Message"))),
                            React.createElement("span", { className: "absolute inset-0 bg-orange-700 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" })),
                        React.createElement("p", { className: "text-xs text-gray-500 text-center" },
                            "By submitting this form, you agree to our ",
                            React.createElement("a", { href: "#", className: "text-orange-600 hover:underline" }, "Privacy Policy"),
                            ".")))))))));
}
exports["default"] = ContactForm;
