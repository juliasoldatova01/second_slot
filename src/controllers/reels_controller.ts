import type { ReelState } from "../models/reel_state";
import type { ReelsState } from "../models/reels_state";
import type { ReelView } from "../ui/game_area/reel_view";
import type { ReelsContainerView } from "../ui/game_area/reels_view";
import type { SymbolView } from "../ui/game_area/symbol_view";

    export function startSpinAll(reels: ReelsContainerView, reelsState: ReelsState, dt:number){
        reelsState.reels.forEach((rs)=>{
            startSpin(rs,reels,reelsState.speed)
        })
    }


   export function startSpin(rs:ReelState, reels: ReelsContainerView, dt:number){
    if(!reels.reels) return
    let currentReelView = reels.reels[rs.index];
    if(!currentReelView) return
        if(currentReelView.symbols){
        currentReelView.symbols.forEach((sym)=>{
            sym.container.y += rs.speed * dt
        })
    }
}

