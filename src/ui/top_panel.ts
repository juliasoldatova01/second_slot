import { Graphics } from "pixi.js";
import type { TopPanelMetrics } from "../app/topPanel.layout";

export function createTopPanelBox(metrics: TopPanelMetrics) {
  const box = new Graphics()
    .rect(0, 0, metrics.itemSize, metrics.itemSize)
    .fill(0xff0000);

  const x = metrics.paddingX;
  const y = (metrics.height - metrics.itemSize) / 2;

  box.position.set(x, y);

  return box;
}