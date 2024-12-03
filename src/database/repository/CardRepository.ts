import { DataSource, Repository, Like } from "typeorm";
import { CardEntity } from "../entities/CardEntity";

export class CardRepository {
  private repository: Repository<CardEntity>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(CardEntity);
  }

  /**
   * Récupère toutes les cartes.
   * @returns Liste des cartes.
   */
  async findAll(): Promise<CardEntity[]> {
    return this.repository.find();
  }

  // /**
  //  * Récupère toutes les cartes en fonction de leur couleur.
  //  * @param color - Couleur des cartes.
  //  * @returns Liste des cartes filtrées.
  //  */
  // async findByColor(color: string): Promise<CardEntity[]> {
  //   return this.repository.find({ where: { color } });
  // }

  // /**
  //  * Récupère toutes les cartes en fonction de leur type.
  //  * @param type - Type des cartes.
  //  * @returns Liste des cartes filtrées.
  //  */
  // async findByType(type: string): Promise<CardEntity[]> {
  //   return this.repository.find({ where: { type } });
  // }

  /**
   * Recherche les cartes dont le nom contient partiellement la chaîne donnée.
   * @param partialName - Partie du nom de la carte.
   * @returns Liste des cartes correspondantes.
   */
  async findByPartialName(partialName: string): Promise<CardEntity[]> {
    return this.repository.find({
      where: { name: Like(`${partialName}%`) }, // Recherche par préfixe (commence par)
    });
  }
}
