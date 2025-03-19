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
var sonner_1 = require("sonner");
var lucide_react_1 = require("lucide-react");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var button_1 = require("@/components/ui/button");
var switch_1 = require("@/components/ui/switch");
function ProfileForm(_a) {
    var _this = this;
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var initialData = _a.initialData;
    var _k = react_1.useState({
        name: initialData.name || "",
        university: initialData.university || "",
        course: initialData.course || "",
        graduationYear: initialData.graduationYear || "",
        bio: initialData.bio || "",
        phoneNumber: initialData.phoneNumber || "",
        city: initialData.city || "",
        linkedinUrl: initialData.linkedinUrl || "",
        isProfilePublic: initialData.isProfilePublic || true,
        // Profile specific fields
        universityInIndia: ((_b = initialData.profile) === null || _b === void 0 ? void 0 : _b.universityInIndia) || "",
        degreeInIndia: ((_c = initialData.profile) === null || _c === void 0 ? void 0 : _c.degreeInIndia) || "",
        yearOfArrival: ((_d = initialData.profile) === null || _d === void 0 ? void 0 : _d.yearOfArrival) || "",
        residenceArea: ((_e = initialData.profile) === null || _e === void 0 ? void 0 : _e.residenceArea) || "",
        interests: ((_f = initialData.profile) === null || _f === void 0 ? void 0 : _f.interests) || "",
        skills: ((_g = initialData.profile) === null || _g === void 0 ? void 0 : _g.skills) || "",
        showEmail: ((_h = initialData.profile) === null || _h === void 0 ? void 0 : _h.showEmail) || false,
        showPhone: ((_j = initialData.profile) === null || _j === void 0 ? void 0 : _j.showPhone) || false
    }), formData = _k[0], setFormData = _k[1];
    var _l = react_1.useState(false), isLoading = _l[0], setIsLoading = _l[1];
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSwitchChange = function (name, checked) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = checked, _a)));
        });
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, error, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, fetch("/api/profile", {
                            method: "PATCH",
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
                    throw new Error(error.error || "Failed to update profile");
                case 4:
                    sonner_1.toast.success("Profile updated successfully!");
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    console.error("Error updating profile:", error_1);
                    sonner_1.toast.error(error_1 instanceof Error ? error_1.message : "Failed to update profile");
                    return [3 /*break*/, 7];
                case 6:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
        React.createElement("div", { className: "border-b pb-6" },
            React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Basic Information"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "name", className: "text-sm font-medium" }, "Full Name"),
                    React.createElement(input_1.Input, { id: "name", name: "name", value: formData.name, onChange: handleChange, placeholder: "Your full name" })),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "university", className: "text-sm font-medium" }, "University in Milan"),
                    React.createElement(input_1.Input, { id: "university", name: "university", value: formData.university, onChange: handleChange, placeholder: "e.g., Politecnico di Milano" })),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "course", className: "text-sm font-medium" }, "Course/Program"),
                    React.createElement(input_1.Input, { id: "course", name: "course", value: formData.course, onChange: handleChange, placeholder: "e.g., MSc Computer Engineering" })),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "graduationYear", className: "text-sm font-medium" }, "Expected Graduation Year"),
                    React.createElement(input_1.Input, { id: "graduationYear", name: "graduationYear", type: "number", value: formData.graduationYear, onChange: handleChange, placeholder: "e.g., 2025", min: "2020", max: "2030" })),
                React.createElement("div", { className: "space-y-2 md:col-span-2" },
                    React.createElement("label", { htmlFor: "bio", className: "text-sm font-medium" }, "Bio"),
                    React.createElement(textarea_1.Textarea, { id: "bio", name: "bio", value: formData.bio, onChange: handleChange, placeholder: "A brief introduction about yourself", rows: 3 })))),
        React.createElement("div", { className: "border-b pb-6" },
            React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Contact Information"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "phoneNumber", className: "text-sm font-medium" }, "Phone Number"),
                    React.createElement(input_1.Input, { id: "phoneNumber", name: "phoneNumber", value: formData.phoneNumber, onChange: handleChange, placeholder: "Your phone number with country code" }),
                    React.createElement("div", { className: "flex items-center space-x-2 pt-1" },
                        React.createElement(switch_1.Switch, { id: "showPhone", checked: formData.showPhone, onCheckedChange: function (checked) {
                                return handleSwitchChange("showPhone", checked);
                            } }),
                        React.createElement("label", { htmlFor: "showPhone", className: "text-sm text-gray-600" }, "Make phone number visible to other members"))),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "linkedinUrl", className: "text-sm font-medium" }, "LinkedIn Profile (Optional)"),
                    React.createElement(input_1.Input, { id: "linkedinUrl", name: "linkedinUrl", value: formData.linkedinUrl, onChange: handleChange, placeholder: "https://linkedin.com/in/yourusername" })),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "city", className: "text-sm font-medium" }, "City in India"),
                    React.createElement(input_1.Input, { id: "city", name: "city", value: formData.city, onChange: handleChange, placeholder: "Your hometown in India" })),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { className: "text-sm font-medium" }, "Email Visibility"),
                    React.createElement("div", { className: "flex items-center space-x-2 h-10" },
                        React.createElement(switch_1.Switch, { id: "showEmail", checked: formData.showEmail, onCheckedChange: function (checked) {
                                return handleSwitchChange("showEmail", checked);
                            } }),
                        React.createElement("label", { htmlFor: "showEmail", className: "text-sm text-gray-600" }, "Make email visible to other members"))))),
        React.createElement("div", { className: "border-b pb-6" },
            React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Background Information"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "universityInIndia", className: "text-sm font-medium" }, "University in India"),
                    React.createElement(input_1.Input, { id: "universityInIndia", name: "universityInIndia", value: formData.universityInIndia, onChange: handleChange, placeholder: "Your previous university in India" })),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "degreeInIndia", className: "text-sm font-medium" }, "Degree in India"),
                    React.createElement(input_1.Input, { id: "degreeInIndia", name: "degreeInIndia", value: formData.degreeInIndia, onChange: handleChange, placeholder: "Your previous degree in India" })))),
        React.createElement("div", { className: "border-b pb-6" },
            React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Milan Experience"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "yearOfArrival", className: "text-sm font-medium" }, "Year of Arrival in Milan"),
                    React.createElement(input_1.Input, { id: "yearOfArrival", name: "yearOfArrival", type: "number", value: formData.yearOfArrival, onChange: handleChange, placeholder: "e.g., 2023", min: "2010", max: new Date().getFullYear() })),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "residenceArea", className: "text-sm font-medium" }, "Area of Residence in Milan"),
                    React.createElement(input_1.Input, { id: "residenceArea", name: "residenceArea", value: formData.residenceArea, onChange: handleChange, placeholder: "e.g., Citt\u00E0 Studi, Navigli, etc." })))),
        React.createElement("div", { className: "border-b pb-6" },
            React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Interests & Skills"),
            React.createElement("div", { className: "space-y-4" },
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "interests", className: "text-sm font-medium" }, "Interests & Hobbies"),
                    React.createElement(textarea_1.Textarea, { id: "interests", name: "interests", value: formData.interests, onChange: handleChange, placeholder: "Share your interests and hobbies", rows: 2 })),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "skills", className: "text-sm font-medium" }, "Skills"),
                    React.createElement(textarea_1.Textarea, { id: "skills", name: "skills", value: formData.skills, onChange: handleChange, placeholder: "List your professional skills", rows: 2 })))),
        React.createElement("div", { className: "pb-4" },
            React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Privacy Settings"),
            React.createElement("div", { className: "flex items-center space-x-2" },
                React.createElement(switch_1.Switch, { id: "isProfilePublic", checked: formData.isProfilePublic, onCheckedChange: function (checked) {
                        return handleSwitchChange("isProfilePublic", checked);
                    } }),
                React.createElement("label", { htmlFor: "isProfilePublic", className: "text-sm font-medium" }, "Make profile visible in member directory")),
            React.createElement("p", { className: "text-xs text-gray-500 mt-1" }, "When disabled, only your name will be visible to other members")),
        React.createElement("div", { className: "flex justify-end" },
            React.createElement(button_1.Button, { type: "submit", className: "bg-orange-600 hover:bg-orange-700", disabled: isLoading }, isLoading ? (React.createElement(React.Fragment, null,
                React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                "Saving...")) : ("Save Changes")))));
}
exports["default"] = ProfileForm;
