import { FancyButton } from "@pixi/ui";
import { Container, Graphics, Rectangle, Text } from "pixi.js";
import { basicHUDStyle } from "./font_settings";
import {
  type ButtonState,
  type TextButtonConfig,
  defaultTextButtonConfig,
} from "./button_config";

import { DropShadowFilter } from "pixi-filters";

export class TextButton {
  public readonly container: FancyButton;
  public readonly text: Text;
  public state: ButtonState = "active";

  private readonly view: Container;
  private readonly bg: Graphics;
  private readonly gloss: Graphics;
  private readonly border: Graphics;
  private readonly shadow: DropShadowFilter;

  private config: TextButtonConfig;
  private clickHandler?: () => void;

  constructor(labelText = "Button", config: TextButtonConfig) {
    this.config = {
      ...defaultTextButtonConfig,
      ...config,
    };

    this.bg = new Graphics();
    this.gloss = new Graphics();
    this.border = new Graphics();

    this.text = new Text({
      text: labelText,
      style: {
        ...basicHUDStyle,
        fontSize: this.config.fontSize,
        fill: 0xffffff,
      },
    });
    this.text.anchor.set(0.5);

    this.view = new Container();
    this.view.addChild(this.bg, this.gloss, this.border, this.text);

    // 🔥 УПРОЩЕННАЯ ТЕНЬ (без offset)
    this.shadow = new DropShadowFilter({
      color: 0x000000,
      alpha: 0.35,
      blur: 6,
    });

    this.view.filters = [this.shadow as any];

    this.container = new FancyButton({
      defaultView: this.view,
      animations: {
        hover: {
          props: {
            scale: { x: 1.03, y: 1.03 },
          },
          duration: 100,
        },
        pressed: {
          props: {
            scale: { x: 0.97, y: 0.97 },
          },
          duration: 100,
        },
      },
    });

    this.container.onPress.connect(() => {
      if (this.state === "disabled") return;
      this.clickHandler?.();
    });

    this.redraw();
  }

  public setText(value: string): void {
    this.text.text = value;
    this.redraw();
  }

  public setState(state: ButtonState): void {
    this.state = state;
    this.redraw();
  }

  public setOnClick(handler?: () => void): void {
    this.clickHandler = handler;
  }

  public updateLayout(next: Partial<TextButtonConfig>): void {
    this.config = {
      ...this.config,
      ...next,
    };

    this.text.style = {
      ...basicHUDStyle,
      fontSize: this.config.fontSize ?? 28,
      fill: 0xffffff,
    };

    this.redraw();
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }

  private redraw(): void {
    const width = this.config.paddingX * 2 + this.text.width;
    const height = this.config.height;
    const radius = this.config.cornerRadius ?? 10;
    const anchorX = this.config.anchorX ?? 0.5;
    const anchorY = this.config.anchorY ?? 0.5;

    this.bg.clear();
    this.gloss.clear();
    this.border.clear();

    const alpha = this.state === "disabled" ? 0.5 : 1;

    this.bg.alpha = alpha;
    this.gloss.alpha = alpha;
    this.border.alpha = alpha;
    this.text.alpha = alpha;

    this.bg
  .roundRect(0, 0, width, height, radius)
  .fill({ color: 0x262b31 });

   // очень легкий верхний внутренний свет
this.gloss
  .roundRect(
    2,
    2,
    width - 4,
    Math.max(2, height * 0.10),
    Math.max(0, radius - 2)
  )
  .fill({ color: 0xffffff, alpha: 0.04 });

    // рамка
    this.border
      .roundRect(
        0.5,
        0.5,
        width - 1,
        height - 1,
        Math.max(0, radius - 1)
      )
      .stroke({ color: 0xffffff, alpha: 0.14, width: 1 });

    this.text.x = width / 2;
    this.text.y = height / 2;

    this.container.hitArea = new Rectangle(
      -width * anchorX,
      -height * anchorY,
      width,
      height
    );
    this.container.enabled = this.state !== "disabled";
  }
}