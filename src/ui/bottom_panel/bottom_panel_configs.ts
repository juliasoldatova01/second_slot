import type { LayoutConfigs, LayoutMode } from "../../app/resize";

export type BottomPanelConfigs = {
  mode: LayoutMode;
  width: number;
  height: number;
  paddingX: number;
  itemSize: number;
  gap: number;
  scale: number;
  buttonPaddingX: number;
  buttonPaddingY: number;
  buttonFontSize: number;
};

export function computeBottomPanelConfigs(
  layout: LayoutConfigs,
): BottomPanelConfigs {
  const width = layout.designWidth;
  const height = layout.bottomPanelHeight;

  return {
    mode: layout.mode,
    width,
    height,
    paddingX: width * 0.1,
    itemSize: height,
    gap: width * 0.02,
    scale: layout.scale,
    buttonPaddingX: 20,
    buttonPaddingY: 10,
    buttonFontSize: 36,
  };
}
