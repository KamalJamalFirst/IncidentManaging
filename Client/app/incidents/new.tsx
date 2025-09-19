import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import type { CSSProperties } from "react"
import type { NewIncident } from "~/models/types"
import { Form } from "react-router"
import { Textarea } from "~/components/ui/textarea"
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { changeNewIncidentState } from "~/helpers/modalNewIncidentSlice"


// REFACTOR
export function NewIncident({ dispatch }: {dispatch: Dispatch<UnknownAction>}) {
  return (
    <>
        <div className='new-incident'></div>
        <Form method="post" className="new-incident-form bg-white w-2xl min-h-46 p-2 rounded-lg flex flex-col gap-4" onSubmit={() => dispatch(changeNewIncidentState())}>
            <div className="flex flex-col gap-2 ">
                <Input name="title" placeholder="Введите тему обращения" required/>
                <Textarea name="description" placeholder="Введите текст обращения" required/>
            </div>
            <Button type="submit">Создать</Button>
        </Form>
    </>
  )
}