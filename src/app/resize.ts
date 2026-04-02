import type { Layers } from "./layers";

import { Graphics, Container } from "pixi.js";

export type LayoutMode = "desktop" | "mobile";

export type LayoutMetrics = {
  mode: LayoutMode;

  screenWidth: number;
  screenHeight: number;

  designWidth: number;
  designHeight: number;

  scale: number;
  offsetX: number;
  offsetY: number;

  topPanelY: number;
  gameLayerY: number;
  bottomPanelY: number;

  topPanelHeight: number;
  gameAreaHeight: number;
  bottomPanelHeight: number;
};

export const DESIGN_WIDTH = 1280;
export const DESIGN_HEIGHT = 720;

export function getLayoutMode(
  screenWidth: number,
  screenHeight: number
): LayoutMode {
  return screenWidth < screenHeight ? "mobile" : "desktop";
}

export function computeLayout(
  screenWidth: number,
  screenHeight: number
): LayoutMetrics {
  const mode = getLayoutMode(screenWidth, screenHeight);

  const scale = Math.min(
    screenWidth / DESIGN_WIDTH,
    screenHeight / DESIGN_HEIGHT
  );

  const offsetX = (screenWidth - DESIGN_WIDTH * scale) / 2;
  const offsetY = (screenHeight - DESIGN_HEIGHT * scale) / 2;

  if (mode === "desktop") {
    const topPanelHeight = 80;
    const bottomPanelHeight = 120;
    const gameAreaHeight = DESIGN_HEIGHT - topPanelHeight - bottomPanelHeight;

    return {
      mode,
      screenWidth,
      screenHeight,
      designWidth: DESIGN_WIDTH,
      designHeight: DESIGN_HEIGHT,
      scale,
      offsetX,
      offsetY,
      topPanelY: 0,
      gameLayerY: topPanelHeight,
      bottomPanelY: topPanelHeight + gameAreaHeight,
      topPanelHeight,
      gameAreaHeight,
      bottomPanelHeight,
    };
  }

  const topPanelHeight = 110;
  const bottomPanelHeight = 170;
  const gameAreaHeight = DESIGN_HEIGHT - topPanelHeight - bottomPanelHeight;

  return {
    mode,
    screenWidth,
    screenHeight,
    designWidth: DESIGN_WIDTH,
    designHeight: DESIGN_HEIGHT,
    scale,
    offsetX,
    offsetY,
    topPanelY: 0,
    gameLayerY: topPanelHeight,
    bottomPanelY: topPanelHeight + gameAreaHeight,
    topPanelHeight,
    gameAreaHeight,
    bottomPanelHeight,
  };
}

export function applyLayout(layers: Layers, layout: LayoutMetrics): void {
  // Вписываем всю сцену в экран
  layers.root.scale.set(layout.scale);
  layers.root.position.set(layout.offsetX, 0);

  // Фон занимает всю дизайн-сцену
  layers.backgroundLayer.position.set(0, 0);

  // Игровой слой начинается после верхней панели
  layers.gameLayer.position.set(0, layout.gameLayerY);

  // UI живёт в координатах всей сцены
  layers.uiLayer.position.set(0, 0);

  // Панели внутри UI
  layers.topPanelLayer.position.set(0, layout.topPanelY);
  layers.bottomPanelLayer.position.set(0, layout.bottomPanelY);
  layers.modalLayer.position.set(0, 0);

  // Внутренние игровые слои обычно друг на друге
  layers.reelsLayer.position.set(0, 0);
  layers.winlinesLayer.position.set(0, 0);
  layers.effectsLayer.position.set(0, 0);


  // 👇 DEBUG
  drawLayoutDebug(layers, layout);
}

export function updateLayout(width: number, height:number,layers:Layers) {
    const layout = computeLayout(width, height);
    applyLayout(layers, layout);
  }


export function drawDebugRect(
  parent: Container,
  x: number,
  y: number,
  width: number,
  height: number,
  color: number,
  alpha = 0.2
) {
  const g = new Graphics();

  g.rect(x, y, width, height);
  g.fill({ color, alpha });

  g.rect(x, y, width, height);
  g.stroke({ color, width: 2 });

  parent.addChild(g);

  return g;
}

let debugLayer: Container | null = null;

function drawLayoutDebug(layers: Layers, layout: LayoutMetrics) {
  // удаляем старый debug
  if (debugLayer) {
    debugLayer.destroy({ children: true });
  }

  debugLayer = new Container();
  debugLayer.label = "Debug Layer";

  layers.root.addChild(debugLayer);

  // Вся сцена
  drawDebugRect(
    debugLayer,
    0,
    0,
    layout.designWidth,
    layout.designHeight,
    0xffffff,
    0.05
  );

  // Top panel
  drawDebugRect(
    debugLayer,
    0,
    layout.topPanelY,
    layout.designWidth,
    layout.topPanelHeight,
    0x00ff00
  );

  // Game area
  drawDebugRect(
    debugLayer,
    0,
    layout.gameLayerY,
    layout.designWidth,
    layout.gameAreaHeight,
    0x0000ff
  );

  // Bottom panel
  drawDebugRect(
    debugLayer,
    0,
    layout.bottomPanelY,
    layout.designWidth,
    layout.bottomPanelHeight,
    0xff0000
  );
}