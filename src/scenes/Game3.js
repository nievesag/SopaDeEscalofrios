//Importamos los objetos en escena
import Player3 from '../objetos/Game3Obj/Player3.js';
import Beetle from '../objetos/Game3Obj/Beetle.js';
import Matrix from '../objetos/Game3Obj/Matrix.js';
import Time from '../objetos/Game3Obj/Time.js';

export default class Game3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game3'});

        const COLOR = {
            RED: 'RED',
            ORANGE: 'ORANGE',
            YELLOW: 'YELLOW',
            GREEN: 'GREEN',
            CIAN: 'CIAN',
            BLUE: 'BLUE',
            PURPLE: 'PURPLE',
            BLACK: 'BLACK',
        } //Se accede como color.RED...
    }
    
    preload () {
        //Player (place holder)
        this.load.image('cuadrado', '../assets/images/icon500.jpg');
    }
    
    create (){
        this.make.sprite({
            x: 500,
            y: 750, 
            key: 'cuadrado',
            scale : {
                x: 0.25,
                y: 0.25
            },
        })

        this.pointer = this.scene.input.activePointer;
    }
    }