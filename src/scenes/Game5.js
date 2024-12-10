
import Wall from '../objetos/Game5Obj/Wall.js';
import Gun from '../objetos/Game5Obj/Gun.js';
import Void from '../objetos/Game5Obj/Void.js';

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
    }
    
    create() {
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
            'Shu, divinidad danzante del aire, él desea iluminar todo a su paso,  él es la sequedad, él es el tenue brillo de atardecer… Ayuda a Shu a apartar la tenebrosa oscuridad de las profundidades de la pirámide para completar su destino. Coloca y mueve los espejos para guiar a Shu, y él te dará su bendición.',
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
        // --- BOTON VOLVER A MAIN MENU ---
        this.createButton('MainMenu',  100,  700, 'white');
        

        // Música.
        const music = this.sound.add('theme5');
        music.play();
        this.sound.pauseOnBlur = true;

        // 1 para los muro, 0 para los vacios, 2 para la gun
        const tablero = [
            [1, 1, 0, 0, 0, 2],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0],
            [1, 0, 0, 1, 0, 0],
            [1, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ];

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

        for (let row = 0; row < tablero.length; row++) {
            for (let col = 0; col < tablero[0].length; col++) {
                const tileValue = tablero[row][col];
                let x = col * tileSize + tileSize / 2 + centroX;
                let y = row * tileSize + tileSize / 2 + centroY;

                if (tileValue === 0) {
                    const v = new Void(this, x, y, tileSize);
                    this.voids.push(v);
                } else if (tileValue === 1) {
                    const wall = new Wall(this, x, y, tileSize);
                    this.walls.push(wall);
                } else if (tileValue === 2) {
                    gun = new Gun(this, x, y, 'left', tileSize);
                }
            }
        }

        if (gun) {
            gun.setInteractive();
            gun.on('pointerdown', () => {
                if (this.laser == null) {
                    this.laser = gun.shootLaser(this);
                    this.mirrors.forEach(mirror => {
                        this.physics.add.overlap(this.laser, mirror, this.TrayChangeDirection, null, this);
                    });
                    this.walls.forEach(wall => {
                        this.physics.add.collider(this.laser, wall, this.DestroyLaser, null, this);
                    });
                }
            });
        }
    }

    update() {
        if (this.laser) {
            if (this.laser.x < this.boardMinX ||
                this.laser.x > this.boardMaxX ||
                this.laser.y < this.boardMinY ||
                this.laser.y > this.boardMaxY
            ) {
                DestroyLaser(this.laser);
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
    
    createButton(text, x, y, textColor) {
        let button = this.add.text(
           x,
           y,
            text,
            {
                fontFamily: 'arabic',
                fontSize: 50,

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
