import { PlayerState } from "../models/player_state";
import { ReelState } from "../models/reel_state";
import { ReelsState } from "../models/reels_state";
import { RoundState } from "../models/round_state";
import { type TopPanel } from "../ui/top_panel/create_top_panel";
import { renderPanel } from "../ui/top_panel/render_top_panel";
// import type { BottomPanel } from "../ui/bottom_panel/create_bottom_panel";
// import type { GameArea } from "../ui/game_area/game_layer";
// import { startSpinAll } from "./reels_controller";

export function initializeGame(topTanel: TopPanel) {
  const playerState: PlayerState = new PlayerState(500, 2, 0);

  renderPanel(topTanel, playerState);

  const round = new RoundState();
  const reelsState = new ReelsState();
  const reel1 = new ReelState(0);
  const reel2 = new ReelState(1);
  const reel3 = new ReelState(2);

  reelsState.reels.push(reel1, reel2, reel3);

  round.start();
}

// export function onSpinButtonClick() {
//   startSpinAll(reelsState, gameArea.reels, dt);
// }
