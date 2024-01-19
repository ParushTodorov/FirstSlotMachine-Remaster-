import * as PIXI from 'pixi.js';

export function setScale(targObj: PIXI.DisplayObject, targetSize: number, baseSize: number) {
    targObj.scale.set(1);
    const scale: number = targetSize / baseSize;
    targObj.scale.set(scale);
}