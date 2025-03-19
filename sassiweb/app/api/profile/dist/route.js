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
exports.GET = exports.PATCH = void 0;
var server_1 = require("next/server");
var next_1 = require("next-auth/next");
var prisma_1 = require("@/lib/prisma");
var route_1 = require("../auth/[...nextauth]/route");
var zod_1 = require("zod");
// Validation schema for profile updates
var profileUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    university: zod_1.z.string().optional(),
    course: zod_1.z.string().optional(),
    graduationYear: zod_1.z.coerce.number().optional().nullable(),
    bio: zod_1.z.string().optional(),
    phoneNumber: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    linkedinUrl: zod_1.z.string().optional(),
    isProfilePublic: zod_1.z.boolean()["default"](true),
    // Profile specific fields
    universityInIndia: zod_1.z.string().optional(),
    degreeInIndia: zod_1.z.string().optional(),
    yearOfArrival: zod_1.z.coerce.number().optional().nullable(),
    residenceArea: zod_1.z.string().optional(),
    interests: zod_1.z.string().optional(),
    skills: zod_1.z.string().optional(),
    showEmail: zod_1.z.boolean()["default"](false),
    showPhone: zod_1.z.boolean()["default"](false)
});
// PATCH /api/profile - Update user profile
function PATCH(request) {
    return __awaiter(this, void 0, void 0, function () {
        var session, json, validatedData, updatedUser, profile, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, next_1.getServerSession(route_1.authOptions)];
                case 1:
                    session = _a.sent();
                    if (!session) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "You must be logged in to update your profile" }, { status: 401 })];
                    }
                    return [4 /*yield*/, request.json()];
                case 2:
                    json = _a.sent();
                    validatedData = profileUpdateSchema.parse(json);
                    return [4 /*yield*/, prisma_1["default"].user.update({
                            where: {
                                id: session.user.id
                            },
                            data: {
                                name: validatedData.name,
                                university: validatedData.university,
                                course: validatedData.course,
                                graduationYear: validatedData.graduationYear,
                                bio: validatedData.bio,
                                phoneNumber: validatedData.phoneNumber,
                                city: validatedData.city,
                                linkedinUrl: validatedData.linkedinUrl,
                                isProfilePublic: validatedData.isProfilePublic
                            }
                        })];
                case 3:
                    updatedUser = _a.sent();
                    return [4 /*yield*/, prisma_1["default"].profile.upsert({
                            where: {
                                userId: session.user.id
                            },
                            create: {
                                userId: session.user.id,
                                universityInIndia: validatedData.universityInIndia,
                                degreeInIndia: validatedData.degreeInIndia,
                                yearOfArrival: validatedData.yearOfArrival,
                                residenceArea: validatedData.residenceArea,
                                interests: validatedData.interests,
                                skills: validatedData.skills,
                                showEmail: validatedData.showEmail,
                                showPhone: validatedData.showPhone
                            },
                            update: {
                                universityInIndia: validatedData.universityInIndia,
                                degreeInIndia: validatedData.degreeInIndia,
                                yearOfArrival: validatedData.yearOfArrival,
                                residenceArea: validatedData.residenceArea,
                                interests: validatedData.interests,
                                skills: validatedData.skills,
                                showEmail: validatedData.showEmail,
                                showPhone: validatedData.showPhone
                            }
                        })];
                case 4:
                    profile = _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({
                            message: "Profile updated successfully",
                            user: __assign(__assign({}, updatedUser), { profile: profile })
                        })];
                case 5:
                    error_1 = _a.sent();
                    console.error("Error updating profile:", error_1);
                    if (error_1 instanceof zod_1.z.ZodError) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: error_1.errors }, { status: 400 })];
                    }
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Failed to update profile" }, { status: 500 })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.PATCH = PATCH;
// GET /api/profile - Get current user profile
function GET(request) {
    return __awaiter(this, void 0, void 0, function () {
        var session, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, next_1.getServerSession(route_1.authOptions)];
                case 1:
                    session = _a.sent();
                    if (!session) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "You must be logged in to view your profile" }, { status: 401 })];
                    }
                    return [4 /*yield*/, prisma_1["default"].user.findUnique({
                            where: {
                                id: session.user.id
                            },
                            include: {
                                profile: true
                            }
                        })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "User not found" }, { status: 404 })];
                    }
                    return [2 /*return*/, server_1.NextResponse.json({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                university: user.university,
                                course: user.course,
                                graduationYear: user.graduationYear,
                                bio: user.bio,
                                phoneNumber: user.phoneNumber,
                                city: user.city,
                                linkedinUrl: user.linkedinUrl,
                                isProfilePublic: user.isProfilePublic,
                                profile: user.profile
                            }
                        })];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error fetching profile:", error_2);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
