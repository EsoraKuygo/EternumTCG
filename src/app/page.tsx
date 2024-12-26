import Carousel from "./component/carousel";

export default function Home() {
  const items = [
    {
      image: "/img/chibiAlex.png",
      text: "There is the alex deck ! A deck that focus on polymorph creature ! The more you control, the better they become !",
    },
    {
      image: "/img/chibiLuna.png",
      text: "A luna deck? focusing on horror and knowing your cards in advance ? really ? yes.",
    },
    {
      image: "/img/chibiNova.png",
      text: "is this a nova deck that even i still dont know how it will work ? yeah. it is.",
    },
  ];

  return (
    <div>
      <h1>Preconstructed decks</h1>
      <Carousel items={items} />
    </div>
  );
}
