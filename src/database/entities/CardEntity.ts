import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "cards" })
export class CardEntity {
  @PrimaryColumn({ type: "varchar" })
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "varchar", nullable: false, array: true })
  color!: string[];

  @Column({ type: "int", nullable: false })
  cost!: number;

  @Column({ type: "varchar", nullable: false })
  type!: string;

  @Column({ type: "varchar", nullable: true })
  supertype!: string;

  @Column({ type: "varchar", nullable: false })
  rarity!: string;

  @Column({ type: "varchar", nullable: false })
  img!: string;

  @Column({ type: "varchar", nullable: true, array: true })
  keywords?: string[];

  @Column({ type: "varchar", nullable: true })
  rulesText?: string;

  @Column({ type: "varchar", nullable: true })
  flavorText?: string;

  @Column({ type: "int", nullable: true })
  loyalty?: number | null | undefined;

  @Column({ type: "int", nullable: true })
  power?: number;

  @Column({ type: "int", nullable: true })
  defense?: number;

  constructor(card?: Partial<CardEntity>) {
    if (card) {
      Object.assign(this, card);
    }
  }
}
