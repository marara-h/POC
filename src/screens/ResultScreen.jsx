import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import MoneyBar from '../components/MoneyBar';
import BottomNav from '../components/BottomNav';

const toneConfig = {
  success: { bg: '#E8F8F0', border: '#2ECC71', icon: '✅', label: 'Hianali!' },
  warning: { bg: '#FEF9E7', border: '#F39C12', icon: '⚠️', label: 'Karanq avel lav!' },
  danger: { bg: '#FDEDEC', border: '#E74C3C', icon: '❌', label: 'Lav chliner...' },
  info: { bg: '#EBF5FB', border: '#3498DB', icon: 'ℹ️', label: 'Nkatum em...' },
};

export default function ResultScreen() {
  const navigate = useNavigate();
  const { lastResult } = useGame();

  if (!lastResult) {
    navigate('/play');
    return null;
  }

  const { choice, moneyBefore, moneyAfter, xpGained } = lastResult;
  const config = toneConfig[choice.tone] || toneConfig.info;
  const moneyDiff = moneyAfter - moneyBefore;

  const formatMoney = (n) => n.toLocaleString('hy-AM');

  return (
    <div className="screen result-screen">
      <MoneyBar />
      <div className="home-content">
        <div className="result-icon-section">
          <div className="result-big-icon">{config.icon}</div>
          <h2 className="result-label">{config.label}</h2>
        </div>

        <div className="result-outcome-card" style={{ background: config.bg, borderColor: config.border }}>
          <p className="result-outcome-text">{choice.outcome}</p>
        </div>

        <div className="result-stats">
          <div className="result-stat">
            <span className="result-stat-label">Arji nvazagumj/azum</span>
            <span
              className="result-stat-value"
              style={{ color: moneyDiff >= 0 ? '#2ECC71' : '#E74C3C' }}
            >
              {moneyDiff >= 0 ? '+' : ''}{formatMoney(moneyDiff)} ֏
            </span>
          </div>
          <div className="result-stat">
            <span className="result-stat-label">Avardvacuts</span>
            <span className="result-stat-value xp-color">+{xpGained} XP ⭐</span>
          </div>
          <div className="result-stat">
            <span className="result-stat-label">Hajordum</span>
            <span className="result-stat-value">{formatMoney(moneyAfter)} ֏</span>
          </div>
        </div>

        <div className="result-actions">
          <button className="btn-primary" onClick={() => navigate('/play')}>
            Heto Kyanquin Scenario →
          </button>
          <button className="btn-outline" onClick={() => navigate('/home')}>
            Glkhavar
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
