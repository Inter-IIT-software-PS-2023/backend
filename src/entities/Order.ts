import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { Cluster } from "./Cluster";
import { Item } from "./Item";

@Entity()
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column()
    status!: string;

    @OneToOne(() => Address, (address) => address.order)
    @JoinColumn()
    address!: Address;

    @OneToOne(() => Item)
    @JoinColumn()
    item!: Item;

    @ManyToOne(() => Cluster, (cluster) => cluster.orders)
    @JoinTable()
    cluster!: Cluster;
}
