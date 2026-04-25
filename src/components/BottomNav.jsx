import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/home', icon: '🏠', label: 'Գlkhavar' },
  { path: '/play', icon: '🎮', label: 'Khaghal' },
  { path: '/learn', icon: '📚', label: 'Sorel' },
  { path: '/profile', icon: '👤', label: 'Profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            className={`nav-tab ${active ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
