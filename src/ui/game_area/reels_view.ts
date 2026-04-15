import { Container, Graphics} from "pixi.js"
import type { Layers } from "../../app/layers"
import type { GameLayerConfigs } from "./game_area_configs"
import { createReelView, updateReelView, type ReelView } from "./reel_view"



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
populateWithReel(reels,configs);
// обновляем при старте
updateReelsContainerView(reels, configs);
    return reels
}

export function updateReelsContainerView(reels: ReelsContainerView, configs: GameLayerConfigs){

    let width = configs.reels.reelsW;
    let height = configs.reels.reelsH;
    reels.container.position.set(
    (configs.width - width) / 2,
    (configs.height - height) / 2
  );

    reels.container.setSize(width, height);

    drawMask(reels.mask, width, height);
    if(reels.reels){
        if(reels.reels.length > 0){
            reels.reels.forEach(reel => {
                updateReelView(reel,configs);
            })
        }
    }
}


function drawMask(mask: Graphics, width:number, height:number) {
    mask.clear();
    mask.rect(0, 0, width, height);
    mask.fill(0xffffff);
    console.log(mask.width);
}

function populateWithReel(reels: ReelsContainerView , configs: GameLayerConfigs){
    for (let index = 0; index < configs.reel.count; index++) {
    const reel = createReelView(index, configs);
        reels.container.addChild(reel.container);
        reels.reels?.push(reel);
        updateReelView(reel,configs);
    }
}


