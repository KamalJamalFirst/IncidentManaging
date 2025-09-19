

import type { ColumnDef } from "@tanstack/react-table";

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

export interface FilteredState {
    filter: boolean;
    filteredData: Incident[]; // Declare the array type correctly
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}