"use client"
import { createPortal } from 'react-dom';

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { DatePickerWithRange } from "./datePeriod"
import { Button } from "../components/ui/button"
import { NewIncident } from './new';
import { useEffect, useState } from 'react';
import type { Incident } from '~/models/types';
import { Form } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '~/helpers/store';
import { changeNewIncidentState } from '~/helpers/modalNewIncidentSlice';
import type { DateRange } from 'react-day-picker';
import dateFilteredVerbosed from '~/helpers/dateTransform';
import { type FilteredState } from '~/models/types';

// REFACTOR
// interface FilteredState {
//     filter: boolean;
//     filteredLoaderData: Incident[]; // Declare the array type correctly
// }

export default function DemoPage({ loaderData }: {loaderData: Incident[]}) {
    const newIcident = useSelector((state: RootState) => state.newIncident.value);
    const dispatch = useDispatch();
    const [date, setDate] = useState<DateRange | undefined>();
    const [filtered, setFiltered] = useState<FilteredState>({ filter: false, filteredData: [], });
    const dateVerbosed = dateFilteredVerbosed(loaderData)
    //console.log(prettify)

    // REFACTOR
    useEffect(() => {
        if (date && date.from && date.to) {
            const dateFilteredOnDatePickerChange = dateFilteredVerbosed(loaderData, +Date.parse(date.from.toString()), +Date.parse(date.to.toString()));
            return setFiltered((prev) => ({ ...prev, "filter": true, "filteredData": dateFilteredOnDatePickerChange}))
        }
        return setFiltered((prev) => ({ ...prev, filter: false}))
    }, [date?.from, date?.to])

    return (
        <div className="container mx-auto py-10">
            <div className="flex m-5 ml-0 mr-0 justify-between">
                <DatePickerWithRange date={date} setDate={setDate} />
                <div className="flex">
                    <Button type="submit" className="mr-2.5" onClick={() => dispatch(changeNewIncidentState())}>Создать обращение</Button>
                    <Form method="put">
                        <Button name='action' value='inWorkToCancelled'>Отменить инциденты "В работе"</Button>
                    </Form>
                </div>

                {newIcident && createPortal(<NewIncident dispatch={dispatch} />, document.getElementById('test-task')!)}
            </div>
            <DataTable columns={columns} data={filtered.filter ? filtered.filteredData : dateVerbosed}/>
        </div>
    )
}

