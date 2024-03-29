import * as PIXI from 'pixi.js';

export class EventDispatcher {

    private dispatcher: PIXI.utils.EventEmitter;
    private static instance: EventDispatcher;

    constructor() {
        this.init();
    }

    private init() {
        this.dispatcher = new PIXI.utils.EventEmitter();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new EventDispatcher();
        }

        return this.instance
    }

    public static get dispatcher() {
        return this.getInstance().dispatcher
    }

    public getDispatcher(): PIXI.utils.EventEmitter {
        return this.dispatcher;
    }

}