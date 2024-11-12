import Bow from '../objetos/Game4Obj/Bow.js';


export default class Game4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game4'});
    }
    
    preload () {
    // Música.
    this.load.audio('theme4', '../assets/audio/m4c.mp3');
    }
    
    create (){

        // Música.
        const music = this.sound.add('theme4');
        music.play();
        this.sound.pauseOnBlur = true;

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

        

        this.bow = new Bow(this, 150, 600); // Ajusta las coordenadas
    }
    



    }