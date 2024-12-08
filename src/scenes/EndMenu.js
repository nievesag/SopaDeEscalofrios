// Variable global para gestionar el dia y las acciones
let endResults = {
    Game1: [null, null, null, null, null] ,
    Game2: [null, null, null, null, null] ,
    Game3: [null, null, null, null, null] ,
    Game4: [null, null, null, null, null] ,
    Game5: [null, null, null, null, null] 
};

export default class EndMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'EndMenu'});
	}

	preload () {
		// Background.
        this.load.image('backgroundMenu', './assets/images/menuBackground.jpg');

        // Música.
        this.load.audio('f3ale', './assets/audio/f3ale.mp3');
	}

	create() {
        // Paramos el audio
        this.sound.stopAll();
        
        // Música.
        const music = this.sound.add('f3ale');
        music.play();
        this.sound.pauseOnBlur = true;

        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 150,
            'FIN DEL PERIODO DE CONTACTO CON LOS DIOSES',
            {
                fontFamily: 'arabic',
                fontSize: 30,

                color: '#dfa919',
                stroke: '#453424',   
                strokeThickness: 10
            }
        ).setOrigin(0.5, 0.5);

		let title2 = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 75,
            'Estos son tus resultados:',
            {
                fontFamily: 'arabic',
                fontSize: 25,
                color: '#e3be5b'
            }
        ).setOrigin(0.5, 0.5);

        console.log(`Resultados Juego 1: ${ endResults.Game1 }`);
        console.log(`Resultados Juego 2: ${ endResults.Game2 }`);
        console.log(`Resultados Juego 3: ${ endResults.Game3 }`);
        console.log(`Resultados Juego 4: ${ endResults.Game4 }`);
        console.log(`Resultados Juego 5: ${ endResults.Game5 }`);

        const bg = this.make.image({ // Background.
            key: 'backgroundMenu',
        }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

        // Alineacion y profundidad del texto.
        title.setAlign('center').setDepth(1);
		title2.setAlign('center').setDepth(1);

        // Botones
        this.createButton('VOLVER',  this.cameras.main.centerX,  80 + this.cameras.main.centerY, 'white');
        //this.createButton('2P Game', 50, 2, 'white');
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