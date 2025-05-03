import { Incident } from "./entity/incident"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "incidents",
    synchronize: true,
    logging: true,
    entities: [Incident],
    subscribers: [],
    migrations: [],
})