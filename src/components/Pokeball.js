import { Container, Sprite, Texture, Text} from 'pixi.js';
import gsap from 'gsap/all';
import { random } from '../core/utils';

export default class Pokeball extends Container{
    constructor(){
        super();
        this.name = 'pokeball';
        this.text = this.createText();
        
        this.top = this.createSprite(new Texture.from('top'), 0, -100);
        this.bottom = this.createSprite(new Texture.from('bottom'), 0, 90);

        this.addChild(this.top);
        this.addChild(this.bottom);


        this.isOpened = false;

    }

    static get events(){
        return{
        OPEN_END: 'open_end',
        OPEN_START: 'open_start',
        CLOSE_END: 'close_end',
        CLOSE_START: 'close_start'
        }
    };

    async open(){
        const animation = new gsap.timeline();

        this.isOpened = true;
        this.emit(Pokeball.events.OPEN_START);

        animation
            .to(this.top, {y : "-=200", duration: 0.5})
            .to(this.bottom, {y: "+= 100", duration: 0.5}, "<");

        this.text.alpha = 1;
        await this._shuffle();
        this.emit(Pokeball.events.OPEN_END);
    }

    close(){

        this.isOpened = false;
        this.text.alpha = 0;
        this.emit(Pokeball.events.CLOSE_START);

        const animation = new gsap.timeline();
        animation
            .to(this.top, {y : "+=200", duration: 0.5})
            .to(this.bottom, {y: "-= 100", duration: 0.5}, "<");

        
        this.emit(Pokeball.events.OPEN_END);
    }

    /**
     *  @private 
     *  @param {PIXI.Texture}
     *  @param {number} x
     *  @param {number} y
     * */
    createSprite(texture, x, y){
        const sprite = new Sprite.from(texture);
      
        sprite.position.x = x;
        sprite.position.y = y;
        sprite.anchor.set(0.5);

        return sprite;
    }


    /**
     * 
     */
    createText(){

        const text = new Text('', {
            fill: 0xFFFFFF,
            fontSize: 200,
            fontStyle: 'bold'
        });
        text.y = -100;
        text.anchor.set(0.5);
        text.alpha = 0;
        this.addChild(text);
        return text;
    }


    _setRandomText(){
        const pokemons = [
            'Bulbasaur', 'Ivysaur', 'Charmander', 'Pikachu', 'Charizard'
        ];
        this.text.text = pokemons[Math.floor(random(0, pokemons.length))];
    }


    /**
     * @returns {Promise}
     * @private
     */
    async _shuffle(){
        let prev = 0;

        const dummy = { value: 0 };
        const steps = gsap.to(dummy,{
            duration: 1,
            ease: "steps(100)",
            value: 100,
            paused: true,
            onUpdate: () => {
                if(dummy.value !== prev) this._setRandomText();
                prev = dummy.value;
            },
        });

        await gsap.to(steps, { duration: 3, progress: 1, ease: "circ.out" });
    }

}