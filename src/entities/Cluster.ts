import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { Rider } from "./Rider";

@Entity()
export class Cluster {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToOne(() => Rider, rider => rider.cluster)
    @JoinColumn()
    rider: Rider

    @OneToMany(() => Order, order => order.cluster)
    @JoinTable()
    orders: Order[]
}