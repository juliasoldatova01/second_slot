import { Container, Graphics} from "pixi.js"
import type { Layers } from "../../app/layers"
import type { GameLayerConfigs } from "./game_area_configs"

export type ReelView = {
    id: number
    symbols?: Symbol[],
    container: Container,
    visibleRows: number,
    width: number,
    height: number,
    x:number,
    y:number    
}

export type ReelsContainerView = {
    container: Container
    background: Graphics,
    reels?: ReelView[]
    mask: Graphics
}

export function createReelsContainerView(layers: Layers, configs: GameLayerConfigs): ReelsContainerView{

const container = layers.reelsLayer;
  
const background = new Graphics();

// создаём маску
const mask = new Graphics();
mask.label = "Mask"
container.addChild(mask, background);

// применяем маску
container.mask = mask;

let reels: ReelsContainerView = {
    container,
    background,    
    mask
}
// обновляем при старте
updateReelsContainerView(reels, configs);
    return reels
}

export function updateReelsContainerView(reels: ReelsContainerView, configs: GameLayerConfigs){

    let width = configs.reels.reelsW;
    let height = configs.reels.reelsH;
    reels.container.pivot.set(width / 2, height / 2);
    reels.container.position.set(configs.width / 2, configs.height / 2);

    reels.container.setSize(width, height);

    drawMask(reels.mask, width, height);

}


function drawMask(mask: Graphics, width:number, height:number) {
    mask.clear();
    mask.rect(0, 0, width, height);
    mask.fill(0xffffff);
}

