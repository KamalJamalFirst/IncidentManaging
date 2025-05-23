import "reflect-metadata"
import config from './src/config/config';
import { AppDataSource } from "./src/data-source"

import express from 'express';
import cors from 'cors'
import router from './src/routes/incidentRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/incidents', router);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });



// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .catch((error: any) => console.log(error))

export default app;