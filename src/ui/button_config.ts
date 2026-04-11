import type { BottomPanelConfigs } from "./bottom_panel/bottom_panel.layouts";

export type ButtonState = "active" | "disabled";

export type TextButtonConfig = {
 
  paddingX: number;
  height: number;

  fontSize?: number;
  cornerRadius?: number;

  anchorX?: number;
  anchorY?: number;
};

export const defaultTextButtonConfig: TextButtonConfig= {
    paddingX: 20,
  height: 75,
  fontSize: 28,
  cornerRadius: 10,
  anchorX: 0.5,
  anchorY: 0.5,
};

export type ButtonLayoutConfig = {
  x: number;
  y: number;

  width: number;
  height: number;

  paddingX: number;
  paddingY: number;

  anchorX?: number;
  anchorY?: number;
};


export type SpinButtonConfig = {
    width: number,
    height: number,
    x: number,
    y:number
}

export function computeSpinButtonConfig(configs: BottomPanelConfigs):SpinButtonConfig{
    const spinButtonConfig: SpinButtonConfig = {
        width: 250,
        height: 200,  
        x: configs.width/2,
        y:  configs.height 
    }
    if(configs.mode === "mobile"){
        y:  configs.height
    }
    return spinButtonConfig;
}