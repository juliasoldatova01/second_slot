import { Container, Graphics, Text, Sprite, Rectangle} from "pixi.js";
import type { TopPanelConfigs } from "./top_panel_configs";
import {FancyButton } from "@pixi/ui";
import { type Layers } from "../../app/layers";
import {basicHUDStyle} from "../font_settings";
import { getSlotAssets } from "../../assets/slot_assets";

export type TopPanel = {
  container: Container,
  textBlock:Container,
  background: Graphics,
  balance: Text
  bet: Text
  win: Text
  soundBtn: FancyButton,
  configs: TopPanelConfigs;
}

export function createTopPanel(layers: Layers, configs: TopPanelConfigs):TopPanel{
 
  const container = layers.topPanelLayer;

  const background = new Graphics();

  let width = configs.width
  let height = configs.height

  // основной фон
  background.roundRect(0, 0, width, height, 0);
  background.fill({
    color: 0x2b3442
  });

  // можно добавить декоративные линии
  background.rect(0, 0, width, 1).fill({ color: 0x5d6775, alpha: 0.35 });
  background.rect(0, height, width, 1).fill({ color: 0x11161f, alpha: 0.7 });

  let balance = new Text({
  text: "Balance: $1000",
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

  let textBlock = new Container();
  textBlock.addChild(balance,bet,win);
  //Sound BTN
  const soundBtn = createSoundButton();
 

  container.addChild(background,textBlock,soundBtn);
  
  const panel: TopPanel = {
    container,
      background,
      textBlock,
      balance,
      bet,
      win,
      soundBtn,
      configs
  }

  updateTopPanel(panel,configs)
  return panel;
}

export function updateTopPanel(panel: TopPanel, configs: TopPanelConfigs){

  panel.textBlock.x = configs.paddingX;
  panel.textBlock.y = configs.height / 2;
  let texts = panel.textBlock.children as Text[]
  texts.forEach((t=>{
    t.style.fontSize = configs.fontSize;
    t.anchor.set(0, 0.5);
  }));
 
  panel.balance.x = 0;
  
  panel.bet.x = panel.balance.x + panel.balance.width + configs.gap; 
  
  panel.win.x = panel.bet.x + panel.bet.width + configs.gap;

  panel.soundBtn.anchor.set(0.5);
  panel.soundBtn.position.set(configs.width - (panel.soundBtn.width + configs.paddingX), configs.height/2);
  
}

function createSoundButton() {
  const atlas = getSlotAssets();
  const soundTexture = atlas.buttons.sound.default;
  const soundMutedTexture = atlas.buttons.sound.disabled;

  const icon = new Sprite(soundTexture);
  icon.anchor.set(0.5);

  let isOn = true;

  const button = new FancyButton({
    defaultView: icon,  
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

  button.width = 100;
  button.height = 100;

  button.onPress.connect(() => {
    isOn = !isOn;
    icon.texture = isOn ? soundTexture : soundMutedTexture;
  });
  
  button.hitArea = new Rectangle(
    0,0,button.width, button.height
  );

  return button;
}

