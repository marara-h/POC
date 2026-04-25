import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import MoneyBar from '../components/MoneyBar';
import BottomNav from '../components/BottomNav';
import { scenarios } from '../data/armenianContent';

export default function PlayScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { completedScenarios, applyScenarioResult } = useGame();
  const [selected, setSelected] = useState(null);

  const scenarioId = location.state?.scenarioId;
  let scenario;

  if (scenarioId) {
    scenario = scenarios.find((s) => s.id === scenarioId);
  } else {
    scenario = scenarios.find((s) => !completedScenarios.includes(s.id));
  }

  if (!scenario) {
    return (
      <div className="screen play-screen">
        <MoneyBar />
        <div className="home-content">
          <div className="empty-state">
            <div className="empty-emoji">🏆</div>
            <h2>Bolor Scenarnerə Avartvel en!</h2>
            <p>Du antsker bolor iravichaknerə. Grosh-y hparthanum e qo oroshumneri hamar!</p>
            <button
              className="btn-primary"
              onClick={() => navigate('/home')}
            >
              Veradarnalj Glkhavar
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  function handleChoice(choiceId) {
    setSelected(choiceId);
    applyScenarioResult(scenario, choiceId);
    setTimeout(() => navigate('/result'), 600);
  }

  return (
    <div className="screen play-screen">
      <MoneyBar />
      <div className="home-content">
        <div className="scenario-header">
          <span className="scenario-category-badge">{scenario.category}</span>
          <span className="scenario-progress">
            {completedScenarios.length + 1}/{scenarios.length}
          </span>
        </div>

        <div className="scenario-card">
          <div className="scenario-emoji">{scenario.image}</div>
          <h2 className="scenario-title">{scenario.title}</h2>
          <p className="scenario-description">{scenario.description}</p>
        </div>

        <p className="choices-label">Yntrir qo pataskhan՛</p>

        <div className="choices-list">
          {scenario.choices.map((choice) => (
            <button
              key={choice.id}
              className={`choice-card ${selected === choice.id ? 'selected' : ''}`}
              onClick={() => handleChoice(choice.id)}
              disabled={!!selected}
            >
              <span className="choice-letter">{choice.id}</span>
              <span className="choice-text">{choice.text}</span>
            </button>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
