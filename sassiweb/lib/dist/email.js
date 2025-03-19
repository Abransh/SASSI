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
exports.sendEventReminderEmail = exports.sendEventRegistrationEmail = exports.sendContactFormEmail = void 0;
var resend_1 = require("resend");
// Initialize Resend with API key
var resend = new resend_1.Resend(process.env.RESEND_API_KEY);
/**
 * Send email notification for contact form submission
 */
function sendContactFormEmail(name, email, subject, message) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, resend.emails.send({
                            from: 'SASSI Contact Form <contact@sassimilan.com>',
                            to: 'support@sassimilan.com',
                            reply_to: email,
                            subject: "[Contact Form] " + subject,
                            html: "\n        <h1>New Contact Form Submission</h1>\n        <p><strong>From:</strong> " + name + " (" + email + ")</p>\n        <p><strong>Subject:</strong> " + subject + "</p>\n        <h2>Message:</h2>\n        <p>" + message.replace(/\n/g, '<br>') + "</p>\n      "
                        })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Error sending contact form email:', error);
                        throw new Error('Failed to send email');
                    }
                    return [2 /*return*/, data];
                case 2:
                    error_1 = _b.sent();
                    console.error('Error in sendContactFormEmail:', error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sendContactFormEmail = sendContactFormEmail;
/**
 * Send email confirmation for event registration
 */
function sendEventRegistrationEmail(userEmail, userName, eventTitle, eventDate) {
    return __awaiter(this, void 0, void 0, function () {
        var formattedDate, _a, data, error, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    formattedDate = new Intl.DateTimeFormat('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }).format(eventDate);
                    return [4 /*yield*/, resend.emails.send({
                            from: 'SASSI Events <events@sassimilan.com>',
                            to: userEmail,
                            subject: "Registration Confirmed: " + eventTitle,
                            html: "\n        <h1>You're registered for " + eventTitle + "!</h1>\n        <p>Hello " + userName + ",</p>\n        <p>Your registration for <strong>" + eventTitle + "</strong> has been confirmed.</p>\n        <p><strong>Event Date:</strong> " + formattedDate + "</p>\n        <p>We look forward to seeing you there! If you need to cancel your registration or have any questions, please log in to your account or contact us.</p>\n        <p>Best regards,<br>The SASSI Team</p>\n      "
                        })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Error sending registration confirmation email:', error);
                        throw new Error('Failed to send email');
                    }
                    return [2 /*return*/, data];
                case 2:
                    error_2 = _b.sent();
                    console.error('Error in sendEventRegistrationEmail:', error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sendEventRegistrationEmail = sendEventRegistrationEmail;
/**
 * Send reminder email for upcoming event
 */
function sendEventReminderEmail(userEmail, userName, eventTitle, eventDate, eventLocation) {
    return __awaiter(this, void 0, void 0, function () {
        var formattedDate, _a, data, error, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    formattedDate = new Intl.DateTimeFormat('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }).format(eventDate);
                    return [4 /*yield*/, resend.emails.send({
                            from: 'SASSI Events <events@sassimilan.com>',
                            to: userEmail,
                            subject: "Reminder: " + eventTitle + " is Tomorrow!",
                            html: "\n        <h1>Event Reminder: " + eventTitle + "</h1>\n        <p>Hello " + userName + ",</p>\n        <p>This is a friendly reminder that <strong>" + eventTitle + "</strong> is happening tomorrow!</p>\n        <p><strong>Date and Time:</strong> " + formattedDate + "</p>\n        <p><strong>Location:</strong> " + eventLocation + "</p>\n        <p>We look forward to seeing you there!</p>\n        <p>Best regards,<br>The SASSI Team</p>\n      "
                        })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Error sending event reminder email:', error);
                        throw new Error('Failed to send email');
                    }
                    return [2 /*return*/, data];
                case 2:
                    error_3 = _b.sent();
                    console.error('Error in sendEventReminderEmail:', error_3);
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sendEventReminderEmail = sendEventReminderEmail;
