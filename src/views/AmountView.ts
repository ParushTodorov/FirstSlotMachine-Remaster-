import { getCipherInfo } from 'crypto';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../GameApplication';
import { Game } from '../GameController';
import { GameSizes } from '../GameSizes';
import { BaseView } from './BaseView';


export class AmountView extends BaseView {

    private text: PIXI.Text;
    private amount: number = 0;

    constructor() {
        super();
        //this.init();
    }

    protected init() {
        this.amount = Game.AMOUNT;
        this.createBackground();
        this.createScore();
        this.visible = false;
    }

    protected createBackground() {
        const background = new PIXI.Graphics();
        background.lineStyle(2, 0x253769, 1)
        background.beginFill(0xffffff)
        background.drawRoundedRect(0, 0, GameSizes.resultHeight * 3, GameSizes.resultHeight, 10);
        background.endFill();

        const texture: PIXI.Texture = GameApplication.app.renderer.generateTexture(background);

        this.background = new PIXI.Sprite(texture);

        this.addChild(this.background);
    }

    private createScore() {
        this.text = new PIXI.Text('', {
            fontFamily: 'Papyrus',
            fontSize: 30,
            fontWeight: 'bold',
            fill: 0x253769,
            padding: 10,
            dropShadow: true, 
            dropShadowAlpha: 0.15,  
        })

        this.text.anchor.set(0.5);
        this.text.x = this.background.x + this.background.width / 2;
        this.text.y = this.background.y + this.background.height / 2;

        this.text.text = `${this.amount.toFixed(2)}`;
        this.addChild(this.text);
    }

    public setAmount(amount: number) {
        this.amount = amount;
        this.text.text = `${this.amount.toFixed(2)}`;
    }

    protected onResize(): void {
        
    }
}