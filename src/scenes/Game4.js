import Bow from '../objetos/Game4Obj/Bow.js';
import Obstaculo from '../objetos/Game4Obj/Obstaculo.js';

export default class Game4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game4'});
    }
    
    preload () {
    
    }
    
    create (){

          // Background
          this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg1')
          .setOrigin(0.5, 0.5)
          .setDisplaySize(this.cameras.main.width, this.cameras.main.height); 

        // Crear el suelo invisible en la parte inferior de la pantalla
        const groundHeight = 50; // Altura del suelo invisible
        const ground = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.height - groundHeight / 2, // Colocarlo en la parte inferior
            this.cameras.main.width, 
            groundHeight
        );
        ground.setOrigin(0.5, 0.5);
        ground.setVisible(false); // Lo dejamos invisible

        // Habilitar la física para el suelo
        this.physics.world.enable(ground);
        ground.body.setImmovable(true); // El suelo no se moverá
        ground.body.setAllowGravity(false); // No tendrá gravedad

        this.bow = new Bow(this, 150, 600, [
            { type: 'normal', count: 3 },
            { type: 'split', count: 2 },
            { type: 'ball', count: 2 }
        ]); // Ajusta las coordenadas

        this.grupoObs = this.add.group({
            classType: Obstaculo,
            maxSize: 100
        })
        //  // Crear algunos obstáculos
        // this.obstaculos = this.add.group(); // Grupo para manejar múltiples obstáculos
        // const obstaculo1 = new Obstaculo(this, 445, 500, 60, 20, 0x8B4513, 'horizontal');
        // const obstaculo2 = new Obstaculo(this, 460, 500, 60, 20, 0x8B4513, 'vertical');
        // const obstaculo3 = new Obstaculo(this, 430, 460, 60, 20, 0x8B4513, 'vertical');
        // this.grupoObs.add(obstaculo1);
        // this.grupoObs.add(obstaculo2);
        // this.grupoObs.add(obstaculo3);

         // Configurar colisión entre flecha y obstáculos
         this.physics.add.collider(this.bow.projectile, this.grupoObs, (arrow, obstaculo) => {
            const obstaculoObj = this.grupoObs.getChildren().find(obj => obj === obstaculo);
            if (obstaculoObj) obstaculoObj.takeDamage();
        });

        // Configurar colisiones internas para que los obstáculos interactúen y se apilen correctamente
        this.physics.add.collider(this.grupoObs, this.grupoObs);

    }
    



    }