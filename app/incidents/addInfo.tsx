import { Button } from "../components/ui/button"
import { Form, useLoaderData } from "react-router"
import { Textarea } from "~/components/ui/textarea"
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { changeStateCompleted } from "~/helpers/modalCompletedSlice"
import { changeStateCancelled } from "~/helpers/modalCancelledSlice"
import type { loader } from "~/routes/home"

const overlay: CSSProperties | undefined = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    zIndex: 50
}

const form: CSSProperties | undefined = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 50
}

const statusMatch = {
    "Завершить" : "Завершен",
    "Отменить": "Отменен"
}

export function AddInfo({ buttonDesc, id, dispatch }: {buttonDesc: "Завершить" | "Отменить", id: string, dispatch: Dispatch<UnknownAction>}) {
    console.log("we are trying to render newIncident component")
  return (
    <>
        <div style={overlay}></div>
        <Form method="put" className="bg-white w-2xl min-h-30 p-2 rounded-lg flex flex-col gap-4" style={form} onSubmit={() => {
            //let example = useLoaderData<typeof loader>();
            (statusMatch[buttonDesc] === "Завершен") ? dispatch(changeStateCompleted()) : dispatch(changeStateCancelled())
        }}>
            <div>
                <input type="hidden" name="changeStatusTo" value={statusMatch[buttonDesc]} />
                <input type="hidden" name="incidentId" value={id} />
                <Textarea name="textarea" placeholder="Введите дополнительную информацию"/>
            </div>
            <Button type="submit">{buttonDesc}</Button>
        </Form>
    </>
  )
}