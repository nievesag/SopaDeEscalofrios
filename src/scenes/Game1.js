import PlayerG1 from '../objetos/Game1Obj/playerG1.js';
import Box from '../objetos/Game1Obj/box.js';

export default class Game1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game1'});
    }
    
    preload () {
        		// Cargamos el Tilemap (JSON)
		this.load.tilemapTiledJSON('tilemap', 'assets/tilemap/map1.json');

		// Cargamos la imagen que compone el Tileset (Imagen con los tiles usados por el tilemap)
		this.load.image('patronesTilemap', 'assets/tilemap/tileset_duat.png');

		// Recurso para el personaje principal (imagen simple con un solo frame)
		this.load.image('player', '../../assets/images/g1/playerG1.png');

		// Recurso para las monedas (Spreetsheet con 6 frames);
		// this.load.image('coin', 'assets/coin.png', { frameWidth: 32, frameHeight: 32 });
    }
    
    create () {
        //let boxes = [];
        //boxes = this.physics.add.group(); // grupo de fisicas para las cajas

        // ---- Objectos de escena ----
        // instancias
        let playerG1 = new PlayerG1(this, 50, 50);
        // let box1 = new Box(this, 200, 0, boxes);
       // let box2 = new Box(this, 400, 0, boxes);
        
        // this.playerG1 = this.physics.add.sprite(400, 300, 'player');
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

        //this.map.
        
		// Objeto el tileset. 
		// addTilesetImage recibe la propiedad "name" del tileset a usar (ver .json, propiedad "tilesets":[... "name":"castillo32x32" ... ] como primer parámetro
		// y la imagen del tileset
		const tileset1 = this.map.addTilesetImage('tileset_duat', 'patronesTilemap');
        
		// creamos las diferentes capas a través del tileset. El nombre de la capa debe aparecer en el .json del tilemap cargado
		this.groundLayer = this.map.createLayer('Ground', tileset1);
        
		this.wallLayer = this.map.createLayer('Wall', tileset1);
		this.wallLayer.setCollision(2); // Los tiles de esta capa tienen colisiones

		// // Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
		// let higado = this.map.createFromObjects('GameObjects', { name: "higado", key: 'higado' });

		// let organsGroup = this.add.group();
		// coinsGroup.addMultiple(coins)
		// coins.forEach(obj => {
		// 	this.physics.add.existing(obj);
		// });

		playerG1 = this.map.createFromObjects('GameObjects', { name: 'spawn', classType: playerG1 });

		/*
		Prodía recorrer el array y según cierta propiedad hacer inicializar con ciertos atributos.
		characters.forEach(obj => {
			obj.setDepth(10);
		});
		*/


		// Ponemos la cámara principal de juego a seguir al jugador
		// this.cameras.main.startFollow(player);


		// // Creamos la última capa que representa objetos por los que el jugador pasa por detrás.
		// this.topColumnLayer = this.map.createLayer('CapaAlto', tileset1);

        // -----------------------------------
    }

    init() {

        // para llevar el control de limite de tiempo
        // this.maxTime = document.getElementById('targetTime');

        // this.time = 0; 
    }

    update(time, dt) 
    {

        // // ---- limite de tiempo ----
        // this.time += dt;
        // if(this.time > this.maxTime.value*1000) {
            
        // }

        // // DEL PLAYER para la clase player y eso --------->

        // this.player.setVelocity(0, 0);

        // if (this.cursors.left.isDown)
        // {
        //     this.player.setVelocityX(-200);
        // }
        // else if (this.cursors.right.isDown)
        // {
        //     this.player.setVelocityX(200);
        // }

        // if (this.cursors.up.isDown)
        // {
        //     this.player.setVelocityY(-200);
        // }
        // else if (this.cursors.down.isDown)
        // {
        //     this.player.setVelocityY(200);
        // }
    }
}