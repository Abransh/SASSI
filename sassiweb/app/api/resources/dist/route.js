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
exports.POST = exports.GET = void 0;
var server_1 = require("next/server");
var next_1 = require("next-auth/next");
var prisma_1 = require("@/lib/prisma");
var route_1 = require("../auth/[...nextauth]/route");
var zod_1 = require("zod");
// Validation schema for resource creation
var resourceSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    fileUrl: zod_1.z.string().url("Valid file URL is required"),
    thumbnailUrl: zod_1.z.string().url().optional().nullable(),
    categoryId: zod_1.z.string().min(1, "Category is required"),
    resourceType: zod_1.z["enum"](["DOCUMENT", "TEMPLATE", "GUIDE", "VIDEO", "LINK"]),
    featured: zod_1.z.boolean().optional()["default"](false)
});
// GET /api/resources - Get all resources
function GET(request) {
    return __awaiter(this, void 0, void 0, function () {
        var session, searchParams, categoryId, type, featured, whereClause, resources, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, next_1.getServerSession(route_1.authOptions)];
                case 1:
                    session = _a.sent();
                    if (!session) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "You must be logged in to access resources" }, { status: 401 })];
                    }
                    searchParams = new URL(request.url).searchParams;
                    categoryId = searchParams.get("categoryId");
                    type = searchParams.get("type");
                    featured = searchParams.get("featured") === "true";
                    whereClause = {};
                    if (categoryId) {
                        whereClause.categoryId = categoryId;
                    }
                    if (type) {
                        whereClause.resourceType = type;
                    }
                    if (featured) {
                        whereClause.featured = true;
                    }
                    return [4 /*yield*/, prisma_1["default"].resource.findMany({
                            where: whereClause,
                            orderBy: {
                                title: "asc"
                            },
                            include: {
                                category: {
                                    select: {
                                        name: true,
                                        slug: true
                                    }
                                }
                            }
                        })];
                case 2:
                    resources = _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json(resources)];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching resources:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
// POST /api/resources - Create a new resource
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var session, body, validatedData, resource, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, next_1.getServerSession(route_1.authOptions)];
                case 1:
                    session = _a.sent();
                    if (!session || session.user.role !== "ADMIN") {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Unauthorized" }, { status: 401 })];
                    }
                    return [4 /*yield*/, request.json()];
                case 2:
                    body = _a.sent();
                    validatedData = resourceSchema.parse(body);
                    return [4 /*yield*/, prisma_1["default"].resource.create({
                            data: validatedData
                        })];
                case 3:
                    resource = _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json(resource, { status: 201 })];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error creating resource:", error_2);
                    if (error_2 instanceof zod_1.z.ZodError) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: error_2.errors }, { status: 400 })];
                    }
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Failed to create resource" }, { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
