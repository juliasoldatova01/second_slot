import { Assets, Texture } from "pixi.js";

/**
 * Универсальная загрузка atlas json.
 * Возвращает объект textures, чтобы можно было обращаться так:
 * textures.button_spin
 * textures.symbol_bell
 *
 * @param {string} atlasPath
 * @param {string[]} [requiredKeys=[]]
 * @returns {Promise<Record<string, import("pixi.js").Texture>>}
 */

export async function loadAtlasTextureRecord(
  atlasPath: string,
  requiredKeys: string[] = []
): Promise<Record<string, Texture>> {
  const sheet = await Assets.load(atlasPath);

  if (!sheet || !sheet.textures) {
    throw new Error(`Failed to load atlas: ${atlasPath}`);
  }

  const textures = sheet.textures;

  const missingKeys = requiredKeys.filter((key) => !textures[key]);

  if (missingKeys.length > 0) {
    throw new Error(
      [
        `Atlas textures not found: ${missingKeys.join(", ")}`,
        `Available keys: ${Object.keys(textures).join(", ")}`,
      ].join("\n")
    );
  }

  return textures;
}

/**
 * Загружает твой слот-атлас и возвращает удобно сгруппированные ассеты.
 *
 * Пример:
 * const atlas = await initSlotAtlasAssets();
 * const spinTexture = atlas.buttons.spin;
 * const bellTexture = atlas.symbols.bell;
 * const rawTexture = atlas.raw.symbol_bell;
 *
 * @returns {Promise<{
 *   symbols: {
 *     a: import("pixi.js").Texture,
 *     coins: import("pixi.js").Texture,
 *     bell: import("pixi.js").Texture,
 *     diamond: import("pixi.js").Texture,
 *     ten: import("pixi.js").Texture,
 *     q: import("pixi.js").Texture,
 *     cherries: import("pixi.js").Texture,
 *     coinStar: import("pixi.js").Texture,
 *     bar: import("pixi.js").Texture,
 *   },
 *   buttons: {
 *     spin: import("pixi.js").Texture,
 *     sound: import("pixi.js").Texture,
 *   },
 *   raw: Record<string, import("pixi.js").Texture>
 * }>}
 */
export async function initSlotAtlasAssets() {
  const textures = await loadAtlasTextureRecord("/assets/slot_atlas.json", [
    "symbol_a",
    "symbol_coins",
    "symbol_bell",
    "symbol_diamond",
    "symbol_10",
    "symbol_q",
    "symbol_cherries",
    "symbol_coin_star",
    "symbol_bar",
    "button_spin",
    "button_sound",
  ]);

  return {
    symbols: {
      a: textures.symbol_a,
      coins: textures.symbol_coins,
      bell: textures.symbol_bell,
      diamond: textures.symbol_diamond,
      ten: textures.symbol_10,
      q: textures.symbol_q,
      cherries: textures.symbol_cherries,
      coinStar: textures.symbol_coin_star,
      bar: textures.symbol_bar,
    },
    buttons: {
      spin: textures.button_spin,
      sound: textures.button_sound,
    },
    raw: textures,
  };
}