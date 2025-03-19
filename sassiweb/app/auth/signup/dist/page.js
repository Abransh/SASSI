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
var link_1 = require("next/link");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var Footer_1 = require("@/components/Footer");
var zod_1 = require("zod");
// Form validation schema
var signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Please enter a valid email address"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: zod_1.z.string(),
    university: zod_1.z.string().optional(),
    course: zod_1.z.string().optional()
})
    .refine(function (data) { return data.password === data.confirmPassword; }, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});
function SignUp() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        university: "",
        course: ""
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1.useState({}), errors = _b[0], setErrors = _b[1];
    var _c = react_1.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var validateForm = function () {
        try {
            signupSchema.parse(formData);
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
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm()) {
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, fetch("/api/auth/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                name: formData.name,
                                email: formData.email,
                                password: formData.password,
                                university: formData.university,
                                course: formData.course
                            })
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    throw new Error(data.error || "Failed to create account");
                case 4:
                    sonner_1.toast.success("Account created successfully! Please sign in.");
                    router.push("/auth/signin");
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    console.error("Signup error:", error_1);
                    sonner_1.toast.error(error_1 instanceof Error ? error_1.message : "Failed to create account");
                    return [3 /*break*/, 7];
                case 6:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement(Header_1["default"], null),
        React.createElement(MobileMenu_1["default"], null),
        React.createElement("div", { className: "min-h-screen pt-32 pb-20 bg-gray-50 flex flex-col justify-center" },
            React.createElement("div", { className: "max-w-md w-full mx-auto" },
                React.createElement("div", { className: "bg-white p-8 rounded-lg shadow-md" },
                    React.createElement("div", { className: "text-center mb-6" },
                        React.createElement("h1", { className: "text-2xl font-bold" }, "Join SASSI"),
                        React.createElement("p", { className: "text-gray-600 mt-2" }, "Create an account to connect with other Indian students in Milan")),
                    React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "name", className: "text-sm font-medium" }, "Full Name"),
                            React.createElement(input_1.Input, { id: "name", name: "name", value: formData.name, onChange: handleChange, placeholder: "Your full name", required: true, className: errors.name ? "border-red-500" : "" }),
                            errors.name && React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.name)),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "email", className: "text-sm font-medium" }, "Email"),
                            React.createElement(input_1.Input, { id: "email", name: "email", type: "email", value: formData.email, onChange: handleChange, placeholder: "Your email address", required: true, className: errors.email ? "border-red-500" : "" }),
                            errors.email && React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.email)),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "password", className: "text-sm font-medium" }, "Password"),
                            React.createElement(input_1.Input, { id: "password", name: "password", type: "password", value: formData.password, onChange: handleChange, placeholder: "Create a password", required: true, className: errors.password ? "border-red-500" : "" }),
                            errors.password && React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.password)),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "confirmPassword", className: "text-sm font-medium" }, "Confirm Password"),
                            React.createElement(input_1.Input, { id: "confirmPassword", name: "confirmPassword", type: "password", value: formData.confirmPassword, onChange: handleChange, placeholder: "Confirm your password", required: true, className: errors.confirmPassword ? "border-red-500" : "" }),
                            errors.confirmPassword && (React.createElement("p", { className: "text-red-500 text-xs mt-1" }, errors.confirmPassword))),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "university", className: "text-sm font-medium" }, "University in Milan (Optional)"),
                            React.createElement(input_1.Input, { id: "university", name: "university", value: formData.university, onChange: handleChange, placeholder: "e.g., Politecnico di Milano" })),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "course", className: "text-sm font-medium" }, "Course/Program (Optional)"),
                            React.createElement(input_1.Input, { id: "course", name: "course", value: formData.course, onChange: handleChange, placeholder: "e.g., MSc Computer Engineering" })),
                        React.createElement(button_1.Button, { type: "submit", className: "w-full bg-orange-600 hover:bg-orange-700 mt-6", disabled: isLoading }, isLoading ? (React.createElement(React.Fragment, null,
                            React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                            "Creating Account...")) : ("Create Account"))),
                    React.createElement("div", { className: "mt-6 text-center" },
                        React.createElement("p", { className: "text-sm text-gray-600" },
                            "Already have an account?",
                            " ",
                            React.createElement(link_1["default"], { href: "/auth/signin", className: "text-orange-600 hover:text-orange-800 font-medium" }, "Sign In")))))),
        React.createElement(Footer_1["default"], null)));
}
exports["default"] = SignUp;
