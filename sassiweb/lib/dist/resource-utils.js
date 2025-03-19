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
exports.trackResourceView = exports.getResourceTypeName = exports.getResourceTypeColor = exports.getResourceTypeIcon = void 0;
var lucide_react_1 = require("lucide-react");
/**
 * Get the appropriate icon component for the resource type
 */
function getResourceTypeIcon(resourceType) {
    switch (resourceType) {
        case "DOCUMENT":
            return lucide_react_1.FileText;
        case "TEMPLATE":
            return lucide_react_1.FileCode;
        case "GUIDE":
            return lucide_react_1.BookOpen;
        case "VIDEO":
            return lucide_react_1.Video;
        case "LINK":
            return lucide_react_1.Link;
        default:
            return lucide_react_1.FileText;
    }
}
exports.getResourceTypeIcon = getResourceTypeIcon;
/**
 * Get a color for the resource type
 */
function getResourceTypeColor(resourceType) {
    switch (resourceType) {
        case "DOCUMENT":
            return "blue";
        case "TEMPLATE":
            return "purple";
        case "GUIDE":
            return "orange";
        case "VIDEO":
            return "red";
        case "LINK":
            return "green";
        default:
            return "gray";
    }
}
exports.getResourceTypeColor = getResourceTypeColor;
/**
 * Get a friendly name for the resource type
 */
function getResourceTypeName(resourceType) {
    switch (resourceType) {
        case "DOCUMENT":
            return "Document";
        case "TEMPLATE":
            return "Template";
        case "GUIDE":
            return "Guide";
        case "VIDEO":
            return "Video";
        case "LINK":
            return "External Link";
        default:
            return resourceType;
    }
}
exports.getResourceTypeName = getResourceTypeName;
/**
 * Track a resource view
 */
function trackResourceView(resourceId, downloaded) {
    if (downloaded === void 0) { downloaded = false; }
    return __awaiter(this, void 0, Promise, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("/api/resources/" + resourceId + "/track", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ downloaded: downloaded })
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error tracking resource view:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.trackResourceView = trackResourceView;
