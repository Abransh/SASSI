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
var react_2 = require("next-auth/react");
var navigation_1 = require("next/navigation");
var link_1 = require("next/link");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var Footer_1 = require("@/components/Footer");
function SignIn() {
    var _this = this;
    var router = navigation_1.useRouter();
    var searchParams = navigation_1.useSearchParams();
    var callbackUrl = searchParams.get("callbackUrl") || "/";
    var error = searchParams.get("error");
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(""), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, react_2.signIn("credentials", {
                            redirect: false,
                            email: email,
                            password: password,
                            callbackUrl: callbackUrl
                        })];
                case 2:
                    result = _a.sent();
                    if (!(result === null || result === void 0 ? void 0 : result.ok)) {
                        throw new Error((result === null || result === void 0 ? void 0 : result.error) || "Failed to sign in");
                    }
                    router.push(callbackUrl);
                    sonner_1.toast.success("Signed in successfully");
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("Sign in error:", error_1);
                    sonner_1.toast.error(error_1 instanceof Error ? error_1.message : "Invalid email or password");
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement(Header_1["default"], null),
        React.createElement(MobileMenu_1["default"], null),
        React.createElement("div", { className: "min-h-screen pt-32 pb-20 bg-gray-50 flex flex-col justify-center" },
            React.createElement("div", { className: "max-w-md w-full mx-auto" },
                React.createElement("div", { className: "bg-white p-8 rounded-lg shadow-md" },
                    React.createElement("div", { className: "text-center mb-8" },
                        React.createElement("h1", { className: "text-2xl font-bold" }, "Sign In"),
                        React.createElement("p", { className: "text-gray-600 mt-2" }, "Sign in to your SASSI account")),
                    error && (React.createElement("div", { className: "mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700" },
                        React.createElement("p", null, "Invalid email or password"))),
                    React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "email", className: "text-sm font-medium" }, "Email"),
                            React.createElement(input_1.Input, { id: "email", type: "email", value: email, onChange: function (e) { return setEmail(e.target.value); }, placeholder: "Enter your email", required: true })),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("div", { className: "flex items-center justify-between" },
                                React.createElement("label", { htmlFor: "password", className: "text-sm font-medium" }, "Password"),
                                React.createElement(link_1["default"], { href: "/auth/forgot-password", className: "text-sm text-orange-600 hover:text-orange-800" }, "Forgot password?")),
                            React.createElement(input_1.Input, { id: "password", type: "password", value: password, onChange: function (e) { return setPassword(e.target.value); }, placeholder: "Enter your password", required: true })),
                        React.createElement(button_1.Button, { type: "submit", className: "w-full bg-orange-600 hover:bg-orange-700", disabled: isLoading }, isLoading ? (React.createElement(React.Fragment, null,
                            React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                            "Signing in...")) : ("Sign In"))),
                    React.createElement("div", { className: "mt-6 text-center" },
                        React.createElement("p", { className: "text-sm text-gray-600" },
                            "Don't have an account?",
                            " ",
                            React.createElement(link_1["default"], { href: "/auth/signup", className: "text-orange-600 hover:text-orange-800 font-medium" }, "Sign Up")))))),
        React.createElement(Footer_1["default"], null)));
}
exports["default"] = SignIn;
