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

export default function prettifyDate(loaderData: Incident[]) {
    const prettifiedloaderData = loaderData.map((incident: Incident) => {
        const prettyDate: Date = new Date(+incident.created);
        return {...incident, created: `${monthsTitleCase[prettyDate.getMonth()]} ${prettyDate.getDate()}, ${prettyDate.getFullYear()}`}
    });
    return prettifiedloaderData;
}
/*`${monthsTitleCase[prettyDate.getMonth()]} ${prettyDate.getDate()}, ${prettyDate.getFullYear()}`*/