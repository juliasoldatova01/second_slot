import type { LayoutMetrics } from "../../app/resize";

export type TopPanelMetrics = {
  width: number;
  height: number;
  paddingX: number;
  itemSize: number;     
  gap: number; 
  scale: number;       
};


export function computeTopPanelMetrics(layout: LayoutMetrics): TopPanelMetrics {
  const width = layout.designWidth;
  const height = layout.topPanelHeight;

  return {
    width,
    height,
    paddingX: 24,
    itemSize: height * 0.6,
    gap: 100, 
    scale: layout.scale        
  };
}

