import { PlayerState } from "../models/player_state";
import { ReelState } from "../models/reel_state";
import { ReelsState } from "../models/reels_state";
import { RoundState } from "../models/round_state";
import { renderPanel } from "../ui/top_panel/render_top_panel";
// import type { BottomPanel } from "../ui/bottom_panel/create_bottom_panel";
// import type { GameArea } from "../ui/game_area/game_layer";
import { startSpinAll } from "./reels_controller";
import { app, bottomPanel, gameArea, topPanel } from "../main";

let roundState: RoundState;
let reelsState: ReelsState;
let reel1: ReelState;
let reel2: ReelState;
let reel3: ReelState;

export function initializeGame() {
  const playerState: PlayerState = new PlayerState(500, 2, 0);

  renderPanel(topPanel, playerState);

  roundState = new RoundState();
  reelsState = new ReelsState();
  reel1 = new ReelState(0);
  reel2 = new ReelState(1);
  reel3 = new ReelState(2);

  reelsState.reels.push(reel1, reel2, reel3);

  bottomPanel.spinBtn.onClick(() => {
    onSpinButtonClick();
  });
}

export function onSpinButtonClick() {
  roundState.start();
  startSpinAll(reelsState, gameArea.reels);
}
