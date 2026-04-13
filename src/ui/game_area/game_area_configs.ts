import type { LayoutConfigs, LayoutMode } from "../../app/resize";

export type GameLayerConfigs = {
  mode: LayoutMode
  width: number;
  height: number;
  paddingX: number;
  itemSize: number;     
  gap: number; 
  fontSize: number;
  x:number;
  y:number;
  reels: {
    reelsW: number,
    reelsH: number,
  }
         
};


export function computeGameLayerConfigs(layout: LayoutConfigs): GameLayerConfigs {
  const width = layout.designWidth;
  const height = layout.gameAreaHeight;

  console.log(width, height);

  return {
    mode: layout.mode,
    width,
    height,
    paddingX: layout.offsetX,
    itemSize: height,
    gap: width * 0.1, 
    fontSize: 36,
    x: 0,
    y: 0,
    reels: {
    reelsW: width * 0.6,
    reelsH: height * 0.6,
  }  
  };
}

