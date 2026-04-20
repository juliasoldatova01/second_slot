type RoundStatus = "IDLE" | "SPINNING" | "STOPPING" | "RESULT";

export class RoundState {
  private status: RoundStatus;
  private resultGrid: [] | null;
  private winAmount: number;
  private winLines: [] | null;
  isResultReady: boolean;
  isWinAnimationPlaying: boolean;
  isFinished: boolean;
  canSkip: boolean;

  constructor() {
    this.resultGrid = null;
    this.winAmount = 0;
    this.winLines = null;
    this.isFinished = false;
    this.canSkip = false;
    this.status = "IDLE";
    this.isResultReady = false;
    this.isWinAnimationPlaying = false;
  }

  start() {
    ((this.status = "SPINNING"),
      (this.winAmount = 0),
      (this.resultGrid = null));
    this.winLines = null;
    this.isFinished = false;
    this.isResultReady = false;
    this.isWinAnimationPlaying = false;
    this.canSkip = false;
  }

  applyResult(resultGrid: [], amount: number, winLines: []) {
    this.resultGrid = resultGrid;
    ((this.winAmount = amount), (this.winLines = winLines));
    this.status = "STOPPING";
    this.canSkip = true;
  }

  canPlayWinAnimation() {
    if (this.winAmount > 0 && this.isResultReady) {
      this.isWinAnimationPlaying = true;
    }
    return this.isWinAnimationPlaying;
  }

  finish() {
    ((this.status = "RESULT"), (this.isFinished = true));
  }

  reset() {
    this.status = "IDLE";
    ((this.winAmount = 0), (this.resultGrid = null));
    this.winLines = null;
    this.isFinished = false;
    this.isResultReady = false;
    this.isWinAnimationPlaying = false;
    this.canSkip = false;
  }

  getResultGrid() {
    return this.resultGrid;
  }
}
