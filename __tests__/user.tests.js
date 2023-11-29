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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
process.env.MONGO_CONNECTION_URI;
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    process.env.MONGO_CONNECTION_URI
        ? yield mongoose_1.default.connect(process.env.MONGO_CONNECTION_URI)
        : console.log("error");
}));
/* Closing database connection after each test. */
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("user sign up", () => {
    it("should create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)("http://localhost:5050")
            .post("/api/users/register")
            .send({
            email: "user@example.com",
            password: "12@WEcvf2!5",
        });
        expect(res.statusCode).toBe(201);
        console.log(res.body);
        expect(res.body).toBeDefined();
    }));
});
describe("user sign in", () => {
    it("should sign in", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)("http://localhost:5050")
            .post("/api/users/login")
            .send({
            email: "user@example.com",
            password: "12@WEcvf2!5",
        });
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        expect(res.body).toBeDefined();
    }));
});
