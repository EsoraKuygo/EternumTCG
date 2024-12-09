import Carousel from "./component/carousel";

export default function Home() {
  const items = [
    {
      image: "/img/chibiAlex.png",
      text: "Ceci est la description de la première image.",
    },
    {
      image: "/img/chibiLuna.png",
      text: "Voici un texte pour accompagner la seconde image.",
    },
    {
      image: "/img/chibiNova.png",
      text: "Description pour la troisième image ici.",
    },
  ];

  return (
    <div>
      <h1>Preconstructed decks</h1>
      <Carousel items={items} />
    </div>
  );
}
