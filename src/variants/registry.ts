import * as eleAssets from "./ele/theme/assets";
import * as eleSettings from "./ele/theme/gameSettings";
import EleGameAnimation from "./ele/components/GameAnimation/GameAnimation";

import * as secAssets from "./sec/theme/assets";
import * as secSettings from "./sec/theme/gameSettings";
import SecGameAnimation from "./sec/components/GameAnimation/GameAnimation";

export type VariantId = "ele" | "sec";

export interface VariantConfig {
  assets: typeof eleAssets;
  settings: typeof eleSettings;
  GameAnimation: typeof EleGameAnimation;
}

export const variantRegistry: Record<VariantId, VariantConfig> = {
  ele: {
    assets: eleAssets,
    settings: eleSettings,
    GameAnimation: EleGameAnimation,
  },
  sec: {
    assets: secAssets,
    settings: secSettings,
    GameAnimation: SecGameAnimation,
  },
};
