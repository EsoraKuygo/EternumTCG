/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

interface Card {
  id: number;
  name: string;
  mana_cost: string;
  type: string;
  rarity: string;
  img: string; // Lien direct vers l'image
  rules_text: string;
  flavor_text: string;
  attack?: number;
  defense?: number;
  loyalty?: number;
}

export default function HomePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchCards = async (name: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/by-partial?name=${name}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: Card[] = await response.json();
      setCards(data);
      console.log(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() !== "") {
      fetchCards(search);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Card Library</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search cards by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />
        <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Affichage de l'image directement via le lien reçu */}
            <img
              src={card.img} // Utilisation directe du lien de l'image
              alt={card.name}
              style={{ maxWidth: "300%", maxHeight: "300px", marginBottom: "10px" }}
            />
            <h3>{card.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
