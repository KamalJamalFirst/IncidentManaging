"use client"

import { MoreHorizontal } from "lucide-react"
 
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

import type { ColumnDef } from "@tanstack/react-table"
import { AddInfo } from "./addInfo"
import { createPortal } from "react-dom"
import type { Incident } from "~/models/types"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "~/helpers/store"
import { changeStateCompleted } from "~/helpers/modalCompletedSlice"
import { changeStateCancelled } from "~/helpers/modalCancelledSlice"
import { Form } from "react-router"



export const columns: ColumnDef<Incident>[] = [
    {
        accessorKey: "id",
        header: "ID",
      },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "created",
      header: "Created",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const completed = useSelector((state: RootState) => state.completed.value);
            const cancelled = useSelector((state: RootState) => state.cancelled.value);
            const dispatch = useDispatch();
            const rowInfo = row.original
            //console.log(rowInfo)
        
            return (
                (rowInfo.status === "Завершен" || rowInfo.status === "Отменен") 
                ? null
                : (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                            {
                                (rowInfo.status === "Новый") 
                                ? (
                                    <>
                                        <DropdownMenuItem id={rowInfo.id}>
                                            <Form method="put">
                                                <input type="hidden" name="changeStatusTo" value="В работе" />
                                                <input type="hidden" name="incidentId" value={rowInfo.id} />
                                                <Button className="w-full" type="submit" name='action' value='inNewToWork'>Взять в работу</Button>
                                            </Form>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem id={rowInfo.id}>
                                            <Button className="w-full" onClick={() => dispatch(changeStateCompleted())} type="submit">Завершить</Button>
                                        </DropdownMenuItem>
                                        
                                        <DropdownMenuItem id={rowInfo.id}>
                                            <Button className="w-full" onClick={() => dispatch(changeStateCancelled())} type="submit">Отменить</Button>
                                        </DropdownMenuItem>
                                    </>
                                )
                                : ((rowInfo.status === "В работе") 
                                    ? (
                                        <>
                                            <DropdownMenuItem id={rowInfo.id} >
                                                <Button className="w-full" onClick={() => dispatch(changeStateCompleted())} type="submit">Завершить</Button>
                                            </DropdownMenuItem>
                                            
                                            <DropdownMenuItem id={rowInfo.id}>
                                                <Button className="w-full" onClick={() => dispatch(changeStateCancelled())} type="submit">Отменить</Button>
                                            </DropdownMenuItem>
                                        </>
                                    )
                                    : null
                                )
                            }
                            <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {completed && createPortal(<AddInfo id={rowInfo.id} dispatch={dispatch} buttonDesc="Завершить" />, document.getElementById('test-task')!)}
                        {cancelled && createPortal(<AddInfo id={rowInfo.id} dispatch={dispatch} buttonDesc="Отменить" />, document.getElementById('test-task')!)}
                    </>
                )
                
            
            )
        },
    },
      // ...
  ]