import { Graphics, type Container } from "pixi.js";
import type { Layers } from "../../app/layers";
import type { GameLayerConfigs } from "./game_area_configs";
import { createReelsContainerView, updateReelsContainerView, type ReelsContainerView } from "./reels_view";

export type GameArea = {
    background: Graphics
    container: Container,
    reels: ReelsContainerView;
}

export function createGameArea(layers: Layers, configs: GameLayerConfigs):GameArea{
    let container = layers.gameLayer;
    const background = new Graphics();
    drawBG(background, configs.width, configs.height);
    const reels = createReelsContainerView(layers, configs);
    container.addChild(background,reels.container);
    const gameArea: GameArea = {
        background,
        container,
        reels
    }
    return gameArea
}

export function updateGameArea(gameArea: GameArea, configs: GameLayerConfigs){
    drawBG(gameArea.background, configs.width, configs.height);
    updateReelsContainerView(gameArea.reels, configs);
}

function drawBG(bg: Graphics, width:number, height:number) {
    bg.clear();
    bg.rect(0, 0, width, height);
    bg.fill(0x2b2b2b);
}