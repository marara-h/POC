import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import MoneyBar from '../components/MoneyBar';
import BottomNav from '../components/BottomNav';
import { scenarios, lessons, personas } from '../data/armenianContent';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const {
    user, money, xp, level, xpProgress,
    completedScenarios, completedLessons,
    persona, goal, resetGame,
  } = useGame();

  const personaData = personas.find((p) => p.id === persona);

  const formatMoney = (n) => n.toLocaleString('hy-AM');

  const achievements = [
    { id: 'first', label: 'Arjin Oroshumn', emoji: '🥇', earned: completedScenarios.length >= 1 },
    { id: 'five', label: '5 Scenario', emoji: '🎯', earned: completedScenarios.length >= 5 },
    { id: 'all', label: 'Bolor Scenarner', emoji: '🏆', earned: completedScenarios.length >= scenarios.length },
    { id: 'learn1', label: 'Arjin Kurs', emoji: '📖', earned: completedLessons.length >= 1 },
    { id: 'learnAll', label: 'Bolor Kursser', emoji: '🎓', earned: completedLessons.length >= lessons.length },
    { id: 'rich', label: 'Millioner', emoji: '💎', earned: money >= 1000000 },
  ];

  function handleReset() {
    if (window.confirm('Hamozva՞ek vor urjel ek verapatumry? Bolor tarvy zutchiky kkortsi.')) {
      resetGame();
      navigate('/welcome');
    }
  }

  return (
    <div className="screen profile-screen">
      <MoneyBar />
      <div className="home-content">
        <div className="profile-hero">
          <div className="avatar-circle">
            {personaData?.emoji || '👤'}
          </div>
          <h2 className="profile-name">{user?.name || 'Khahrd'}</h2>
          {personaData && (
            <p className="profile-persona">{personaData.label}</p>
          )}
          <div className="profile-level-badge">Makhunakj {level}</div>
        </div>

        <div className="profile-xp-section">
          <div className="xp-bar-header">
            <span>Makhunakj {level}</span>
            <span>{xp % 100}/100 XP Heto Makhunakji hamar</span>
          </div>
          <div className="xp-bar-track">
            <div className="xp-bar-fill" style={{ width: `${xpProgress}%` }} />
          </div>
          <p className="total-xp">Endameny {xp} XP kaxoghatsats</p>
        </div>

        <div className="profile-stats-grid">
          <div className="profile-stat-card">
            <p className="pstat-value">{formatMoney(money)} ֏</p>
            <p className="pstat-label">Hajordumn Grosh</p>
          </div>
          <div className="profile-stat-card">
            <p className="pstat-value">{completedScenarios.length}/{scenarios.length}</p>
            <p className="pstat-label">Kyankayin Scenario</p>
          </div>
          <div className="profile-stat-card">
            <p className="pstat-value">{completedLessons.length}/{lessons.length}</p>
            <p className="pstat-label">Kursser</p>
          </div>
          <div className="profile-stat-card">
            <p className="pstat-value">{level}</p>
            <p className="pstat-label">Makhunakj</p>
          </div>
        </div>

        <h3 className="section-title">Makhunakner</h3>
        <div className="achievements-grid">
          {achievements.map((a) => (
            <div key={a.id} className={`achievement-badge ${a.earned ? 'earned' : 'locked'}`}>
              <span className="achievement-emoji">{a.earned ? a.emoji : '🔒'}</span>
              <p className="achievement-label">{a.label}</p>
            </div>
          ))}
        </div>

        <button className="btn-danger" onClick={handleReset}>
          Verapatvm Skarzan Skzbov
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
