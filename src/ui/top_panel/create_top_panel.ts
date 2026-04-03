import { Container, Graphics, Text} from "pixi.js";
import type { TopPanelMetrics } from "./topPanel.layout";
import type { Button } from "@pixi/ui";
import { type Layers } from "../../app/layers";
import {basicHUDStyle} from "../font_settings";

export type TopPanel = {
  container: Container
  background: Graphics
  balance: Text
  bet: Text
  win: Text
  soundBtn: Button | null
}

export function createTopPanel(layers: Layers, metrics: TopPanelMetrics):TopPanel{
  const container = layers.topPanelLayer;

  const background = new Graphics();

  let width = metrics.width
  let height = metrics.height

  let fontSize = metrics.height * 0.2;

  // основной фон
  background.roundRect(0, 0, width, height, 0);
  background.fill({
    color: 0x2b3442
  });

  // можно добавить декоративные линии
  background.rect(0, 0, width, 1).fill({ color: 0x5d6775, alpha: 0.35 });
  background.rect(0, height, width, 1).fill({ color: 0x11161f, alpha: 0.7 });

  let balance = new Text({
  text: "Balance: 1000",
  style: basicHUDStyle
  });

  const win = new Text({
  text: 'Win: $0.00',
  style: basicHUDStyle,
});

  let bet = new Text({
  text: "Bet: 5",
  style: basicHUDStyle
  });


  balance.x = metrics.paddingX;
  balance.y = metrics.height / 2;
  bet.x = balance.x + balance.width + metrics.gap * 2;
  bet.y = metrics.height / 2;
  win.x = bet.x + bet.width + metrics.gap * 2;
  win.y = metrics.height / 2;

  balance.anchor.set(0, 0.5);
  bet.anchor.set(0, 0.5);
  win.anchor.set(0, 0.5);

  balance.style.fontSize = fontSize;
  bet.style.fontSize = fontSize;
  win.style.fontSize = fontSize;

  container.addChild(background,balance,win,bet);

  return {
      container,
      background,
      balance,
      bet,
      win,
      soundBtn: null
  };
}

export function createTopPanelBox(metrics: TopPanelMetrics) {
  const box = new Graphics()
    .rect(0, 0, metrics.itemSize, metrics.itemSize)
    .fill(0xff0000);

  const x = metrics.paddingX;
  const y = (metrics.height - metrics.itemSize) / 2;

  box.position.set(x, y);

  return box;
}