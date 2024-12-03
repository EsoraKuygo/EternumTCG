import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Color } from "./Color";

@Entity({ name: "cards" })
export class CardEntity {
  @PrimaryColumn({ type: "varchar" })
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "int", nullable: false })
  mana_cost!: number;

  @Column({ type: "int", nullable: false })
  type_id!: number;

  @Column({ type: "int", nullable: false })
  rarity_id!: number;

  @Column({ type: "varchar", nullable: false })
  img!: string;

  @Column({ type: "varchar", nullable: true })
  rules_text?: string;

  @Column({ type: "varchar", nullable: true })
  flavor_text?: string;

  @Column({ type: "int", nullable: true })
  attack?: number;

  @Column({ type: "int", nullable: true })
  defense?: number;

  @Column({ type: "int", nullable: true })
  loyalty?: number | null | undefined;

  @Column({ type: "varchar", nullable: true })
  cap_1?: string| null | undefined;

  @Column({ type: "varchar", nullable: true })
  cap_2?: string| null | undefined;

  @Column({ type: "varchar", nullable: true })
  cap_3?: string| null | undefined;

  @ManyToMany(() => Color, (color) => color.cards) // Relation avec l'entité Color
  @JoinTable({ // Définition de la table de jointure
    name: 'card_colors', // Nom de la table de jointure
    joinColumn: { name: 'card_id', referencedColumnName: 'id' }, // Colonne correspondant à la carte
    inverseJoinColumn: { name: 'color_id', referencedColumnName: 'id' }, // Colonne correspondant à la couleur
  })
  colors!: Color[];


  constructor(card?: Partial<CardEntity>) {
    if (card) {
      Object.assign(this, card);
    }
  }
}
