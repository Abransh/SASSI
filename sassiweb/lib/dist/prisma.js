"use strict";
exports.__esModule = true;
exports.prisma = void 0;
var client_1 = require("@prisma/client");
// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
var globalForPrisma = global;
exports.prisma = globalForPrisma.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = exports.prisma;
exports["default"] = exports.prisma;
