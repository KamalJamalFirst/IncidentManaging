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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelIncidents = exports.changeIncidentStatus = exports.createIncident = exports.getIncidents = void 0;
const incident_1 = require("../entity/incident");
const data_source_1 = require("../data-source");
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const getIncidents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const incidentRepository = data_source_1.AppDataSource.getRepository(incident_1.Incident);
    const allIncidents = yield incidentRepository.find();
    res.send(allIncidents);
});
exports.getIncidents = getIncidents;
const createIncident = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const incidentInfo = req.body;
    const momentDate = Date.now();
    // const month = months[momentDate.getMonth()];
    // const day = (momentDate.getDate() <= 9) ? `0${momentDate.getDate()}` : momentDate.getDate();
    const incident = new incident_1.Incident();
    incident.status = "Новый";
    incident.created = `${Date.now()}`;
    incident.title = incidentInfo.title;
    incident.description = incidentInfo.description;
    try {
        const incidentRepository = data_source_1.AppDataSource.getRepository(incident_1.Incident);
        yield incidentRepository.save(incident);
        res.status(200).send("POST create successful");
    }
    catch (error) {
        console.error(error);
    }
});
exports.createIncident = createIncident;
const changeIncidentStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const incidentInfo = req.body;
    try {
        const incidentRepository = data_source_1.AppDataSource.getRepository(incident_1.Incident);
        const incidentToUpdate = yield incidentRepository.findOneBy({ id: +incidentInfo.incidentId });
        if (incidentToUpdate) {
            incidentToUpdate.status = incidentInfo.changeStatusTo;
            if (incidentInfo.description) {
                incidentToUpdate.description += `\n${incidentInfo === null || incidentInfo === void 0 ? void 0 : incidentInfo.description}`;
            }
            console.log(incidentToUpdate.description);
            yield incidentRepository.save(incidentToUpdate);
            res.status(200).send("PUT update successful");
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.changeIncidentStatus = changeIncidentStatus;
const cancelIncidents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incidentRepository = data_source_1.AppDataSource.getRepository(incident_1.Incident);
        const incidentsToUpdate = yield incidentRepository.findBy({ status: "В работе" });
        if (incidentsToUpdate) {
            incidentsToUpdate.forEach((incident) => incident.status = "Отменен");
            yield incidentRepository.save(incidentsToUpdate);
            res.status(200).send("PUT changed incidents  to cancelled");
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.cancelIncidents = cancelIncidents;
