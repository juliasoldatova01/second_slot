import { Assets, Graphics, Matrix } from "pixi.js";

export function createStretcingBg(
  textureUrl: string,
  width: number,
  height: number,
): Graphics {
  const texture = Assets.get(textureUrl);

  const blockWidth = width;
  const blockHeight = height; // например, 150+ и считается автоматически

  const background = new Graphics();

  // матрица для текстуры:
  // scale x = 1      -> по X повторяем без растяжения
  // scale y = blockHeight / texture.height -> по Y тянем
  const matrix = new Matrix();
  matrix.scale(1, blockHeight / texture.height);

  background.rect(0, 0, blockWidth, blockHeight).fill({
    texture,
    matrix,
  });
  return background;
}
