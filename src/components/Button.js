import { Container, Graphics } from 'pixi.js';
import {Text, TextStyle} from 'pixi.js';


export default class Button extends Container{
    constructor(){
        super();
        this.name = 'button';

        
        this.x = -100;
        this.y = 240;

        this.interactive = true;
        this.buttonMode = true;

        this.button = this.createButton();
        this.addChild(this.button);
        
    }

    show(){
        this.alpha = 1;
    }

    hide(){
        this.alpha = 0;
    }


/**
 *  @description Create Button object
 *  @private
 *  @returns {PIXI.Graphics}
 */
    createButton(){

        const button = new Graphics();
        button.beginFill(0xFF0000);
        button.drawRect(0, 0, 200, 80);
        button.endFill();

        button.interactive = true;
        button.buttonMode = true;

        const text = new Text("THROW BALL");
        text.style = new TextStyle({
            fill: 0xFFFFFF,
            fontSize: 20,
            fontStyle: 'bold'
        });

        text.anchor.set(0.5);
        text.x = button.width / 2;
        text.y = button.height / 2;
        
        button.addChild(text);
        return button;
    }
}