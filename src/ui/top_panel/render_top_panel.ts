import { PlayerState } from "../../models/player_state";
import type { TopPanel } from "./create_top_panel";

export function renderPanel(panel: TopPanel, playerState: PlayerState){
    panel.balance.text = `Balance : $${playerState.getBalance}`
    panel.bet.text = `Bet: $${playerState.getBet}`
    panel.win.text = `Win:$${playerState.getWin}`
}