import Cannon from '../scenes/Cannon.js';


export default class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2'});
    }
    
    preload () {
        
    }
    
    create (){
        let cannon = new Cannon(this, 50, 0);
    }
}