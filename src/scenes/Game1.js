import PlayerG1 from '../objetos/Game1Obj/playerG1.js';
import Organ from '../objetos/Game1Obj/organ.js';
import Box from '../objetos/Game1Obj/box.js';
import Goal from '../objetos/Game1Obj/goal.js';

export default class Game1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game1'});
    }
    
    init(data) {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }

    preload () {
        // Cargamos el Tilemap (JsSON)
        // -- mapa 1
		this.load.tilemapTiledJSON('tilemap1', './assets/tilemap/map1.json');
        // -- mapa 2
        this.load.tilemapTiledJSON('tilemap2', './assets/tilemap/map2.json');
        // -- mapa 3
        this.load.tilemapTiledJSON('tilemap3', './assets/tilemap/map3.json');

		// Cargamos la imagen que compone el Tileset (Imagen con los tiles usados por el tilemap)
		this.load.image('patronesTilemap', './assets/tilemap/tileset_duat.png');

		// Recurso para el personaje principal (imagen simple con un solo frame)
		this.load.image('player', './assets/images/g1/playerG1.png');

        // Recurso para el personaje principal (imagen simple con un solo frame)
		this.load.image('box', './assets/images/g1/box.png');

        // Recurso para el personaje principal (imagen simple con un solo frame)
		this.load.image('organ', './assets/images/g1/organ.png');

        // Recurso para el personaje principal (imagen simple con un solo frame)
		this.load.image('goal', '../../assets/images/g1/goal.png');

        // Música.
        this.load.audio('theme1', './assets/audio/m1c.mp3');
    }
    
    create () {
        // si es la primera vez q se inicia...
        if(!this.gameState.hasStartedBefore[0]){
            this.gameState.hasStartedBefore[0] = true; // ala ya ha salio el tutorial.
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
            'Socar te ama. A ti y a cada uno de los futuros muertos. Te ama a ti, con tus órganos frescos, y me ama a mí, con mis órganos podridos. Esa piel fina que te recubre te contiene y tras la muerte Socar te contendrá como una piel transitoria en tu viaje por la Duat. Socar alimenta uno a uno cada corazón, cada estómago, cada intestino, cada mínima parte de aquel que llama a La puerta de caminos, inscribe tus peticiones y plegarias en los órganos de los finados de esta ciudad y hazlos llegar a lo más profundo del Mundo Subterráneo',
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
        // Música.
        const music = this.sound.add('theme1');
        music.play();
        this.sound.pauseOnBlur = true;

        this.cameras.main.setBounds(-100,-65,416,256).setZoom(window.screen.availWidth/1000);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // segundos para el juego
        this.gameTime; 

        // -------- COSAS DEL TILESET --------
        this.tileKey;
        this.mapKey;
        this.setDifficulty();
        
        // Objeto tilemap
        this.map = this.make.tilemap({
            key: this.tileKey,
            tileWidth: 32,
            tileHeight: 32
        });
        
        // Objeto el tileset. 
        // recibe "name" del .json y la imagen del tileset
        let tileset1 = this.map.addTilesetImage(this.mapKey, 'patronesTilemap');
        
        // capas
		// con el nombre del .json
		this.groundLayer = this.map.createLayer('Ground', tileset1);
		this.wallLayer = this.map.createLayer('Wall', tileset1);
		this.wallLayer.setCollision(2, true); // Los tiles de esta capa tienen colisiones

		// Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
        
        // --- GOAL
        let react = this.map.createFromObjects('GameObjects', { name: "goal", classType: Organ, key: "goal" });
        this.goal = react[0]; //solo hay 1 y es el goal
        this.goal.body.immovable = true;
		//this.react.setCollision(0, true); // Los tiles de esta capa tienen colisiones

        // --- CAJAS
        let boxes = this.map.createFromObjects('GameObjects', { name: "box", classType: Box, key: 'box' });
		this.boxesGroup = this.add.group();

        this.boxesGroup.addMultiple(boxes);
		boxes.forEach(obj => {
            this.physics.add.existing(obj);
		});
        
        // --- ORGANOS
		let organs = this.map.createFromObjects('GameObjects', { name: "organ", classType: Organ, key: 'organ' });
        
		this.organsGroup = this.add.group();
        this.organsPool = [];
        
        this.organsGroup.addMultiple(organs);
		organs.forEach(obj => {
            this.physics.add.existing(obj);
            this.organsPool.push(obj);
        });
        
        this.organCount = this.organsPool.length;

        // --- PLAYER
        let characters = this.map.createFromObjects('GameObjects', { name: "spawn", classType: PlayerG1, key: "player" });
        this.playerG1 = characters[0]; //se que solo hay uno y es mi player
    
        // colisiones
        this.physics.add.collider(this.playerG1, this.wallLayer);
        this.physics.add.collider(this.playerG1, this.organsGroup);
        this.physics.add.collider(this.playerG1, this.boxesGroup);

        // ---- GRAB ----
        // -- organs
        // der
        this.organsGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabDer(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    console.log("der");
                    obj.setisDer(true); // caja agarrada por la der
                }
            });
        });
        
        // izq
        this.organsGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabIzq(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    console.log("izq");
                    obj.setisIzq(true); // caja agarrada por la izq
                }
            });
        });

        // arr
        this.organsGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabArr(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    console.log("arr");
                    obj.setisArr(true); // caja agarrada por arr
                }
            });
        });

        // abj
        this.organsGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabAbj(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    console.log("abj");
                    obj.setisAbj(true); // caja agarrada por la abj
                }
            });
        });

        // -- boxes
        // der
        this.boxesGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabDer(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    console.log("der");
                    obj.setisDer(true); // caja agarrada por la der
                }
            });
        });
        
        // izq
        this.boxesGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabIzq(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    console.log("izq");
                    obj.setisIzq(true); // caja agarrada por la izq
                }
            });
        });

        // arr
        this.boxesGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabArr(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    console.log("arr");
                    obj.setisArr(true); // caja agarrada por arr
                }
            });
        });

        // abj
        this.boxesGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabAbj(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    console.log("abj");
                    obj.setisAbj(true); // caja agarrada por la abj
                }
            });
        });
        
        this.physics.add.collider(this.playerG1, react);
        
        this.physics.add.collider(this.boxesGroup, this.boxesGroup);
        this.physics.add.collider(this.boxesGroup, this.wallLayer);
        
        this.physics.add.collider(this.organsGroup, this.organsGroup);
        this.physics.add.collider(this.organsGroup, this.wallLayer);
        
        this.physics.add.collider(this.boxesGroup, this.organsGroup);

        // meter los organos en casa
        this.organsPool.forEach(organ => {
            this.physics.add.collider(organ, this.goal, () => {
                organ.destroy();
                this.decreaseOrganCount();
            });
        });
        
        // tiempo
        this.timerText = this.add.text(20, 20, this.gameTime,
            { fontFamily: 'arabic', fontSize: 15, color: 'White' }).setOrigin(0.5, 0.5);
            
            this.timerHUD();
            
            // boton
            this.createButton('MAIN MENU',  this.cameras.main.centerX - 30, this.cameras.main.centerY, 'white', 30, 'GameSelectorMenu');
            
            // -----------------------------------
        }
        
        timerHUD() {
            const updateTimer = () => {
            this.gameTime -= 1; // disminuye contador
            this.timerText.destroy(); // borra texto anterior

            if(this.gameTime > 0) {
                // crea texto nuevo
                this.timerText = this.add.text(20, 20, this.gameTime,
                    { fontFamily: 'EagleLake', fontSize: 15, color: 'White' }).setOrigin(0.5, 0.5);
            }
        };

        // temporizador
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: updateTimer,
            callbackScope: this
        });

        // fin de juego
        this.ganar = false;
        this.perder = false;
    }

    update(time, dt)
    {
        if(this.playerG1 != null) {
            this.playerG1.setGrabIzq(this.playerG1.x-15, this.playerG1.y);
            this.playerG1.setGrabDer(this.playerG1.x+15, this.playerG1.y);
            this.playerG1.setGrabArr(this.playerG1.x, this.playerG1.y-15);
            this.playerG1.setGrabAbj(this.playerG1.x, this.playerG1.y+15);

            if(!this.playerG1.getGrabbing()) {
                this.organsGroup.getChildren().forEach(obj => {
                    obj.setisDer(false);
                    obj.setisIzq(false);
                    obj.setisArr(false);
                    obj.setisAbj(false);
                });

                this.boxesGroup.getChildren().forEach(obj => {
                    obj.setisDer(false);
                    obj.setisIzq(false);
                    obj.setisArr(false);
                    obj.setisAbj(false);
                });
            }
        }

        console.log(this.organCount);

        // -- derrota
        if(this.gameTime <= 0 && this.organCount > 0) {
            //alert('HAS PERDIDO');
            this.perder = true;
        }
    
        if(this.organCount == 0 && this.gameTime > 0) {
            //alert('HAS GANADO');
            this.ganar = true;
        }

        // organs
        if(this.organsGroup) {
            this.organsGroup.getChildren().forEach(obj => {
                // le metes por la der -> mov izq
                if(this.playerG1.getisA() && !this.playerG1.getisW() && !this.playerG1.getisS() && !this.playerG1.getisD()
                 && this.playerG1.getGrabbing() && obj.getisDer()) {
                    obj.setPosition(this.playerG1.x+32, this.playerG1.y);
                }
                // le metes por la izq -> mov der
                if(this.playerG1.getisD() && !this.playerG1.getisW() && !this.playerG1.getisA() && !this.playerG1.getisS()
                    && this.playerG1.getGrabbing() && obj.getisIzq()) {
                    obj.setPosition(this.playerG1.x-32, this.playerG1.y);
                }
                // le metes por arr -> mov arr
                if(this.playerG1.getisW() && !this.playerG1.getisA() && !this.playerG1.getisS() && !this.playerG1.getisD()
                    && this.playerG1.getGrabbing()&& obj.getisAbj()) {
                    obj.setPosition(this.playerG1.x, this.playerG1.y+32);
                }
                // le metes por abj -> mov abj
                if(this.playerG1.getisS() && !this.playerG1.getisA() && !this.playerG1.getisW() && !this.playerG1.getisD()
                    && this.playerG1.getGrabbing()&& obj.getisArr()) {
                    obj.setPosition(this.playerG1.x, this.playerG1.y-32);
                }
            });
        }

        // cajas
        if(this.boxesGroup) {
            this.boxesGroup.getChildren().forEach(obj => {
                // le metes por la der -> mov izq
                if(this.playerG1.getisA() && !this.playerG1.getisW() && !this.playerG1.getisS() && !this.playerG1.getisD()
                 && this.playerG1.getGrabbing() && obj.getisDer()) {
                    obj.setPosition(this.playerG1.x+32, this.playerG1.y);
                }
                // le metes por la izq -> mov der
                if(this.playerG1.getisD() && !this.playerG1.getisW() && !this.playerG1.getisA() && !this.playerG1.getisS()
                    && this.playerG1.getGrabbing() && obj.getisIzq()) {
                    obj.setPosition(this.playerG1.x-32, this.playerG1.y);
                }
                // le metes por arr -> mov arr
                if(this.playerG1.getisW() && !this.playerG1.getisA() && !this.playerG1.getisS() && !this.playerG1.getisD()
                    && this.playerG1.getGrabbing()&& obj.getisAbj()) {
                    obj.setPosition(this.playerG1.x, this.playerG1.y+32);
                }
                // le metes por abj -> mov abj
                if(this.playerG1.getisS() && !this.playerG1.getisA() && !this.playerG1.getisW() && !this.playerG1.getisD()
                    && this.playerG1.getGrabbing()&& obj.getisArr()) {
                    obj.setPosition(this.playerG1.x, this.playerG1.y-32);
                }
            });
        }

        // fin de juego
        this.endLevel();
    }

    decreaseOrganCount() {
        this.organCount--;
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
        if (this.ganar) {
            console.log("victoria");
            result = 'victoria';
        }

        else if (this.perder) {
            console.log("derrota");
            result = 'derrota';
        }

        if (result) {
            const currentDayIndex = this.gameState.currentDay - 1; 
            this.gameState.minigamesResults.Game1[currentDayIndex] = result;
        }

        if(this.ganar || this.perder) {
            console.log(`Resultados hasta ahora: ${this.gameState.minigamesResults.Game1}`);
            this.scene.start("GameSelectorMenu");
        }
    }

    setDifficulty() {
        if(this.gameState.currentDay == 1 || this.gameState.currentDay == 2)
        {
            this.gameTime = 90;
            this.tileKey = 'tilemap1';
            this.mapKey = 'map1';
        }
        else if(this.gameState.currentDay == 3 || this.gameState.currentDay == 4)
        {
            this.gameTime = 70;
            this.tileKey = 'tilemap2';
            this.mapKey = 'map2';
        }
        else if(this.gameState.currentDay == 5)
        {
            this.gameTime = 60;
            this.tileKey = 'tilemap3';
            this.mapKey = 'map3';
        }
    }
}