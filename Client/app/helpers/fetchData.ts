import type { Incident, IncidentChange, NewIncident } from "~/models/types"


const serverUrl = 'http://localhost:3001/api/incidents'
//const urlGetIncidents = 'http://localhost:3000/api/incidents'

export const getIncidents = async (): Promise<Incident[]> => {
    try {
        const response = await fetch(serverUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const incidentsList = response.json();
        return incidentsList;
    } catch (error) {
        throw error;
    }
}

export const createNewIncident = async (newIncident: NewIncident): Promise<{updated: boolean} | Error> => {
    const response = await fetch(`${serverUrl}/new`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(newIncident),
    });
    if (response.status === 200) {
        return {updated: true}
    };
    return new Error(`Response status: ${response.status}`);
}

export const changeIncidentStatus = async (changeInfo: IncidentChange): Promise<{updated: boolean} | Error> => {
    const response = await fetch(`${serverUrl}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(changeInfo),
    });
    if (response.status === 200) {
        return {updated: true}
    };
    return new Error(`Response status: ${response.status}`);
}

export const cancelIncidents = async (): Promise<{updated: boolean} | Error> => {
    const response = await fetch(`${serverUrl}/cancel`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            },
    });
    if (response.status === 200) {
        return {updated: true}
    }
    return new Error(`Response status: ${response.status}`);
}