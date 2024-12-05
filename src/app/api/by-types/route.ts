import { NextResponse } from "next/server";
import Connection from "@/database/Connection";
import { CardRepository } from "@/database/repository/CardRepository";

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const type = url.searchParams.get("type"); // Correction : Utilisation du bon paramètre

  if (!type) {
    return NextResponse.json(
      { error: "Type parameter is required." },
      { status: 400 }
    );
  }

  try {
    const connection = await Connection.getInstance();
    const dataSource = connection.getDataSource();
    const cardRepository = new CardRepository(dataSource);

    // Utilisation de la méthode pour rechercher les cartes par type
    const typeId = parseInt(type, 10);
    if (isNaN(typeId)) {
      return NextResponse.json(
        { error: "Type parameter must be a valid number." },
        { status: 400 }
      );
    }
    const cards = await cardRepository.findByType(typeId);

    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching cards." },
      { status: 500 }
    );
  }
}
