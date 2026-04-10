// KHONG SUA KHI DOI GAME
import "./SubmitButton.css";
import { useVariant } from "@/fe/context/VariantContext";

interface ActionButtonProps {
  isAnswered: boolean;
  isDisabled: boolean;
  onClick: () => void;
  submitButtonImage: string;
  continueButtonImage: string;
}

const SubmitButton = ({
  isAnswered,
  isDisabled,
  onClick,
  submitButtonImage,
  continueButtonImage,
}: ActionButtonProps) => {
  const { config } = useVariant();
  const { GAME_TEXTS } = config.settings;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="submit-btn"
    >
      <img
        src={isAnswered ? continueButtonImage : submitButtonImage}
        alt={isAnswered ? GAME_TEXTS.buttons.continue : GAME_TEXTS.buttons.submit}
        className="submit-btn-img"
      />
    </button>
  );
};

export default SubmitButton;
