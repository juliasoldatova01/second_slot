import { Graphics, type Container } from "pixi.js";
import type { Layers } from "../../app/layers";
import type { GameLayerConfigs } from "./game_area_configs";
import {
  createReelsContainerView,
  updateReelsContainerView,
  type ReelsContainerView,
} from "./reels_view";

const borderConfigs = {
  width: 12,
  radius: 24,
  color: 0x4c535c,
};

export type GameArea = {
  background: Graphics;
  frame: Graphics;
  container: Container;
  reels: ReelsContainerView;
};

export function createGameArea(
  layers: Layers,
  configs: GameLayerConfigs,
): GameArea {
  let container = layers.gameLayer;
  const background = new Graphics();
  drawBG(background, configs.width, configs.height);
  let frame = drawFrame(configs);
  const reels = createReelsContainerView(layers, configs);
  container.addChild(background, frame, reels.container);
  const gameArea: GameArea = {
    background,
    frame,
    container,
    reels,
  };
  return gameArea;
}

export function updateGameArea(gameArea: GameArea, configs: GameLayerConfigs) {
  drawBG(gameArea.background, configs.width, configs.height);
  updateReelsContainerView(gameArea.reels, configs);
  updateFrame(gameArea.frame, configs);
}

function drawBG(bg: Graphics, width: number, height: number) {
  bg.clear();
  bg.rect(0, 0, width, height);
  bg.fill(0x2b333c);
}

function drawFrame(configs: GameLayerConfigs): Graphics {
  const reelsW = configs.reels.reelsW;
  const reelsH = configs.reels.reelsH;
  const frame = new Graphics();

  frame
    .roundRect(
      0,
      0,
      reelsW + borderConfigs.width * 2,
      reelsH + borderConfigs.width * 2,
      borderConfigs.radius,
    )
    .stroke({
      width: borderConfigs.width,
      color: borderConfigs.color,
      join: "round",
      alignment: 0,
    });

  frame.label = "Frame";

  // центрируем по game area
  frame.position.set(
    (configs.width - reelsW) / 2 - borderConfigs.width,
    (configs.height - reelsH) / 2 - borderConfigs.width,
  );

  return frame;
}

function updateFrame(frame: Graphics, configs: GameLayerConfigs) {
  // центрируем по game area
  frame.position.set(
    (configs.width - configs.reels.reelsW) / 2 - borderConfigs.width,
    (configs.height - configs.reels.reelsH) / 2 - borderConfigs.width,
  );
}
