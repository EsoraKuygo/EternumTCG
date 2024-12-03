import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { CardEntity } from './CardEntity';

@Entity('color') // Nom de la table dans ta BDD
export class Color {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => CardEntity, (CardEntity) => CardEntity.colors) // Relation avec Carte
  cards!: CardEntity[];
}
