"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const env = process.env.NODE_END || "normal";
let dbURI;
if (env === "test")
    dbURI = process.env.TEST_DB_URI;
else
    dbURI = process.env.DB_URI;
if (!dbURI) {
    throw new Error("Database URI is not defined in environment variables.");
}
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json({ limit: "25mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "25mb" }));
// routes
app.get("/", (req, res, next) => {
    console.log(req.path, req.method);
    next();
});
mongoose_1.default
    .connect(dbURI)
    .then(() => {
    app.listen(port, () => {
        console.log("DB connection successful, listening on port ${port}");
    });
})
    .catch((error) => {
    console.log("Could not connect to the database:\n", error);
});
module.exports = app;
