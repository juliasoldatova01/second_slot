import { Application } from "pixi.js";

export async function createPixiApp(): Promise<Application> {
  const app = new Application();
  (globalThis as any).__PIXI_APP__ = app;

  await app.init({
    resizeTo: window,
    background: "#1a1a1a",
  });

  document.body.appendChild(app.canvas);

  return app;
}
