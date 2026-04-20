import "./style.css";
import { createLayers } from "./app/layers.ts";
import { handleResize, updateLayout } from "./app/resize.ts";
import { createTopPanel } from "./ui/top_panel/create_top_panel.ts";
import { computeTopPanelConfigs } from "./ui/top_panel/top_panel_configs.ts";
import { createBottomPanel } from "./ui/bottom_panel/create_bottom_panel.ts";
import { computeBottomPanelConfigs } from "./ui/bottom_panel/bottom_panel_configs.ts";
import { computeGameLayerConfigs } from "./ui/game_area/game_area_configs.ts";
import { createGameArea } from "./ui/game_area/game_layer.ts";
import { loadSlotAssets } from "./assets/slot_assets.ts";
import { initializeGame } from "./controllers/game_controller.ts";
import { createPixiApp } from "./utils/pixi.ts";

await loadSlotAssets();

export const app = await createPixiApp();

const layers = createLayers();
app.stage.addChild(layers.root);

const layout = updateLayout(layers);

const topPanelConfigs = computeTopPanelConfigs(layout);
export const topPanel = createTopPanel(layers, topPanelConfigs);

const bottomPanelConfigs = computeBottomPanelConfigs(layout);
export const bottomPanel = createBottomPanel(layers, bottomPanelConfigs);

const gameLayerConfigs = computeGameLayerConfigs(layout);

export const gameArea = createGameArea(layers, gameLayerConfigs);

window.addEventListener("resize", () => {
  handleResize(layers, topPanel, bottomPanel, gameArea);
});

initializeGame();
