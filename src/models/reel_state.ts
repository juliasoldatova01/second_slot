type ReelStatus = "IDLE" | "START" | "SPINNING" | "STOPPING" | "STOPPED";

export class ReelState {
  private status: ReelStatus;
  index: number;
  visibleSymbolIds: number[];
  y: number;
  speed: number;
  stopSpeed: number;
  targetId: number;
  result: string[];
  isReadyToStop: boolean;
  hasResultAssigned: boolean;

  constructor(index: number) {
    this.status = "IDLE";
    this.index = index;
    this.visibleSymbolIds = [];
    this.y = 0;
    this.speed = 500;
    this.stopSpeed = 0;
    this.targetId = 0;
    this.result = [];
    this.isReadyToStop = false;
    this.hasResultAssigned = false;
  }

  getStatus() {
    return this.status;
  }
}
