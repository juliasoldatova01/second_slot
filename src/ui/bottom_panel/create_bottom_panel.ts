import { Container, Graphics, Assets,} from "pixi.js";
import { type Layers } from "../../app/layers";

import {TextButton} from "../text_button"
import type { BottomPanelConfigs } from "./bottom_panel_configs";
import { createStretcingBg } from "../ui_helpers";
import { computeSpinButtonConfig, defaultTextButtonConfig} from "../button_config";
import { createSpinBtn, type SwitchButton } from "./spin_btn";


export type BottomPanel = {
  container: Container
  background: Graphics
  autoSpin: TextButton,
  turbo: TextButton,
  betUp: TextButton,
  betDown: TextButton,
  left:Container,
  right: Container,
  spinBtn: SwitchButton,
  configs: BottomPanelConfigs
}

await Assets.load([
  '/assets/img/bg_bottom.png',
]);

export function createBottomPanel(layers: Layers, configs: BottomPanelConfigs): BottomPanel {
    let autoSpin = new TextButton("Auto Spin", defaultTextButtonConfig);
    let turbo = new TextButton("Turbo", defaultTextButtonConfig);
    let betUp = new TextButton("Bet +", defaultTextButtonConfig);
    let betDown = new TextButton("Bet -",defaultTextButtonConfig);

    

    let container = layers.bottomPanelLayer;
    const spinButtonConfig = computeSpinButtonConfig(configs);
    const spinBtn = createSpinBtn(spinButtonConfig);
    
    const background = createStretcingBg('/assets/img/bg_bottom.png', configs.width,configs.height);
    

    let left = new Container();
    let right = new Container();
    
  
    left.addChild(autoSpin.container,turbo.container)    
    
    right.addChild(betUp.container,betDown.container)  
   
    container.addChild(background, left,right, spinBtn.container);

   

        let bottomPanel:BottomPanel = {
            container,
            background,
            left,
            right,
            autoSpin,
            turbo,
            betUp,
            betDown,
            spinBtn,
            configs
        }

      updateBottomPanel(bottomPanel, configs);
        return bottomPanel
    }

    export function updateBottomPanel(panel:BottomPanel, configs:BottomPanelConfigs){

      panel.background.width = configs.width
      panel.background.height = configs.height

       // layout внутри левой группы
    panel.autoSpin.container.x = 0;
    panel.turbo.container.x = panel.autoSpin.container.width + configs.gap;

    // layout внутри правой группы
    panel.betUp.container.x = 0;
    panel.betDown.container.x = panel.betUp.container.width + configs.gap;

    // позиция по Y внутри панели
    const leftBounds = panel.left.getLocalBounds();
    const rightBounds = panel.right.getLocalBounds();

    panel.left.y = (configs.height - leftBounds.height) / 2;
    panel.right.y = (configs.height - rightBounds.height) / 2;

    // ставим левую группу от левого края
    panel.left.x = configs.paddingX;
    // ставим правую группу от правого края
    panel.right.x = configs.width - configs.paddingX - rightBounds.width;
    }
    