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
var navigation_1 = require("next/navigation");
var react_2 = require("next-auth/react");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var Footer_1 = require("@/components/Footer");
var sonner_1 = require("sonner");
// Team departments
var DEPARTMENTS = [
    {
        id: "student-support",
        title: "Student Support",
        description: "Help new arrivals navigate life in Milan, answer queries, and provide guidance on practical matters.",
        icon: "👋"
    },
    {
        id: "events",
        title: "Event Organizers",
        description: "Plan, coordinate, and execute cultural and social events, celebrations, and gatherings for the community.",
        icon: "🎉"
    },
    {
        id: "consulate",
        title: "Consulate Liaison",
        description: "Coordinate with the Indian Consulate for official matters, document verifications, and community services.",
        icon: "🏛️"
    },
    {
        id: "sponsorship",
        title: "Sponsorship & External Liaison",
        description: "Build relationships with sponsors, partner organizations, and represent SASSI in external meetings.",
        icon: "🤝"
    },
    {
        id: "social-media",
        title: "Social Media, Design & Content Creation",
        description: "Create engaging content, manage social media accounts, and design promotional materials.",
        icon: "🎨"
    },
    {
        id: "tech",
        title: "Tech Team",
        description: "Maintain the website, develop new features, and provide technical support for digital initiatives.",
        icon: "💻"
    }
];
function TeamRegistrationPage() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_2.useSession(), session = _a.data, status = _a.status;
    var _b = react_1.useState(null), selectedDepartment = _b[0], setSelectedDepartment = _b[1];
    var _c = react_1.useState(false), isSubmitting = _c[0], setIsSubmitting = _c[1];
    var _d = react_1.useState(false), isConfirming = _d[0], setIsConfirming = _d[1];
    var _e = react_1.useState(false), isSuccess = _e[0], setIsSuccess = _e[1];
    react_1.useEffect(function () {
        // Check if user is authenticated once the session loads
        if (status === "unauthenticated") {
            sonner_1.toast.info("Please register or sign in to join the team");
            router.push("/join/member");
        }
    }, [status, router]);
    var handleDepartmentSelect = function (departmentId) {
        setSelectedDepartment(departmentId);
        setIsConfirming(true);
    };
    var handleConfirm = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedDepartment)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    // In a real implementation, we would send this data to the backend
                    // For now, let's simulate an API call with setTimeout
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 2:
                    // In a real implementation, we would send this data to the backend
                    // For now, let's simulate an API call with setTimeout
                    _a.sent();
                    // Show success screen
                    setIsSuccess(true);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error submitting application:", error_1);
                    sonner_1.toast.error("Failed to submit your application. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleChangeSelection = function () {
        setIsConfirming(false);
    };
    // If loading session
    if (status === "loading") {
        return (React.createElement("main", { className: "min-h-screen bg-gray-50" },
            React.createElement(Header_1["default"], null),
            React.createElement(MobileMenu_1["default"], null),
            React.createElement("div", { className: "pt-32 pb-20 flex justify-center items-center" },
                React.createElement("div", { className: "flex flex-col items-center" },
                    React.createElement(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-orange-600" }),
                    React.createElement("p", { className: "mt-4 text-gray-600" }, "Loading..."))),
            React.createElement(Footer_1["default"], null)));
    }
    // Show the success screen
    if (isSuccess) {
        var selectedDept = DEPARTMENTS.find(function (dept) { return dept.id === selectedDepartment; });
        return (React.createElement("main", { className: "min-h-screen bg-gray-50" },
            React.createElement(Header_1["default"], null),
            React.createElement(MobileMenu_1["default"], null),
            React.createElement("div", { className: "pt-32 pb-20" },
                React.createElement("div", { className: "container mx-auto px-4" },
                    React.createElement("div", { className: "max-w-2xl mx-auto" },
                        React.createElement("div", { className: "bg-white rounded-lg shadow-md overflow-hidden" },
                            React.createElement("div", { className: "p-8 text-center" },
                                React.createElement("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" },
                                    React.createElement(lucide_react_1.CheckCircle, { size: 32, className: "text-green-600" })),
                                React.createElement("h1", { className: "text-2xl font-bold mb-4" }, "Application Submitted!"),
                                React.createElement("p", { className: "text-gray-600 mb-6" },
                                    "Thank you for your interest in joining the SASSI team as part of the",
                                    React.createElement("span", { className: "font-medium" },
                                        " ", selectedDept === null || selectedDept === void 0 ? void 0 :
                                        selectedDept.title),
                                    " department."),
                                React.createElement("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left" },
                                    React.createElement("h3", { className: "font-medium text-blue-800 mb-2" }, "What happens next?"),
                                    React.createElement("ol", { className: "list-decimal pl-5 text-sm text-gray-700 space-y-1" },
                                        React.createElement("li", null, "A confirmation email has been sent to your registered email address."),
                                        React.createElement("li", null, "A team coordinator will review your application."),
                                        React.createElement("li", null, "You'll be contacted within the next 3-5 days for further steps."),
                                        React.createElement("li", null, "You may be invited to a brief orientation call to discuss your role."))),
                                React.createElement("div", { className: "flex justify-center space-x-4" },
                                    React.createElement(link_1["default"], { href: "/", className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors" }, "Return to Home"),
                                    React.createElement(link_1["default"], { href: "/profile", className: "px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors" }, "Go to My Profile"))))))),
            React.createElement(Footer_1["default"], null)));
    }
    // Show confirmation screen
    if (isConfirming && selectedDepartment) {
        var selectedDept = DEPARTMENTS.find(function (dept) { return dept.id === selectedDepartment; });
        return (React.createElement("main", { className: "min-h-screen bg-gray-50" },
            React.createElement(Header_1["default"], null),
            React.createElement(MobileMenu_1["default"], null),
            React.createElement("div", { className: "pt-32 pb-20" },
                React.createElement("div", { className: "container mx-auto px-4" },
                    React.createElement("div", { className: "max-w-2xl mx-auto" },
                        React.createElement("div", { className: "bg-white rounded-lg shadow-md overflow-hidden" },
                            React.createElement("div", { className: "p-6 border-b" },
                                React.createElement("h1", { className: "text-2xl font-bold mb-1" }, "Confirm Your Selection"),
                                React.createElement("p", { className: "text-gray-600" }, "Please review your team department selection before submitting.")),
                            React.createElement("div", { className: "p-6" },
                                React.createElement("div", { className: "bg-orange-50 p-4 rounded-lg border border-orange-200 mb-6" },
                                    React.createElement("h2", { className: "text-lg font-bold flex items-center" },
                                        React.createElement("span", { className: "text-2xl mr-2" }, selectedDept === null || selectedDept === void 0 ? void 0 : selectedDept.icon), selectedDept === null || selectedDept === void 0 ? void 0 :
                                        selectedDept.title),
                                    React.createElement("p", { className: "text-gray-700 mt-2" }, selectedDept === null || selectedDept === void 0 ? void 0 : selectedDept.description)),
                                React.createElement("div", { className: "bg-blue-50 p-4 rounded-lg border border-blue-200" },
                                    React.createElement("h3", { className: "font-medium text-blue-800 mb-2" }, "What to expect:"),
                                    React.createElement("ul", { className: "list-disc pl-5 text-sm text-gray-700 space-y-1" },
                                        React.createElement("li", null, "You'll be added to the department's communication channels."),
                                        React.createElement("li", null, "A team coordinator will reach out to discuss your role."),
                                        React.createElement("li", null, "Time commitment is flexible, typically 2-4 hours per week."),
                                        React.createElement("li", null, "You'll receive training and support from experienced team members."))),
                                React.createElement("div", { className: "flex justify-between mt-8" },
                                    React.createElement("button", { type: "button", onClick: handleChangeSelection, className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors", disabled: isSubmitting }, "Change Selection"),
                                    React.createElement("button", { type: "button", onClick: handleConfirm, className: "px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center", disabled: isSubmitting }, isSubmitting ? (React.createElement(React.Fragment, null,
                                        React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                                        "Processing...")) : ("Confirm & Submit")))))))),
            React.createElement(Footer_1["default"], null)));
    }
    // Show department selection screen
    return (React.createElement("main", { className: "min-h-screen bg-gray-50" },
        React.createElement(Header_1["default"], null),
        React.createElement(MobileMenu_1["default"], null),
        React.createElement("div", { className: "pt-32 pb-20" },
            React.createElement("div", { className: "container mx-auto px-4" },
                React.createElement("div", { className: "max-w-4xl mx-auto" },
                    React.createElement("div", { className: "bg-white rounded-lg shadow-md overflow-hidden" },
                        React.createElement("div", { className: "p-6 border-b" },
                            React.createElement("h1", { className: "text-2xl font-bold mb-1" }, "Join the SASSI Team"),
                            React.createElement("p", { className: "text-gray-600" }, "Select the department you'd like to contribute to. Each plays a vital role in our community.")),
                        React.createElement("div", { className: "p-6" }, session ? (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "bg-green-50 p-4 rounded-lg border border-green-200 mb-6 flex items-center" },
                                React.createElement(lucide_react_1.User, { className: "text-green-600 mr-3 h-5 w-5" }),
                                React.createElement("p", { className: "text-green-800" },
                                    "Signed in as ",
                                    React.createElement("span", { className: "font-medium" }, session.user.email))),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" }, DEPARTMENTS.map(function (dept) { return (React.createElement("div", { key: dept.id, className: "border rounded-lg p-4 cursor-pointer hover:border-orange-500 hover:shadow-md transition-all", onClick: function () { return handleDepartmentSelect(dept.id); } },
                                React.createElement("h3", { className: "text-lg font-bold flex items-center" },
                                    React.createElement("span", { className: "text-2xl mr-2" }, dept.icon),
                                    dept.title),
                                React.createElement("p", { className: "text-gray-600 mt-2 text-sm" }, dept.description))); })),
                            React.createElement("div", { className: "text-sm text-gray-600 bg-gray-50 p-4 rounded-md" },
                                React.createElement("p", null,
                                    React.createElement("strong", null, "Note:"),
                                    " By joining the team, you're committing to actively participate in SASSI activities. The time commitment is flexible, but we appreciate your dedication to our community's mission.")))) : (React.createElement("div", { className: "text-center py-8" },
                            React.createElement("div", { className: "w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4" },
                                React.createElement(lucide_react_1.ShieldAlert, { size: 32, className: "text-yellow-600" })),
                            React.createElement("h2", { className: "text-xl font-bold mb-2" }, "Member Registration Required"),
                            React.createElement("p", { className: "text-gray-600 mb-6 max-w-md mx-auto" }, "To join the SASSI team, you need to be a registered member first. Please complete your membership registration."),
                            React.createElement(link_1["default"], { href: "/join/member", className: "px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors inline-block" }, "Register as a Member")))))))),
        React.createElement(Footer_1["default"], null)));
}
exports["default"] = TeamRegistrationPage;
