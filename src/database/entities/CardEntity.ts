import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "cards" })
export class CardEntity {
  @PrimaryColumn({ type: "varchar" })
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "int", nullable: false })
  mana_cost!: number;

  @Column({ type: "varchar", nullable: false })
  type_id!: number;

  @Column({ type: "varchar", nullable: false })
  rarity_id!: number;

  @Column({ type: "varchar", nullable: false })
  img!: string;

  @Column({ type: "varchar", nullable: true })
  rulesText?: string;

  @Column({ type: "varchar", nullable: true })
  flavorText?: string;

  @Column({ type: "int", nullable: true })
  power?: number;

  @Column({ type: "int", nullable: true })
  defense?: number;

  @Column({ type: "varchar", nullable: true })
  loyalty?: number | null | undefined;

  @Column({ type: "varchar", nullable: true })
  cap_1?: string| null | undefined;

  @Column({ type: "varchar", nullable: true })
  cap_2?: string| null | undefined;

  @Column({ type: "varchar", nullable: true })
  cap_3?: string| null | undefined;

  constructor(card?: Partial<CardEntity>) {
    if (card) {
      Object.assign(this, card);
    }
  }
}
