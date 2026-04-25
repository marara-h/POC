import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: '🎮',
    title: 'Barevelcom Grosh!',
    body: 'Grosh-ə finansakan khelakanayin khagh e, vortegh du katarumen es kayankleal iravichakner ev sorovm es inchpes karavarel kanchanery.',
  },
  {
    icon: '💰',
    title: 'Qo Groshnerə',
    body: 'Du sksnum es 500,000 ֏ virtual groshnerov.\n\n• Lav oroshumneri hamar → Groshner sharjutyun arevum en\n• Sxal oroshumneri hamar → Groshner paqmanakutyun\n\nLutsir maximal groshan!',
  },
  {
    icon: '⭐',
    title: 'XP ev Makhunakner',
    body: 'Amen avardakan oroshumneri hamar du kkstanash:\n• XP (pashtpan katsynineri)\n• Makhunakner\n• Norer contenteri bnazdelutyun\n\nLratsow lrasir — tuyl ta makhunakner!',
  },
];

export default function TutorialScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  function handleNext() {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem('grosh_onboarded', 'true');
      navigate('/home');
    }
  }

  const current = steps[step];

  return (
    <div className="screen tutorial-screen">
      <div className="screen-header">
        <div className="progress-dots">
          <span className="pdot done" />
          <span className="pdot done" />
          <span className="pdot active" />
        </div>
      </div>

      <div className="tutorial-card">
        <div className="tutorial-icon">{current.icon}</div>
        <h2 className="tutorial-title">{current.title}</h2>
        <p className="tutorial-body">{current.body}</p>
      </div>

      <div className="tutorial-steps-indicator">
        {steps.map((_, i) => (
          <span key={i} className={`tstep ${i === step ? 'active' : i < step ? 'done' : ''}`} />
        ))}
      </div>

      <button className="btn-primary" onClick={handleNext}>
        {step < steps.length - 1 ? 'Heto →' : 'Sksnel! 🚀'}
      </button>

      {step > 0 && (
        <button className="btn-ghost" onClick={() => setStep(step - 1)}>
          ← Nakhord
        </button>
      )}
    </div>
  );
}
