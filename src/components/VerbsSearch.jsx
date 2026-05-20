import { useState } from 'react';
import verbsData from '../data/verbs.json';
import './VerbsSearch.css';

export default function VerbsSearch() {
  const [activeTab, setActiveTab] = useState('irregular'); // 'irregular' or 'phrasal'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPattern, setSelectedPattern] = useState('all');

  const { irregular, phrasal } = verbsData;

  // Pattern descriptors
  const patterns = [
    { id: 'all', name: 'Todos' },
    { id: 'all-same', name: 'Iguales (A-A-A)', desc: 'put - put - put' },
    { id: 'same-past-part', name: 'Pasado/Participle (A-B-B)', desc: 'buy - bought - bought' },
    { id: 'same-inf-part', name: 'Infinitive/Participle (A-B-A)', desc: 'run - ran - run' },
    { id: 'all-different', name: 'Todos diferentes (A-B-C)', desc: 'eat - ate - eaten' }
  ];

  // Filtering logic
  const filteredIrregular = irregular.filter(verb => {
    const matchesSearch = 
      verb.infinitive.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verb.past.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verb.participle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verb.translation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPattern = selectedPattern === 'all' || verb.pattern === selectedPattern;

    return matchesSearch && matchesPattern;
  });

  const filteredPhrasal = phrasal.filter(verb => {
    return (
      verb.verb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verb.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verb.example.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    setSelectedPattern('all');
  };

  return (
    <div className="verbs-search-container animate-fade-in">
      <div className="section-header">
        <h2>Verbs & Phrasal Verbs Explorer</h2>
        <p>Busca verbos irregulares con filtros inteligentes de patrones gramaticales o descubre phrasal verbs cotidianos.</p>
      </div>

      {/* Tabs */}
      <div className="verbs-tabs">
        <button
          className={`tab-btn ${activeTab === 'irregular' ? 'active' : ''}`}
          onClick={() => handleTabChange('irregular')}
        >
          Verbos Irregulares
        </button>
        <button
          className={`tab-btn ${activeTab === 'phrasal' ? 'active' : ''}`}
          onClick={() => handleTabChange('phrasal')}
        >
          Phrasal Verbs Comunes
        </button>
      </div>

      {/* Search and Filters bar */}
      <div className="search-bar-container glass-panel">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder={activeTab === 'irregular' ? "Buscar por infinitivo, pasado, participio o traducción..." : "Buscar phrasal verbs, significados o ejemplos..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>×</button>
          )}
        </div>

        {activeTab === 'irregular' && (
          <div className="pattern-filters">
            <span className="filter-label">Patrones verbales:</span>
            <div className="filter-buttons">
              {patterns.map(pattern => (
                <button
                  key={pattern.id}
                  className={`filter-btn ${selectedPattern === pattern.id ? 'active' : ''}`}
                  onClick={() => setSelectedPattern(pattern.id)}
                  title={pattern.desc}
                >
                  {pattern.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {activeTab === 'irregular' ? (
        <div className="table-responsive glass-panel">
          {filteredIrregular.length > 0 ? (
            <table className="verbs-table">
              <thead>
                <tr>
                  <th>Infinitive (V1)</th>
                  <th>Simple Past (V2)</th>
                  <th>Past Participle (V3)</th>
                  <th>Traducción</th>
                </tr>
              </thead>
              <tbody>
                {filteredIrregular.map((verb, index) => (
                  <tr key={index}>
                    <td className="verb-cell infinitive-col">{verb.infinitive}</td>
                    <td className="verb-cell past-col">{verb.past}</td>
                    <td className="verb-cell participle-col">{verb.participle}</td>
                    <td className="verb-cell translation-col">{verb.translation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <p>No se encontraron verbos irregulares que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="phrasal-grid">
          {filteredPhrasal.length > 0 ? (
            filteredPhrasal.map((verb, index) => (
              <div key={index} className="phrasal-card glass-panel glass-panel-hover">
                <div className="phrasal-badge">Phrasal Verb</div>
                <h3>{verb.verb}</h3>
                <div className="phrasal-meaning">
                  <strong>Significado:</strong> {verb.meaning}
                </div>
                <div className="phrasal-example">
                  <strong>Ejemplo práctico:</strong>
                  <p>"{verb.example}"</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results full-width">
              <p>No se encontraron phrasal verbs que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
