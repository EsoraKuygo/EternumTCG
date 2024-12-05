import { DataSource, Repository, ILike } from "typeorm";
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

/**
 *
 * recherche les cartes par couleur
 * @param {string} colorName
 * @return {*}  {Promise<CardEntity[]>}
 * @memberof CardRepository
 */
async findByColor(colorName: string): Promise<CardEntity[]> {
    return this.repository
      .createQueryBuilder('card')
      .innerJoinAndSelect('card.colors', 'color') // Jointure avec la table Color
      .where('color.name = :colorName', { colorName }) // Filtrer par nom de couleur
      .getMany();
  }

/**
 * Récupère toutes les cartes en fonction de leur type.
 * @param typeId - Identifiant du type des cartes.
 * @returns Liste des cartes filtrées.
 */
async findByType(typeId: number): Promise<CardEntity[]> {
  return this.repository.find({ where: { type_id: typeId } });
}

/**
 *
 *
 * @param {string} keywordName
 * @return {*}  {Promise<CardEntity[]>}
 * @memberof CardRepository
 */
async findByKeyWord(keywordName: string): Promise<CardEntity[]> {
  return this.repository
    .createQueryBuilder('card')
    .innerJoinAndSelect('card.keywords', 'keywords') // Jointure avec la table keyword
    .where('keywords.name = :keywordName', { keywordName }) // Filtrer par nom de couleur
    .getMany();
}


/**
 * Recherche les cartes dont le nom contient partiellement la chaîne donnée.
 * @param partialName - Partie du nom de la carte.
 * @returns Liste des cartes correspondantes.
 */
async findByPartialName(partialName: string): Promise<CardEntity[]> {
  return this.repository.find({
    where: { name: ILike(`%${partialName}%`) }, // Insensible à la casse
  });
}
}