import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const onboarded = localStorage.getItem('grosh_onboarded');
    const timer = setTimeout(() => {
      navigate(onboarded ? '/home' : '/welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="screen splash-screen">
      <div className="splash-content">
        <div className="splash-logo">
          <div className="logo-circle">
            <span className="logo-symbol">֏</span>
          </div>
          <h1 className="app-name">Grosh</h1>
          <p className="app-tagline">Սովoror Financiapakan Akhimby</p>
        </div>
        <div className="splash-dots">
          <span className="dot dot-1" />
          <span className="dot dot-2" />
          <span className="dot dot-3" />
        </div>
      </div>
    </div>
  );
}
