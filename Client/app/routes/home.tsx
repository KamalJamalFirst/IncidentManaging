import type { Route } from "./+types/home";
import type { ActionFunctionArgs } from "react-router";
import { createNewIncident, getIncidents, changeIncidentStatus, cancelIncidents  } from '~/helpers/fetchData';
import DemoPage from "~/incidents/page";
import { Provider } from "react-redux";
import { store } from "~/helpers/store";
import fetchedIncidents from "~/helpers/fetchIncidents";
import requestMethodTypeFabric from "~/helpers/requestMethodTypeFabric";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// REFACTOR
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    requestMethodTypeFabric(request.method, formData);
    const changeStatusTo = formData.get('changeStatusTo') as "В работе" | "Завершен" | "Отменен";
    const description: string = formData.get('textarea') as string;
    const incidentId: string = formData.get('incidentId') as string;
    const messageSuccess = { success: true, message: "Incident status updated", incidentId };
    if (description && description.trim() !== "") {
        const response = await changeIncidentStatus({ changeStatusTo, description: description.trim(), incidentId});
        if (response?.updated) {
        return messageSuccess
        }
        throw new Error(`PUT update failed`)
    } else {
        const response = await changeIncidentStatus({ changeStatusTo, incidentId});
        if (response?.updated) {
            return messageSuccess
        }
        throw new Error(`PUT update failed`)
    };
  } catch (error) {
    return { success: false, message: error || "An unexpected error occurred in action" };
  }
  
}


export async function loader({ params }: Route.LoaderArgs): Promise<any> {
  const data = await fetchedIncidents()
  return data;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="wrapper relative z-0">
      <Provider store={store}>
        <DemoPage loaderData={loaderData}/>
      </Provider>
      <div id="test-task"></div>
    </div>
  )

}
