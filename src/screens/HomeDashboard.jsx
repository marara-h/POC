import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import MoneyBar from '../components/MoneyBar';
import BottomNav from '../components/BottomNav';
import { scenarios, lessons } from '../data/armenianContent';

export default function HomeDashboard() {
  const navigate = useNavigate();
  const { money, xp, level, xpProgress, completedScenarios, completedLessons, user } = useGame();

  const nextScenario = scenarios.find((s) => !completedScenarios.includes(s.id));
  const totalScenarios = scenarios.length;
  const completedCount = completedScenarios.length;

  const dailyChallenge = scenarios[new Date().getDay() % scenarios.length];

  const getMoneyStatus = () => {
    if (money >= 700000) return { label: 'Ֆինանսական Khelmastyr', color: '#2ECC71', emoji: '🌟' };
    if (money >= 400000) return { label: 'Լավ իրավիճակների մեջ', color: '#27AE60', emoji: '😊' };
    if (money >= 200000) return { label: 'Probarutyunneri hamar', color: '#F39C12', emoji: '😐' };
    return { label: 'Oroshumnern Baxtrel', color: '#E74C3C', emoji: '😟' };
  };

  const status = getMoneyStatus();

  return (
    <div className="screen home-screen">
      <MoneyBar />

      <div className="home-content">
        <div className="greeting-section">
          <h2 className="greeting">Բարև, {user?.name || 'Khahrd'} {status.emoji}</h2>
          <div className="status-badge" style={{ borderColor: status.color, color: status.color }}>
            {status.label}
          </div>
        </div>

        <div className="xp-bar-container">
          <div className="xp-bar-header">
            <span>Makhunakj {level}</span>
            <span>{xp % 100}/100 XP</span>
          </div>
          <div className="xp-bar-track">
            <div className="xp-bar-fill" style={{ width: `${xpProgress}%` }} />
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Lratsner</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{totalScenarios - completedCount}</span>
            <span className="stat-label">Mamuts</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{completedLessons.length}</span>
            <span className="stat-label">Kursser</span>
          </div>
        </div>

        <div className="section-title">Amsory Marthahravern</div>
        <button
          className="challenge-card"
          onClick={() => navigate('/play', { state: { scenarioId: dailyChallenge.id } })}
        >
          <span className="challenge-icon">{dailyChallenge.image}</span>
          <div className="challenge-info">
            <p className="challenge-category">{dailyChallenge.category}</p>
            <p className="challenge-title">{dailyChallenge.title}</p>
          </div>
          <span className="challenge-arrow">→</span>
        </button>

        <div className="section-title">Shatanashvumner</div>
        <div className="action-buttons">
          {nextScenario ? (
            <button
              className="action-card action-play"
              onClick={() => navigate('/play')}
            >
              <span>🎮</span>
              <div>
                <p className="action-title">Sharjel Khaghe</p>
                <p className="action-sub">{nextScenario.category}</p>
              </div>
            </button>
          ) : (
            <button className="action-card action-complete" onClick={() => navigate('/play')}>
              <span>🏆</span>
              <div>
                <p className="action-title">Bolor Scenarnerə Avartvel en!</p>
                <p className="action-sub">Karanq veradrnel</p>
              </div>
            </button>
          )}

          <button
            className="action-card action-learn"
            onClick={() => navigate('/learn')}
          >
            <span>📚</span>
            <div>
              <p className="action-title">Nork Usum</p>
              <p className="action-sub">{lessons.length - completedLessons.length} mamuts kurs</p>
            </div>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
