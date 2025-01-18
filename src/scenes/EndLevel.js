export default class EndLevel extends Phaser.Scene {
	constructor() {
		super({ key: 'EndLevel'});
	}

    init(data) {
        this.mode = data.mode;
    }

    create() {
        let keyCode;
        let textCode;
        if(this.mode === 0){
            keyCode = 'Enviada';
            textCode = 'Carta correctamente enviada \n ¿Regresar?';
        }
        else if (this.mode === 1){
            keyCode = 'NoEnviada'
            textCode = 'Has fallado en tu cometido. \n La carta no se ha enviado \n ¿Regresar?';
        }

        let endImage = this.make.image({
            x: this.cameras.main.centerX, // x
            y: this.cameras.main.centerY, // y
            scale:{
                x: 1, // anchura
                y: 1.1, // altura
            },
            key: keyCode,
        }).setDepth(10).setOrigin(0.5).setScale(1, 1.1);

        let cartaEnviada = this.add.text( 
            this.cameras.main.centerX - 250,
            this.cameras.main.centerY - 270,
            textCode,
            {
                fontSize: '30px',
                color: '#bbb8b1',
                align: 'center',
                fontFamily: 'yatra',
            }
        ).setDepth(11).setInteractive().setOrigin(0.5).setScale(1, 1.1); 

        cartaEnviada.on('pointerdown', ()=>{
            // Destruye todo y vuelve al menu principal
            endImage.destroy();
            cartaEnviada.destroy();
            this.scene.start('GameSelectorMenu');
        });

        cartaEnviada.on('pointerover', () => // Al pasar el ratón por encima...
        {
            cartaEnviada.setColor('#0032c3');
        });

        cartaEnviada.on('pointerout', () => // Al quitar el ratón de encima...
        {
            cartaEnviada.setColor('#bbb8b1');
        });
    }
}