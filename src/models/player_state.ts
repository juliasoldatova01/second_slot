export class PlayerState {
  private balance: number;
  private bet: number;
  private win: number;
  private lastWin: number;

  constructor(balance: number, bet: number, win: number) {
    this.balance = balance;
    this.bet = bet;
    this.win = win;
    this.lastWin = 0;
  }

  get getBalance(): number {
    return this.balance;
  }

  set setBalance(newBalance: number) {
    this.balance = newBalance;
  }

  get getBet(): number {
    return this.bet;
  }

  set setBet(newBet: number) {
    this.balance = newBet;
  }

  get getWin(): number {
    return this.win;
  }

  set setWin(newWin: number) {
    this.win = newWin;
  }

  get getLastWin(): number {
    return this.lastWin;
  }

  set setLastWin(newWin: number) {
    this.lastWin = newWin;
  }
}
