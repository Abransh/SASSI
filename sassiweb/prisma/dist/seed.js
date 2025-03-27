"use strict";
// prisma/seed.ts - Updated to include resource categories
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
var client_1 = require("@prisma/client");
var bcrypt_1 = require("bcrypt");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var adminPassword, admin, sampleEvent1, sampleEvent2, categoryBeforeArrival, categoryLivingInMilan, categoryAfterGraduation, resource1, resource2, resource3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.hash('Admin@SASSI123', 10)];
                case 1:
                    adminPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'admin@sassimilan.com' },
                            update: {},
                            create: {
                                email: 'admin@sassimilan.com',
                                name: 'SASSI Admin',
                                password: adminPassword,
                                role: 'ADMIN'
                            }
                        })];
                case 2:
                    admin = _a.sent();
                    console.log({ admin: admin });
                    return [4 /*yield*/, prisma.event.upsert({
                            where: { id: 'clxxxxxxxxxx1' },
                            update: {},
                            create: {
                                title: 'Diwali Celebration 2025',
                                description: 'Join us for a grand celebration of Diwali, the festival of lights. Enjoy traditional Indian food, music, and performances.',
                                content: 'Full event details will be announced closer to the date.',
                                location: 'Politecnico di Milano, Aula Magna',
                                startDate: new Date('2025-11-01T18:00:00Z'),
                                endDate: new Date('2025-11-01T22:00:00Z'),
                                imageUrl: '/assests/groupimg.jpg',
                                maxAttendees: 200,
                                published: true,
                                createdBy: admin.id
                            }
                        })];
                case 3:
                    sampleEvent1 = _a.sent();
                    return [4 /*yield*/, prisma.event.upsert({
                            where: { id: 'clxxxxxxxxxx2' },
                            update: {},
                            create: {
                                title: 'Freshers Welcome Party',
                                description: 'Special welcome event for new Indian students in Milan. Meet seniors, make connections, and learn about life in Milan.',
                                location: 'Student Center, Via Example 123',
                                startDate: new Date('2025-09-15T17:00:00Z'),
                                endDate: new Date('2025-09-15T20:00:00Z'),
                                maxAttendees: 100,
                                published: true,
                                createdBy: admin.id
                            }
                        })];
                case 4:
                    sampleEvent2 = _a.sent();
                    console.log({ sampleEvent1: sampleEvent1, sampleEvent2: sampleEvent2 });
                    return [4 /*yield*/, prisma.resourceCategory.upsert({
                            where: { slug: 'before-arrival' },
                            update: {},
                            create: {
                                name: 'Before Arrival',
                                slug: 'before-arrival',
                                description: 'Everything you need to know before coming to Milan - visas, accommodation, and preparation tips.',
                                order: 1
                            }
                        })];
                case 5:
                    categoryBeforeArrival = _a.sent();
                    return [4 /*yield*/, prisma.resourceCategory.upsert({
                            where: { slug: 'living-in-milan' },
                            update: {},
                            create: {
                                name: 'Living in Milan',
                                slug: 'living-in-milan',
                                description: 'Resources to help you settle in and navigate daily life in Milan - from transportation to healthcare.',
                                order: 2
                            }
                        })];
                case 6:
                    categoryLivingInMilan = _a.sent();
                    return [4 /*yield*/, prisma.resourceCategory.upsert({
                            where: { slug: 'after-graduation' },
                            update: {},
                            create: {
                                name: 'After Graduation',
                                slug: 'after-graduation',
                                description: 'Resources for your next steps after completing your studies - career opportunities, staying in Italy, and more.',
                                order: 3
                            }
                        })];
                case 7:
                    categoryAfterGraduation = _a.sent();
                    console.log({
                        categoryBeforeArrival: categoryBeforeArrival,
                        categoryLivingInMilan: categoryLivingInMilan,
                        categoryAfterGraduation: categoryAfterGraduation
                    });
                    return [4 /*yield*/, prisma.resource.upsert({
                            where: { id: 'resource1' },
                            update: {},
                            create: {
                                title: 'Complete Guide to Student Visas',
                                description: 'Step-by-step instructions for obtaining your Italian student visa, including required documents and application tips.',
                                fileUrl: 'https://example.com/resources/visa-guide.pdf',
                                resourceType: 'GUIDE',
                                featured: true,
                                categoryId: categoryBeforeArrival.id
                            }
                        })];
                case 8:
                    resource1 = _a.sent();
                    return [4 /*yield*/, prisma.resource.upsert({
                            where: { id: 'resource2' },
                            update: {},
                            create: {
                                title: 'Milan Transportation Guide',
                                description: 'Guide to navigating Milan\'s public transportation system, including metro, trams, buses, and student discounts.',
                                fileUrl: 'https://example.com/resources/transportation-guide.pdf',
                                resourceType: 'GUIDE',
                                featured: true,
                                categoryId: categoryLivingInMilan.id
                            }
                        })];
                case 9:
                    resource2 = _a.sent();
                    return [4 /*yield*/, prisma.resource.upsert({
                            where: { id: 'resource3' },
                            update: {},
                            create: {
                                title: 'CV Template for Italian Job Market',
                                description: 'Customized CV template for international students looking for jobs in Italy, with tips on adapting your resume.',
                                fileUrl: 'https://example.com/resources/cv-template.docx',
                                resourceType: 'TEMPLATE',
                                featured: true,
                                categoryId: categoryAfterGraduation.id
                            }
                        })];
                case 10:
                    resource3 = _a.sent();
                    console.log({ resource1: resource1, resource2: resource2, resource3: resource3 });
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) {
    console.error(e);
    process.exit(1);
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
