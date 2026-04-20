import "./style.css";
import { createLayers } from "./app/layers.ts";
import { Application, type Renderer, Ticker } from "pixi.js";
import { handleResize, updateLayout } from "./app/resize.ts";
import { createTopPanel } from "./ui/top_panel/create_top_panel.ts";
import { computeTopPanelConfigs } from "./ui/top_panel/top_panel_configs.ts";
import { createBottomPanel } from "./ui/bottom_panel/create_bottom_panel.ts";
import { computeBottomPanelConfigs } from "./ui/bottom_panel/bottom_panel_configs.ts";
import { computeGameLayerConfigs } from "./ui/game_area/game_area_configs.ts";
import { createGameArea } from "./ui/game_area/game_layer.ts";
import { loadSlotAssets } from "./assets/slot_assets.ts";
import { initializeGame } from "./controllers/game_controller.ts";
import { runApp } from "./app/ticker.ts";

await loadSlotAssets();
async function start() {
  const app = new Application();
  (globalThis as any).__PIXI_APP__ = app;

  await app.init({
    resizeTo: window,
    background: "#1a1a1a",
  });

  document.body.appendChild(app.canvas);

  const layers = createLayers();
  app.stage.addChild(layers.root);

  const layout = updateLayout(layers);

  const topPanelConfigs = computeTopPanelConfigs(layout);
  const topPanel = createTopPanel(layers, topPanelConfigs);

  const bottomPanelConfigs = computeBottomPanelConfigs(layout);
  const bottomPanel = createBottomPanel(layers, bottomPanelConfigs);

  const gameLayerConfigs = computeGameLayerConfigs(layout);

  const gameArea = createGameArea(layers, gameLayerConfigs);

  window.addEventListener("resize", () => {
    handleResize(layers, topPanel, bottomPanel, gameArea);
  });

  // function update(dt: number) {
  //   initializeGame(topPanel, gameArea, bottomPanel, dt);
  // }

  // const tickerFn = (t: Ticker) => {
  //   let dt = t.deltaMS / 1000;
  //   dt = Math.min(dt, 0.05);
  //   update(dt);
  // };

  // app.ticker.add(tickerFn);

  initializeGame(topPanel);
}

start();
