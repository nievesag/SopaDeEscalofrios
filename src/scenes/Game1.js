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
        // Cargamos el Tilemap (JSON)
        // -- mapa 1
		this.load.tilemapTiledJSON('tilemap1', './assets/tilemap/map1.json');
        // -- mapa 2
        this.load.tilemapTiledJSON('tilemap2', './assets/tilemap/map2.json');
        // -- mapa 3
        this.load.tilemapTiledJSON('tilemap3', './assets/tilemap/map3.json');
    }
    
    create () {
        this.cameras.main.setBackgroundColor(0x181818);

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

        let tanqiaText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 100, 
            'Socar te ama. A ti y a cada uno de los futuros muertos. Te ama a ti, con tus órganos frescos, y me ama a mí, con mis órganos podridos. Esa piel fina que te recubre te contiene y tras la muerte Socar te contendrá como una piel transitoria en tu viaje por la Duat. Socar alimenta uno a uno cada corazón, cada estómago, cada intestino, cada mínima parte de aquel que llama a La puerta de caminos, inscribe tus peticiones y plegarias en los órganos de los finados de esta ciudad y hazlos llegar a lo más profundo del Mundo Subterráneo',
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
            'Icon1'
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
            key: 'Tuto1',
        });

        let tuto1Text = this.add.text( // diapo 1 text.
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

        tuto1Text.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            tutoImage.destroy();
            tuto1Text.destroy();
            this.startGame();
        });

        tuto1Text.on('pointerover', () => // Al pasar el ratón por encima...
        {
            tuto1Text.setColor('#0032c3');
        });

        tuto1Text.on('pointerout', () => // Al quitar el ratón de encima...
        {
            tuto1Text.setColor('#181818');
        });
    }

    startGame() {
        this.cameras.main.setBounds(-65,-65,416,256).setZoom(window.screen.availWidth/1000);
        
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
        let react = this.map.createFromObjects('GameObjects', { name: "goal", classType: Goal, key: "goal" });
        this.goal = react[0]; //solo hay 1 y es el goal
        this.goal.body.immovable = true;

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
        this.physics.add.collider(this.boxesGroup, this.goal);

        this.boxesGroup.getChildren().forEach(obj => {
            obj.setPlayer(this.playerG1);
            obj.setRangeUp();
            this.physics.add.overlap(this.playerG1, obj.range, () => {
                obj.setTouched(true);
            });
        });

        this.organsGroup.getChildren().forEach(obj => {
            obj.setPlayer(this.playerG1);
            obj.setRangeUp();
            this.physics.add.overlap(this.playerG1, obj.range, () => {
                obj.setTouched(true);
            });
        });

        // ---- GRAB ----
        // -- organs
        // der
        this.organsGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabDer(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    obj.setisDer(true); // caja agarrada por la der
                }
            });
        });
        
        // izq
        this.organsGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabIzq(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    obj.setisIzq(true); // caja agarrada por la izq
                }
            });
        });

        // arr
        this.organsGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabArr(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    obj.setisArr(true); // caja agarrada por arr
                }
            });
        });

        // abj
        this.organsGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabAbj(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    obj.setisAbj(true); // caja agarrada por la abj
                }
            });
        });

        // -- boxes
        // der
        this.boxesGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabDer(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    obj.setisDer(true); // caja agarrada por la der
                }
            });
        });
        
        // izq
        this.boxesGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabIzq(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    obj.setisIzq(true); // caja agarrada por la izq
                }
            });
        });

        // arr
        this.boxesGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabArr(), obj, () => {
                if(this.playerG1.getGrabbing()) {
                    obj.setisArr(true); // caja agarrada por arr
                }
            });
        });

        // abj
        this.boxesGroup.getChildren().forEach(obj => {
            this.physics.add.collider(this.playerG1.getGrabAbj(), obj, () => {
                if(this.playerG1.getGrabbing()) {
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
        this.timerText = this.add.text(
            20, 
            20, 
            this.gameTime,
            { 
                fontFamily: 'yatra', 
                fontSize: 15, 
                color: 'White' 
            }).setOrigin(0.5, 0.5);
            
            this.timerHUD();
            
            // -----------------------------------
    }
        
    timerHUD() {
        const updateTimer = () => {
            this.gameTime -= 1; // disminuye contador
            this.timerText.destroy(); // borra texto anterior

        if(this.gameTime > 0) {
            // crea texto nuevo
            this.timerText = this.add.text(20, 20, this.gameTime,
                { fontFamily: 'yatra', fontSize: 15, color: 'White' }).setOrigin(0.5, 0.5);
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
        if(this.playerG1 != null && this.organsGroup != null && this.boxesGroup != null) {

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

            this.boxesGroup.getChildren().forEach(obj => {
                obj?.update();
            });

            this.organsGroup.getChildren().forEach(obj => {
                obj?.update();
            });
        }

        // -- derrota
        if(this.gameTime <= 0 && this.organCount > 0) {
            this.perder = true;
        }
    
        if(this.organCount == 0 && this.gameTime > 0) {
            this.ganar = true;
        }

        // organs
        if(this.organsGroup != null) {
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
        if(this.boxesGroup != null) {
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
            this.scene.start(sceneName);

        });
    }

    endLevel()
    {
        let result;
        if (this.ganar) {
            alert('Has obtenido el logro ' + this.gameState.logros.Game1[this.gameState.currentDay - 1] + ' por enviarle una carta a Socar el día ' + this.gameState.currentDay);
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

            let mode;
            if(this.ganar){
                mode = 0;
                this.scene.start('EndLevel', {mode: mode});
            }
            else if(this.perder){
                mode = 1;
                this.scene.start('EndLevel', {mode: mode});
            }
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