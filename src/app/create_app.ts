
import { createLayers } from "./layers";
import "../style.css";
import { Application} from "pixi.js";
import { handleResize, updateLayout } from "./resize.ts";
import { createTopPanel} from "../ui/top_panel/create_top_panel.ts";
import { computeTopPanelConfigs } from "../ui/top_panel/topPanel.layout.ts";
import { createBottomPanel } from "../ui/bottom_panel/create_bottom_panel.ts";
import { computeBottomPanelConfigs } from "../ui/bottom_panel/bottom_panel.layouts.ts";
import { initSlotAtlasAssets } from "../assets/slot_atlas_assets.ts";

export const atlas = await initSlotAtlasAssets();

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

  window.addEventListener("resize", () => {
    handleResize(layers, topPanel, bottomPanel);
  });
}

start();


