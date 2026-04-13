import type { Container, Texture } from "pixi.js"

export type SymbolView = {
    id: number
    container: Container,
    background: Texture,
    width: number,
    height: number,
    x: number,
    y: number
}