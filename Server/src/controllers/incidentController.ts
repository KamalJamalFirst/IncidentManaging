import { Request, Response, NextFunction } from 'express';
import { Incident } from "../entity/incident"
import { AppDataSource } from "../data-source"
import { IncidentChange, newIncident } from '../../models/types';

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


export const getIncidents = async (req: Request, res: Response, next: NextFunction) => {
    const incidentRepository = AppDataSource.getRepository(Incident)
    const allIncidents = await incidentRepository.find();
    res.send(allIncidents)
}


export const createIncident = async (req: Request, res: Response, next: NextFunction) => {
    const incidentInfo: newIncident = req.body;
    const momentDate = Date.now()
    // const month = months[momentDate.getMonth()];
    // const day = (momentDate.getDate() <= 9) ? `0${momentDate.getDate()}` : momentDate.getDate();

    const incident = new Incident();
    incident.status = "Новый";
    incident.created = `${Date.now()}`;
    incident.title = incidentInfo.title;
    incident.description = incidentInfo.description;
    try {
        const incidentRepository = AppDataSource.getRepository(Incident)
        await incidentRepository.save(incident)
        res.status(200).send("POST create successful")
    } catch (error) {
        console.error(error);
    }
    
}

export const changeIncidentStatus = async (req: Request, res: Response, next: NextFunction) => {
    const incidentInfo: IncidentChange = req.body;
    try {
        const incidentRepository = AppDataSource.getRepository(Incident)
        const incidentToUpdate = await incidentRepository.findOneBy({id: +incidentInfo.incidentId});
        if (incidentToUpdate) {
            incidentToUpdate.status = incidentInfo.changeStatusTo;
            if (incidentInfo.description) {
                incidentToUpdate.description += `\n${incidentInfo?.description}`;
            }
            console.log(incidentToUpdate.description);
            await incidentRepository.save(incidentToUpdate);
            res.status(200).send("PUT update successful")
        }
    } catch (error) {
        console.error(error);
    }
}

export const cancelIncidents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const incidentRepository = AppDataSource.getRepository(Incident)
        const incidentsToUpdate = await incidentRepository.findBy({status: "В работе"});
        if (incidentsToUpdate) {
            incidentsToUpdate.forEach((incident: Incident) => incident.status = "Отменен");
            await incidentRepository.save(incidentsToUpdate);
            res.status(200).send("PUT changed incidents  to cancelled")
        }
    } catch (error) {
        console.error(error);
    }
}