import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const goals = [
  { id: 'emergency', emoji: '🛡️', label: 'Artakarg Fond', description: '3-6 amsi tsakhseri petashanvatsutjun' },
  { id: 'house', emoji: '🏠', label: 'Bnakaranak Gnel', description: 'Antsan u sephakan tiranakan bnakaranak' },
  { id: 'invest', emoji: '📈', label: 'Nerdrumner', description: 'Fondin acharjutyamby berdzel' },
  { id: 'debt', emoji: '💳', label: 'Partqerer Marel', description: 'Partqerian azatagrabutyun' },
  { id: 'retire', emoji: '🌴', label: 'Karich Amshotutyun', description: 'Ankax aprark errits mots' },
];

export default function GoalScreen() {
  const navigate = useNavigate();
  const { setGoal } = useGame();
  const [selected, setSelected] = useState(null);

  function handleNext() {
    if (!selected) return;
    setGoal(selected);
    navigate('/tutorial');
  }

  return (
    <div className="screen goal-screen">
      <div className="screen-header">
        <div className="progress-dots">
          <span className="pdot done" />
          <span className="pdot active" />
          <span className="pdot" />
        </div>
        <h2 className="screen-title">Qo Npatake?</h2>
        <p className="screen-subtitle">Yntrer qo himnakin finansakan npataky</p>
      </div>

      <div className="goal-list">
        {goals.map((g) => (
          <button
            key={g.id}
            className={`goal-card ${selected === g.id ? 'selected' : ''}`}
            onClick={() => setSelected(g.id)}
          >
            <span className="goal-emoji">{g.emoji}</span>
            <div className="goal-text">
              <p className="goal-label">{g.label}</p>
              <p className="goal-desc">{g.description}</p>
            </div>
            <span className="goal-check">{selected === g.id ? '✓' : ''}</span>
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
