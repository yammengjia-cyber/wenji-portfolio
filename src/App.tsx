import { useEffect, useMemo, useState } from 'react';
import { Mail, Phone, BookOpen } from 'lucide-react';
import { EDUCATION, PERSONAL_INFO, PROJECTS } from './data';

type IntroPhase =
  | 'rolling'
  | 'settle'
  | 'unfold'
  | 'enlargeInfo'
  | 'reflowInfo'
  | 'revealMain';

const FACE_TRANSFORMS = [
  'rotateY(0deg) translateZ(42px)',
  'rotateY(180deg) translateZ(42px)',
  'rotateY(90deg) translateZ(42px)',
  'rotateY(-90deg) translateZ(42px)',
  'rotateX(90deg) translateZ(42px)',
  'rotateX(-90deg) translateZ(42px)',
];

function DiceIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<IntroPhase>('rolling');
  const [step, setStep] = useState(0);

  // 每一步是 90 度翻滚，并同步位移，形成“逐面前进”的感知
  const rollSteps = useMemo(
    () => [
      { x: 260, y: 130, rx: 0, ry: 0 },
      { x: 180, y: 98, rx: 0, ry: -90 },
      { x: 100, y: 65, rx: 90, ry: -90 },
      { x: 36, y: 36, rx: 90, ry: -180 },
      { x: 0, y: 0, rx: 180, ry: -180 },
    ],
    [],
  );

  useEffect(() => {
    if (phase !== 'rolling') return;
    if (step >= rollSteps.length - 1) {
      setPhase('settle');
      return;
    }
    const timer = window.setTimeout(() => setStep((prev) => prev + 1), 420);
    return () => window.clearTimeout(timer);
  }, [phase, step, rollSteps.length]);

  useEffect(() => {
    if (phase !== 'settle') return;
    const timer = window.setTimeout(() => setPhase('unfold'), 420);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'unfold') return;
    const timer = window.setTimeout(() => setPhase('enlargeInfo'), 650);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'enlargeInfo') return;
    const timer = window.setTimeout(() => setPhase('reflowInfo'), 680);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'reflowInfo') return;
    const timer = window.setTimeout(() => setPhase('revealMain'), 820);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'revealMain') return;
    const timer = window.setTimeout(onComplete, 900);
    return () => window.clearTimeout(timer);
  }, [phase, onComplete]);

  const activeRoll = rollSteps[Math.min(step, rollSteps.length - 1)];
  const isUnfolded = phase === 'unfold' || phase === 'enlargeInfo' || phase === 'reflowInfo' || phase === 'revealMain';
  const isEnlarged = phase === 'enlargeInfo';
  const isReflowed = phase === 'reflowInfo' || phase === 'revealMain';

  return (
    <section className="intro-layer">
      <div className="intro-scene">
        <div
          className={`dice-shell ${phase === 'settle' ? 'is-settled' : ''}`}
          style={{
            transform: `translate3d(${activeRoll.x}px, ${activeRoll.y}px, 0)`,
            transition: phase === 'rolling' ? 'transform 380ms cubic-bezier(0.2, 0.75, 0.25, 1)' : 'transform 450ms ease',
          }}
        >
          <div
            className={`dice-core ${isUnfolded ? 'is-unfolded' : ''}`}
            style={{
              transform: `rotateX(${activeRoll.rx}deg) rotateY(${activeRoll.ry}deg)`,
              transition: phase === 'rolling' ? 'transform 380ms cubic-bezier(0.2, 0.75, 0.25, 1)' : 'transform 500ms ease',
            }}
          >
            {FACE_TRANSFORMS.map((faceTransform, index) => (
              <div
                key={faceTransform}
                className={`dice-face face-${index}`}
                style={!isUnfolded ? { transform: faceTransform } : undefined}
              >
                <div className="face-label">
                  {index === 0 && '姓名'}
                  {index === 2 && '电话'}
                  {index === 3 && '本科'}
                  {index === 4 && '研究生'}
                  {index === 5 && '邮箱'}
                </div>
                <div className="face-value">
                  {index === 0 && PERSONAL_INFO.name}
                  {index === 2 && PERSONAL_INFO.phone}
                  {index === 3 && EDUCATION[1].school}
                  {index === 4 && EDUCATION[0].school}
                  {index === 5 && PERSONAL_INFO.email}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={[
            'intro-info',
            isEnlarged ? 'is-enlarged' : '',
            isReflowed ? 'is-reflowed' : '',
          ].join(' ')}
        >
          <h1>{PERSONAL_INFO.name}</h1>
          <p>UX / 交互设计师 · 用户研究 · AI 应用</p>
          <ul>
            <li>
              <Phone size={18} />
              {PERSONAL_INFO.phone}
            </li>
            <li>
              <Mail size={18} />
              {PERSONAL_INFO.email}
            </li>
            <li>
              <BookOpen size={18} />
              {EDUCATION[0].school}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function HomeContent() {
  return (
    <main className="home-wrapper">
      <section className="hero">
        <p className="kicker">UX / Interaction Designer</p>
        <h2>设计以人为本的智能体验</h2>
        <p className="lead">
          我是颜孟佳，信息设计硕士在读。希望把复杂信息和直觉交互连接起来，做清晰、可信、可落地的产品体验。
        </p>
      </section>

      <section className="projects">
        <h3>精选项目</h3>
        <div className="project-grid">
          {PROJECTS.slice(0, 6).map((project) => (
            <article key={project.id} className="project-card">
              <h4>{project.title}</h4>
              <p className="tag">{project.category}</p>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [showHome, setShowHome] = useState(false);
  return <div>{showHome ? <HomeContent /> : <DiceIntro onComplete={() => setShowHome(true)} />}</div>;
}
