export default class MainMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'MainMenu'});
	}

	preload () {
		
	}
	create() {
        // Paramos el audio
        this.sound.stopAll();

        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 150,
            'Introito Antiapotropaico',
            {
                fontFamily: 'acabic',
                fontSize: 80,
                color: 'Blue'
            }
        ).setOrigin(0.5, 0.5);

		let title2 = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 75,
            '(o como contactar con los dioses para propositos malignos\npor mandato de la faraona suprema)',
            {
                fontFamily: 'acabic',
                fontSize: 25,
                color: 'White'
            }
        ).setOrigin(0.5, 0.5);

        // Alineacion del texto
        title.setAlign('center');
		title2.setAlign('center');

        //Color del reborde de la letra y grosor.
        title.setStroke('white', 8)

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
                fontFamily: 'acabic',
                fontSize: 80,
                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => {
            this.scene.start("GameSelectorMenu");
        });
    }

  }