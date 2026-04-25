import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { personas } from '../data/armenianContent';

export default function PersonaScreen() {
  const navigate = useNavigate();
  const { setPersona } = useGame();
  const [selected, setSelected] = useState(null);

  function handleNext() {
    if (!selected) return;
    setPersona(selected);
    navigate('/goal');
  }

  return (
    <div className="screen persona-screen">
      <div className="screen-header">
        <div className="progress-dots">
          <span className="pdot active" />
          <span className="pdot" />
          <span className="pdot" />
        </div>
        <h2 className="screen-title">Ov es du?</h2>
        <p className="screen-subtitle">Yntrer qo kanenagire vor aprumj avel chanaparayin lini</p>
      </div>

      <div className="persona-grid">
        {personas.map((p) => (
          <button
            key={p.id}
            className={`persona-card ${selected === p.id ? 'selected' : ''}`}
            onClick={() => setSelected(p.id)}
          >
            <span className="persona-emoji">{p.emoji}</span>
            <p className="persona-label">{p.label}</p>
            <p className="persona-desc">{p.description}</p>
          </button>
        ))}
      </div>

      <button
        className="btn-primary"
        onClick={handleNext}
        disabled={!selected}
      >
        Sharjel →
      </button>
    </div>
  );
}
