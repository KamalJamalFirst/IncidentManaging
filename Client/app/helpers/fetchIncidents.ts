import { getIncidents } from "./fetchData";

export default async function fetchedIncidents() {
  const data = await getIncidents();
  return data
}