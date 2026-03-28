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

  // Player moves from left (0%) to the gate on the right
  // Position is based on correctCount / totalQuestions
  // Symmetric: 8% margin on both sides, player moves from 8% to 78%
  const startPos = 8;
  const endPos = 78;
  const playerLeft = `${startPos + (playerPosition / totalQuestions) * (endPos - startPos)}%`;

  return (
    <section className="animation-section flower-row-section">
      <div className="flower-row-track">
        {/* Progress path dots */}
        {Array.from({ length: totalQuestions }, (_, i) => (
          <div
            key={i}
            className={`path-dot${i < correctCount ? " path-dot-active" : ""}`}
            style={{ left: `${8 + (i / totalQuestions) * 70}%` }}
          />
        ))}

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
