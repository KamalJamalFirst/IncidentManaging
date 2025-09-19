import actionsFabric from "./actionsFabric";
import pushNewIncident from "./sendNewIncident";

export default async function requestMethodTypeFabric(method: string, formData: FormData) {
    switch (method) {
        case 'PUT':
            return actionsFabric(formData);
        case 'POST':
            return pushNewIncident(formData);
        default:
            return new Error(`Unhandled method: ${method}`);
    }
}