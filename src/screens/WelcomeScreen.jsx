import { useNavigate } from 'react-router-dom';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen welcome-screen">
      <div className="welcome-hero">
        <div className="hero-emoji">🌿💰</div>
        <h1 className="welcome-title">Բարի գալուստ Grosh!</h1>
        <p className="welcome-subtitle">
          Ֆինանսական khelkh, vragrumner ev pahanjner —<br />
          Sorovor <strong>khelkhalits</strong> u dasavaroom!
        </p>
      </div>

      <div className="feature-list">
        <div className="feature-item">
          <span className="feature-icon">🎮</span>
          <div>
            <p className="feature-title">Khelakain Scenarner</p>
            <p className="feature-desc">Iravakan kensaki iravichakner</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">📚</span>
          <div>
            <p className="feature-title">Mini Dasakhosutjunner</p>
            <p className="feature-desc">Aragh u artadr uchumnakerial</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">💰</span>
          <div>
            <p className="feature-title">Վիրտուալ  Grosh-ներ</p>
            <p className="feature-desc"></p>
          </div>
        </div>
      </div>

      <div className="welcome-actions">
        <button className="btn-primary" onClick={() => navigate('/auth')}>
          Sksnel →
        </button>
        <button
          className="btn-ghost"
          onClick={() => {
            localStorage.setItem('grosh_onboarded', 'true');
            navigate('/home');
          }}
        >
          Sharel orpes Khahrd
        </button>
      </div>
    </div>
  );
}
