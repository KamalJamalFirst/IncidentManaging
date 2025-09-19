import { cancelIncidents } from "./fetchData";

export default async function incidentsInWorkToCancelled() {
    const response = await cancelIncidents().then(res => res).catch(err => err);
    if (response.updated) {
        return { success: true, message: "Incidents changed to cancelled" };
    }
    return { success: false, message: "Failed to cancel incidents in status 'in work'" };
}