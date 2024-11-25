import PlayerG1 from '../objetos/Game1Obj/playerG1.js';
import Organ from '../objetos/Game1Obj/organ.js';
import Box from '../objetos/Game1Obj/box.js';
import Goal from '../objetos/Game1Obj/goal.js';

export default class Game1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game1'});
        this.gameTime = 10; // segundos para el juego
    }
    
    preload () {
        // Cargamos el Tilemap (JsSON)
		this.load.tilemapTiledJSON('tilemap', './assets/tilemap/map1.json');

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
        // Música.
        const music = this.sound.add('theme1');
        music.play();
        this.sound.pauseOnBlur = true;

        //let boxes = [];
        //boxes = this.physics.add.group(); // grupo de fisicas para las cajas

        // ---- Objectos de escena ----
        // instancias
        // let box1 = new Box(this, 200, 0, boxes);
        // let box2 = new Box(this, 400, 0, boxes);
        
        //this.playerG1 = this.physics.add.sprite(400, 300, 'player');
        // this.playerG1.setCollideWorldBounds(true);
        // this.playerG1.setPushable(false);
        
        this.cameras.main.setBounds(-100,-65,416,256).setZoom(window.screen.availWidth/1000);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // -------- COSAS DEL TILESET --------
		// Objeto tilemap
		this.map = this.make.tilemap({
            key: 'tilemap',
			tileWidth: 32,
			tileHeight: 32
		});
        
		// Objeto el tileset. 
		// recibe "name" del .json y la imagen del tileset
		const tileset1 = this.map.addTilesetImage('tileset_duat', 'patronesTilemap');
        
        // capas
		// con el nombre del .json
		this.groundLayer = this.map.createLayer('Ground', tileset1);
		this.wallLayer = this.map.createLayer('Wall', tileset1);
		this.wallLayer.setCollision(2, true); // Los tiles de esta capa tienen colisiones

		// Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
        
        // --- GOAL
        let react = this.map.createFromObjects('GameObjects', { name: "goal", classType: Organ, key: "goal" });
        this.goal = react[0]; //solo hay 1 y es el goal

        // --- CAJAS
        let boxes = this.map.createFromObjects('GameObjects', { name: "box", classType: Box, key: 'box' });
        
		let boxesGroup = this.add.group();
        boxesGroup.addMultiple(boxes);
		boxes.forEach(obj => {
            this.physics.add.existing(obj);
		});
        
        // --- ORGANOS
		let organs = this.map.createFromObjects('GameObjects', { name: "organ", classType: Organ, key: 'organ' });
        
		let organsGroup = this.add.group();
        this.organsPool = [];
        
        organsGroup.addMultiple(organs);
		organs.forEach(obj => {
            this.physics.add.existing(obj);
            this.organsPool.push(obj);
        });
        
        this.organCount = this.organsPool.length;

        // --- PLAYER
        let characters = this.map.createFromObjects('GameObjects', { name: "spawn", classType: PlayerG1, key: "player" });
        let playerG1 = characters[0]; //se que solo hay uno y es mi player
        
        // Prodía recorrer el array y según cierta propiedad hacer inicializar con ciertos atributos.
        //characters.forEach(obj => {
        //	obj.setDepth(10);
        //});

        // colisiones
        this.physics.add.collider(playerG1, this.wallLayer);
        this.physics.add.collider(playerG1, organsGroup);
        this.physics.add.collider(playerG1, boxesGroup);

        this.physics.add.collider(boxesGroup, boxesGroup);
        this.physics.add.collider(boxesGroup, this.wallLayer);
        
        this.physics.add.collider(organsGroup, organsGroup);
        this.physics.add.collider(organsGroup, this.wallLayer);

        this.physics.add.collider(boxesGroup, organsGroup);

        // tiempo
        this.timerText = this.add.text(20, 20, this.gameTime,
            { fontFamily: 'arabic', fontSize: 15, color: 'White' }).setOrigin(0.5, 0.5);
        this.timerHUD();

        this.createButton('MAIN MENU',  this.cameras.main.centerX - 30, this.cameras.main.centerY, 'white', 30, 'GameSelectorMenu');

        // -----------------------------------
    }

    // Lo llamas en el create
    timerHUD(){
        const updateTimer = () => {
            // Vamos restando de uno en uno
            this.gameTime -= 1; // Cambia esto según tus necesidades

            // Eliminar el texto anterior
            this.timerText.destroy();

            if(this.gameTime > 0) {
                // Crear el nuevo texto actualizado en el mismo sitio
                this.timerText = this.add.text(20, 20, this.gameTime,
                    { fontFamily: 'arabic', fontSize: 15, color: 'White' }).setOrigin(0.5, 0.5);
            }
        };
        // Evento que actualice el temporizador
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: updateTimer,
            callbackScope: this
        });
    }


    init() {
        
        // para llevar el control de limite de tiempo
        // this.maxTime = document.getElementById('targetTime');
        
        // this.time = 0; 
    }

    handleOrganGoal() {

    }

    update(time, dt)
    {
        // ---- limite de tiempo ----
        if(this.gameTime <= 0 && !this.gameEnd){
            console.log("final");
        }
    
        this.organsPool.forEach(organ => {
            organ.checkCollisionWithGoal(this, this.goal);
        });

        if(this.organCount == 0) {
            console.log("hola");
        }

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
}