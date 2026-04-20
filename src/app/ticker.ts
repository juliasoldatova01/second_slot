import { Application, Ticker } from "pixi.js";

export function runApp(app: Application) {
  function update(dt: number) {}

  const tickerFn = (t: Ticker) => {
    let dt = t.deltaMS / 1000;
    dt = Math.min(dt, 0.05);
    update(dt);
  };

  app.ticker.add(tickerFn);

  return function destroy() {
    // app.canvas.removeEventListener("pointerdown", onPointerDown);
    app.ticker.remove(tickerFn);
    app.stage.removeChildren();
  };
}
