import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

export default function AuthScreen() {
  const navigate = useNavigate();
  const { setUser } = useGame();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setUser({ name: name || 'Oغtakir', email });
    navigate('/persona');
  }

  return (
    <div className="screen auth-screen">
      <button className="back-btn" onClick={() => navigate('/welcome')}>← Veradarnalj</button>

      <div className="auth-header">
        <div className="logo-small">֏</div>
        <h2 className="auth-title">
          {mode === 'login' ? 'Masnel Hesapov' : 'Ster Hesap'}
        </h2>
      </div>

      <div className="auth-tabs">
        <button
          className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
          onClick={() => setMode('login')}
        >
          Masnel
        </button>
        <button
          className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
          onClick={() => setMode('signup')}
        >
          Gorcanagretvel
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <div className="form-group">
            <label className="form-label">Anun</label>
            <input
              className="form-input"
              type="text"
              placeholder="Qo anunj"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Enagrakan</label>
          <input
            className="form-input"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <button className="btn-primary" type="submit">
          {mode === 'login' ? 'Masnel →' : 'Gorcanagretvel →'}
        </button>
      </form>

      <div className="auth-divider">
        <span>keram</span>
      </div>

      <button
        className="btn-outline"
        onClick={() => {
          setUser({ name: 'Khahrd', email: '' });
          navigate('/persona');
        }}
      >
        Sharel Orpes Khahrd
      </button>
    </div>
  );
}
