import { gsap } from "gsap";
import * as PIXI from 'pixi.js';
import { EventDispatcher } from "../EventDispatcher";
import { GameEvents } from "../GameEvents";
import { GameSizes } from "../GameSizes";

export class BaseView extends PIXI.Container {

    protected background: PIXI.Sprite;
    protected backgroundBaseRatio: number;

    constructor() {
        super();

        this.init();
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.ON_RESIZE, this.onResize, this);
    }

    public show() {
        if (this.visible) {
            return;
        }

        this.visible = true;
        gsap.to(this, { alpha: 1, duration: 0.7 });
    }

    public hide() {
        if (!this.visible) {
            return;
        }

        gsap.to(this, { alpha: 0, duration: 0.3, onComplete: () => { this.visible = false } });
    }

    protected init() {
        this.visible = false;
        this.alpha = 0;

        this.createBackground();
        this.setBackgroundRatio();
        this.setBackgroundSize();
    }

    protected createBackground() { }

    protected setBackgroundRatio () {
        if (!this.background) return;

        this.backgroundBaseRatio = this.background.width / this.background.height;
    }

    protected setBackgroundSize() {
        if (!this.background) return;

        if (GameSizes.STAGE_HEIGHT > GameSizes.STAGE_WIDTH) {
            this.background.height = GameSizes.STAGE_HEIGHT;
            if (this.backgroundBaseRatio) this.background.width = this.background.height * this.backgroundBaseRatio;
            this.background.x = - (this.background.width - GameSizes.STAGE_WIDTH) / 2;
            this.background.y = 0;
            return;
        }

        this.background.width = GameSizes.STAGE_WIDTH;
        if (this.backgroundBaseRatio) this.background.height = this.background.width / this.backgroundBaseRatio;
        // this.background.height = GameSizes.STAGE_HEIGHT;
        this.background.x = 0;
        this.background.y = - (this.background.height - GameSizes.STAGE_HEIGHT) / 2;
    }

    protected onResize() {
        this.setBackgroundSize();
    }
}