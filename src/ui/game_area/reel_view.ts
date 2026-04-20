import { Container } from "pixi.js";
import type { GameLayerConfigs } from "./game_area_configs";
import {
  type SymbolType,
  type SymbolView,
  createSymbolView,
  SYMBOLS,
  updateSymbolView,
} from "./symbol_view";

export type ReelView = {
  kind: "ReelView";
  index: number;
  container: Container;
  symbols?: SymbolView[];
  visibleRows: number;
  width: number;
  height: number;
  x: number;
  y: number;
};

export function createReelView(
  index: number,
  configs: GameLayerConfigs,
): ReelView {
  let container = new Container();
  container.label = "Reel";
  const reel: ReelView = {
    kind: "ReelView",
    index: index,
    container,
    visibleRows: configs.reel.visibleRows,
    width: configs.reel.reelW,
    height: configs.reel.reelH,
    x: 0,
    y: 0,
  };
  populateWithSymbols(reel, configs);
  updateReelView(reel, configs);
  return reel;
}

export function updateReelView(reel: ReelView, configs: GameLayerConfigs) {
  //const width = configs.reel.reelW;
  //const height = configs.reel.reelH;

  const x = getReelX(reel, configs);
  //const y = getReelY(configs);

  //reel.width = width;
  //reel.height = height;
  reel.x = x;
  reel.y = 0;

  // для обычного layout pivot тут не нужен
  reel.container.position.set(x, reel.y);
}

function getReelX(reel: ReelView, configs: GameLayerConfigs): number {
  const reelCount = configs.reel.count;
  const reelWidth = configs.reel.reelW;
  const gap = configs.reel.gap;

  const totalWidth = reelCount * reelWidth + (reelCount - 1) * gap;
  console.log("Total width" + totalWidth);
  const startX = 0;

  return startX + reel.index * (reelWidth + gap);
}

// function getReelY(configs: GameLayerConfigs): number {
//   return (configs.height - configs.reel.reelH) / 2;
// }

const SYMBOL_VALUES = Object.values(SYMBOLS);

export function getRandomSymbolType(): SymbolType {
  return SYMBOL_VALUES[Math.floor(Math.random() * SYMBOL_VALUES.length)];
}

function populateWithSymbols(reel: ReelView, configs: GameLayerConfigs) {
  for (let index = 0; index < configs.symbol.count; index++) {
    const type = getRandomSymbolType();
    const symbol = createSymbolView(index, type, configs);
    reel.container.addChild(symbol.container);
    console.log(symbol.type);
    reel.symbols?.push(symbol);
    updateSymbolView(symbol, configs);
  }
}
