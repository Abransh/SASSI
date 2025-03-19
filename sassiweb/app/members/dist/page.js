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
var navigation_1 = require("next/navigation");
var next_1 = require("next-auth/next");
var route_1 = require("../api/auth/[...nextauth]/route");
var prisma_1 = require("@/lib/prisma");
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var Footer_1 = require("@/components/Footer");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var input_1 = require("@/components/ui/input");
var UniversityFilter_1 = require("@/components/UniversityFilter");
function MembersPage(_a) {
    var searchParams = _a.searchParams;
    return __awaiter(this, void 0, void 0, function () {
        var session, searchQuery, universityFilter, users, universities, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, next_1.getServerSession(route_1.authOptions)];
                case 1:
                    session = _b.sent();
                    if (!session) {
                        navigation_1.redirect("/auth/signin?callbackUrl=/members");
                    }
                    searchQuery = searchParams.query || "";
                    universityFilter = searchParams.university || "";
                    return [4 /*yield*/, prisma_1["default"].user.findMany({
                            where: __assign(__assign({ isProfilePublic: true }, (searchQuery
                                ? {
                                    OR: [
                                        { name: { contains: searchQuery, mode: "insensitive" } },
                                        { university: { contains: searchQuery, mode: "insensitive" } },
                                        { course: { contains: searchQuery, mode: "insensitive" } },
                                    ]
                                }
                                : {})), (universityFilter ? { university: universityFilter } : {})),
                            include: {
                                profile: true
                            },
                            orderBy: {
                                name: "asc"
                            }
                        })];
                case 2:
                    users = _b.sent();
                    return [4 /*yield*/, prisma_1["default"].user.findMany({
                            where: {
                                isProfilePublic: true,
                                university: {
                                    not: null
                                }
                            },
                            select: {
                                university: true
                            },
                            distinct: ["university"]
                        })];
                case 3:
                    universities = _b.sent();
                    return [2 /*return*/, (React.createElement("main", { className: "min-h-screen bg-gray-50" },
                            React.createElement(Header_1["default"], null),
                            React.createElement(MobileMenu_1["default"], null),
                            React.createElement("section", { className: "pt-32 pb-20" },
                                React.createElement("div", { className: "container mx-auto px-4" },
                                    React.createElement("div", { className: "max-w-6xl mx-auto" },
                                        React.createElement("div", { className: "mb-8" },
                                            React.createElement("h1", { className: "text-3xl font-bold mb-4" }, "SASSI Member Directory"),
                                            React.createElement("p", { className: "text-gray-600 mb-6" }, "Connect with other Indian students in Milan"),
                                            React.createElement("div", { className: "flex flex-col md:flex-row gap-4 mb-8" },
                                                React.createElement("div", { className: "relative flex-1" },
                                                    React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 }),
                                                    React.createElement("form", { action: "/members", method: "get" },
                                                        universityFilter && (React.createElement("input", { type: "hidden", name: "university", value: universityFilter })),
                                                        React.createElement(input_1.Input, { type: "text", name: "query", placeholder: "Search by name, university, or course...", defaultValue: searchQuery, className: "pl-10 pr-4 py-2 w-full" }))),
                                                React.createElement("div", { className: "md:w-64" },
                                                    React.createElement(UniversityFilter_1["default"], { universities: universities, currentValue: universityFilter, searchQuery: searchQuery }))),
                                            React.createElement("p", { className: "text-sm text-gray-600" },
                                                users.length,
                                                " ",
                                                users.length === 1 ? "member" : "members",
                                                " found",
                                                searchQuery && " matching \"" + searchQuery + "\"",
                                                universityFilter && " at " + universityFilter)),
                                        users.length > 0 ? (React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, users.map(function (user) { return (React.createElement("div", { key: user.id, className: "bg-white rounded-lg shadow-md p-6" },
                                            React.createElement("div", { className: "flex items-center space-x-4" },
                                                React.createElement("div", { className: "w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center" },
                                                    React.createElement(lucide_react_1.User, { size: 24, className: "text-gray-500" })),
                                                React.createElement("div", null,
                                                    React.createElement("h3", { className: "font-bold" }, user.name || "Unnamed User"),
                                                    React.createElement("p", { className: "text-sm text-gray-600" }, user.university || "No university listed"),
                                                    user.course && (React.createElement("p", { className: "text-xs text-gray-500" }, user.course)))),
                                            React.createElement("div", { className: "mt-4" },
                                                React.createElement(link_1["default"], { href: "/members/" + user.id, className: "text-blue-600 hover:underline text-sm" }, "View Profile")))); }))) : (React.createElement("div", { className: "bg-white p-10 rounded-lg shadow text-center" },
                                            React.createElement("h3", { className: "text-xl font-semibold mb-2" }, "No members found"),
                                            React.createElement("p", { className: "text-gray-600" }, "Try adjusting your search or filters")))))),
                            React.createElement(Footer_1["default"], null)))];
                case 4:
                    error_1 = _b.sent();
                    console.error("Error in MembersPage:", error_1);
                    return [2 /*return*/, (React.createElement("main", { className: "min-h-screen bg-gray-50 flex items-center justify-center" },
                            React.createElement("div", { className: "p-6 bg-white rounded shadow-lg max-w-lg" },
                                React.createElement("h1", { className: "text-xl font-bold mb-4" }, "Error Loading Members"),
                                React.createElement("p", { className: "text-red-500" }, error_1.message),
                                React.createElement("div", { className: "mt-6" },
                                    React.createElement("a", { href: "/", className: "text-blue-600 hover:underline" }, "Return to Homepage")))))];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = MembersPage;
