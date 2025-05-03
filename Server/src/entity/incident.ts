import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Incident {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status: "Новый" | "В работе" | "Завершен" | "Отменен"

    @Column()
    created: string

    @Column()
    title: string

    @Column()
    description: string
}
