import { NextResponse } from "next/server";
import Connection from "@/database/Connection";
import { CardRepository } from "@/database/repository/CardRepository";

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const color = url.searchParams.get("color");

  if (!color) {
    return NextResponse.json(
      { error: "Color parameter is required." },
      { status: 400 }
    );
  }

  try {
    const connection = await Connection.getInstance();
    const dataSource = connection.getDataSource();
    const cardRepository = new CardRepository(dataSource);

    const cards = await cardRepository.findByColor(color);

    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching cards." },
      { status: 500 }
    );
  }
}
