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
var route_1 = require("../api/auth/[...nextauth]/route");
var prisma_1 = require("@/lib/prisma");
var Header_1 = require("@/components/Header");
var MobileMenu_1 = require("@/components/MobileMenu");
var Footer_1 = require("@/components/Footer");
var ResourceCategoryCard_1 = require("@/components/ResourceCategoryCard");
var FeaturedResourceCard_1 = require("@/components/FeaturedResourceCard");
function ResourcesPage() {
    return __awaiter(this, void 0, void 0, function () {
        var session, categories, featuredResources;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, next_1.getServerSession(route_1.authOptions)];
                case 1:
                    session = _a.sent();
                    if (!session) {
                        navigation_1.redirect("/auth/signin?callbackUrl=/resources");
                    }
                    return [4 /*yield*/, prisma_1["default"].resourceCategory.findMany({
                            orderBy: {
                                order: "asc"
                            },
                            include: {
                                _count: {
                                    select: {
                                        resources: true
                                    }
                                }
                            }
                        })];
                case 2:
                    categories = _a.sent();
                    return [4 /*yield*/, prisma_1["default"].resource.findMany({
                            where: {
                                featured: true
                            },
                            take: 3,
                            orderBy: {
                                updatedAt: "desc"
                            }
                        })];
                case 3:
                    featuredResources = _a.sent();
                    return [2 /*return*/, (React.createElement("main", { className: "min-h-screen bg-gray-50" },
                            React.createElement(Header_1["default"], null),
                            React.createElement(MobileMenu_1["default"], null),
                            React.createElement("section", { className: "pt-32 pb-20" },
                                React.createElement("div", { className: "container mx-auto px-4" },
                                    React.createElement("div", { className: "max-w-6xl mx-auto" },
                                        React.createElement("div", { className: "mb-12 text-center max-w-3xl mx-auto" },
                                            React.createElement("h1", { className: "text-3xl md:text-4xl font-bold mb-4" }, "SASSI Resources Hub"),
                                            React.createElement("p", { className: "text-lg text-gray-600" }, "Access guides, templates, and resources to help make your journey to Milan seamless and your stay in Italy enriching.")),
                                        featuredResources.length > 0 && (React.createElement("div", { className: "mb-16" },
                                            React.createElement("h2", { className: "text-2xl font-bold mb-6" }, "Featured Resources"),
                                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" }, featuredResources.map(function (resource) { return (React.createElement(FeaturedResourceCard_1["default"], { key: resource.id, resource: resource })); })))),
                                        React.createElement("div", null,
                                            React.createElement("h2", { className: "text-2xl font-bold mb-6" }, "Browse by Category"),
                                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" }, categories.map(function (category) { return (React.createElement(ResourceCategoryCard_1["default"], { key: category.id, category: category })); })))))),
                            React.createElement(Footer_1["default"], null)))];
            }
        });
    });
}
exports["default"] = ResourcesPage;
