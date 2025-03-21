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
var navigation_1 = require("next/navigation");
var next_1 = require("next-auth/next");
var route_1 = require("../../api/auth/[...nextauth]/route");
var prisma_1 = require("@/lib/prisma");
var date_fns_1 = require("date-fns");
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var Footer_1 = require("@/components/Footer");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
function ContactSubmissionsPage() {
    return __awaiter(this, void 0, void 0, function () {
        var session, contactSubmissions, pendingSubmissions, respondedSubmissions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, next_1.getServerSession(route_1.authOptions)];
                case 1:
                    session = _a.sent();
                    if (!session || session.user.role !== "ADMIN") {
                        navigation_1.redirect("/auth/signin?callbackUrl=/admin/contact");
                    }
                    return [4 /*yield*/, prisma_1["default"].contactSubmission.findMany({
                            orderBy: {
                                createdAt: "desc"
                            }
                        })];
                case 2:
                    contactSubmissions = _a.sent();
                    pendingSubmissions = contactSubmissions.filter(function (submission) { return !submission.responded; });
                    respondedSubmissions = contactSubmissions.filter(function (submission) { return submission.responded; });
                    return [2 /*return*/, (React.createElement("main", { className: "min-h-screen bg-gray-50" },
                            React.createElement(Header_1["default"], null),
                            React.createElement(MobileMenu_1["default"], null),
                            React.createElement("section", { className: "pt-32 pb-20" },
                                React.createElement("div", { className: "container mx-auto px-4" },
                                    React.createElement("div", { className: "mb-8" },
                                        React.createElement("h1", { className: "text-3xl font-bold mb-2" }, "Contact Form Submissions"),
                                        React.createElement("p", { className: "text-gray-600" }, "Manage and respond to messages from the contact form")),
                                    React.createElement("div", { className: "bg-white rounded-lg shadow-md overflow-hidden" },
                                        React.createElement("div", { className: "border-b border-gray-200" },
                                            React.createElement("nav", { className: "flex -mb-px" },
                                                React.createElement("button", { className: "w-1/2 py-4 px-1 text-center border-b-2 border-orange-500 font-medium text-orange-600" },
                                                    "Pending (",
                                                    pendingSubmissions.length,
                                                    ")"),
                                                React.createElement("button", { className: "w-1/2 py-4 px-1 text-center border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300" },
                                                    "Responded (",
                                                    respondedSubmissions.length,
                                                    ")"))),
                                        React.createElement("div", { className: "divide-y divide-gray-200" }, pendingSubmissions.length > 0 ? (pendingSubmissions.map(function (submission) { return (React.createElement("div", { key: submission.id, className: "p-6" },
                                            React.createElement("div", { className: "flex justify-between items-start mb-4" },
                                                React.createElement("div", null,
                                                    React.createElement("h3", { className: "text-lg font-medium text-gray-900" }, submission.subject),
                                                    React.createElement("div", { className: "mt-1 flex items-center" },
                                                        React.createElement("span", { className: "text-sm font-medium text-gray-700 mr-2" }, submission.name),
                                                        React.createElement("span", { className: "text-sm text-gray-500" },
                                                            "<",
                                                            submission.email,
                                                            ">"))),
                                                React.createElement("span", { className: "text-sm text-gray-500" }, date_fns_1.format(new Date(submission.createdAt), "MMM d, yyyy 'at' h:mm a"))),
                                            React.createElement("div", { className: "mt-2 text-sm text-gray-700 whitespace-pre-line mb-4" }, submission.message),
                                            React.createElement("div", { className: "mt-4 flex gap-4" },
                                                React.createElement("a", { href: "mailto:" + submission.email + "?subject=Re: " + submission.subject, className: "inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-md" },
                                                    React.createElement(lucide_react_1.Mail, { className: "mr-2 h-4 w-4" }),
                                                    "Reply via Email"),
                                                React.createElement(link_1["default"], { href: "/admin/contact/" + submission.id + "/mark-responded", className: "inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-md" },
                                                    React.createElement(lucide_react_1.Check, { className: "mr-2 h-4 w-4" }),
                                                    "Mark as Responded")))); })) : (React.createElement("div", { className: "py-20 text-center" },
                                            React.createElement(lucide_react_1.MailOpen, { className: "mx-auto h-12 w-12 text-gray-400" }),
                                            React.createElement("h3", { className: "mt-2 text-lg font-medium text-gray-900" }, "No Pending Messages"),
                                            React.createElement("p", { className: "mt-1 text-sm text-gray-500" }, "You have responded to all messages. Check back later for new submissions."))))))),
                            React.createElement(Footer_1["default"], null)))];
            }
        });
    });
}
exports["default"] = ContactSubmissionsPage;
