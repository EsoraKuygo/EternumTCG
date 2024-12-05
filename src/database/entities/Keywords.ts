import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { CardEntity } from './CardEntity';

@Entity('keywords') // Nom de la table dans ta BDD
export class Keyword {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => CardEntity, (CardEntity) => CardEntity.keywords) // Relation avec Carte
  cards!: CardEntity[];
}
