import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext(null);

const INITIAL_MONEY = 500000;

export function GameProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('grosh_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [money, setMoney] = useState(() => {
    const saved = localStorage.getItem('grosh_money');
    return saved ? parseInt(saved) : INITIAL_MONEY;
  });

  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('grosh_xp');
    return saved ? parseInt(saved) : 0;
  });

  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem('grosh_level');
    return saved ? parseInt(saved) : 1;
  });

  const [completedScenarios, setCompletedScenarios] = useState(() => {
    const saved = localStorage.getItem('grosh_scenarios');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('grosh_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  const [persona, setPersona] = useState(() => {
    const saved = localStorage.getItem('grosh_persona');
    return saved || null;
  });

  const [goal, setGoal] = useState(() => {
    const saved = localStorage.getItem('grosh_goal');
    return saved || null;
  });

  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    if (user) localStorage.setItem('grosh_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('grosh_money', money.toString());
  }, [money]);

  useEffect(() => {
    localStorage.setItem('grosh_xp', xp.toString());
    const newLevel = Math.floor(xp / 100) + 1;
    if (newLevel !== level) setLevel(newLevel);
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('grosh_level', level.toString());
  }, [level]);

  useEffect(() => {
    localStorage.setItem('grosh_scenarios', JSON.stringify(completedScenarios));
  }, [completedScenarios]);

  useEffect(() => {
    localStorage.setItem('grosh_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    if (persona) localStorage.setItem('grosh_persona', persona);
  }, [persona]);

  useEffect(() => {
    if (goal) localStorage.setItem('grosh_goal', goal);
  }, [goal]);

  function applyScenarioResult(scenario, choiceId) {
    const choice = scenario.choices.find((c) => c.id === choiceId);
    if (!choice) return;

    const newMoney = Math.max(0, money + choice.moneyChange);
    const newXp = xp + choice.xpChange;

    setMoney(newMoney);
    setXp(newXp);

    if (!completedScenarios.includes(scenario.id)) {
      setCompletedScenarios((prev) => [...prev, scenario.id]);
    }

    setLastResult({
      scenario,
      choice,
      moneyBefore: money,
      moneyAfter: newMoney,
      xpGained: choice.xpChange,
    });
  }

  function completeLesson(lessonId, correctAnswers, totalQuestions) {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
    }
    const earnedXp = Math.round((correctAnswers / totalQuestions) * 50) + 10;
    setXp((prev) => prev + earnedXp);
    return earnedXp;
  }

  function resetGame() {
    setMoney(INITIAL_MONEY);
    setXp(0);
    setLevel(1);
    setCompletedScenarios([]);
    setCompletedLessons([]);
    setLastResult(null);
    localStorage.clear();
  }

  const xpForNextLevel = level * 100;
  const xpProgress = ((xp % 100) / 100) * 100;

  return (
    <GameContext.Provider
      value={{
        user,
        setUser,
        money,
        xp,
        level,
        xpProgress,
        xpForNextLevel,
        completedScenarios,
        completedLessons,
        persona,
        setPersona,
        goal,
        setGoal,
        lastResult,
        applyScenarioResult,
        completeLesson,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
