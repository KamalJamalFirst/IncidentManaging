export type Incident = {
    id: string
    status: "Новый" | "В работе" | "Завершен" | "Отменен"
    created: string
    title: string
    description: string
};


export type newIncident = {
    title: string
    description: string
}

export type IncidentChange = {
    changeStatusTo: "В работе" | "Завершен" | "Отменен",
    description?: string, 
    incidentId: string,
}