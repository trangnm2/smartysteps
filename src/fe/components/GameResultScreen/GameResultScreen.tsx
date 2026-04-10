// KHONG SUA KHI DOI GAME
import "./GameResultScreen.css";
import { useDevice } from "@/fe/hooks";
import { useVariant } from "@/fe/context/VariantContext";

interface GameResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const GameResultScreen = ({ score, totalQuestions, onRestart }: GameResultScreenProps) => {
  const { assets } = useDevice();
  const { config } = useVariant();
  const { GAME_TEXTS } = config.settings;
  const isWinner = score >= totalQuestions;

  return (
    <div className="game-overlay show">
      <div className="overlay-content">
        <h2>
          {isWinner ? GAME_TEXTS.result.winTitle : GAME_TEXTS.result.loseTitle}
        </h2>

        <div className="overlay-message">
          <p>
            {isWinner
              ? GAME_TEXTS.result.winMessage
              : GAME_TEXTS.result.loseMessage(score, totalQuestions)}
          </p>
        </div>

        <button
          onClick={onRestart}
          className="submit-btn"
        >
          <img
            src={assets.continueButton}
            alt={GAME_TEXTS.buttons.continue}
            className="restart-btn-img"
          />
        </button>
      </div>
    </div>
  );
};

export default GameResultScreen;
