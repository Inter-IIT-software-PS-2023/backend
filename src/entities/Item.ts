import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  qr_code!: string;

  @Column()
  dead_weight!: number;

  @Column()
  volumetric_weight!: number;

  @Column()
  dimension_x!: number;

  @Column()
  dimension_y!: number;

  @Column()
  dimension_z!: number;

  @OneToOne(() => Order, (order) => order.item)
  order!: Order;
}
