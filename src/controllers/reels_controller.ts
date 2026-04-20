import { Ticker } from "pixi.js";
import type { ReelState } from "../models/reel_state";
import type { ReelsState } from "../models/reels_state";
import type { ReelsContainerView } from "../ui/game_area/reels_view";

export function startSpinAll(
  reelsState: ReelsState,
  reels: ReelsContainerView,
) {
  reelsState.reels.forEach((rs) => {
    const ticker = new Ticker();

    ticker.add((t: Ticker) => {
      let dt = t.deltaMS / 1000;
      dt = Math.min(dt, 0.05);

      startSpin(rs, reels, dt);
    });

    ticker.start();
  });
}

export function startSpin(
  rs: ReelState,
  reels: ReelsContainerView,
  dt: number,
) {
  if (!reels.reels) throw new Error("No reels: ReelsContainerView");
  let currentReelView = reels.reels[rs.index];

  console.log("start spin");

  currentReelView?.symbols?.forEach((sym) => {
    sym.container.y += rs.speed * dt;
  });
}
