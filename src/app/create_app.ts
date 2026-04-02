
import { createLayers } from "./layers";
import "../style.css";
import { Application} from "pixi.js";
import { applyLayout, computeLayout, updateLayout } from "./resize.ts";
import { createTopPanelBox } from "../ui/top_panel.ts";
import { computeTopPanelMetrics } from "./topPanel.layout.ts";

async function start() {
  const app = new Application;
  (globalThis as any).__PIXI_APP__ = app;

  await app.init({
    resizeTo: window,
    background: "#1a1a1a",
  });
  

  document.body.appendChild(app.canvas);

  function getViewportSize() {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
}

  const layers = createLayers();
  app.stage.addChild(layers.root);

  const { width, height } = getViewportSize();
  const layout = computeLayout(width, height);

  applyLayout(layers, layout);

  const topPanelMetrics = computeTopPanelMetrics(layout);
  const box = createTopPanelBox(topPanelMetrics);

  layers.topPanelLayer.addChild(box);
  
  window.addEventListener("resize", ()=>{
    updateLayout(width,height,layers);
  });
}

start();


