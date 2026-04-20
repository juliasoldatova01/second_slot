import { Application, Container } from "pixi.js";

export type Layers = {
  root: Container;

  backgroundLayer: Container;

  gameLayer: Container;
  effectsLayer: Container;
  reelsLayer: Container;
  winlinesLayer: Container;

  uiLayer: Container;
  topPanelLayer: Container;
  bottomPanelLayer: Container;
  modalLayer: Container;
};

export function createLayers(): Layers {
  const root = new Container();
  root.label = "Root";

  const backgroundLayer = new Container();
  backgroundLayer.label = "BG Layer";
  const gameLayer = new Container();
  gameLayer.label = "Game Layer";
  const uiLayer = new Container();
  uiLayer.label = "UI Layer";

  const reelsLayer = new Container();
  reelsLayer.label = "Reels Layer";
  const effectsLayer = new Container();
  effectsLayer.label = "Effects Layer";
  const winlinesLayer = new Container();
  winlinesLayer.label = "Winlines Layer";

  const topPanelLayer = new Container();
  topPanelLayer.label = "Top Panel Layer";
  const bottomPanelLayer = new Container();
  bottomPanelLayer.label = "Bottom Panel Layer";
  const modalLayer = new Container();
  modalLayer.label = "Modal Layer";

  root.addChild(backgroundLayer, gameLayer, uiLayer);

  gameLayer.addChild(reelsLayer, winlinesLayer, effectsLayer);

  uiLayer.addChild(topPanelLayer, bottomPanelLayer, modalLayer);

  const layers: Layers = {
    root: root,
    backgroundLayer: backgroundLayer,
    gameLayer: gameLayer,
    effectsLayer: effectsLayer,
    reelsLayer: reelsLayer,
    winlinesLayer: winlinesLayer,
    uiLayer: uiLayer,
    topPanelLayer: topPanelLayer,
    bottomPanelLayer: bottomPanelLayer,
    modalLayer: modalLayer,
  };

  return layers;
}
