import Connection from "@/database/Connection";
import { CardRepository } from "@/database/repository/CardRepository";


export async function GET(): Promise<Response> {
    try {
      const connection = await Connection.getInstance();
      const dataSource = connection.getDataSource();
      const logRepo = new CardRepository(dataSource);
  
      // Récupération des cards depuis la base de données
      const cards= await logRepo.findAll();
  
      // Retourne les logs en format JSON
      return new Response(JSON.stringify(cards), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e) {
      console.error('Error fetching cards:', e);
      return new Response("Error fetching cards", { status: 500 });
    }
}