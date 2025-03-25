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
exports.POST = void 0;
var server_1 = require("next/server");
var prisma_1 = require("@/lib/prisma");
var zod_1 = require("zod");
var bcrypt_1 = require("bcrypt");
// Schema for member registration
var memberRegistrationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    isStudent: zod_1.z.boolean(),
    university: zod_1.z.string().min(1, "University selection is required"),
    codiceFiscale: zod_1.z.string().optional()
});
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var body, validatedData, existingUser, existingRequest, membershipRequest, hashedPassword, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, request.json()];
                case 1:
                    body = _a.sent();
                    validatedData = memberRegistrationSchema.parse(body);
                    return [4 /*yield*/, prisma_1["default"].user.findUnique({
                            where: {
                                email: validatedData.email
                            }
                        })];
                case 2:
                    existingUser = _a.sent();
                    if (existingUser) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "A user with this email already exists" }, { status: 400 })];
                    }
                    return [4 /*yield*/, prisma_1["default"].membershipRequest.findFirst({
                            where: {
                                email: validatedData.email,
                                status: "PENDING"
                            }
                        })];
                case 3:
                    existingRequest = _a.sent();
                    if (existingRequest) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "You already have a pending membership request" }, { status: 400 })];
                    }
                    return [4 /*yield*/, prisma_1["default"].membershipRequest.create({
                            data: {
                                firstName: validatedData.firstName,
                                lastName: validatedData.lastName,
                                email: validatedData.email,
                                isStudent: validatedData.isStudent,
                                university: validatedData.university,
                                codiceFiscale: validatedData.codiceFiscale,
                                status: "PENDING"
                            }
                        })];
                case 4:
                    membershipRequest = _a.sent();
                    return [4 /*yield*/, bcrypt_1.hash(validatedData.password, 10)];
                case 5:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, prisma_1["default"].user.create({
                            data: {
                                name: validatedData.firstName + " " + validatedData.lastName,
                                email: validatedData.email,
                                password: hashedPassword,
                                university: validatedData.university,
                                isVerified: false,
                                paymentVerified: false,
                                profile: {
                                    create: {}
                                }
                            }
                        })];
                case 6:
                    user = _a.sent();
                    // Update the membership request with the user ID
                    return [4 /*yield*/, prisma_1["default"].membershipRequest.update({
                            where: {
                                id: membershipRequest.id
                            },
                            data: {
                                userId: user.id
                            }
                        })];
                case 7:
                    // Update the membership request with the user ID
                    _a.sent();
                    // Return success with the membershipRequest ID for tracking
                    return [2 /*return*/, server_1.NextResponse.json({
                            message: "Membership request submitted successfully",
                            id: membershipRequest.id,
                            redirectUrl: "https://revolut.me/harshnj"
                        }, { status: 201 })];
                case 8:
                    error_1 = _a.sent();
                    console.error("Error creating membership request:", error_1);
                    if (error_1 instanceof zod_1.z.ZodError) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: error_1.errors }, { status: 400 })];
                    }
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Failed to process membership request" }, { status: 500 })];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
