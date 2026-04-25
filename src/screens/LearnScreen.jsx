import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import MoneyBar from '../components/MoneyBar';
import BottomNav from '../components/BottomNav';
import { lessons } from '../data/armenianContent';

function LessonDetail({ lesson, onComplete, onBack }) {
  const [page, setPage] = useState('lesson'); // 'lesson' | 'quiz'
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showExplain, setShowExplain] = useState(false);

  const currentQ = lesson.quiz?.[quizIndex];

  function handleAnswer(idx) {
    setSelected(idx);
    setShowExplain(true);
  }

  function handleNextQ() {
    const newAnswers = [...answers, selected];
    if (quizIndex + 1 < lesson.quiz.length) {
      setAnswers(newAnswers);
      setQuizIndex(quizIndex + 1);
      setSelected(null);
      setShowExplain(false);
    } else {
      const correct = newAnswers.filter((a, i) => a === lesson.quiz[i].correct).length;
      onComplete(correct, lesson.quiz.length);
    }
  }

  if (page === 'quiz' && currentQ) {
    return (
      <div className="lesson-detail">
        <button className="back-btn" onClick={onBack}>← Veradarnalj</button>
        <div className="quiz-header">
          <span className="quiz-badge">Viktur {quizIndex + 1}/{lesson.quiz.length}</span>
          <h3 className="quiz-question">{currentQ.question}</h3>
        </div>
        <div className="quiz-options">
          {currentQ.options.map((opt, i) => {
            let cls = 'quiz-option';
            if (selected !== null) {
              if (i === currentQ.correct) cls += ' correct';
              else if (i === selected) cls += ' wrong';
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
              >
                {String.fromCharCode(65 + i)}. {opt}
              </button>
            );
          })}
        </div>
        {showExplain && (
          <div className="quiz-explanation">
            <p>{currentQ.explanation}</p>
            <button className="btn-primary" onClick={handleNextQ}>
              {quizIndex + 1 < lesson.quiz.length ? 'Heto Hartsə →' : 'Avarrtel ✓'}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="lesson-detail">
      <button className="back-btn" onClick={onBack}>← Veradarnalj</button>
      <div className="lesson-icon-big">{lesson.icon}</div>
      <h2 className="lesson-detail-title">{lesson.title}</h2>
      <div className="lesson-meta">
        <span className="lesson-tag">{lesson.category}</span>
        <span className="lesson-duration">⏱ {lesson.duration}</span>
      </div>
      <ul className="lesson-points">
        {lesson.points.map((pt, i) => (
          <li key={i} className="lesson-point">
            <span className="point-bullet">✦</span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>
      {lesson.quiz?.length > 0 && (
        <button className="btn-primary" onClick={() => setPage('quiz')}>
          Sksnel Vikturə →
        </button>
      )}
    </div>
  );
}

export default function LearnScreen() {
  const navigate = useNavigate();
  const { completedLessons, completeLesson } = useGame();
  const [activeLesson, setActiveLesson] = useState(null);
  const [earnedXp, setEarnedXp] = useState(null);

  function handleComplete(correct, total) {
    const xp = completeLesson(activeLesson.id, correct, total);
    setEarnedXp(xp);
  }

  if (earnedXp !== null) {
    return (
      <div className="screen learn-screen">
        <MoneyBar />
        <div className="home-content">
          <div className="lesson-complete">
            <div className="complete-emoji">🎉</div>
            <h2>Kursy Avartvel e!</h2>
            <p className="complete-xp">+{earnedXp} XP ⭐ avardvatsir</p>
            <button className="btn-primary" onClick={() => { setActiveLesson(null); setEarnedXp(null); }}>
              Veradarnalj Kursser →
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (activeLesson) {
    return (
      <div className="screen learn-screen">
        <MoneyBar />
        <div className="home-content">
          <LessonDetail
            lesson={activeLesson}
            onComplete={handleComplete}
            onBack={() => setActiveLesson(null)}
          />
        </div>
        <BottomNav />
      </div>
    );
  }

  const categories = [...new Set(lessons.map((l) => l.category))];

  return (
    <div className="screen learn-screen">
      <MoneyBar />
      <div className="home-content">
        <h2 className="section-title">Finansakan Usumnasirakan</h2>
        <p className="screen-subtitle-small">{completedLessons.length}/{lessons.length} kurs avartvel en</p>

        {categories.map((cat) => (
          <div key={cat} className="lesson-category-section">
            <h3 className="lesson-category-title">{cat}</h3>
            {lessons
              .filter((l) => l.category === cat)
              .map((lesson) => {
                const done = completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    className={`lesson-card ${done ? 'done' : ''}`}
                    onClick={() => setActiveLesson(lesson)}
                  >
                    <span className="lesson-card-icon">{lesson.icon}</span>
                    <div className="lesson-card-info">
                      <p className="lesson-card-title">{lesson.title}</p>
                      <p className="lesson-card-meta">{lesson.duration} • {lesson.quiz?.length || 0} viktur</p>
                    </div>
                    <span className="lesson-card-status">{done ? '✅' : '→'}</span>
                  </button>
                );
              })}
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
