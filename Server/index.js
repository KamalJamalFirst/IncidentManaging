"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const config_1 = __importDefault(require("./src/config/config"));
const data_source_1 = require("./src/data-source");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const incidentRoutes_1 = __importDefault(require("./src/routes/incidentRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/incidents', incidentRoutes_1.default);
app.listen(config_1.default.port, () => {
    console.log(`Server running on port ${config_1.default.port}`);
});
// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
data_source_1.AppDataSource.initialize()
    .catch((error) => console.log(error));
exports.default = app;
