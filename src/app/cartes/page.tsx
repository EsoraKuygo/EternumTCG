/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

interface Card {
  id: number;
  name: string;
  mana_cost: string;
  type: string;
  rarity: string;
  img: string;
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
    const [isKeywordSearch, setIsKeywordSearch] = useState(false);
    const toggleKeywordSearch = () => setIsKeywordSearch((prev) => !prev);

  // Nouvel état pour les filtres
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const fetchCards = async (endpoint: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data: Card[] = await response.json();
      setCards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByType = (typeId: number) => {
    setSelectedType(typeId); // Stocker le type sélectionné
    console.log(typeId);
    fetchCards(`/api/by-types?type=${typeId}`); // Requête initiale pour charger les cartes de ce type
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      // Inclure le filtre par type dans l'URL
      const typeFilter = selectedType !== null ? `&type=${selectedType}` : "";
      const endpoint = isKeywordSearch
        ? `/api/by-keywords?keywords=${search}${typeFilter}` // Recherche par mots-clés
        : `/api/by-partial?name=${search}${typeFilter}`; // Recherche par nom
      fetchCards(endpoint);
    }
  };
 
  const handleFilterByColor = (color: string) => fetchCards(`/api/by-colors?color=${color}`);

  const rendereButton = (color: string, style: object) => (
    <button
      key={color}
      onClick={() => handleFilterByColor(color)}
      style={{ ...style, cursor: "pointer", borderRadius: "50%", width: "40px", height: "40px" }}
      title={`Filter by ${color.charAt(0).toUpperCase() + color.slice(1)} Cards`}
    ></button>
  );

  const renderButton = (label: string, onClick: () => void, style: object) => (
    <button
      key={label}
      onClick={onClick}
      style={{
        ...style,
        cursor: "pointer",
        borderRadius: "8px",
        padding: "10px",
        fontSize: "14px",
        marginRight: "10px",
      }}
    >
      {label}
    </button>
  );

  // Liste des types avec leurs IDs
  const cardTypes = [
    { id: 1, label: "Creature" },
    { id: 2, label: "Sorcery" },
    { id: 3, label: "Enchantment" },
    { id: 4, label: "Artifact" },
    { id: 5, label: "Instant " },
    { id: 6, label: "Planeswalker" },
    { id: 7, label: "Legendary Creature" },
  ];

  return (
    <div>
      
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Card Library</h1>

      {/* Boutons pour filtrer par type */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {cardTypes.map((type) =>
          renderButton(
            `${type.label}`,
            () => handleFilterByType(type.id),
            {
              backgroundColor: selectedType === type.id ? "#007BFF" : "#ddd",
              color: selectedType === type.id ? "white" : "black",
            }
          )
        )}
      </div>
        
        {/* Boutons pour filtrer par couleur */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["red", "black", "blue", "white"].map((color) =>
          rendereButton(color, { backgroundColor: color === "white" ? "white" : color, border: color === "white" ? "1px solid grey" : "none" })
        )}
      </div>

      {/* Bouton pour activer/désactiver la recherche par mots-clés */}
      <button
        onClick={toggleKeywordSearch}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: isKeywordSearch ? "#4caf50" : "#f44336",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isKeywordSearch ? "Search by Keywords (Active)" : "Switch to Keyword Search"}
      </button>

      {/* Formulaire de recherche */}
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder={
            isKeywordSearch ? "Search cards by keywords" : "Search cards by name"
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Affichage des cartes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={card.img}
              alt={card.name}
              style={{ maxWidth: "300%", maxHeight: "300px", marginBottom: "5px" }}
            />
            <h3>{card.name}</h3>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
