import {INFO} from "./info.js";

export function getX(indX) {
    return indX * INFO.TILE_WIDTH;
}

export function getY(indY) {
    return indY * INFO.TILE_HEIGHT;
}