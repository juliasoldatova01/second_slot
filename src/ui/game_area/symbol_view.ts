import { Container, Assets, Sprite } from "pixi.js";
import type { GameLayerConfigs } from "./game_area_configs";
import { getSlotAssets } from "../../assets/slot_assets";

export const SYMBOLS = {
  A: "A",
  Coins: "Coins",
  Bell: "Bell",
  Diamond: "Diamond",
  Ten: "Ten",
  Q: "Q",
  Cherries: "Cherries",
  CoinStar: "CoinStar",
  Bar: "Bar",
} as const;

export type SymbolType = (typeof SYMBOLS)[keyof typeof SYMBOLS];

export type SymbolView = {
  index: number;
  kind: "SymbolView";
  type: SymbolType;
  container: Container;
  background: Sprite;
  width: number;
  height: number;
};

export function createSymbolView(
  index: number,
  type: SymbolType,
  configs: GameLayerConfigs,
): SymbolView {
  const container = new Container();
  container.label = `Symbol_${type}`;

  const texture = getTextureBySymbolType(type);
  const background = new Sprite(texture);

  container.addChild(background);

  const symbol: SymbolView = {
    index: index,
    kind: "SymbolView",
    type,
    container,
    background,
    width: configs.symbol.width,
    height: configs.symbol.height,
  };

  updateSymbolView(symbol, configs);
  return symbol;
}

export function updateSymbolView(
  symbol: SymbolView,
  configs: GameLayerConfigs,
  type?: SymbolType,
) {
  symbol.container.y = getSymbolY(symbol.index, configs);
  if (type) {
    symbol.type = type;
    const texture = getTextureBySymbolType(type);
    const newBG = new Sprite(texture);
    symbol.background = newBG;
  }
  symbol.width = configs.symbol.width;
  symbol.height = configs.symbol.height;

  symbol.container.y = getSymbolY(symbol.index, configs);

  const scaleX = configs.symbol.width / symbol.background.texture.width;
  const scaleY = configs.symbol.height / symbol.background.texture.height;
  const scale = Math.min(scaleX, scaleY);

  symbol.background.scale.set(scale);
}

function getSymbolY(index: number, configs: GameLayerConfigs): number {
  const symH = configs.symbol.height;
  return index * (symH + configs.symbol.gap) - symH;
}

function getTextureBySymbolType(type: SymbolType) {
  const assets = getSlotAssets();

  const textureMap = {
    A: assets.symbols.a,
    Coins: assets.symbols.coins,
    Bell: assets.symbols.bell,
    Diamond: assets.symbols.diamond,
    Ten: assets.symbols.ten,
    Q: assets.symbols.q,
    Cherries: assets.symbols.cherries,
    CoinStar: assets.symbols.coinStar,
    Bar: assets.symbols.bar,
  } as const;

  return textureMap[type];
}
