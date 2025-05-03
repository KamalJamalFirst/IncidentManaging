import type { Route } from "./+types/home";
import { redirect, type ActionFunctionArgs } from "react-router";
import { createNewIncident, getIncidents, changeIncidentStatus, cancelIncidents  } from '~/helpers/fetchData';
import DemoPage from "~/incidents/page";
import { Provider } from "react-redux";
import { store } from "~/helpers/store";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const fetchedIncidents = async () => {
  const data = await getIncidents();
  return data
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    if (request.method === 'PUT') {
      const action = formData.get('action') as string;
      if (action === 'inWorkToCancelled') {
        const response = await cancelIncidents();
        if (response?.updated) {
          return { success: true, message: "Incidents changed  to cancelled" };
        }
        throw new Error(`PUT update failed`)
      }
      if (action === 'inNewToWork') {
        const changeStatusTo = formData.get('changeStatusTo') as "В работе";
        const incidentId: string = formData.get('incidentId') as string;
        const messageSuccess = { success: true, message: "Incident status updated", incidentId };
        const response = await changeIncidentStatus({ changeStatusTo, incidentId});
        if (response?.updated) {
          return messageSuccess
        }
        throw new Error(`PUT update failed`)
      }

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
      }

    }
    if (request.method === 'POST') {
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      if (title && description) {
        await createNewIncident({"title": title, "description": description});
        return { success: true, message: "New incident created" };
      }
    }
    // --- Handle cases where the request method is not PUT or POST ---
    console.log("Action received unrecognized method:", request.method);
    // Return an error indicator or throw a specific error
     return { success: false, message: `Unhandled method: ${request.method}` };

    
  } catch (error) {
    // --- Catch any errors thrown by your async operations ---
    console.error("Error in action:", error);
    // Return an error object. This can be accessed by useActionData or useRouteError.
    // Returning indicates completion (even if failed) and should trigger revalidation.
    return { success: false, message: error || "An unexpected error occurred in action" };
    // Or re-throw the error if you want it to be handled by the route's errorElement:
    // throw error;
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
