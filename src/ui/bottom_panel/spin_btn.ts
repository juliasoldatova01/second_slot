import { Sprite } from "pixi.js";
import { type ButtonState, type SpinButtonConfig } from "../button_config";
import { FancyButton } from "@pixi/ui";
import { getSlotAssets } from "../../assets/slot_assets";

export type SwitchButton = {
  container: FancyButton;
  state: ButtonState;
  setState: (state: ButtonState) => void;
  onClick?: () => void;
};

export function createSpinBtn(configs: SpinButtonConfig): SwitchButton {
  const atlas = getSlotAssets();
  const icon = new Sprite(atlas.buttons.spin.default);
  icon.anchor.set(0.5);

  const iconDisabled = new Sprite(atlas.buttons.spin.disabled);
  const iconPressed = new Sprite(atlas.buttons.spin.pressed);

  const button = new FancyButton({
    defaultView: icon,
    disabledView: iconDisabled,
    pressedView: iconPressed,
    animations: {
      hover: {
        props: {
          scale: { x: 1.1, y: 1.1 },
        },
        duration: 100,
      },
      pressed: {
        props: {
          scale: { x: 0.9, y: 0.9 },
        },
        duration: 100,
      },
    },
  });

  button.anchor.set(0.5, 1);
  button.x = configs.x;
  button.y = configs.y;
  button.width = configs.width;
  console.log(button.width);
  button.height = configs.height;

  const spinBtn: SwitchButton = {
    container: button,
    state: "active",
    setState: (newState: ButtonState) => {
      spinBtn.state = newState;
    },
  };

  return spinBtn;
}
