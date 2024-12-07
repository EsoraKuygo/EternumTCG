import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Middleware pour sécuriser les requêtes d'images
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Vérifie si la requête est pour les images
  if (url.pathname.startsWith("/api/images")) {
    const imageName = url.pathname.replace("/api/images/", "");
    
    // Vérifie si l'utilisateur est authentifié (exemple simple avec header)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || authHeader !== "Bearer your-token") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    try {
      // Vérifie si le fichier existe
      const filePath = path.join(process.cwd(), "src", "assets", "images", imageName);
      const file = await fs.readFile(filePath);

      // Renvoie l'image avec le bon type MIME
      return new NextResponse(file, {
        headers: {
          "Content-Type": "image/png",
        },
      });
    } catch (error) {
      console.error("Error reading file:", error);
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }
  }

  // Continuer pour les autres routes
  return NextResponse.next();
}
