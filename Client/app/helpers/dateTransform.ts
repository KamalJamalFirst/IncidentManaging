import type { Incident } from "Server/models/types";

const monthsTitleCase = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

// REFACTOR
export default function dateFilteredVerbosed(loaderData: Incident[], dateFromtoString?: number, dateTotoString?: number) {
    if (dateFromtoString && dateTotoString) {
        const filteredData = loaderData.filter((incident: Incident) => ((+incident.created >= dateFromtoString) && (+incident.created <= dateTotoString)))
        return prettifyDateAll(filteredData);
    }
    return prettifyDateAll(loaderData);
}
/*`${monthsTitleCase[prettyDate.getMonth()]} ${prettyDate.getDate()}, ${prettyDate.getFullYear()}`*/

function prettifyDateAll(incidentsData: Incident[]) {
    return incidentsData.map((incident: Incident) => {
        const prettyDate: Date = new Date(+incident.created);
        return {...incident, created: `${monthsTitleCase[prettyDate.getMonth()]} ${prettyDate.getDate()}, ${prettyDate.getFullYear()}`}
    });
}