export default class Game3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game3'});
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