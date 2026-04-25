import { useGame } from '../context/GameContext';

export default function MoneyBar() {
  const { money, xp, level } = useGame();

  const formatMoney = (amount) => {
    if (amount >= 1000000) return (amount / 1000000).toFixed(1) + 'Մ';
    if (amount >= 1000) return (amount / 1000).toFixed(0) + 'Կ';
    return amount.toString();
  };

  return (
    <div className="money-bar">
      <div className="money-display">
        <span className="money-icon">💰</span>
        <span className="money-amount">{formatMoney(money)} ֏</span>
      </div>
      <div className="level-display">
        <span className="level-badge">Lvl {level}</span>
        <span className="xp-display">⭐ {xp} XP</span>
      </div>
    </div>
  );
}
