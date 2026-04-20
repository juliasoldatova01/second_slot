import { initSlotAtlasAssets } from "./slot_atlas_assets";

export type SlotAtlasAssets = Awaited<ReturnType<typeof initSlotAtlasAssets>>;

let slotAssets: SlotAtlasAssets | null = null;

export async function loadSlotAssets(): Promise<SlotAtlasAssets> {
  if (slotAssets) return slotAssets;

  slotAssets = await initSlotAtlasAssets();
  return slotAssets;
}

export function getSlotAssets(): SlotAtlasAssets {
  if (!slotAssets) {
    throw new Error(
      "Slot assets are not loaded yet. Call loadSlotAssets() first.",
    );
  }

  return slotAssets;
}
