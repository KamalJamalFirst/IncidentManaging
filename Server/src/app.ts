import "reflect-metadata"
import { AppDataSource } from "./data-source"

import express from 'express';
import cors from 'cors'
import router from './routes/incidentRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/incidents', router);



// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .catch((error: any) => console.log(error))

export default app;