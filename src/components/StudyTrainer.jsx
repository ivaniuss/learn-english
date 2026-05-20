import { useState, useEffect } from 'react';
import studyCardsData from '../data/studyCards.json';
import './StudyTrainer.css';

export default function StudyTrainer() {
  const [selectedCategory, setSelectedCategory] = useState(studyCardsData[0].category);
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Load category deck
  useEffect(() => {
    const activeDeck = studyCardsData.find(cat => cat.category === selectedCategory);
    if (activeDeck) {
      setDeck(activeDeck.cards);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [selectedCategory]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (e) => {
    e.stopPropagation(); // Avoid flipping the card when clicking control button
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % deck.length);
    }, 150);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + deck.length) % deck.length);
    }, 150);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const shuffled = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffled);
      setCurrentIndex(0);
    }, 150);
  };

  const currentCard = deck[currentIndex];

  return (
    <div className="study-trainer animate-fade-in">
      <div className="section-header">
        <h2>Interactive Study Flashcards</h2>
        <p>Practica trabalenguas complejos, domina palabras confusas y erradica errores de traducción comunes haciendo clic en las tarjetas.</p>
      </div>

      {/* Category Selection buttons */}
      <div className="category-tabs">
        {studyCardsData.map(cat => (
          <button
            key={cat.category}
            className={`cat-tab-btn ${selectedCategory === cat.category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.category)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Card Deck Trainer */}
      {currentCard && (
        <div className="trainer-workspace">
          <div className="flashcard-container" onClick={handleFlip}>
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
              
              {/* Front side of Card */}
              <div className="card-face card-front glass-panel">
                <div className="card-badge">Pregunta / Desafío</div>
                <div className="card-content-front">
                  <h3>{currentCard.front}</h3>
                </div>
                <div className="click-hint">Haz clic en la tarjeta para voltear 🔄</div>
              </div>

              {/* Back side of Card */}
              <div className="card-face card-back glass-panel">
                <div className="card-badge success">Respuesta / Explicación</div>
                <div className="card-content-back">
                  <div className="back-text-formatted">
                    {currentCard.back.split('\n').map((paragraph, index) => {
                      if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
                        return <li key={index} className="back-list-item">{paragraph.replace(/[•-]\s*/, '')}</li>;
                      }
                      // Handle markdown-like bold inside text
                      if (paragraph.includes('**')) {
                        const parts = paragraph.split('**');
                        return (
                          <p key={index} className="back-para">
                            {parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
                          </p>
                        );
                      }
                      return paragraph.trim() ? <p key={index} className="back-para">{paragraph}</p> : <div key={index} className="back-space" />;
                    })}
                  </div>
                  {currentCard.tip && (
                    <div className="card-tip-box">
                      <strong>💡 Consejo:</strong> {currentCard.tip}
                    </div>
                  )}
                </div>
                <div className="click-hint">Haz clic de nuevo para volver 🔄</div>
              </div>

            </div>
          </div>

          {/* Controls */}
          <div className="trainer-controls">
            <button className="control-btn btn-nav" onClick={handlePrev}>
              ◀ Anterior
            </button>
            <div className="deck-progress-indicator">
              <span>Tarjeta {currentIndex + 1} de {deck.length}</span>
              <div className="dot-indicators">
                {deck.map((_, i) => (
                  <span
                    key={i}
                    className={`indicator-dot ${i === currentIndex ? 'active' : ''}`}
                    onClick={() => {
                      setIsFlipped(false);
                      setTimeout(() => setCurrentIndex(i), 150);
                    }}
                  />
                ))}
              </div>
            </div>
            <button className="control-btn btn-nav" onClick={handleNext}>
              Siguiente ▶
            </button>
          </div>

          <div className="utility-buttons">
            <button className="btn-secondary shuffle-btn" onClick={handleShuffle}>
              🔀 Mezclar baraja
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
