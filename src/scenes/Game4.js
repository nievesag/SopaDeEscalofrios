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
        this.ground = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.height - groundHeight / 2, 
            this.cameras.main.width, 
            groundHeight
        );
        this.ground.setOrigin(0.5, 0.5);
        this.ground.setVisible(false); 

       
        this.physics.world.enable(this.ground);
        this.ground.body.setImmovable(true); 
        this.ground.body.setAllowGravity(false); 

        this.bow = new Bow(this, 150, 600, [
            { type: 'normal', count: 3 },
            { type: 'split', count: 2 },
            { type: 'ball', count: 2 }
        ]);


        this.enemiesPool = [];

        const enemy1 = new Enemy(this, 650, 668);
        const enemy2 = new Enemy(this, 800, 668);
        const enemy3 = new Enemy(this, 725, 530);
        this.enemiesPool.push(enemy1, enemy2, enemy3);

        this.obstaclePool = [];

        const leftObstacle = new Obstaculo(this, 600, 668, 3, 'vertical');
        const rightObstacle = new Obstaculo(this, 700, 668, 3, 'vertical');
        const topObstacle = new Obstaculo(this, 650, 600, 3, 'horizontal');

        const leftObstacle2 = new Obstaculo(this, 750, 668, 3, 'vertical');
        const rightObstacle2 = new Obstaculo(this, 850, 668, 3, 'vertical');
        const topObstacle2 = new Obstaculo(this, 800, 600, 3, 'horizontal');

        const topObstacle3 = new Obstaculo(this, 725, 570, 3, 'horizontal');
        const leftObstacle3 = new Obstaculo(this, 670, 505, 3, 'vertical');
        const rightObstacle3 = new Obstaculo(this, 780, 505, 3, 'vertical');

        const topObstacle4 = new Obstaculo(this, 725, 440, 3, 'horizontal');
       
        this.obstaclePool.push(topObstacle, leftObstacle, rightObstacle, 
            leftObstacle2, rightObstacle2, topObstacle2,
            topObstacle3, leftObstacle3, rightObstacle3, topObstacle4);

        this.physics.add.collider(this.enemiesPool, this.obstaclePool);
        this.physics.add.collider(this.obstaclePool, this.ground);
      
        this.physics.add.collider(this.obstaclePool, this.obstaclePool);
      
      
    }


    update()
    {
        //Colision flecha con enemigos
        this.enemiesPool.forEach(enemy => {
                enemy.checkCollisionWithArrow(this, this.bow.projectile);

        });

        //Colision flecha con obstaculos
        this.physics.add.collider(this.bow.projectile, this.obstaclePool, (arrow, obstaculo) => {
            obstaculo.checkCollisionWithArrowObs(this, arrow);
        });
        
        console.log(this.obstaclePool);

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