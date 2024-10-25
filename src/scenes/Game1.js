import PlayerG1 from '../objetos/Game1Obj/playerG1.js';
import Box from '../objetos/Game1Obj/box.js';

export default class Game1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game1'});
    }
    
    preload () {
    
    }
    
    create () {
        let boxes = this.physics.add.group(); // grupo de fisicas para las cajas

        // ---- Objectos de escena ----
        let playerG1 = new PlayerG1(this, 50, 50);
        let box1 = new Box(this, 200, 0, boxes);
        let box2 = new Box(this, 400, 0, boxes);

        playerG1.bodyOffset.onCollide = true; // para poder colisionar

        let scene = this; // referencia a la escena

        this.physics.add.collider(playerG1, boxes); // colisionan cajas y jugador

        scene.physics.world.on('collide', function(gameObject1, gameObject2, body1, body2) {
			// colision del player con una caja
			if(gameObject1 === playerG1 && boxes.contains(gameObject2)) {
				if(gameObject1.isAttackInProcess()) {
					gameObject2.destroyMe()
				}
			}
		});	
    }

    init() {

        // para llevar el control de limite de tiempo
        this.maxTime = document.getElementById('targetTime');

        this.time = 0; 
    }

    update(time, dt) {

        // ---- limite de tiempo ----
        this.time += dt;
        if(this.time > this.maxTime.value*1000) {
            
        }
    }
}