
import Wall from '../objetos/Game5Obj/Wall.js';
import Gun from '../objetos/Game5Obj/Gun.js';
import Void from '../objetos/Game5Obj/Void.js';
import Destiny from '../objetos/Game5Obj/Destiny.js';

export default class Game5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game5' });
    }

    init(data) {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }
    
    preload () {
        // Música.
        this.load.audio('theme5', './assets/audio/m5c.mp3');

        this.load.json('tableroData', './src/objetos/Game5Obj/tablero.json');
    }
    
    create() {
        this.cameras.main.setBackgroundColor(0x181818);

        this.gameOver = false;
        // si es la primera vez q se inicia...
        if(!this.gameState.hasStartedBefore[4]){
            this.gameState.hasStartedBefore[4] = true; // ala ya ha salio el tutorial.
            this.createTanqiaPopUp();
        }
        else{ // si ya se ha iniciado anteriormente...
            this.startGame(); // empieza el game directamente.
        }
    }

    createTanqiaPopUp(){

        this.isClickingOnUI = true; // inicialmente lo de Tanqia es UI (bloquea interacciones).
        
        let tanqiaText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 100, 
            'Shu, divinidad danzante del aire, él desea iluminar todo a su paso,  él es la sequedad, él es el tenue brillo de atardecer… Ayuda a Shu a apartar la tenebrosa oscuridad de las profundidades de la pirámide para completar su destino. Coloca y mueve los espejos para guiar a Shu, y él te dará su bendición.',
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
            'Icon5'
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
            key: 'Tuto5',
        });

        let tuto5Text = this.add.text( // diapo 1 text.
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

        tuto5Text.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            tutoImage.destroy();
            tuto5Text.destroy();
            this.startGame();
        });

        tuto5Text.on('pointerover', () => // Al pasar el ratón por encima...
        {
            tuto5Text.setColor('#0032c3');
        });

        tuto5Text.on('pointerout', () => // Al quitar el ratón de encima...
        {
            tuto5Text.setColor('#181818');
        });
    }


    startGame(){

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg3')
          .setOrigin(0.5, 0.5)
          .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
          
        /*// Música.
        this.music = this.sound.add('theme2');
        this.music.play();
        this.sound.pauseOnBlur = true;

        // Botón de la música.
        this.musicButton = this.add.image(40, 40, 'musicButton');
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

        const level = this.gameState.currentDay; // Nivel actual
        const tableroData = this.cache.json.get('tableroData');
        const tablero = tableroData.levels[level];

        const tileSize = 100;
        const centroX = this.cameras.main.centerX - tablero[0].length * tileSize / 2;
        const centroY = this.cameras.main.centerY - tablero.length * tileSize / 2;

        this.boardMinX = centroX;
        this.boardMaxX = centroX + tablero[0].length * tileSize;
        this.boardMinY = centroY;
        this.boardMaxY = centroY + tablero.length * tileSize;

        this.voids = [];
        this.walls = [];
        this.mirrors = [];
        this.laser = null;
        let gun = null;
        let destiny = null;

        for (let row = 0; row < tablero.length; row++) {
            for (let col = 0; col < tablero[0].length; col++) {
                const tileValue = tablero[row][col];
                let x = col * tileSize + tileSize / 2 + centroX;
                let y = row * tileSize + tileSize / 2 + centroY;

                if (tileValue === 1) {
                    const wall = new Wall(this, x, y, tileSize);
                    this.walls.push(wall);
                } else if (tileValue === 2 && gun == null) {
                    gun = new Gun(this, x, y, 'left', tileSize);
                } else if (tileValue === 3 && destiny == null) {
                    destiny = new Destiny(this, x, y, 'DestinoApagado', 'DestinoEncendido');
                } else {
                    const v = new Void(this, x, y, tileSize);
                    this.voids.push(v);
                }
                
            }
        }

        if (gun) {
            gun.setInteractive();
            gun.on('pointerdown', () => {
                if (this.laser == null && this.gameOver == false) {
                    this.laser = gun.shootLaser(this);
                    this.mirrors.forEach(mirror => {
                        this.physics.add.overlap(this.laser, mirror, this.TrayChangeDirection, null, this);
                    });
                    this.walls.forEach(wall => {
                        this.physics.add.collider(this.laser, wall, this.DestroyLaser, null, this);
                    });
                    this.physics.add.overlap(this.laser, destiny, this.CollideWithDestiny, null, this);
                }
            });
            gun.on('pointerover', () => 
                {
                    gun.setTint(0xdddddd);
                });
            gun.on('pointerout', () => 
                {
                    gun.clearTint();
                });
        }

        // --- BOTON VOLVER A MAIN MENU ---
        this.createButton('MAIN MENU',  200,  700, 'white');
    }

    update() {
        if (this.laser) {
            if (this.laser.x < this.boardMinX ||
                this.laser.x > this.boardMaxX ||
                this.laser.y < this.boardMinY ||
                this.laser.y > this.boardMaxY
            ) {
                this.DestroyLaser(this.laser);
            }
        }
    }

    TrayChangeDirection(laser, mirror) {
        mirror.changeLaserDirection(laser);
    }

    DestroyLaser(laser) {
        laser.destroy();
        this.laser = null;
    }

    CollideWithDestiny(laser, destiny) {
        destiny.laserColision(laser);
        this.DestroyLaser(laser);
    }
    
    startEndGame(){
        this.gameOver = true;

        this.stopTimer = this.time.addEvent({
            delay: 2000, // espera 2 segs.
            callback: () => 
            {
                this.EndGame(); // se nos ha jodio la flesbos.
            }
        });
        
    }

    EndGame(){
        if (this.gameOver){
            this.scene.start("GameSelectorMenu");
            const currentDayIndex = this.gameState.currentDay - 1; 
            this.gameState.minigamesResults.Game5[currentDayIndex] = 'victoria';
        }
    }
    
    createButton(text, x, y, textColor) {
        let button = this.add.text(
           x,
           y,
            text,
            {
                fontFamily: 'yatra',
                fontSize: 40,

                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => { // Al hacer clic...
            this.scene.start("GameSelectorMenu");
        });

        button.on('pointerover', () => // Al pasar el ratón por encima...
        {
            button.setTint(0xdfa919);
            //button.fontSize = '70px';
        });
    
        button.on('pointerout', () => // Al quitar el ratón de encima...
        {
            button.clearTint();
            //button.fontSize = '50px';
        });
    }
}
