import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";
import Card from "./Card";
import { items } from "../data/items";

function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = items.find((i) => i.id === parseInt(id));
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!item) return <p>Пункт не знайдено</p>;

  const currentIndex = items.findIndex((i) => i.id === parseInt(id));
  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : items[items.length - 1];
  const nextItem = currentIndex < items.length - 1 ? items[currentIndex + 1] : items[0];
  const otherItems = items.filter((i) => i.id !== parseInt(id));

  const slides = [];
  if (item.description) {
    slides.push({
      type: "description",
      title: "Опис",
      content: item.description,
    });
  }
  if (item.connection) {
    slides.push({
      type: "connection",
      title: "Чому це важливо для мене",
      content: item.connection,
    });
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="item-page-container">
      <div className="item-page-navigation">
        <button
          className="item-page-back-button"
          onClick={() => navigate(-1)}
        >
          ← Назад
        </button>
        <button
          className="item-page-home-button"
          onClick={() => navigate("/")}
        >
          🏠 Головне меню
        </button>
      </div>

      <div className="item-page-layout">
        <div className="item-page-sidebar left">
          <h3 className="item-page-sidebar-title">Попередній</h3>
          <Card 
            item={prevItem} 
            onClick={() => navigate(`/item/${prevItem.id}`)} 
          />
        </div>

        <div className="item-page-content">
        <img
          src={item.image}
          alt={item.title}
          className="item-page-image"
        />
        <h2 className="item-page-title">{item.title}</h2>
        {item.author && <p className="item-page-info"><strong>Автор:</strong> {item.author}</p>}
        <p className="item-page-info"><strong>Стиль/Інформація:</strong> {item.style}</p>
        <p className="item-page-info"><strong>Особисті риси:</strong> {item.personality}</p>
        {item.culturalPeriod && (
          <div className="item-page-cultural-info">
            <h3 className="item-page-cultural-title">Культурний період / Стиль</h3>
            <p className="item-page-cultural-text">{item.culturalPeriod}</p>
          </div>
        )}
        {item.personalityTraits && (
          <div className="item-page-traits-info">
            <h3 className="item-page-traits-title">Риси особистості, які перегукуються</h3>
            <p className="item-page-traits-text">{item.personalityTraits}</p>
          </div>
        )}
        
        {slides.length > 0 && (
          <div className="item-page-slider">
            <div 
              className="item-page-slider-wrapper"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`item-page-slide ${index === currentSlide ? "active" : ""}`}
                >
                  <div className={slide.type === "description" ? "item-page-description" : "item-page-connection"}>
                    <h3 className={slide.type === "description" ? "item-page-description-title" : "item-page-connection-title"}>
                      {slide.title}
                    </h3>
                    <p className={slide.type === "description" ? "item-page-description-text" : "item-page-connection-text"}>
                      {slide.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {slides.length > 1 && (
              <div className="item-page-slider-controls">
                <div className="item-page-slider-dots">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      className={`item-page-slider-dot ${index === currentSlide ? "active" : ""}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Перейти до слайду ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="item-page-slider-buttons">
                  <button className="item-page-slider-button prev" onClick={prevSlide} aria-label="Попередній слайд">
                    ‹ Попередній
                  </button>
                  <button className="item-page-slider-button next" onClick={nextSlide} aria-label="Наступний слайд">
                    Наступний ›
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {item.audio && <MusicPlayer src={item.audio} />}
        </div>

        <div className="item-page-sidebar right">
          <h3 className="item-page-sidebar-title">Наступний</h3>
          <Card 
            item={nextItem} 
            onClick={() => navigate(`/item/${nextItem.id}`)} 
          />
          <div className="item-page-all-items">
            <h4 className="item-page-all-items-title">Всі елементи</h4>
            <div className="item-page-all-items-grid">
              {otherItems.slice(0, 3).map((otherItem) => (
                <div
                  key={otherItem.id}
                  className="item-page-mini-card"
                  onClick={() => navigate(`/item/${otherItem.id}`)}
                >
                  <img
                    src={otherItem.image}
                    alt={otherItem.title}
                    className="item-page-mini-card-image"
                  />
                  <p className="item-page-mini-card-title">{otherItem.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
