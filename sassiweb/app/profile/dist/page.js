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
var ProfileForm_1 = require("@/components/ProfileForm");
var tabs_1 = require("@/components/ui/tabs");
var UpcomingEventsList_1 = require("@/components/UpcomingEventsList");
function ProfilePage() {
    return __awaiter(this, void 0, void 0, function () {
        var session, user, now, upcomingRegistrations, pastRegistrations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, next_1.getServerSession(route_1.authOptions)];
                case 1:
                    session = _a.sent();
                    if (!session) {
                        navigation_1.redirect("/auth/signin?callbackUrl=/profile");
                    }
                    return [4 /*yield*/, prisma_1["default"].user.findUnique({
                            where: {
                                id: session.user.id
                            },
                            include: {
                                profile: true,
                                registrations: {
                                    where: {
                                        status: "CONFIRMED"
                                    },
                                    include: {
                                        event: true
                                    },
                                    orderBy: {
                                        event: {
                                            startDate: "asc"
                                        }
                                    }
                                }
                            }
                        })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        navigation_1.redirect("/auth/signin");
                    }
                    now = new Date();
                    upcomingRegistrations = user.registrations.filter(function (reg) { return new Date(reg.event.startDate) >= now; });
                    pastRegistrations = user.registrations.filter(function (reg) { return new Date(reg.event.startDate) < now; });
                    return [2 /*return*/, (React.createElement("main", { className: "min-h-screen bg-gray-50" },
                            React.createElement(Header_1["default"], null),
                            React.createElement(MobileMenu_1["default"], null),
                            React.createElement("section", { className: "pt-32 pb-20" },
                                React.createElement("div", { className: "container mx-auto px-4" },
                                    React.createElement("div", { className: "max-w-5xl mx-auto" },
                                        React.createElement("div", { className: "mb-8" },
                                            React.createElement("h1", { className: "text-3xl font-bold mb-2" }, "Your Profile"),
                                            React.createElement("p", { className: "text-gray-600" }, "Manage your account information and view your event registrations")),
                                        React.createElement(tabs_1.Tabs, { defaultValue: "profile", className: "w-full" },
                                            React.createElement(tabs_1.TabsList, { className: "grid w-full grid-cols-3 mb-8" },
                                                React.createElement(tabs_1.TabsTrigger, { value: "profile" }, "Profile Information"),
                                                React.createElement(tabs_1.TabsTrigger, { value: "events" }, "Your Events"),
                                                React.createElement(tabs_1.TabsTrigger, { value: "settings" }, "Account Settings")),
                                            React.createElement(tabs_1.TabsContent, { value: "profile", className: "space-y-4" },
                                                React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-md" },
                                                    React.createElement(ProfileForm_1["default"], { initialData: user }))),
                                            React.createElement(tabs_1.TabsContent, { value: "events", className: "space-y-6" },
                                                React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-md" },
                                                    React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Upcoming Events"),
                                                    upcomingRegistrations.length > 0 ? (React.createElement(UpcomingEventsList_1["default"], { registrations: upcomingRegistrations })) : (React.createElement("p", { className: "text-gray-500" },
                                                        "You don't have any upcoming events. Browse our",
                                                        " ",
                                                        React.createElement("a", { href: "/events", className: "text-orange-600 hover:text-orange-800" }, "events page"),
                                                        " ",
                                                        "to register for events."))),
                                                pastRegistrations.length > 0 && (React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-md" },
                                                    React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Past Events"),
                                                    React.createElement("div", { className: "space-y-4" }, pastRegistrations.map(function (registration) { return (React.createElement("div", { key: registration.id, className: "flex items-center justify-between border-b pb-4" },
                                                        React.createElement("div", null,
                                                            React.createElement("h3", { className: "font-semibold" }, registration.event.title),
                                                            React.createElement("p", { className: "text-sm text-gray-500" },
                                                                new Date(registration.event.startDate).toLocaleDateString(),
                                                                " at",
                                                                " ",
                                                                new Date(registration.event.startDate).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit"
                                                                }))),
                                                        React.createElement("a", { href: "/events/" + registration.event.id, className: "text-sm text-orange-600 hover:text-orange-800" }, "View Details"))); }))))),
                                            React.createElement(tabs_1.TabsContent, { value: "settings", className: "space-y-4" },
                                                React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-md" },
                                                    React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Account Settings"),
                                                    React.createElement("div", { className: "space-y-6" },
                                                        React.createElement("div", null,
                                                            React.createElement("h3", { className: "text-lg font-medium mb-2" }, "Email Address"),
                                                            React.createElement("p", { className: "text-gray-700 mb-2" }, user.email),
                                                            React.createElement("button", { className: "text-sm text-orange-600 hover:text-orange-800", disabled: true }, "Change Email (Coming Soon)")),
                                                        React.createElement("div", { className: "border-t pt-6" },
                                                            React.createElement("h3", { className: "text-lg font-medium mb-2" }, "Password"),
                                                            React.createElement("button", { className: "text-sm text-orange-600 hover:text-orange-800", disabled: true }, "Change Password (Coming Soon)")),
                                                        React.createElement("div", { className: "border-t pt-6" },
                                                            React.createElement("h3", { className: "text-lg font-medium mb-2 text-red-600" }, "Danger Zone"),
                                                            React.createElement("button", { className: "text-sm text-red-600 hover:text-red-800", disabled: true }, "Delete Account (Coming Soon)"))))))))),
                            React.createElement(Footer_1["default"], null)))];
            }
        });
    });
}
exports["default"] = ProfilePage;
