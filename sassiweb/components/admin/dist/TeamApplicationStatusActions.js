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
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var navigation_1 = require("next/navigation");
function TeamApplicationStatusActions(_a) {
    var _this = this;
    var applicationId = _a.applicationId, currentStatus = _a.currentStatus;
    var router = navigation_1.useRouter();
    var _b = react_1.useState(null), isLoading = _b[0], setIsLoading = _b[1];
    var handleUpdateStatus = function (status) { return __awaiter(_this, void 0, void 0, function () {
        var response, error, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(status);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, fetch("/api/admin/team-applications/" + applicationId + "/status", {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ status: status })
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    error = _a.sent();
                    throw new Error(error.error || "Failed to update status");
                case 4:
                    sonner_1.toast.success("Team application " + status.toLowerCase());
                    router.refresh();
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    console.error("Error updating status to " + status + ":", error_1);
                    sonner_1.toast.error(error_1 instanceof Error ? error_1.message : "Failed to update status");
                    return [3 /*break*/, 7];
                case 6:
                    setIsLoading(null);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var handleViewDetails = function () {
        // In a real implementation, this would navigate to a detailed view
        // For now, we'll just show a toast
        sonner_1.toast.info("Viewing details (not implemented)");
    };
    if (currentStatus === "PENDING") {
        return (React.createElement("div", { className: "flex space-x-2" },
            React.createElement("button", { onClick: function () { return handleUpdateStatus("APPROVED"); }, disabled: isLoading !== null, className: "p-1.5 rounded bg-green-50 text-green-600 hover:bg-green-100", title: "Approve" }, isLoading === "APPROVED" ? (React.createElement(lucide_react_1.Loader2, { size: 16, className: "animate-spin" })) : (React.createElement(lucide_react_1.CheckCircle, { size: 16 }))),
            React.createElement("button", { onClick: function () { return handleUpdateStatus("REJECTED"); }, disabled: isLoading !== null, className: "p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100", title: "Reject" }, isLoading === "REJECTED" ? (React.createElement(lucide_react_1.Loader2, { size: 16, className: "animate-spin" })) : (React.createElement(lucide_react_1.XCircle, { size: 16 }))),
            React.createElement("button", { onClick: handleViewDetails, disabled: isLoading !== null, className: "p-1.5 rounded bg-gray-50 text-gray-600 hover:bg-gray-100", title: "View Details" },
                React.createElement(lucide_react_1.ArrowRight, { size: 16 }))));
    }
    // For APPROVED or REJECTED status, just show view details
    return (React.createElement("div", { className: "flex space-x-2" },
        React.createElement("button", { onClick: handleViewDetails, disabled: isLoading !== null, className: "p-1.5 rounded bg-gray-50 text-gray-600 hover:bg-gray-100", title: "View Details" },
            React.createElement(lucide_react_1.ArrowRight, { size: 16 }))));
}
exports["default"] = TeamApplicationStatusActions;
