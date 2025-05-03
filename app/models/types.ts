// export type Incident = {
//     id: string
//     status: "new" | "in progress" | "completed" | "cancelled"
//     created: string
// };

export type Incident = {
    id: string
    status: "Новый" | "В работе" | "Завершен" | "Отменен"
    created: string
    title: string
    description: string
};

export type NewIncident = {
    title: string
    description: string
}

export type IncidentChange = {
    changeStatusTo: "В работе" | "Завершен" | "Отменен", 
    description?: string, 
    incidentId: string,
}