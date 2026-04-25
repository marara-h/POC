import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import PersonaScreen from './screens/PersonaScreen';
import GoalScreen from './screens/GoalScreen';
import TutorialScreen from './screens/TutorialScreen';
import HomeDashboard from './screens/HomeDashboard';
import PlayScreen from './screens/PlayScreen';
import ResultScreen from './screens/ResultScreen';
import LearnScreen from './screens/LearnScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/auth" element={<AuthScreen />} />
            <Route path="/persona" element={<PersonaScreen />} />
            <Route path="/goal" element={<GoalScreen />} />
            <Route path="/tutorial" element={<TutorialScreen />} />
            <Route path="/home" element={<HomeDashboard />} />
            <Route path="/play" element={<PlayScreen />} />
            <Route path="/result" element={<ResultScreen />} />
            <Route path="/learn" element={<LearnScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GameProvider>
  );
}
