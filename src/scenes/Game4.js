import Bow from '../objetos/Game4Obj/Bow.js';
import Obstaculo from '../objetos/Game4Obj/Obstaculo.js';
import Enemy from '../objetos/Game4Obj/Enemy.js';

export default class Game4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game4'});
    }
    

    init(data) {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }

    preload () {
        // Música.
        this.load.audio('theme4', './assets/audio/m4c.mp3');
    
    }
    
    create (){
        this.cameras.main.setBackgroundColor(0x181818);
        // si es la primera vez q se inicia...
        if(!this.gameState.hasStartedBefore[3]){
            this.gameState.hasStartedBefore[3] = true; // ala ya ha salio el tutorial.
            this.createTanqiaPopUp();
        }
        else{ // si ya se ha iniciado anteriormente...
            this.startGame(); // empieza el game directamente.
        }
    }

    createTanqiaPopUp(){

        let tanqiaText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 100, 
            'Inheret, «aquel que ha traído la diosa lejana  y aquel que simboliza el poder creativo del sol», te ha encargado dar exterminio a aquellos animales indignos de vivir en su desierto. Se te será otorgado su arco mágico para cumplir con tu deber o serás castigado con cien años perdido en las arenas infinitas de su desierto .',
            {
                fontSize: '20px',
                color: '#ffffff',
                align: 'center',
                fontFamily: 'yatra',
                wordWrap: {width: 500}, // la puta polla: es lo de \n pero pro.
                wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
            }
        ).setOrigin(0.5); // danzhu lo tenia y funciona.

        let tanqia = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 175, 
            'Icon4'
        ).setScale(1.5, 1.5).setInteractive(); // x, y, tag.

        tanqia.on('pointerover', () => // Al pasar el ratón por encima...
        {
            tanqia.setTint(0x8a9597);
        });

        tanqia.on('pointerout', () => // Al quitar el ratón de encima...
        {
            tanqia.clearTint();
        });

        tanqia.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            tanqia.destroy();
            tanqiaText.destroy();
            this.showTutorial();
        });
    }

    showTutorial(){
        let tutoImage = this.make.image({
            x: this.cameras.main.centerX, // x
            y: this.cameras.main.centerY, // y
            scale:{
                x: 1, // anchura
                y: 1.1, // altura
            },
            key: 'Tuto4',
        });

        let tuto4Text = this.add.text( // diapo 1 text.
            this.cameras.main.width - 30, 
            this.cameras.main.scrollY + 30, 
            'X',
            {
                fontSize: '40px',
                color: '#181818',
                align: 'center',
                fontFamily: 'yatra',
            }
        ).setOrigin(0.5).setInteractive();

        tuto4Text.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            tutoImage.destroy();
            tuto4Text.destroy();
            this.startGame();
        });

        tuto4Text.on('pointerover', () => // Al pasar el ratón por encima...
        {
            tuto4Text.setColor('#0032c3');
        });

        tuto4Text.on('pointerout', () => // Al quitar el ratón de encima...
        {
            tuto4Text.setColor('#181818');
        });
    }

    startGame(){
        console.log(this.gameState.currentDay);
        /*// Música.
        this.music = this.sound.add('theme4');
        this.music.play();
        this.sound.pauseOnBlur = true;

        // Botón de la música.
        this.musicButton = this.add.image(this.cameras.main.width - 50, 40, 'musicButton');
        this.musicButton.on("pointerdown", () => { // PARAR Y REANUDAR MUSICA.
            this.isClickingOnUI = true; 
            if (this.music.isPlaying) {
                this.music.pause();
                this.musicButton.setTexture('muteButton');
            } 
            else {
                this.music.resume();
                this.musicButton.setTexture('musicButton');
            }
        }).setScale(0.3).setInteractive().setDepth(10).setScrollFactor(0); // pq es UI*/
        
          // Background
          this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg1')
          .setOrigin(0.5, 0.5)
          .setDisplaySize(this.cameras.main.width, this.cameras.main.height); 

         // --- BOTON VOLVER A MAIN MENU ---
         //this.createButton('MAIN MENU',  900,  70, 'white', 30, 'GameSelectorMenu');


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

    
        this.setDifficulty();

      
        this.createEnemies();
        this.createObstacles();

        this.physics.add.collider(this.enemiesPool, this.obstaclePool);
        this.physics.add.collider(this.obstaclePool, this.ground);
      
        this.physics.add.collider(this.obstaclePool, this.obstaclePool);
      
        this.activeArrowsPool = [];
        this.enemiesCounter = 0;

        this.createInfoTexts();
    }


    update()
    {
        if(this.enemiesPool){
            //Colision flecha con enemigos
            this.enemiesPool.forEach(enemy => {
            enemy.checkCollisionWithArrow(this, this.activeArrowsPool);

            });

            //Colision flecha con obstaculos
            this.physics.add.collider(this.activeArrowsPool, this.obstaclePool, (arrow, obstacle) => {
                if (arrow.type === 'explosive') {
                    arrow.handleCollision(obstacle);
                } else {
                    obstacle.checkCollisionWithArrowObs(this, arrow);
                }
            });
            

            if (this.bow && this.bow.projectile) {
                this.bow.projectile.updateRotation();
            }

            this.updateInfoTexts();

            this.endLevel();

         
        }
        
    }


    createObstacles() {

        this.obstaclePool = [];

        if(this.gameState.currentDay == 5)
        {
            const leftObstacle = new Obstaculo(this, 750, 535, 3, 'vertical');
            const rightObstacle = new Obstaculo(this, 850, 535, 3, 'vertical');
            const topObstacle = new Obstaculo(this, 800, 470, 3, 'horizontal');
    
            const leftObstacle2 = new Obstaculo(this, 750, 668, 3, 'vertical');
            const rightObstacle2 = new Obstaculo(this, 850, 668, 3, 'vertical');
            const topObstacle2 = new Obstaculo(this, 800, 600, 3, 'horizontal');

            const leftObstacle3 = new Obstaculo(this, 600, 668, 3, 'vertical');
            const rightObstacle3 = new Obstaculo(this, 700, 668, 3, 'vertical');
            const topObstacle3 = new Obstaculo(this, 650, 600, 3, 'horizontal');
            const aux1 = new Obstaculo(this, 650, 668, 3, 'vertical');

            const leftObstacle4 = new Obstaculo(this, 625, 535, 3, 'vertical');
            const rightObstacle4 = new Obstaculo(this, 675, 535, 3, 'vertical');
            const topObstacle4 = new Obstaculo(this, 650, 470, 3, 'horizontal');

            this.obstaclePool.push(topObstacle, leftObstacle, rightObstacle, 
                leftObstacle2, rightObstacle2, topObstacle2,
                topObstacle3, leftObstacle3, rightObstacle3,
                aux1, leftObstacle4, rightObstacle4, topObstacle4);
        }
        else
        {
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
        }


       
    }

    createEnemies() {

        this.enemiesPool = [];

        if(this.gameState.currentDay == 5)
        {
            const enemy1 = new Enemy(this, 800, 568, 'rat');
            const enemy2 = new Enemy(this, 800, 668, 'rat');
            this.enemiesPool.push(enemy1, enemy2);
        }
        else
        {
            const enemy1 = new Enemy(this, 650, 668, 'lion');
            const enemy2 = new Enemy(this, 800, 668, 'lion');
            const enemy3 = new Enemy(this, 725, 530, 'lion');
            this.enemiesPool.push(enemy1, enemy2, enemy3);
        }
       
    }

    createButton(text, x, y, textColor, fontsize, sceneName) {
        let button = this.add.text(
           x,
           y,
            text,
            {
                fontFamily: 'yatra',
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
            this.scene.start('GameSelectorMenu');

        });
    }


    endLevel()
    {
        let result;
        if (this.enemiesCounter == this.enemiesPool.length) {
            console.log("victoria");
            result = 'victoria';
            this.time.delayedCall(2000, () => {
                this.scene.start('GameSelectorMenu');
            });
        } 
        else if (this.bow.totalArrows == 0 && this.enemiesCounter < this.enemiesPool.length) {
            console.log("derrota");
            result = 'derrota';
            this.time.delayedCall(2000, () => {
                this.scene.start('GameSelectorMenu');
            });
        }
 

        if (result) {
            const currentDayIndex = this.gameState.currentDay - 1; 
            this.gameState.minigamesResults.Game4[currentDayIndex] = result;
        }
    }

   




    createInfoTexts()
    {
          this.enemiesText = this.add.text(10, 10, `Enemigos restantes: ${this.enemiesPool.length}`, {
            fontFamily: 'yatra',
            fontSize: '30px',
            color: '#ffffff'
        });

        console.log(this.bow.remainingArrows);
        this.arrowsText = this.add.text(10, 40, `Flechas restantes: ${this.bow.remainingArrows}`, {
            fontFamily: 'yatra',
            fontSize: '30px',
            color: '#ffffff'
        });

        this.arrowTypeText = this.add.text(10, 70, `Tipo de flecha: ${this.bow.getCurrentArrowType()}`, {
            fontFamily: 'yatra',
            fontSize: '30px',
            color: '#ffffff',
        });
    }


    updateInfoTexts() {

        this.enemiesText.setText(`Enemigos restantes: ${this.enemiesPool.length - this.enemiesCounter}`);
        this.arrowsText.setText(`Flechas restantes: ${this.bow.totalArrows}`);
        if(this.bow.totalArrows >= 1)
            this.arrowTypeText.setText(`Tipo de flecha: ${this.bow.getCurrentArrowType()}`);
    }


    setDifficulty() {

        if(this.gameState.currentDay == 1 || this.gameState.currentDay == 2)
        {
            this.bow = new Bow(this, 150, 600, [
               
                { type: 'Normal', count: 5 },
                { type: 'Explosive Arrow', count: 2 },
                { type: 'Ball Arrow', count: 2 },
                { type: 'Split Arrow', count: 2 }

            ]);
        }
        else if(this.gameState.currentDay == 3 || this.gameState.currentDay == 4)
        {
            this.bow = new Bow(this, 150, 600, [
                { type: 'Normal', count: 5 },
                { type: 'Explosive Arrow', count: 1 },
                { type: 'Ball Arrow', count: 1 },
                { type: 'Split Arrow', count: 2 }
            ]);
        }
        else if(this.gameState.currentDay == 5)
        {
            this.bow = new Bow(this, 150, 600, [
                { type: 'Explosive Arrow', count: 1 },
                { type: 'Split Arrow', count: 1 },
                { type: 'Normal', count: 10 }
                //{ type: 'Explosive Arrow', count: 1 },
                
            ]);
        }
    }
}