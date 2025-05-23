import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import type { CSSProperties } from "react"
import type { NewIncident } from "~/models/types"
import { Form } from "react-router"
import { Textarea } from "~/components/ui/textarea"
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { changeNewIncidentState } from "~/helpers/modalNewIncidentSlice"

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

export function NewIncident({ dispatch }: {dispatch: Dispatch<UnknownAction>}) {
    console.log("we are trying to render newIncident component")
  return (
    <>
        <div style={overlay}></div>
        <Form method="post" className="bg-white w-2xl min-h-46 p-2 rounded-lg flex flex-col gap-4" style={form} onSubmit={() => dispatch(changeNewIncidentState())}>
            <div className="flex flex-col gap-2 ">
                <Input name="title" placeholder="Введите тему обращения" required/>
                <Textarea name="description" placeholder="Введите текст обращения" required/>
            </div>
            <Button type="submit">Создать</Button>
        </Form>
    </>
  )
}