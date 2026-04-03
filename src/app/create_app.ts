
import { createLayers } from "./layers";
import "../style.css";
import { Application} from "pixi.js";
import { applyLayout, computeLayout, handleResize, updateLayout } from "./resize.ts";
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

  

  const layers = createLayers();
  app.stage.addChild(layers.root);

  let newLayout = updateLayout(layers);

  const topPanelMetrics = computeTopPanelMetrics(newLayout);
  const box = createTopPanelBox(topPanelMetrics);

  layers.topPanelLayer.addChild(box);
  
  window.addEventListener("resize", ()=>{
      handleResize(layers);
  });
}

start();


