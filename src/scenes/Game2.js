import Cannon from '../objetos/Game2Obj/Cannon.js';

export default class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2'});
    }
    
    preload () {
        this.load.image('cannon', '../assets/images/cannon.jpg')
    }
    
    create (){
    
    }
    }