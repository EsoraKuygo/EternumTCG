"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

interface CarouselItem {
  image: string; // URL de l'image
  text: string; // Texte à afficher
}

interface CarouselProps {
  items: CarouselItem[]; // Liste des éléments du carousel
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + items.length) % items.length 
    );
  };

  return (
    <div className="carousel">
      <button className="prev" onClick={handlePrev}>
        ←
      </button>
      <div className="carousel-content">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === currentIndex ? "active" : "inactive"
            }`}
          >
            <div className="carousel-inner">
              <img src={item.image} alt={`Slide ${index}`} />
              <div className="carousel-text">
                <p>{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="next" onClick={handleNext}>
        →
      </button>
      <style jsx>{`
        .carousel {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          overflow: hidden;
          background-color: #f5f5f5; /* <--- Couleur de fond */
        }
        .carousel-content {
          display: flex;
          transform: translateX(-${currentIndex * 100}%);
          transition: transform 0.5s ease-in-out;
          width: 100%;
        }
        .carousel-item {
          display: flex;
          flex: 0 0 100%;
          max-width: 100%;
          align-items: center;
          justify-content: center;
          text-align: left;
        }
        .carousel-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 80%; /* Largeur du contenu */
          gap: 2rem;
        }
        img {
          width: 25%; /* Taille de l'image */
          height: auto;
          object-fit: cover;
          border-radius: 8px;
        }
        .carousel-text {
          width: 50%;
          color: #333; /* Couleur du texte */
          font-size: 1.2rem;
          line-height: 1.5;
        }
        button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          z-index: 10;
        }
        .prev {
          left: 0;
        }
        .next {
          right: 0;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
