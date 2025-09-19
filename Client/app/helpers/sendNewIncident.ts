import { createNewIncident } from "./fetchData";

export default async function pushNewIncident(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    if (title && description) {
        const newIncidentCreated = await createNewIncident({"title": title, "description": description}).then(res => res).catch(err => err);
        if (newIncidentCreated?.updated) {
            return { success: true, message: "New incident created" };
        }
        return { success: false, message: newIncidentCreated?.message || "Failed to create new incident" };
        
    }
}