
import { createLayers } from "./layers";
import "../style.css";
import { Application} from "pixi.js";
import { handleResize, updateLayout } from "./resize.ts";
import { createTopPanel, createTopPanelBox } from "../ui/top_panel/create_top_panel.ts";
import { computeTopPanelMetrics } from "../ui/top_panel/topPanel.layout.ts";

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

  let topPanel = createTopPanel(layers, topPanelMetrics);

  //layers.topPanelLayer.addChild(box);
  
  window.addEventListener("resize", ()=>{
      handleResize(layers);
  });
}

start();


