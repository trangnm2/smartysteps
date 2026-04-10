import { useVariant } from "@/fe/context/VariantContext";
import type { GameAnimationProps } from "@/variants/ele/components/GameAnimation/GameAnimation";

const GameAnimationBridge = (props: GameAnimationProps) => {
  const { config } = useVariant();
  const VariantAnimation = config.GameAnimation;
  return <VariantAnimation {...props} />;
};

export default GameAnimationBridge;
