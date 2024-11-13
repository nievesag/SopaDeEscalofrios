import Wall from '../objetos/Game5Obj/Wall.js';
import Gun from '../objetos/Game5Obj/Gun.js';

export default class Game5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game5'});
    }
    
    preload () {
    }
    
    create() {
        // 1 para los muros 0 par vacios
        const tablero = [
            [1, 1, 0, 0, 0, 2],
            [1, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0],
            [1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0, 1]
        ];
    
        let walls = this.physics.add.group({immovable: true, allowGravity: false });

        const tileSize = 100;
        let gun = null;
        this.laser = null;
        const centroX = this.cameras.main.centerX - tablero[0].length * tileSize / 2;
        const centroY = this.cameras.main.centerY - tablero.length * tileSize / 2;
        for (let row = 0; row < tablero.length; row++) {
            for (let col = 0; col < tablero[0].length; col++) {

                const tileValue = tablero[row][col];
                let imageKey;
                let x = col * tileSize + tileSize / 2 + centroX;
                let y = row * tileSize + tileSize / 2 + centroY;
                if(tileValue == 0){
                    imageKey = 'VacioTablero';
                    this.add.image(x, y, imageKey);
                }
                else if(tileValue == 1){
                    let wall = new Wall(this, x, y, tileSize);
                    walls.add(wall);
                }
                else {
                    gun = new Gun(this, x, y, 'left', tileSize);
                }
            }
        }
        if (gun) {
            gun.setInteractive();
            gun.on('pointerdown', () => {
                this.laser = gun.shootLaser(this);
            });
        }
    }

    update() {
        if (this.laser) {
            this.laser.update();
        }
    }
}