import * as PIXI from 'pixi.js';
import { resources } from 'pixi.js';
import { Game } from './GameController'
import { GameSizes } from './GameSizes';
import { EventDispatcher } from './EventDispatcher';
import { GameEvents } from './GameEvents';

export class GameApplication extends PIXI.Application {

    private game: Game;

    public static BACKGROUND: PIXI.Texture;
 
    private static app: GameApplication;
    private gameContainer: HTMLCanvasElement
    private mainContainer: PIXI.Container;

    private MyTicker: PIXI.Ticker;

    constructor() {
        super(GameApplication.getAppOptions());
        this.init();
    }

    public static getApp(): GameApplication {
        return this.app;
    }

    private init() {
        this.MyTicker = new PIXI.Ticker();
        this.MyTicker.start();

        GameApplication.app = this;
        
        this.mainContainer = new PIXI.Container();
        this.loader = new PIXI.Loader();
        
        GameApplication.BACKGROUND = PIXI.Texture.from('assets/image/background.jpg')

        window.onload = () => {
            this.gameContainer = document.getElementById("gameContainer") as HTMLCanvasElement;
            this.gameContainer.style.width = '100%';
            this.gameContainer.style.height = '100%';
            this.gameContainer.appendChild(this.view);
            this.stage.addChild(this.mainContainer);

            this.resizeCanvas();
            this.createGame();

            this.view.style.position = 'absolute';
            // this.view.style.left = '50%';
            // this.view.style.top = '50%';
            // this.view.style.transform = 'translate3d( -50%, -50%, 0 )';
        };
    }

    private createGame() {
        this.game = new Game();
        this.mainContainer.addChild(this.game)
    }

    private static getAppOptions() {
        return {
            backgroundColor: 0x989c99,
            width: 1000,
            height: 1000,
        }
    }

    private resizeCanvas(): void {
        this.onResize();

        this.onResize = this.onResize.bind(this)

        window.addEventListener('resize', this.onResize);
    }

    private onResize() {
        GameSizes.STAGE_HEIGHT = window.innerHeight;
        console.log(GameSizes.STAGE_HEIGHT)
        GameSizes.STAGE_WIDTH = window.innerWidth;
        console.log(GameSizes.STAGE_WIDTH)
        this.renderer.resize(GameSizes.STAGE_WIDTH, GameSizes.STAGE_HEIGHT);

        EventDispatcher.dispatcher.emit(GameEvents.ON_RESIZE);
    }
}