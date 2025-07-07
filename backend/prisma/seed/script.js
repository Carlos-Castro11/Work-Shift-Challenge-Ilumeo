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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const email = 'ilumeo@ilumeo.com';
        const password = '123456';
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        let user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            user = yield prisma.user.create({
                data: {
                    name: 'Ilumeo',
                    email,
                    password: hashedPassword,
                },
            });
        }
        const existingShifts = yield prisma.workShift.count({
            where: { userId: user.id },
        });
        if (existingShifts < 50) {
            console.log('Inserindo registros de ponto...');
            const now = new Date();
            const shifts = Array.from({ length: 50 }).map((_, i) => {
                const date = new Date(now);
                date.setDate(now.getDate() - i);
                const start = new Date(date.setHours(9, 0, 0, 0));
                const end = new Date(date.setHours(17, 0, 0, 0));
                return {
                    userId: user.id,
                    start,
                    end,
                };
            });
            yield prisma.workShift.createMany({ data: shifts });
            console.log('Registros de ponto criados.');
        }
        else {
            console.log('Registros de ponto já existentes.');
        }
        console.log('✅ Seed finalizado com sucesso!');
    });
}
main()
    .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
