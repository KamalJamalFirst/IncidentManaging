
import incidentsInNewToWork from "./incidentsInNewToWork";
import incidentsInWorkToCancelled from "./incidentsInWorkToCancelled";

export default function actionsFabric(formData: FormData) {
    const changeStatusTo = formData.get('changeStatusTo') as "В работе" | "Завершен" | "Отменен";
    const action = formData.get('action') as string;
    switch (changeStatusTo) {
        case "Отменен":
            return incidentsInWorkToCancelled();
        case "В работе":
            return incidentsInNewToWork(formData);
        default:
            return new Error(`Unhandled action: ${action}`);
    }
}