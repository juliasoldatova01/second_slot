import type { ReelState } from "../models/reel_state";
import type { ReelsState } from "../models/reels_state";
import type { ReelsContainerView } from "../ui/game_area/reels_view";

    export function startSpinAll(reelsState: ReelsState, reels: ReelsContainerView,  dt:number){
        reelsState.reels.forEach((rs)=>{
            startSpin(rs,reels,reelsState.speed)
        })
    }


   export function startSpin(rs:ReelState, reels: ReelsContainerView, dt:number){
    if(!reels.reels) throw new Error("No reels: ReelsContainerView")
    let currentReelView = reels.reels[rs.index];
    console.log("start spin");
    if(!currentReelView) return
        if(currentReelView.symbols){
        currentReelView.symbols.forEach((sym)=>{
            sym.container.y += rs.speed * dt
        })
    }
}

