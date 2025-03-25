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
exports.sendTeamApplicationStatusEmail = exports.sendPaymentConfirmationEmail = exports.sendMembershipStatusEmail = exports.sendEventReminderEmail = exports.sendEventRegistrationEmail = exports.sendContactFormEmail = void 0;
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
/**
 * Send membership status update email
 */
function sendMembershipStatusEmail(userEmail, userName, status, notes) {
    return __awaiter(this, void 0, void 0, function () {
        var subject, content, _a, data, error, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    subject = void 0, content = void 0;
                    if (status === "APPROVED") {
                        subject = "Your SASSI Membership Has Been Approved";
                        content = "\n        <h1>Your Membership Application Has Been Approved!</h1>\n        <p>Hello " + userName + ",</p>\n        <p>We're delighted to inform you that your application to join SASSI has been <strong>approved</strong>!</p>\n        <p>You are now officially a member of the Students' Association of Indians in Milan. Welcome to our community!</p>\n        " + (notes ? "<p><strong>Note from the team:</strong> " + notes + "</p>" : '') + "\n        <p>Next steps:</p>\n        <ul>\n          <li>Complete your profile to connect with other members</li>\n          <li>Check out upcoming events on our calendar</li>\n          <li>Browse our resources for Indian students in Milan</li>\n        </ul>\n        <p>If you haven't already completed your payment, please do so to activate all membership benefits.</p>\n        <p>If you have any questions, feel free to reach out to us.</p>\n        <p>Best regards,<br>The SASSI Team</p>\n      ";
                    }
                    else {
                        subject = "Update on Your SASSI Membership Application";
                        content = "\n        <h1>Your Membership Application Status</h1>\n        <p>Hello " + userName + ",</p>\n        <p>We've reviewed your application to join SASSI, and unfortunately, we are unable to approve it at this time.</p>\n        " + (notes ? "<p><strong>Reason:</strong> " + notes + "</p>" : '') + "\n        <p>If you believe this is an error or would like to discuss your application further, please reply to this email.</p>\n        <p>Best regards,<br>The SASSI Team</p>\n      ";
                    }
                    return [4 /*yield*/, resend.emails.send({
                            from: 'SASSI Membership <membership@sassimilan.com>',
                            to: userEmail,
                            subject: subject,
                            html: content
                        })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Error sending membership status email:', error);
                        throw new Error('Failed to send email');
                    }
                    return [2 /*return*/, data];
                case 2:
                    error_4 = _b.sent();
                    console.error('Error in sendMembershipStatusEmail:', error_4);
                    throw error_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sendMembershipStatusEmail = sendMembershipStatusEmail;
/**
 * Send payment confirmation email
 */
function sendPaymentConfirmationEmail(userEmail, userName, expiryDate) {
    return __awaiter(this, void 0, void 0, function () {
        var formattedExpiryDate, _a, data, error, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    formattedExpiryDate = new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }).format(expiryDate);
                    return [4 /*yield*/, resend.emails.send({
                            from: 'SASSI Membership <membership@sassimilan.com>',
                            to: userEmail,
                            subject: "Your SASSI Membership Payment Confirmation",
                            html: "\n        <h1>Membership Payment Confirmed</h1>\n        <p>Hello " + userName + ",</p>\n        <p>We're pleased to confirm that your SASSI membership payment has been received and processed successfully.</p>\n        <p>Your membership is now active and will be valid until <strong>" + formattedExpiryDate + "</strong>.</p>\n        <p>As a member, you now have access to:</p>\n        <ul>\n          <li>All SASSI events and activities</li>\n          <li>Our exclusive resources for Indian students in Milan</li>\n          <li>Our member network and community support</li>\n          <li>Special discounts with our partners</li>\n        </ul>\n        <p>You can log in to your account to access these benefits and update your profile.</p>\n        <p>Thank you for joining our community!</p>\n        <p>Best regards,<br>The SASSI Team</p>\n      "
                        })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Error sending payment confirmation email:', error);
                        throw new Error('Failed to send email');
                    }
                    return [2 /*return*/, data];
                case 2:
                    error_5 = _b.sent();
                    console.error('Error in sendPaymentConfirmationEmail:', error_5);
                    throw error_5;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sendPaymentConfirmationEmail = sendPaymentConfirmationEmail;
/**
 * Send team application status email
 */
function sendTeamApplicationStatusEmail(userEmail, userName, department, status, notes) {
    return __awaiter(this, void 0, void 0, function () {
        var subject, content, formattedDepartment, _a, data, error, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    subject = void 0, content = void 0;
                    formattedDepartment = department
                        .split('-')
                        .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); })
                        .join(' ');
                    if (status === "APPROVED") {
                        subject = "Welcome to the SASSI " + formattedDepartment + " Team!";
                        content = "\n        <h1>Your Team Application Has Been Approved!</h1>\n        <p>Hello " + userName + ",</p>\n        <p>We're excited to inform you that your application to join the <strong>" + formattedDepartment + "</strong> team has been <strong>approved</strong>!</p>\n        <p>Welcome to the SASSI team! We're thrilled to have you on board and look forward to your contributions.</p>\n        " + (notes ? "<p><strong>Note from the team:</strong> " + notes + "</p>" : '') + "\n        <p>Next steps:</p>\n        <ul>\n          <li>A team coordinator will contact you soon with more details</li>\n          <li>You'll be added to the team's communication channels</li>\n          <li>You'll receive an orientation to your role and responsibilities</li>\n        </ul>\n        <p>If you have any questions in the meantime, please don't hesitate to reach out.</p>\n        <p>Best regards,<br>The SASSI Team</p>\n      ";
                    }
                    else {
                        subject = "Update on Your SASSI Team Application";
                        content = "\n        <h1>Your Team Application Status</h1>\n        <p>Hello " + userName + ",</p>\n        <p>We've reviewed your application to join the <strong>" + formattedDepartment + "</strong> team, and unfortunately, we are unable to approve it at this time.</p>\n        " + (notes ? "<p><strong>Reason:</strong> " + notes + "</p>" : '') + "\n        <p>We appreciate your interest in contributing to SASSI, and encourage you to apply again in the future or explore other ways to get involved with our community.</p>\n        <p>If you would like to discuss your application further, please feel free to reply to this email.</p>\n        <p>Best regards,<br>The SASSI Team</p>\n      ";
                    }
                    return [4 /*yield*/, resend.emails.send({
                            from: 'SASSI Team <team@sassimilan.com>',
                            to: userEmail,
                            subject: subject,
                            html: content
                        })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Error sending team application status email:', error);
                        throw new Error('Failed to send email');
                    }
                    return [2 /*return*/, data];
                case 2:
                    error_6 = _b.sent();
                    console.error('Error in sendTeamApplicationStatusEmail:', error_6);
                    throw error_6;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sendTeamApplicationStatusEmail = sendTeamApplicationStatusEmail;
