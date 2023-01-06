import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity()
export class Address {
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    landmark:string

    @Column()
    lat:number

    @Column()
    long:number

    @Column()
    pincode:number

    @OneToOne(() => Order, order => order.address)
    order:Order
}