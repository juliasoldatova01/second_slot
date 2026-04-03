import {TextStyle} from "pixi.js";

export const basicHUDStyle = new TextStyle({
  fontFamily: 'Roboto, sans-serif',
  fontWeight: '500',
  fill: '#E6EAF0',
  fontSize: 20,
  dropShadow: {
    color: '#000000',
    alpha: 0.4,
    blur: 2,
    distance: 1
  }
});