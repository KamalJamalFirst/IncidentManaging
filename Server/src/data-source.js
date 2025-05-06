"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const incident_1 = require("./entity/incident");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "incidents",
    synchronize: true,
    logging: true,
    entities: [incident_1.Incident],
    subscribers: [],
    migrations: [],
});
