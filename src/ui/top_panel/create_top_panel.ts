import { Container, Graphics, Text, Assets, Texture, Sprite} from "pixi.js";
import type { TopPanelMetrics } from "./topPanel.layout";
import { Button, FancyButton } from "@pixi/ui";
import { type Layers } from "../../app/layers";
import {basicHUDStyle} from "../font_settings";
import { initSlotAtlasAssets } from "../../assets/slot_atlas_assets";


const atlas = await initSlotAtlasAssets();

export type TopPanel = {
  container: Container
  background: Graphics
  balance: Text
  bet: Text
  win: Text
  soundBtn: FancyButton
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

  //Sound BTN
  const soundBtn = createSoundButton();
  soundBtn.scale.set(metrics.scale);
  soundBtn.anchor.set(0.5);
  soundBtn.position.set(metrics.width - (soundBtn.width + metrics.paddingX), metrics.height/2);

  container.addChild(background,balance,win,bet,soundBtn);
  
  return {
      container,
      background,
      balance,
      bet,
      win,
      soundBtn
  };
}

function createSoundButton() {
  const soundTexture = atlas.buttons.sound;

  const sprite = new Sprite(soundTexture);
  sprite.anchor.set(0.5);

  const button = new FancyButton({
    defaultView: sprite,

    animations: {
      hover: {
        props: {
          scale: { x: 1.1, y: 1.1 }
        },
        duration: 100,
      },
      pressed: {
        props: {
          scale: { x: 0.9, y: 0.9 }
        },
        duration: 100,
      }
    }
  });

  button.onPress.connect(() => {
    console.log('Button pressed!');
  });

  return button;
}