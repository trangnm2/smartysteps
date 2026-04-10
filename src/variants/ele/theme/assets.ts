// SUA KHI DOI GAME - Thay hinh anh, them/bot slot neu can
import mobileBackground from "./images/mobile/background.png";
import mobilePlayer from "./images/mobile/player.png";
import mobileBot1 from "./images/mobile/bot1.png";
import mobileBot2 from "./images/mobile/bot2.png";
import mobileQuestionFrame from "./images/mobile/question-frame.png";
import mobileAnswerButton from "./images/mobile/answer-button.png";
import mobileStartIcon from "./images/mobile/start-icon.png";
import mobileFinishIcon from "./images/mobile/finish-icon.png";
import mobileScoreIcon from "./images/mobile/score-icon.png";
import mobileSubmitButton from "./images/mobile/submit-button.png";
import mobileContinueButton from "./images/mobile/continue-button.png";
import mobileUpperBg from "./images/mobile/75upper.png";
import mobileBottomBg from "./images/mobile/25bottom.png";

import pcBackground from "./images/desktop/background.png";
import pcPlayer from "./images/desktop/player.png";
import pcBot1 from "./images/desktop/bot1.png";
import pcBot2 from "./images/desktop/bot2.png";
import pcQuestionFrame from "./images/desktop/question-frame.png";
import pcAnswerButton from "./images/desktop/answer-button.png";
import pcStartIcon from "./images/desktop/start-icon.png";
import pcFinishIcon from "./images/desktop/finish-icon.png";
import pcScoreIcon from "./images/desktop/score-icon.png";
import pcSubmitButton from "./images/desktop/submit-button.png";
import pcContinueButton from "./images/desktop/continue-button.png";
import pcUpperBg from "./images/desktop/75upper.png";
import pcBottomBg from "./images/desktop/25bottom.png";

export const ASSETS = {
  mobile: {
    background: mobileBackground,
    player: mobilePlayer,
    bot1: mobileBot1,
    bot2: mobileBot2,
    questionFrame: mobileQuestionFrame,
    answerButton: mobileAnswerButton,
    startIcon: mobileStartIcon,
    finishIcon: mobileFinishIcon,
    scoreIcon: mobileScoreIcon,
    submitButton: mobileSubmitButton,
    continueButton: mobileContinueButton,
    upperBg: mobileUpperBg,
    bottomBg: mobileBottomBg,
  },
  desktop: {
    background: pcBackground,
    player: pcPlayer,
    bot1: pcBot1,
    bot2: pcBot2,
    questionFrame: pcQuestionFrame,
    answerButton: pcAnswerButton,
    startIcon: pcStartIcon,
    finishIcon: pcFinishIcon,
    scoreIcon: pcScoreIcon,
    submitButton: pcSubmitButton,
    continueButton: pcContinueButton,
    upperBg: pcUpperBg,
    bottomBg: pcBottomBg,
  }
};

export type AssetSet = typeof ASSETS.mobile;

export const getAssets = (deviceType: 'mobile' | 'desktop'): AssetSet => ASSETS[deviceType];
