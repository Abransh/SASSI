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
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var Footer_1 = require("@/components/Footer");
var sonner_1 = require("sonner");
var zod_1 = require("zod");
var memberSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: zod_1.z.string(),
    isStudent: zod_1.z.boolean(),
    university: zod_1.z.string().min(1, "University selection is required"),
    codiceFiscale: zod_1.z.string().optional()
});
var UNIVERSITIES = [
    "Politecnico Di Milano",
    "Università degli Studi di Milano",
    "NABA Nuova Accademia di Belle Arti",
    "Domus Academy",
    "Bocconi University/SDA Bocconi School of Management",
    "Humanitas University",
    "IED Istituto Europeo di Design",
    "Istituto Marangoni",
    "POLIMI GSOMI"
];
function MemberRegistrationPage() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState(1), currentStep = _a[0], setCurrentStep = _a[1];
    var _b = react_1.useState(false), isSubmitting = _b[0], setIsSubmitting = _b[1];
    var _c = react_1.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isStudent: true,
        university: "",
        codiceFiscale: ""
    }), formData = _c[0], setFormData = _c[1];
    var _d = react_1.useState({}), errors = _d[0], setErrors = _d[1];
    var validateStep = function (step) {
        try {
            if (step === 1) {
                var firstName = formData.firstName, lastName = formData.lastName, email = formData.email, isStudent = formData.isStudent;
                zod_1.z.object({
                    firstName: zod_1.z.string().min(1, "First name is required"),
                    lastName: zod_1.z.string().min(1, "Last name is required"),
                    email: zod_1.z.string().email("Invalid email address"),
                    isStudent: zod_1.z.boolean()
                }).parse({ firstName: firstName, lastName: lastName, email: email, isStudent: isStudent });
            }
            else if (step === 2) {
                var password = formData.password, confirmPassword = formData.confirmPassword;
                zod_1.z.object({
                    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
                    confirmPassword: zod_1.z.string()
                })
                    .refine(function (data) { return data.password === data.confirmPassword; }, {
                    message: "Passwords do not match",
                    path: ["confirmPassword"]
                })
                    .parse({ password: password, confirmPassword: confirmPassword });
            }
            else if (step === 3) {
                var university = formData.university;
                zod_1.z.object({
                    university: zod_1.z.string().min(1, "University selection is required")
                }).parse({ university: university });
            }
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
        var _a = e.target, name = _a.name, value = _a.value, type = _a.type;
        var updatedValue = value;
        if (type === 'checkbox') {
            var target = e.target;
            updatedValue = target.checked;
        }
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = updatedValue, _a)));
        });
        // Clear error when field is edited
        if (errors[name]) {
            setErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = undefined, _a)));
            });
        }
    };
    var handleNextStep = function () {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
        }
    };
    var handlePrevStep = function () {
        setCurrentStep(currentStep - 1);
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validateStep(currentStep)) {
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    // In a real implementation, we would register the user here
                    // For now, let's simulate API call with setTimeout
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 2:
                    // In a real implementation, we would register the user here
                    // For now, let's simulate API call with setTimeout
                    _a.sent();
                    // Redirect to payment
                    window.location.href = "https://revolut.me/harshnj";
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("Registration error:", error_1);
                    sonner_1.toast.error("Failed to register. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Different content based on the current step
    var renderStepContent = function () {
        switch (currentStep) {
            case 1:
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h2", { className: "text-xl font-bold" }, "Step 1: Personal Information"),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "firstName", className: "text-sm font-medium" }, "First Name*"),
                            React.createElement("input", { id: "firstName", name: "firstName", type: "text", value: formData.firstName, onChange: handleChange, className: "w-full p-2 border rounded-md " + (errors.firstName ? "border-red-500" : "border-gray-300"), required: true }),
                            errors.firstName && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.firstName))),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "lastName", className: "text-sm font-medium" }, "Last Name*"),
                            React.createElement("input", { id: "lastName", name: "lastName", type: "text", value: formData.lastName, onChange: handleChange, className: "w-full p-2 border rounded-md " + (errors.lastName ? "border-red-500" : "border-gray-300"), required: true }),
                            errors.lastName && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.lastName)))),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("label", { htmlFor: "email", className: "text-sm font-medium" }, "Email Address*"),
                        React.createElement("input", { id: "email", name: "email", type: "email", value: formData.email, onChange: handleChange, className: "w-full p-2 border rounded-md " + (errors.email ? "border-red-500" : "border-gray-300"), required: true }),
                        errors.email && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.email))),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("label", { className: "text-sm font-medium" }, "Student Status*"),
                        React.createElement("div", { className: "flex items-center space-x-4" },
                            React.createElement("label", { className: "flex items-center" },
                                React.createElement("input", { type: "checkbox", name: "isStudent", checked: formData.isStudent, onChange: handleChange, className: "mr-2 h-4 w-4" }),
                                React.createElement("span", null, "I am currently a student"))))));
            case 2:
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h2", { className: "text-xl font-bold" }, "Step 2: Create Password"),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("label", { htmlFor: "password", className: "text-sm font-medium" }, "Password*"),
                        React.createElement("input", { id: "password", name: "password", type: "password", value: formData.password, onChange: handleChange, className: "w-full p-2 border rounded-md " + (errors.password ? "border-red-500" : "border-gray-300"), required: true }),
                        errors.password && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.password))),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("label", { htmlFor: "confirmPassword", className: "text-sm font-medium" }, "Confirm Password*"),
                        React.createElement("input", { id: "confirmPassword", name: "confirmPassword", type: "password", value: formData.confirmPassword, onChange: handleChange, className: "w-full p-2 border rounded-md " + (errors.confirmPassword ? "border-red-500" : "border-gray-300"), required: true }),
                        errors.confirmPassword && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.confirmPassword))),
                    React.createElement("div", { className: "text-sm text-gray-600 bg-gray-50 p-3 rounded-md" },
                        React.createElement("p", null, "Your password must be at least 8 characters long and should include a mix of letters, numbers, and special characters for security."))));
            case 3:
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h2", { className: "text-xl font-bold" }, "Step 3: University Information"),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("label", { htmlFor: "university", className: "text-sm font-medium" }, "University/Institution*"),
                        React.createElement("select", { id: "university", name: "university", value: formData.university, onChange: handleChange, className: "w-full p-2 border rounded-md " + (errors.university ? "border-red-500" : "border-gray-300"), required: true },
                            React.createElement("option", { value: "" }, "Select your university"),
                            UNIVERSITIES.map(function (uni) { return (React.createElement("option", { key: uni, value: uni }, uni)); })),
                        errors.university && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.university))),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("label", { htmlFor: "codiceFiscale", className: "text-sm font-medium" }, "Codice Fiscale / PAN Card (Optional)"),
                        React.createElement("input", { id: "codiceFiscale", name: "codiceFiscale", type: "text", value: formData.codiceFiscale, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded-md" }),
                        React.createElement("p", { className: "text-xs text-gray-500" }, "This information helps us verify your identity. It's optional but recommended."))));
            case 4:
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h2", { className: "text-xl font-bold" }, "Step 4: Membership Fee"),
                    React.createElement("div", { className: "bg-gray-50 p-4 rounded-lg border border-gray-200" },
                        React.createElement("h3", { className: "font-medium text-lg mb-2" }, "SASSI Membership Benefits:"),
                        React.createElement("ul", { className: "list-disc pl-5 space-y-1 text-gray-700" },
                            React.createElement("li", null, "Access to all SASSI events and activities"),
                            React.createElement("li", null, "Exclusive resources for living and studying in Milan"),
                            React.createElement("li", null, "Community support network for Indian students"),
                            React.createElement("li", null, "Networking opportunities with fellow students and professionals"),
                            React.createElement("li", null, "Discounts with our partner businesses and services"))),
                    React.createElement("div", { className: "bg-yellow-50 p-4 rounded-lg border border-yellow-200" },
                        React.createElement("h3", { className: "font-medium text-lg mb-2" }, "Annual Membership Fee:"),
                        React.createElement("p", { className: "text-gray-700" },
                            "The annual membership fee is ",
                            React.createElement("span", { className: "font-bold" }, "\u20AC20.00"),
                            ". After clicking \"Proceed to Payment\", you'll be redirected to our secure payment page.")),
                    React.createElement("div", { className: "text-sm text-gray-600 bg-blue-50 p-3 rounded-md" },
                        React.createElement("p", null,
                            React.createElement("strong", null, "Note:"),
                            " Upon completing payment, your membership will be activated and you'll gain immediate access to all member benefits."))));
            default:
                return null;
        }
    };
    return (React.createElement("main", { className: "min-h-screen bg-gray-50" },
        React.createElement(Header_1["default"], null),
        React.createElement(MobileMenu_1["default"], null),
        React.createElement("div", { className: "pt-32 pb-20" },
            React.createElement("div", { className: "container mx-auto px-4" },
                React.createElement("div", { className: "max-w-2xl mx-auto" },
                    React.createElement("div", { className: "bg-white rounded-lg shadow-md overflow-hidden" },
                        React.createElement("div", { className: "p-6 border-b" },
                            React.createElement("h1", { className: "text-2xl font-bold mb-1" }, "Join SASSI as a Member"),
                            React.createElement("p", { className: "text-gray-600" }, "Complete the registration to become part of our community.")),
                        React.createElement("div", { className: "px-6 py-4 bg-gray-50" },
                            React.createElement("div", { className: "flex justify-between" }, [1, 2, 3, 4].map(function (step) { return (React.createElement("div", { key: step, className: "flex flex-col items-center" },
                                React.createElement("div", { className: "w-8 h-8 rounded-full flex items-center justify-center mb-1\n                        " + (currentStep >= step
                                        ? "bg-orange-600 text-white"
                                        : "bg-gray-200 text-gray-600") }, step),
                                React.createElement("div", { className: "text-xs text-gray-500" },
                                    step === 1 && "Basic Info",
                                    step === 2 && "Password",
                                    step === 3 && "Details",
                                    step === 4 && "Payment"))); })),
                            React.createElement("div", { className: "mt-2 h-1 bg-gray-200 rounded-full" },
                                React.createElement("div", { className: "h-full bg-orange-600 rounded-full transition-all", style: { width: (currentStep - 1) * 33.33 + "%" } }))),
                        React.createElement("form", { onSubmit: handleSubmit, className: "p-6" },
                            renderStepContent(),
                            React.createElement("div", { className: "flex justify-between mt-8" },
                                currentStep > 1 ? (React.createElement("button", { type: "button", onClick: handlePrevStep, className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors", disabled: isSubmitting }, "Back")) : (React.createElement("div", null)),
                                currentStep < 4 ? (React.createElement("button", { type: "button", onClick: handleNextStep, className: "px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors" }, "Continue")) : (React.createElement("button", { type: "submit", className: "px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center", disabled: isSubmitting }, isSubmitting ? (React.createElement(React.Fragment, null,
                                    React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                                    "Processing...")) : ("Proceed to Payment"))))),
                        React.createElement("div", { className: "p-6 border-t bg-gray-50 text-center" },
                            React.createElement("p", { className: "text-sm text-gray-600" },
                                "Already a member?",
                                " ",
                                React.createElement(link_1["default"], { href: "/auth/signin", className: "text-orange-600 hover:text-orange-800 font-medium" }, "Sign in here"))))))),
        React.createElement(Footer_1["default"], null)));
}
exports["default"] = MemberRegistrationPage;
