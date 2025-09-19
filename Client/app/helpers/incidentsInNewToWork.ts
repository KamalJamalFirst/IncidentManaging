import { changeIncidentStatus } from "./fetchData";

export default async function incidentsInNewToWork(formData: FormData) {
    const changeStatusTo = formData.get('changeStatusTo') as "В работе";
    const incidentId: string = formData.get('incidentId') as string;
    const response = await changeIncidentStatus({ changeStatusTo, incidentId }).then(res => res).catch(err => err);
    if (response.updated) {
        return { success: true, message: "Incident status updated", incidentId };
    }
    return { success: false, message: `Failed to update status on incident ${incidentId}` };
}