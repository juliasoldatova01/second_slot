import type { LayoutConfigs, LayoutMode } from "../../app/resize";

export type GameLayerConfigs = {
  mode: LayoutMode;
  width: number;
  height: number;
  paddingX: number;
  itemSize: number;
  gap: number;
  fontSize: number;
  x: number;
  y: number;
  reels: {
    reelsW: number;
    reelsH: number;
  };
  reel: {
    count: number;
    reelW: number;
    reelH: number;
    visibleRows: number;
    gap: number;
  };
  symbol: {
    count: number;
    width: number;
    height: number;
    gap: number;
  };
};

export function computeGameLayerConfigs(
  layout: LayoutConfigs,
): GameLayerConfigs {
  const width = layout.designWidth;

  console.log(layout.screenWidth);
  const height = layout.gameAreaHeight;

  const reelCount = 5;
  const visibleRows = 3;

  const paddingX = 40;
  const reelsGap = 18;
  const symbolGap = 2;

  const reelsW = layout.designWidth - paddingX * 2;

  console.log(reelsW);
  const reelW = (reelsW - reelsGap * (reelCount - 1)) / reelCount;

  const textureW = 263;
  const textureH = 193;

  const symbolW = reelW;
  const symbolH = symbolW * (textureH / textureW);

  const reelH = visibleRows * symbolH + (visibleRows - 1) * symbolGap;
  const reelsH = reelH;

  return {
    mode: layout.mode,
    width,
    height,
    paddingX,
    itemSize: height,
    gap: reelsGap,
    fontSize: 36,
    x: 0,
    y: 0,
    reels: {
      reelsW,
      reelsH,
    },
    reel: {
      count: reelCount,
      reelW,
      reelH,
      visibleRows,
      gap: reelsGap,
    },
    symbol: {
      count: 6,
      width: symbolW,
      height: symbolH,
      gap: symbolGap,
    },
  };
}
