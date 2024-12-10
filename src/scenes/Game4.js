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
        this.isClickingOnUI = true; // inicialmente lo de Tanqia es UI (bloquea interacciones).
        // Background del dialogo (LUEGO IMAGEN).
        let dialogueBackground = this.make.image({
            x: this.cameras.main.centerX, // x
            y: this.cameras.main.centerY, // y
            scale:{
                x: 1.9, // anchura
                y: 2.22, // altura
            },
            key: 'tanqiaBg',
        });

        let tanqia = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 175, 
            'tanqia'
        ).setScale(0.5, 0.32); // x, y, tag.

        let tanqiaText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 150, 
            'Inheret, «aquel que ha traído la diosa lejana  y aquel que simboliza el poder creativo del sol», te ha encargado dar exterminio a aquellos animales indignos de vivir en su desierto. Se te será otorgado su arco mágico para cumplir con tu deber o serás castigado con cien años perdido en las arenas infinitas de su desierto .',
            {
                fontSize: '20px',
                color: '#ffffff',
                align: 'center',
                fontFamily: 'EagleLake',
                wordWrap: {width: 500}, // la puta polla: es lo de \n pero pro.
                wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
            }
        ).setOrigin(0.5); // danzhu lo tenia y funciona.

        // Botón de aceptar.
        let acceptButton = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 340, 
            'Jugar',
            {
            fontSize: '50px',
            fontFamily: 'arabic',
            color: 'white',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        acceptButton.on('pointerover', () => // Al pasar el ratón por encima...
        {
            acceptButton.setTint(0xdfa919);
        });

        acceptButton.on('pointerout', () => // Al quitar el ratón de encima...
        {
            acceptButton.clearTint();
        });

        acceptButton.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            dialogueBackground.destroy();
            tanqia.destroy();
            tanqiaText.destroy();
            acceptButton.destroy();
            this.startGame();
        })
    }

    startGame(){
        console.log(this.gameState.currentDay);
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

    createEnemies() {

        this.enemiesPool = [];
        const enemy1 = new Enemy(this, 650, 668);
        const enemy2 = new Enemy(this, 800, 668);
        const enemy3 = new Enemy(this, 725, 530);
        this.enemiesPool.push(enemy1, enemy2, enemy3);
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


    endLevel()
    {
        let result;
        if (this.enemiesCounter == this.enemiesPool.length) {
            console.log("victoria");
            result = 'victoria';
        } 
        else if (this.bow.totalArrows == 0 && this.enemiesCounter < this.enemiesPool.length) {
            console.log("derrota");
            result = 'derrota';
        }
 

    if (result) {
        const currentDayIndex = this.gameState.currentDay - 1; 
        this.gameState.minigamesResults.Game4[currentDayIndex] = result;

       // console.log(`Resultados hasta ahora: ${this.gameState.minigamesResults.Game4}`);
    }
    }


    createInfoTexts()
    {
          this.enemiesText = this.add.text(10, 10, `Enemigos restantes: ${this.enemiesPool.length}`, {
            fontFamily: 'Arial',
            fontSize: '30px',
            color: '#ffffff'
        });

        console.log(this.bow.remainingArrows);
        this.arrowsText = this.add.text(10, 40, `Flechas restantes: ${this.bow.remainingArrows}`, {
            fontFamily: 'Arial',
            fontSize: '30px',
            color: '#ffffff'
        });

        this.arrowTypeText = this.add.text(10, 70, `Arrow Type: ${this.bow.getCurrentArrowType()}`, {
            fontFamily: 'Arial',
            fontSize: '30px',
            color: '#ffffff',
        });
    }


    updateInfoTexts() {

        this.enemiesText.setText(`Enemies left: ${this.enemiesPool.length - this.enemiesCounter}`);
        this.arrowsText.setText(`Arrows left: ${this.bow.totalArrows}`);
        if(this.bow.totalArrows >= 1)
            this.arrowTypeText.setText(`Arrow type: ${this.bow.getCurrentArrowType()}`);
    }


    setDifficulty() {
        if(this.gameState.currentDay == 1 || this.gameState.currentDay == 2)
        {
            this.bow = new Bow(this, 150, 600, [
                // { type: 'Normal', count: 3 },
                // { type: 'Explosive Arrow', count: 3 },
                 { type: 'Ball Arrow', count: 5 },
                { type: 'Split Arrow', count: 3 }

            ]);
        }
        else if(this.gameState.currentDay == 3 || this.gameState.currentDay == 4)
        {
            this.bow = new Bow(this, 150, 600, [
                { type: 'Normal', count: 3 },
                { type: 'Explosive Arrow', count: 2 },
                { type: 'Ball Arrow', count: 2 },
                { type: 'Split Arrow', count: 2 }
            ]);
        }
        else if(this.gameState.currentDay == 5)
        {
            this.bow = new Bow(this, 150, 600, [
                { type: 'Normal', count: 5 },
                //{ type: 'Explosive Arrow', count: 1 },
                { type: 'Ball Arrow', count: 1 },
                { type: 'Split Arrow', count: 1 }
            ]);
        }
    }
}