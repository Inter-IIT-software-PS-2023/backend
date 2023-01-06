import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cluster } from "./Cluster";

@Entity()
export class Rider {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column()
    mobile_number!: number

    @OneToOne(() => Cluster, cluster => cluster.rider)
    cluster!: Cluster

}