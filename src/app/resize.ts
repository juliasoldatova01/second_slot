import type { Layers } from "./layers";
import { Graphics, Container } from "pixi.js";
import { computeTopPanelConfigs } from "../ui/top_panel/top_panel_configs";
import { computeBottomPanelConfigs } from "../ui/bottom_panel/bottom_panel_configs";
import {
  updateBottomPanel,
  type BottomPanel,
} from "../ui/bottom_panel/create_bottom_panel";
import {
  type TopPanel,
  updateTopPanel,
} from "../ui/top_panel/create_top_panel";
import { computeGameLayerConfigs } from "../ui/game_area/game_area_configs";
import { updateGameArea, type GameArea } from "../ui/game_area/game_layer";

export type LayoutMode = "desktop" | "mobile";

export type LayoutConfigs = {
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

type Viewport = {
  width: number;
  height: number;
};

export const DESIGN_WIDTH = 1280;
export const DESIGN_HEIGHT = 720;

export function getLayoutMode(
  screenWidth: number,
  screenHeight: number,
): LayoutMode {
  return screenWidth < screenHeight ? "mobile" : "desktop";
}

function getViewportSize(): Viewport {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
}

export function computeLayout(): LayoutConfigs {
  let viewport: Viewport = getViewportSize();
  const mode = getLayoutMode(viewport.width, viewport.height);

  // Масштабируем сцену по ширине.
  // Тогда верх и низ можно "приклеить",
  // а центральную часть растягивать по высоте.
  const scale = viewport.width / DESIGN_WIDTH;

  // Сколько дизайн-единиц помещается по высоте
  // при текущем масштабе
  const designHeight = viewport.height / scale;

  const topPanelHeight = mode === "desktop" ? 150 : 150;
  const bottomPanelHeight = mode === "desktop" ? 250 : 150;

  const topPanelY = 0;
  const bottomPanelY = designHeight - bottomPanelHeight;
  const gameLayerY = topPanelHeight;
  const gameAreaHeight = bottomPanelY - gameLayerY;

  return {
    mode,
    screenWidth: viewport.width,
    screenHeight: viewport.height,

    designWidth: DESIGN_WIDTH,
    designHeight,

    scale,
    offsetX: 0,
    offsetY: 0,

    topPanelY,
    gameLayerY,
    bottomPanelY,

    topPanelHeight,
    gameAreaHeight,
    bottomPanelHeight,
  };
}

export function applyLayout(layers: Layers, layout: LayoutConfigs): void {
  layers.root.scale.set(layout.scale);
  layers.root.position.set(layout.offsetX, layout.offsetY);

  // Фон живёт во всей сцене
  layers.backgroundLayer.position.set(0, 0);

  // Игровая зона начинается сразу после верхней панели
  layers.gameLayer.position.set(0, layout.gameLayerY);

  // UI располагается в координатах всей сцены
  layers.uiLayer.position.set(0, 0);

  // Верх и низ "приклеены"
  layers.topPanelLayer.position.set(0, layout.topPanelY);
  layers.bottomPanelLayer.position.set(0, layout.bottomPanelY);
  layers.modalLayer.position.set(0, 0);

  // Внутри gameLayer локальная система координат
  layers.reelsLayer.position.set(0, 0);
  layers.winlinesLayer.position.set(0, 0);
  layers.effectsLayer.position.set(0, 0);

  //drawLayoutDebug(layers, layout);
}

export function updateLayout(layers: Layers): LayoutConfigs {
  const layout = computeLayout();
  applyLayout(layers, layout);
  return layout;
}

export function handleResize(
  layers: Layers,
  topPanel: TopPanel,
  bottomPanel: BottomPanel,
  gameArea: GameArea,
) {
  const layout = updateLayout(layers);

  const topPanelConfigs = computeTopPanelConfigs(layout);
  updateTopPanel(topPanel, topPanelConfigs);

  const bottomPanelConfigs = computeBottomPanelConfigs(layout);
  updateBottomPanel(bottomPanel, bottomPanelConfigs);

  const gameLayerConfigs = computeGameLayerConfigs(layout);
  updateGameArea(gameArea, gameLayerConfigs);
}

export function drawDebugRect(
  parent: Container,
  x: number,
  y: number,
  width: number,
  height: number,
  color: number,
  alpha = 0.2,
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

function drawLayoutDebug(layers: Layers, layout: LayoutConfigs) {
  if (debugLayer) {
    debugLayer.destroy({ children: true });
  }

  debugLayer = new Container();
  debugLayer.label = "Debug Layer";

  layers.root.addChild(debugLayer);

  // Вся доступная сцена
  drawDebugRect(
    debugLayer,
    0,
    0,
    layout.designWidth,
    layout.designHeight,
    0xffffff,
    0.05,
  );

  // Top panel
  /* drawDebugRect(
    debugLayer,
    0,
    layout.topPanelY,
    layout.designWidth,
    layout.topPanelHeight,
    0x00ff00
  ); */

  // Game area
  drawDebugRect(
    debugLayer,
    0,
    layout.gameLayerY,
    layout.designWidth,
    layout.gameAreaHeight,
    0x0000ff,
  );

  // Bottom panel
  /*  drawDebugRect(
    debugLayer,
    0,
    layout.bottomPanelY,
    layout.designWidth,
    layout.bottomPanelHeight,
    0xff0000
  ); */
}
