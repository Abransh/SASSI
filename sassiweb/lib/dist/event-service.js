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
exports.addEventImage = exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.cancelRegistration = exports.registerForEvent = exports.getEvent = exports.getEvents = void 0;
// Helper to get the base URL for API calls
var getBaseUrl = function () {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
        // In the browser, use relative URLs
        return '';
    }
    // In server environment, construct the absolute URL
    if (process.env.VERCEL_URL) {
        return "https://" + process.env.VERCEL_URL;
    }
    // Fallback to a configured URL or a default
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
};
/**
 * Fetch all events, optionally filtering by published status and timing
 */
function getEvents(options) {
    return __awaiter(this, void 0, Promise, function () {
        var params, queryString, baseUrl, response, events, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    params = new URLSearchParams();
                    if (options === null || options === void 0 ? void 0 : options.publishedOnly)
                        params.set('published', 'true');
                    if (options === null || options === void 0 ? void 0 : options.past)
                        params.set('past', 'true');
                    if (options === null || options === void 0 ? void 0 : options.upcoming)
                        params.set('upcoming', 'true');
                    queryString = params.toString() ? "?" + params.toString() : '';
                    baseUrl = getBaseUrl();
                    return [4 /*yield*/, fetch(baseUrl + "/api/events" + queryString, {
                            method: 'GET',
                            cache: 'no-store',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error fetching events: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    events = _a.sent();
                    // Convert date strings to Date objects
                    return [2 /*return*/, events.map(function (event) { return (__assign(__assign({}, event), { startDate: new Date(event.startDate), endDate: new Date(event.endDate), createdAt: new Date(event.createdAt), updatedAt: new Date(event.updatedAt) })); })];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error in getEvents:", error_1);
                    // Return empty array instead of throwing to avoid breaking the page
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getEvents = getEvents;
// The rest of your event-service.ts file remains the same...
function getEvent(id) {
    var _a;
    return __awaiter(this, void 0, Promise, function () {
        var baseUrl, response, event, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    baseUrl = getBaseUrl();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(baseUrl + "/api/events/" + id, {
                            method: 'GET',
                            cache: 'no-store'
                        })];
                case 2:
                    response = _b.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch event');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    event = _b.sent();
                    // Convert date strings to Date objects
                    return [2 /*return*/, __assign(__assign({}, event), { startDate: new Date(event.startDate), endDate: new Date(event.endDate), createdAt: new Date(event.createdAt), updatedAt: new Date(event.updatedAt), gallery: (_a = event.gallery) === null || _a === void 0 ? void 0 : _a.map(function (img) { return (__assign(__assign({}, img), { createdAt: new Date(img.createdAt) })); }) })];
                case 4:
                    error_2 = _b.sent();
                    console.error("Error in getEvent:", error_2);
                    throw error_2;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getEvent = getEvent;
/**
 * Register current user for an event
 */
function registerForEvent(eventId) {
    return __awaiter(this, void 0, Promise, function () {
        var baseUrl, response, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = getBaseUrl();
                    return [4 /*yield*/, fetch(baseUrl + "/api/events/" + eventId + "/register", {
                            method: 'POST'
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    error = _a.sent();
                    throw new Error(error.error || 'Failed to register for event');
                case 3: return [2 /*return*/, response.json()];
            }
        });
    });
}
exports.registerForEvent = registerForEvent;
/**
 * Cancel registration for an event
 */
function cancelRegistration(eventId) {
    return __awaiter(this, void 0, Promise, function () {
        var baseUrl, response, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = getBaseUrl();
                    return [4 /*yield*/, fetch(baseUrl + "/api/events/" + eventId + "/register", {
                            method: 'DELETE'
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    error = _a.sent();
                    throw new Error(error.error || 'Failed to cancel registration');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.cancelRegistration = cancelRegistration;
/**
 * Create a new event (admin only)
 */
function createEvent(eventData) {
    return __awaiter(this, void 0, Promise, function () {
        var baseUrl, response, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = getBaseUrl();
                    return [4 /*yield*/, fetch(baseUrl + "/api/events", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(eventData)
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    error = _a.sent();
                    throw new Error(error.error || 'Failed to create event');
                case 3: return [2 /*return*/, response.json()];
            }
        });
    });
}
exports.createEvent = createEvent;
/**
 * Update an existing event (admin only)
 */
function updateEvent(id, eventData) {
    return __awaiter(this, void 0, Promise, function () {
        var baseUrl, response, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = getBaseUrl();
                    return [4 /*yield*/, fetch(baseUrl + "/api/events/" + id, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(eventData)
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    error = _a.sent();
                    throw new Error(error.error || 'Failed to update event');
                case 3: return [2 /*return*/, response.json()];
            }
        });
    });
}
exports.updateEvent = updateEvent;
/**
 * Delete an event (admin only)
 */
function deleteEvent(id) {
    return __awaiter(this, void 0, Promise, function () {
        var baseUrl, response, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = getBaseUrl();
                    return [4 /*yield*/, fetch(baseUrl + "/api/events/" + id, {
                            method: 'DELETE'
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    error = _a.sent();
                    throw new Error(error.error || 'Failed to delete event');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteEvent = deleteEvent;
/**
 * Add an image to event gallery (admin only)
 */
function addEventImage(eventId, imageUrl, caption) {
    return __awaiter(this, void 0, Promise, function () {
        var baseUrl, response, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = getBaseUrl();
                    return [4 /*yield*/, fetch(baseUrl + "/api/events/" + eventId + "/gallery", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ imageUrl: imageUrl, caption: caption })
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    error = _a.sent();
                    throw new Error(error.error || 'Failed to add image to gallery');
                case 3: return [2 /*return*/, response.json()];
            }
        });
    });
}
exports.addEventImage = addEventImage;
