import { useState } from 'react';
import './InteractiveWidgets.css';

export default function InteractiveWidgets() {
  // Modal Probability State
  const [probability, setProbability] = useState(50);

  // Agree Simulator State
  const [agreementType, setAgreementType] = useState('positive'); // 'positive' or 'negative'
  const [selectedAuxiliary, setSelectedAuxiliary] = useState('be'); // 'be', 'do', 'have', 'modal'
  const [customSubject, setCustomSubject] = useState('I'); // 'I', 'he', 'we', etc.

  // Modals Data
  const modalsData = [
    { name: 'Must', min: 90, max: 100, val: 100, desc: '100% de certeza. Obligación o deducción afirmativa lógica absoluta.', example: 'He must be at home; his car is in the driveway.' },
    { name: 'Should', min: 70, max: 89, val: 75, desc: '75% de certeza. Expectativa, recomendación o consejo sólido.', example: 'We should arrive by 6 PM if the traffic is good.' },
    { name: 'Can', min: 45, max: 69, val: 50, desc: '50% de certeza. Capacidad general o posibilidad física/teórica.', example: 'It can get very cold in the desert at night.' },
    { name: 'May', min: 35, max: 44, val: 40, desc: '40% de certeza. Posibilidad formal o permiso formal.', example: 'She may join us later if she finishes her work.' },
    { name: 'Might', min: 25, max: 34, val: 30, desc: '30% de certeza. Posibilidad débil o hipotética en el presente/futuro.', example: 'We might go to Spain for vacation, but we aren\'t sure.' },
    { name: 'Could', min: 10, max: 24, val: 20, desc: '20% de certeza. Posibilidad teórica muy remota o habilidad en el pasado.', example: 'It could rain later, though the sky is completely blue now.' },
    { name: 'Cannot / Can\'t', min: 0, max: 9, val: 0, desc: '0% de certeza. Imposibilidad lógica absoluta o prohibición.', example: 'This cannot be true; it makes no sense.' }
  ];

  // Match current slider value to a modal verb
  const getActiveModal = (val) => {
    return modalsData.find(m => val >= m.min && val <= m.max) || modalsData[2]; // fallback to Can
  };

  const activeModal = getActiveModal(probability);

  // Concordance Builder Options
  const auxiliaries = {
    be: {
      label: 'To Be (am/is/are)',
      positivePhrase: 'I am happy.',
      negativePhrase: 'I am not happy.',
      getAgreement: (type, subj) => {
        if (subj === 'I') return type === 'positive' ? 'So am I.' : 'Neither am I.';
        if (['he', 'she', 'it'].includes(subj)) return type === 'positive' ? `So is ${subj}.` : `Neither is ${subj}.`;
        return type === 'positive' ? `So are ${subj}.` : `Neither are ${subj}.`;
      },
      getFullAgreement: (type, subj) => {
        const verb = subj === 'I' ? 'am' : ['he', 'she', 'it'].includes(subj) ? 'is' : 'are';
        return type === 'positive' ? `${subj.charAt(0).toUpperCase() + subj.slice(1)} ${verb} too.` : `${subj.charAt(0).toUpperCase() + subj.slice(1)} ${verb} not either.`;
      }
    },
    do: {
      label: 'Verb Actions (do/does/did)',
      positivePhrase: 'I love English.',
      negativePhrase: 'I don\'t like tea.',
      getAgreement: (type, subj) => {
        const aux = ['he', 'she', 'it'].includes(subj) ? 'does' : 'do';
        return type === 'positive' ? `So ${aux} ${subj}.` : `Neither ${aux} ${subj}.`;
      },
      getFullAgreement: (type, subj) => {
        const verb = ['he', 'she', 'it'].includes(subj) ? 'does' : 'do';
        return type === 'positive' ? `${subj.charAt(0).toUpperCase() + subj.slice(1)} do too.` : `${subj.charAt(0).toUpperCase() + subj.slice(1)} don't either.`; // kept simple
      }
    },
    have: {
      label: 'Present Perfect (have/has)',
      positivePhrase: 'I have finished.',
      negativePhrase: 'I haven\'t seen it.',
      getAgreement: (type, subj) => {
        const aux = ['he', 'she', 'it'].includes(subj) ? 'has' : 'have';
        return type === 'positive' ? `So ${aux} ${subj}.` : `Neither ${aux} ${subj}.`;
      },
      getFullAgreement: (type, subj) => {
        const aux = ['he', 'she', 'it'].includes(subj) ? 'has' : 'have';
        const auxNeg = ['he', 'she', 'it'].includes(subj) ? "hasn't" : "haven't";
        return type === 'positive' ? `${subj.charAt(0).toUpperCase() + subj.slice(1)} ${aux} too.` : `${subj.charAt(0).toUpperCase() + subj.slice(1)} ${auxNeg} either.`;
      }
    },
    modal: {
      label: 'Modals (can/will/should)',
      positivePhrase: 'I can swim.',
      negativePhrase: 'I can\'t fly.',
      getAgreement: (type, subj) => {
        return type === 'positive' ? `So can ${subj}.` : `Neither can ${subj}.`;
      },
      getFullAgreement: (type, subj) => {
        return type === 'positive' ? `${subj.charAt(0).toUpperCase() + subj.slice(1)} can too.` : `${subj.charAt(0).toUpperCase() + subj.slice(1)} can't either.`;
      }
    }
  };

  const activeAux = auxiliaries[selectedAuxiliary];

  return (
    <div className="interactive-widgets animate-fade-in">
      <div className="section-header">
        <h2>Interactive Grammar Gadgets</h2>
        <p>Herramientas interactivas para comprender visualmente las sutilezas de los verbos modales y las reglas de concordancia.</p>
      </div>

      <div className="grid-2">
        {/* Gadget 1: Modal Probability Slider */}
        <div className="widget-card glass-panel">
          <div className="widget-header">
            <span className="widget-icon">🎛️</span>
            <h3>Medidor de Posibilidad (Modals)</h3>
          </div>
          <p className="widget-desc">Mueve el deslizador para ver qué verbo modal encaja según el nivel de probabilidad o certeza.</p>

          <div className="probability-display">
            <div className="gauge-outer">
              <div className="gauge-inner" style={{ width: `${probability}%`, background: `linear-gradient(to right, var(--accent-primary), ${probability > 60 ? 'var(--accent-success)' : 'var(--accent-secondary)'})` }}></div>
            </div>
            <div className="probability-value-row">
              <span className="prob-label">Certeza:</span>
              <span className="prob-num">{probability}%</span>
            </div>
          </div>

          <div className="slider-wrapper">
            <input
              type="range"
              min="0"
              max="100"
              value={probability}
              onChange={(e) => setProbability(parseInt(e.target.value))}
              className="modal-range-slider"
            />
            <div className="slider-ticks">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="active-modal-detail animate-fade-in" key={activeModal.name}>
            <div className="modal-title-row">
              <span className="modal-verb-name">{activeModal.name}</span>
              <span className="modal-verb-badge">Nivel Recomendado</span>
            </div>
            <p className="modal-verb-desc">{activeModal.desc}</p>
            <div className="modal-verb-example">
              <strong>Ejemplo de uso:</strong>
              <p>"{activeModal.example}"</p>
            </div>
          </div>
        </div>

        {/* Gadget 2: Agree / Disagree Concordance Builder */}
        <div className="widget-card glass-panel">
          <div className="widget-header">
            <span className="widget-icon">🤝</span>
            <h3>Creador de Concordancias</h3>
          </div>
          <p className="widget-desc">Elige el tipo de frase, el verbo auxiliar y el sujeto para aprender a concordar correctamente (con <em>So</em> o <em>Neither</em>).</p>

          <div className="concordance-builder-controls">
            {/* Phrase polarity selector */}
            <div className="control-group">
              <label>Polaridad de la frase:</label>
              <div className="segmented-control">
                <button
                  className={`segment-btn ${agreementType === 'positive' ? 'active' : ''}`}
                  onClick={() => setAgreementType('positive')}
                >
                  Frase Positiva (+)
                </button>
                <button
                  className={`segment-btn ${agreementType === 'negative' ? 'active' : ''}`}
                  onClick={() => setAgreementType('negative')}
                >
                  Frase Negativa (-)
                </button>
              </div>
            </div>

            {/* Auxiliary selector */}
            <div className="control-group">
              <label>Estructura / Auxiliar:</label>
              <select
                className="widget-select"
                value={selectedAuxiliary}
                onChange={(e) => setSelectedAuxiliary(e.target.value)}
              >
                {Object.entries(auxiliaries).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>

            {/* Subject Selector */}
            <div className="control-group">
              <label>Sujeto que responde:</label>
              <div className="subject-pills">
                {['I', 'you', 'he', 'we', 'they'].map(subj => (
                  <button
                    key={subj}
                    className={`pill-btn ${customSubject === subj ? 'active' : ''}`}
                    onClick={() => setCustomSubject(subj)}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Builder Output */}
          <div className="builder-output-box">
            <div className="output-phrase-statement">
              <span className="statement-tag">Frase original:</span>
              <p className="statement-text">
                "{agreementType === 'positive' ? activeAux.positivePhrase : activeAux.negativePhrase}"
              </p>
            </div>

            <div className="output-answers-grid">
              <div className="answer-item-box">
                <span className="answer-badge short">Respuesta Corta</span>
                <p className="answer-text">{activeAux.getAgreement(agreementType, customSubject)}</p>
              </div>
              <div className="answer-item-box">
                <span className="answer-badge full">Respuesta Completa</span>
                <p className="answer-text">{activeAux.getFullAgreement(agreementType, customSubject)}</p>
              </div>
            </div>

            <div className="disagree-notice">
              <strong>¿Cómo discordar?</strong>
              <p>
                Si quieres discordar de manera sencilla y natural, invierte la auxiliar del sujeto: 
                {" "}<em>"{agreementType === 'positive' ? `But ${customSubject} don't/is not/have not.` : `But ${customSubject} do/is/have.`}"</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
