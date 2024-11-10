export default class MainMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'MainMenu'});
	}

	preload () {
		
	}
	create() {
        // Paramos el audio
        this.sound.stopAll();

        // color borde #453424
        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 150,
            'Introito Antiapotropaico',
            {
                fontFamily: 'arabic',
                fontSize: 100,

                color: '#dfa919',
                stroke: '#453424',   
                strokeThickness: 10
            }
        ).setOrigin(0.5, 0.5);

		let title2 = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 75,
            '(o Cómo contactar con los dioses para propositos malignos\npor mandato de la Faraona Suprema)',
            {
                fontFamily: 'arabic',
                fontSize: 25,
                color: '#e3be5b'
            }
        ).setOrigin(0.5, 0.5);

        // Alineacion del texto
        title.setAlign('center');
		title2.setAlign('center');

        // Botones
        this.createButton('JUGAR',  this.cameras.main.centerX,  80 + this.cameras.main.centerY, 'white');
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
            this.scene.start("Game4");
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