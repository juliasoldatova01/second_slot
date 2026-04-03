import type { LayoutMetrics } from "../../app/resize";

export type TopPanelMetrics = {
  width: number;
  height: number;
  paddingX: number;
  itemSize: number;      // вертикический центр для панели высотой ~54
  gap: number;        // между Balance и Bet
};


export function computeTopPanelMetrics(layout: LayoutMetrics): TopPanelMetrics {
  const width = layout.designWidth;
  const height = layout.topPanelHeight;

  return {
    width,
    height,
    paddingX: 24,
    itemSize: height * 0.6,
    gap: 100,         // между Balance и Bet
  };
}

