import type { LayoutConfigs, LayoutMode } from "../../app/resize";

export type TopPanelConfigs = {
  mode: LayoutMode
  width: number;
  height: number;
  paddingX: number;
  itemSize: number;     
  gap: number; 
  fontSize: number;       
};


export function computeTopPanelConfigs(layout: LayoutConfigs): TopPanelConfigs {
  const width = layout.designWidth;
  const height = layout.topPanelHeight;

  return {
    mode: layout.mode,
    width,
    height,
    paddingX: width * 0.1,
    itemSize: height,
    gap: width * 0.1, 
    fontSize: 36  
  };
}

