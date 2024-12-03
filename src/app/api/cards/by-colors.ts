import { NextApiRequest, NextApiResponse } from "next";
import { DataSource } from "typeorm";
import dataSourceOptions from "@/database/DataSourceOptions";
import { CardRepository } from "@/database/repository/CardRepository";

const AppDataSource = new DataSource(dataSourceOptions);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { color } = req.query;

    if (!color || typeof color !== "string") {
      return res.status(400).json({ error: "Color parameter is required and must be a string." });
    }

    try {
      // Vérifie si la DataSource est déjà initialisée
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }

      // Crée une instance du repository avec la DataSource initialisée
      const cardRepository = new CardRepository(AppDataSource);

      const cards = await cardRepository.findByColor(color);
      return res.status(200).json(cards);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while fetching cards." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}
