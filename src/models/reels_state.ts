import type { ReelState } from "./reel_state";

export class ReelsState{
    reels: ReelState[]
    currentStoppingIndex: number
    allStopped:boolean
    speed: number;
    constructor(){
        this.reels = [],
        this.currentStoppingIndex = 0
        this.speed = 1000;
        this.allStopped = false;
    }

    isAllStopped(){
        let statusLast = this.reels[this.reels.length - 1].getStatus();
        if( statusLast === "STOPPED"){
            this.allStopped = true;
        }
        return this.allStopped
    }
}

