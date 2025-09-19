import { Button } from "../components/ui/button"
import { Form } from "react-router"
import { Textarea } from "~/components/ui/textarea"
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { changeStateCompleted } from "~/helpers/modalCompletedSlice"
import { changeStateCancelled } from "~/helpers/modalCancelledSlice"



const statusMatch = {
    "Завершить" : "Завершен",
    "Отменить": "Отменен"
}


// REFACTOR
export function AddInfo({ buttonDesc, id, dispatch }: {buttonDesc: "Завершить" | "Отменить", id: string, dispatch: Dispatch<UnknownAction>}) {
  return (
    <>
        <div className='add-info'></div>
        <Form method="put" className="className='add-info-form' bg-white w-2xl min-h-30 p-2 rounded-lg flex flex-col gap-4" onSubmit={() => {
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