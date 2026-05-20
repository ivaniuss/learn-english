import { useState } from 'react';
import TensesExplorer from './components/TensesExplorer';
import VerbsSearch from './components/VerbsSearch';
import StudyTrainer from './components/StudyTrainer';
import InteractiveWidgets from './components/InteractiveWidgets';
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('tenses');

  const sections = [
    { id: 'tenses', label: 'Matriz de Tiempos', icon: '📊', component: <TensesExplorer /> },
    { id: 'verbs', label: 'Buscador de Verbos', icon: '🔍', component: <VerbsSearch /> },
    { id: 'trainer', label: 'Tarjetas de Estudio', icon: '🎴', component: <StudyTrainer /> },
    { id: 'widgets', label: 'Herramientas Útiles', icon: '⚙️', component: <InteractiveWidgets /> }
  ];

  const activeComponent = sections.find(s => s.id === activeSection)?.component;

  return (
    <div className="app-wrapper">
      {/* Top Decoration Bar */}
      <div className="glow-bar"></div>

      {/* Header section */}
      <header className="app-header">
        <div className="header-badge">English Cheatsheet v2.0</div>
        <h1>Interactive English</h1>
        <p className="header-subtitle">
          Domina la gramática, vocabulario y pronunciación en inglés con herramientas visuales interactivas de primer nivel.
        </p>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-container glass-panel">
        <div className="nav-scroll-wrapper">
          {sections.map(section => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                className={`nav-tab-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="tab-icon">{section.icon}</span>
                <span className="tab-label">{section.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Workspace Section */}
      <main className="workspace-main">
        {activeComponent}
      </main>

      {/* Structured Footer / Resources Section inspired by README.md */}
      <footer className="app-footer glass-panel">
        <div className="footer-title">
          <h4>Recursos Útiles & Referencias</h4>
          <p>Enlaces curados de alta calidad para profundizar en tu aprendizaje.</p>
        </div>
        
        <div className="footer-grid">
          <div className="footer-col">
            <h5>📚 Vocabulario & Materiales</h5>
            <ul>
              <li>
                <a href="https://simple.wikipedia.org/wiki/Wikipedia:Basic_English_combined_wordlist" target="_blank" rel="noreferrer">
                  Combined Wordlist (Wikipedia)
                </a>
              </li>
              <li>
                <a href="https://en.wiktionary.org/wiki/Appendix:Basic_English_word_list" target="_blank" rel="noreferrer">
                  Wiktionary Basic English List
                </a>
              </li>
              <li>
                <a href="https://www.storylineonline.net/" target="_blank" rel="noreferrer">
                  Storyline Online (Audios de Actores)
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col border-left-col">
            <h5>🎧 Podcasts & Habla</h5>
            <ul>
              <li>
                <a href="https://dontspeak.podster.fm/" target="_blank" rel="noreferrer">
                  Podcast "Don't Speak" (Evgeny Volkov)
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=xa8nkPkWoWA" target="_blank" rel="noreferrer">
                  Improve Accent: Tongue Twisters
                </a>
              </li>
              <li>
                <a href="http://www.tongue-twister.net/en.htm" target="_blank" rel="noreferrer">
                  English Tongue Twisters Database
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} English Cheatsheet - De apuntes estáticos a aplicación interactiva premium.</p>
        </div>
      </footer>
    </div>
  );
}
