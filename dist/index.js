"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const city_1 = __importDefault(require("./src/routes/city"));
const sport_1 = __importDefault(require("./src/routes/sport"));
const user_1 = __importDefault(require("./src/routes/user"));
const class_1 = __importDefault(require("./src/routes/class"));
const sportGender_1 = __importDefault(require("./src/routes/sportGender"));
const registration_1 = __importDefault(require("./src/routes/registration"));
const candidate_1 = __importDefault(require("./src/routes/candidate"));
const mail_1 = __importDefault(require("./src/routes/mail"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/api/cities', city_1.default);
app.use('/api/sports', sport_1.default);
app.use('/api/users', user_1.default);
app.use('/api/classes', class_1.default);
app.use('/api/sportGenders', sportGender_1.default);
app.use('/api/registrations', registration_1.default);
app.use('/api/candidates', candidate_1.default);
app.use('/api/mails', mail_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
