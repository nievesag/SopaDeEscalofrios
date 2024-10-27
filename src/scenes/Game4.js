export default class Game4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game4'});
    }
    
    preload () {
    
    }
    
    create (){
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 150,
            'Introito Antiapotropaico',
            {
                fontFamily: 'babelgam',
                fontSize: 80,
                color: 'Blue'
            }
        ).setOrigin(0.5, 0.5);

        //carpetAS
    }
    }