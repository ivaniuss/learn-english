import { useState } from 'react';
import tensesData from '../data/tenses.json';
import './TensesExplorer.css';

export default function TensesExplorer() {
  const [selectedTense, setSelectedTense] = useState(null);

  // Helper to map columns and rows
  const times = ['Past', 'Present', 'Future'];
  const aspects = ['Simple', 'Continuous', 'Perfect', 'Perfect Continuous'];

  // Match tense data to aspect and time
  const getTense = (aspect, time) => {
    const searchId = `${time.toLowerCase()}-${aspect.toLowerCase().replace(' ', '-')}`;
    return tensesData.find(t => t.id === searchId || t.id.replace('-simple', '') === searchId);
  };

  const handleCellClick = (tense) => {
    if (tense) {
      setSelectedTense(tense);
    }
  };

  return (
    <div className="tenses-explorer animate-fade-in">
      <div className="section-header">
        <h2>English Tenses Matrix</h2>
        <p>Haz clic en cualquier celda para explorar la estructura, usos y errores comunes en detalle.</p>
      </div>

      <div className="matrix-container glass-panel">
        <div className="matrix-grid">
          {/* Header Row */}
          <div className="grid-header-corner"></div>
          {times.map(time => (
            <div key={time} className="grid-header-col">
              {time}
            </div>
          ))}

          {/* Aspects and Cells */}
          {aspects.map(aspect => (
            <div key={aspect} className="grid-row-container">
              <div className="grid-header-row">{aspect}</div>
              {times.map(time => {
                const tense = getTense(aspect, time);
                const isSelected = selectedTense?.id === tense?.id;
                return (
                  <button
                    key={`${aspect}-${time}`}
                    className={`matrix-cell ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleCellClick(tense)}
                  >
                    <div className="cell-tense-name">{tense?.name}</div>
                    <div className="cell-tense-formula">{tense?.formula.split('(')[0]}</div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {selectedTense ? (
        <div className="tense-detail-card glass-panel animate-fade-in">
          <div className="detail-header">
            <div>
              <h3>{selectedTense.name}</h3>
              <div className="formula-badge">
                <code>{selectedTense.formula}</code>
              </div>
            </div>
            <button className="close-btn" onClick={() => setSelectedTense(null)}>×</button>
          </div>

          <div className="detail-grid">
            <div className="detail-section">
              <h4>Usos principales</h4>
              <ul className="uses-list">
                {selectedTense.uses.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>

              <div className="examples-block">
                <h4>Ejemplos</h4>
                <div className="example-item">
                  <span className="example-label positive">Afirmativo</span>
                  <p>{selectedTense.examples.positive}</p>
                </div>
                <div className="example-item">
                  <span className="example-label negative">Negativo</span>
                  <p>{selectedTense.examples.negative}</p>
                </div>
                <div className="example-item">
                  <span className="example-label question">Pregunta</span>
                  <p>{selectedTense.examples.question}</p>
                </div>
              </div>
            </div>

            <div className="detail-section border-left">
              <h4>Errores comunes & Consejos</h4>
              <div className="mistakes-container">
                {selectedTense.mistakes && selectedTense.mistakes.length > 0 ? (
                  selectedTense.mistakes.map((m, index) => (
                    <div key={index} className="mistake-card">
                      <div className="incorrect-box">
                        <span className="badge-error">Incorrecto ❌</span>
                        <p>{m.incorrect}</p>
                      </div>
                      <div className="correct-box">
                        <span className="badge-success">Correcto o Consejo ✅</span>
                        <p>{m.correct}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="perfect-notice">
                    <p>¡Practica la estructura básica y la concordancia sujeto-verbo para dominar este tiempo sin problemas!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-detail-state glass-panel">
          <div className="empty-icon">💡</div>
          <p>Selecciona un tiempo en la matriz de arriba para ver fórmulas, consejos y evitar los errores más comunes.</p>
        </div>
      )}
    </div>
  );
}
