// SUA KHI DOI GAME
import "./GameAnimation.css";
import { useEffect } from "react";
import { useGameAnimation, useDevice } from "@/fe/hooks";
import { TARGET_BUSH } from "@/fe/theme";

export interface GameAnimationProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  hasSubmitted: boolean;
  currentResult: any;
  correctCount: number;
  playerName: string;
  onResetRef?: (resetFn: () => void) => void;
}

// School supply SVG icons - cartoon style matching the game aesthetic
const SCHOOL_SUPPLIES = [
  // Pencil
  (active: boolean) => (
    <svg viewBox="0 0 40 40" className={`supply-icon${active ? " supply-active" : ""}`}>
      <rect x="12" y="4" width="16" height="28" rx="2" fill={active ? "#FFD54F" : "#bbb"} stroke={active ? "#F9A825" : "#999"} strokeWidth="1.5"/>
      <polygon points="12,32 20,40 28,32" fill={active ? "#FFB74D" : "#aaa"}/>
      <rect x="12" y="4" width="16" height="5" rx="1" fill={active ? "#EF5350" : "#999"}/>
      <line x1="20" y1="35" x2="20" y2="40" stroke={active ? "#333" : "#777"} strokeWidth="1"/>
    </svg>
  ),
  // Book
  (active: boolean) => (
    <svg viewBox="0 0 40 40" className={`supply-icon${active ? " supply-active" : ""}`}>
      <rect x="6" y="6" width="28" height="28" rx="3" fill={active ? "#42A5F5" : "#bbb"} stroke={active ? "#1565C0" : "#999"} strokeWidth="1.5"/>
      <rect x="10" y="10" width="20" height="20" rx="1" fill={active ? "#E3F2FD" : "#ddd"}/>
      <line x1="14" y1="16" x2="26" y2="16" stroke={active ? "#1565C0" : "#aaa"} strokeWidth="1.5"/>
      <line x1="14" y1="20" x2="26" y2="20" stroke={active ? "#1565C0" : "#aaa"} strokeWidth="1.5"/>
      <line x1="14" y1="24" x2="22" y2="24" stroke={active ? "#1565C0" : "#aaa"} strokeWidth="1.5"/>
    </svg>
  ),
  // Ruler
  (active: boolean) => (
    <svg viewBox="0 0 40 40" className={`supply-icon${active ? " supply-active" : ""}`}>
      <rect x="8" y="10" width="24" height="20" rx="2" fill={active ? "#66BB6A" : "#bbb"} stroke={active ? "#2E7D32" : "#999"} strokeWidth="1.5"/>
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={12+i*5} y1="10" x2={12+i*5} y2={i%2===0?"17":"14"} stroke={active ? "#fff" : "#ddd"} strokeWidth="1.2"/>
      ))}
    </svg>
  ),
  // Eraser
  (active: boolean) => (
    <svg viewBox="0 0 40 40" className={`supply-icon${active ? " supply-active" : ""}`}>
      <rect x="8" y="12" width="24" height="16" rx="4" fill={active ? "#EC407A" : "#bbb"} stroke={active ? "#AD1457" : "#999"} strokeWidth="1.5"/>
      <rect x="8" y="12" width="10" height="16" rx="4" fill={active ? "#F48FB1" : "#ccc"}/>
    </svg>
  ),
  // Globe
  (active: boolean) => (
    <svg viewBox="0 0 40 40" className={`supply-icon${active ? " supply-active" : ""}`}>
      <circle cx="20" cy="20" r="14" fill={active ? "#29B6F6" : "#bbb"} stroke={active ? "#0277BD" : "#999"} strokeWidth="1.5"/>
      <ellipse cx="20" cy="20" rx="7" ry="14" fill="none" stroke={active ? "#0277BD" : "#999"} strokeWidth="1"/>
      <line x1="6" y1="20" x2="34" y2="20" stroke={active ? "#0277BD" : "#999"} strokeWidth="1"/>
      <ellipse cx="20" cy="13" rx="11" ry="3" fill="none" stroke={active ? "#4FC3F7" : "#ccc"} strokeWidth="0.8"/>
    </svg>
  ),
  // Star/Medal
  (active: boolean) => (
    <svg viewBox="0 0 40 40" className={`supply-icon${active ? " supply-active" : ""}`}>
      <polygon points="20,4 24,15 36,15 27,22 30,34 20,27 10,34 13,22 4,15 16,15" fill={active ? "#FFC107" : "#bbb"} stroke={active ? "#FF8F00" : "#999"} strokeWidth="1.2"/>
    </svg>
  ),
  // Palette
  (active: boolean) => (
    <svg viewBox="0 0 40 40" className={`supply-icon${active ? " supply-active" : ""}`}>
      <ellipse cx="20" cy="22" rx="15" ry="13" fill={active ? "#FFECB3" : "#ccc"} stroke={active ? "#F9A825" : "#999"} strokeWidth="1.5"/>
      <circle cx="13" cy="18" r="3" fill={active ? "#EF5350" : "#aaa"}/>
      <circle cx="20" cy="14" r="3" fill={active ? "#42A5F5" : "#aaa"}/>
      <circle cx="27" cy="18" r="3" fill={active ? "#66BB6A" : "#aaa"}/>
      <circle cx="24" cy="26" r="3" fill={active ? "#FFC107" : "#aaa"}/>
    </svg>
  ),
  // Calculator
  (active: boolean) => (
    <svg viewBox="0 0 40 40" className={`supply-icon${active ? " supply-active" : ""}`}>
      <rect x="9" y="4" width="22" height="32" rx="3" fill={active ? "#78909C" : "#bbb"} stroke={active ? "#37474F" : "#999"} strokeWidth="1.5"/>
      <rect x="12" y="8" width="16" height="8" rx="1" fill={active ? "#B2EBF2" : "#ddd"}/>
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={13+c*6} y={19+r*6} width="4" height="4" rx="0.5" fill={active ? "#E0E0E0" : "#ccc"}/>
      )))}
    </svg>
  ),
];

const GameAnimation = ({
  totalQuestions,
  currentQuestionIndex,
  hasSubmitted,
  currentResult,
  correctCount,
  playerName,
  onResetRef,
}: GameAnimationProps) => {
  const { assets } = useDevice();
  const {
    playerPosition,
    isJumping,
    resetPositions,
  } = useGameAnimation({
    totalQuestions,
    currentQuestionIndex,
    hasSubmitted,
    currentResult,
    correctCount,
  });

  useEffect(() => {
    onResetRef?.(resetPositions);
  }, [onResetRef, resetPositions]);

  const startPos = 15;
  const endPos = 88;
  // Center player above the last activated supply icon, or at startPos if none
  const playerLeft = playerPosition > 0
    ? `${startPos + ((playerPosition - 0.5) / totalQuestions) * (endPos - startPos)}%`
    : `${startPos}%`;

  return (
    <section className="animation-section flower-row-section">
      <div className="flower-row-track">
        {/* School supply icons as path markers */}
        {Array.from({ length: totalQuestions }, (_, i) => {
          const supplyIndex = i % SCHOOL_SUPPLIES.length;
          const isActive = i < correctCount;
          const isNewlyActive = isActive && i === correctCount - 1 && hasSubmitted;
          return (
            <div
              key={i}
              className={`path-supply${isActive ? " path-supply-active" : ""}${isNewlyActive ? " path-supply-new" : ""}`}
              style={{ left: `${startPos + ((i + 0.5) / totalQuestions) * (endPos - startPos)}%` }}
            >
              {SCHOOL_SUPPLIES[supplyIndex](isActive)}
            </div>
          );
        })}

        {/* Player (mascot) */}
        <div
          className={`flower-row-player${isJumping ? " flower-row-player-jump" : ""}`}
          style={{ left: playerLeft }}
        >
          <img src={assets.player} alt="Player" />
        </div>

        {/* School Gate (finish) */}
        <div
          className={`school-gate-finish${correctCount >= totalQuestions ? " gate-reached" : ""}`}
        >
          <img src={TARGET_BUSH.src} alt={TARGET_BUSH.alt} />
          {correctCount >= totalQuestions && <div className="gate-glow" />}
        </div>
      </div>
    </section>
  );
};

export default GameAnimation;
