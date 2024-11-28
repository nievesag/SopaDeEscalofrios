import Bow from '../objetos/Game4Obj/Bow.js';
import Obstaculo from '../objetos/Game4Obj/Obstaculo.js';
import Enemy from '../objetos/Game4Obj/Enemy.js';

export default class Game4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game4'});
    }
    
    preload () {
        // Música.
        this.load.audio('theme4', './assets/audio/m4c.mp3');
    
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

         // --- BOTON VOLVER A MAIN MENU ---
         this.createButton('MAIN MENU',  900,  70, 'white', 30, 'GameSelectorMenu');


        // Crear el suelo invisible en la parte inferior de la pantalla
        const groundHeight = 50; // Altura del suelo invisible
        const ground = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.height - groundHeight / 2, 
            this.cameras.main.width, 
            groundHeight
        );
        ground.setOrigin(0.5, 0.5);
        ground.setVisible(false); 

       
        this.physics.world.enable(ground);
        ground.body.setImmovable(true); 
        ground.body.setAllowGravity(false); 

        this.bow = new Bow(this, 150, 600, [
            { type: 'normal', count: 3 },
            { type: 'split', count: 2 },
            { type: 'ball', count: 2 }
        ]);


        this.enemiesPool = [];

        const myEnemy = new Enemy(this, 800, 500);
        this.enemiesPool.push(myEnemy);

        this.obstaclePool = [];
        const obstaculo1 = new Obstaculo(this, 600, 300, 4);
        const obstaculo2 = new Obstaculo(this, 700, 400, 3);
        this.obstaclePool.push(obstaculo1);
        this.obstaclePool.push(obstaculo2);

      
    }


    update()
    {
        //Colision flecha con enemigos
        this.enemiesPool.forEach(enemy => {
                enemy.checkCollisionWithArrow(this, this.bow.projectile);

        });

        this.physics.add.collider(this.bow.projectile, this.obstaclePool, (arrow, obstaculo) => {
            obstaculo.checkCollisionWithArrowObs(this, arrow);
        });
        //Colision flecha con obstaculos
        // this.obstaclePool.forEach(obstaculo => {
        //     obstaculo.checkCollisionWithArrowObs(this, this.bow.proyectile);
        // });

        if (this.bow && this.bow.projectile) {
            this.bow.projectile.updateRotation();
        }

       
    }

    createButton(text, x, y, textColor, fontsize, sceneName) {
        let button = this.add.text(
           x,
           y,
            text,
            {
                fontFamily: 'arabic',
                fontSize: fontsize,
                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.on('pointerover', () => // Al pasar el ratón por encima...
        {
            button.setTint(0xdfa919);
        });

        button.on('pointerout', () => // Al quitar el ratón de encima...
        {
            button.clearTint();
        });

        button.setInteractive();
        button.on("pointerdown", () => { // Al hacer clic...
            this.scene.start(sceneName);
            this.sound.stopAll();

        });
    }



}