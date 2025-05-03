import { Router } from 'express';

import {
    createIncident,
    getIncidents,
    changeIncidentStatus,
    cancelIncidents
  } from '../controllers/incidentController';

const router = Router();

router.get('/', getIncidents);
router.post('/new', createIncident);
router.put('/', changeIncidentStatus);
router.put('/cancel', cancelIncidents);


export default router;