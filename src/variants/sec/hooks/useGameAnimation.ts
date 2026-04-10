// SUA KHI DOI GAME
import { useCallback } from "react";

interface UseGameAnimationOptions {
  totalQuestions: number;
  currentQuestionIndex: number;
  hasSubmitted: boolean;
  currentResult: any;
  correctCount: number;
}

export const useGameAnimation = ({
  totalQuestions,
  hasSubmitted,
  currentResult,
  correctCount
}: UseGameAnimationOptions) => {
  // Player position = number of correct answers (0 to totalQuestions)
  const playerPosition = correctCount;

  // Track which flowers are activated (indices 0-4)
  // A flower at index i is activated if the player has passed it (correctCount > i)
  const activatedFlowers = Array.from({ length: totalQuestions }, (_, i) => i < correctCount);

  const isJumping = hasSubmitted && currentResult?.isCorrect === true;

  const resetPositions = useCallback(() => {
    // No internal state to reset since positions derive from correctCount
  }, []);

  return {
    playerPosition,
    activatedFlowers,
    isJumping,
    resetPositions,
  };
};
