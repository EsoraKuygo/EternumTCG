import { NextResponse } from "next/server";
import Connection from "@/database/Connection";
import { CardRepository } from "@/database/repository/CardRepository";

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const partialName = url.searchParams.get("name"); // Récupération du paramètre "name"
  const type = url.searchParams.get("type"); // Récupérer le type, s'il existe

  if (!partialName) {
    return NextResponse.json(
      { error: "Name parameter is required." },
      { status: 400 }
    );
  }

  try {
    const connection = await Connection.getInstance();
    const dataSource = connection.getDataSource();
    const cardRepository = new CardRepository(dataSource);

    // Recherche par type en plus de la recherche par nom
    let cards;
    if (type) {
      const typeId = parseInt(type, 10);
      if (isNaN(typeId)) {
        return NextResponse.json(
          { error: "Type parameter must be a valid number." },
          { status: 400 }
        );
      }
      // Recherche par nom et type
      cards = await cardRepository.findByPartialNameAndType(partialName, typeId);
    } else {
      // Recherche normale par nom uniquement
      cards = await cardRepository.findByPartialName(partialName);
    }

    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching cards." },
      { status: 500 }
    );
  }
}
