import GameManager from "./GameManager.js";

// Variable global para gestionar el dia y las acciones
let gameState = {
    currentDay: 1,
    actionsLeft: 3,
    maxDays: 5,
    minigamesResults: {
        Game1: [null, null, null, null, null] ,
        Game2: [null, null, null, null, null] ,
        Game3: [null, null, null, null, null] ,
        Game4: [null, null, null, null, null] ,
        Game5: [null, null, null, null, null] 
    },
    hasStartedBefore: [
        false, // game1.
        false, // game2.
        false, // game3.
        false, // game4.
        false  // game5.
    ],
    playedInCurrentDay: [false, false, false, false, false],
    endResults: {
        Game1: [null, null, null, null, null] ,
        Game2: [null, null, null, null, null] ,
        Game3: [null, null, null, null, null] ,
        Game4: [null, null, null, null, null] ,
        Game5: [null, null, null, null, null] 
    },
    gameSelectorMenuHasStartedBefore: false,
    logros : {
        Game1: ['Amset', 'Hapy', 'Kebeshenuef', 'Duamutef', 'Henu'] ,
        Game2: ['Pluma de la corona', 'Concha cauri', 'Frasco Asuán', 'Cetro de Papiro', 'Cefalea bóvida'] ,
        Game3: ['Escarabajo negro', 'Escarabajo verde', 'Escarabajo azul', 'Escarabajo rojo', 'Escarabajo dorado'] ,
        Game4: ['Flecha', 'Lanza', 'Flecha mágica', 'Lanza mágica', 'Pluma'] ,
        Game5: ['Pequeña estrella', 'Estrella', 'Gran estrella', 'Sol', 'Sol radiante'] 
    },
    logros1 : [],
    logros2 : [],
    logros3 : [],
    logros4 : [],
    logros5 : []
};

export default class GameSelectorMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'GameSelectorMenu'});

        // GAMEMANAGER
        this.manager = new GameManager(this);
    }
    
    init(data) {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }

    create () {
        // Música.
        const music = this.sound.add('ambience');
        music.play();
        this.sound.pauseOnBlur = true;

        // fade
        this.fade = this.add.image(0, 0, 'Fade').setScale(20,10);   
        this.fade.depth = 100;
        this.fade.setAlpha(0);
        this.fadeTween = this.tweens.add({
            targets: this.fade,
            alpha: 1,
            duration: 800,
            ease: 'Bezier',
            yoyo: true,
            paused: true
        })
        this.fadeTween.on('complete', () => {
            this.fadeTween.restart(); 
            this.fadeTween.paused = true;
        });

        this.cameras.main.setBackgroundColor(0x181818);
        if(gameState.gameSelectorMenuHasStartedBefore === false){
            
            
            let actualDiapo = 0; // inicialmente la 0.
            
            // ----- TEXTOS -----.
            let D1Text = this.createEndText(1);
            D1Text.setVisible(true);

            let D2Text = this.createEndText(2);
            D2Text.setVisible(false);

            let D3Text = this.createEndText(3);
            D3Text.setVisible(false);

            let D4Text = this.createEndText(4);
            D4Text.setVisible(false);

            let D5Text = this.createEndText(5);
            D5Text.setVisible(false);

            let D6Text = this.createEndText(6);
            D6Text.setVisible(false);

            // ----- IMÁGENES -----.
            let D1Image = this.createEndImage(1);
            D1Image.setVisible(true);

            let D2Image = this.createEndImage(2);
            D2Image.setVisible(false);

            let D3Image = this.createEndImage(3);
            D3Image.setVisible(false);

            let D4Image = this.createEndImage(4);
            D4Image.setVisible(false);

            let D5Image = this.createEndImage(5);
            D5Image.setVisible(false);

            let D6Image = this.createEndImage(6);
            D6Image.setVisible(false);

            this.continueButton = this.add.text(
                this.cameras.main.centerX, 
                this.cameras.main.centerY + 310, 
                'Continuar',
                {
                fontSize: '30px',
                fontFamily: 'yatra',
                color: 'white',
                align: 'center'
            }).setOrigin(0.5).setInteractive();

            this.continueButton.on('pointerover', () => // Al pasar el ratón por encima...
            {
                this.continueButton.setTint(0xdfa919);
            });

            this.continueButton.on('pointerout', () => // Al quitar el ratón de encima...
            {
                this.continueButton.clearTint();
            });

            this.continueButton.on('pointerdown', ()=>{ // al hacer clic...
                if(actualDiapo === 0){
                    D1Text.setVisible(false);
                    D1Image.setVisible(false);
                    D2Text.setVisible(true);
                    D2Image.setVisible(true);
                    actualDiapo++;
                }
                else if(actualDiapo === 1){
                    D2Text.setVisible(false);
                    D2Image.setVisible(false);
                    D3Text.setVisible(true);
                    D3Image.setVisible(true);
                    actualDiapo++;
                }
                else if(actualDiapo === 2){
                    D3Text.setVisible(false);
                    D3Image.setVisible(false);
                    D4Text.setVisible(true);
                    D4Image.setVisible(true);
                    actualDiapo++;
                }
                else if(actualDiapo === 3){
                    D4Text.setVisible(false);
                    D4Image.setVisible(false);
                    D5Text.setVisible(true);
                    D5Image.setVisible(true);
                    actualDiapo++;
                }
                else if(actualDiapo === 4){
                    D5Text.setVisible(false);
                    D5Image.setVisible(false);
                    D6Text.setVisible(true);
                    D6Image.setVisible(true);
                    actualDiapo++;
                }
                else if(actualDiapo === 5){
                    D1Text.destroy();
                    D2Text.destroy();
                    D3Text.destroy();
                    D4Text.destroy();
                    D5Text.destroy();
                    D6Text.destroy();
                    D1Image.destroy();
                    D2Image.destroy();
                    D3Image.destroy();
                    D4Image.destroy();
                    D5Image.destroy();
                    D6Image.destroy();
                    this.continueButton.destroy();
                    this.createGameSelectorMenu();
                    gameState.gameSelectorMenuHasStartedBefore = true;
                }
            });

        }
        else{
            this.createGameSelectorMenu();
        }
    }

    createEndImage(numberCode){
        let text = 'Intro' + numberCode;
        
        return this.make.image({
            x: this.cameras.main.centerX, // x
            y: this.cameras.main.centerY, // y
            scale:{
                x: 0.7, // anchura
                y: 0.7, // altura
            },
            key: text,
        });
    }

    createEndText(numberCode){
        let text;
        let number;
        let textArray = 
        [
            'Querido escriba mío, no sé si eres si quiera consciente de la magnitud del motivo por el que he pedido que te reúnas conmigo hoy aquí...',
            '... He estado últimamente manteniendo infinidad de conversaciones con la Luna y esta me ha susurrado al oído una inconmesurable cantidad de secretos... secretos que hoy te vengo a confiar:',
            'El destino apunta a que pronto voy a convertirme en diosa. Mi sangre se volverá oro, mi dientes y ojos se transmutarán en perlas, mi gloriosa corona desprenderá una imperecedera luz que iluminará hasta el rincón más recóndito de Kemet, esta nuestra tierra negra.',
            'Para ello necesito que mandes unas cartas de recomendación a algunos dioses para convencerlos de que yo también he de formar parte de su panteón. Estas cartas han de realizarse por medio de rituales, si estos son completados con éxito yo podré ascender y ser uno más de ellos.',
            'Solo serás capaz de realizar tres rituales por día antes de desfallecer, así que ten en cuenta a qué dioses veneras con mayor frecuencia, porque los hilos del destino pueden verse alterados.',
            'Los dioses con los que necesito que contactes son: Socar, dios protector de los muertos, Anuket, diosa del agua, Jepri, dios solar, Inheret, dios de la guerra y de la caza y Shu, dios de luz.'
        ];
        let n = [500, 700, 800]

        if(numberCode == 1){
            text = textArray[0];
            number = n[0];
        }
        else if (numberCode == 2){
            text = textArray[1];
            number = n[0];
        }
        else if (numberCode == 3){
            text = textArray[2];
            number = n[1];
        }
        else if (numberCode == 4){
            text = textArray[3];
            number = n[2];
        }
        else if (numberCode == 5){
            text = textArray[4];
            number = n[0];
        }
        else if (numberCode == 6){
            text = textArray[5];
            number = n[0];
        }
        
        return this.add.text( // diapo 1 text.
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 310, 
            text,
            {
                fontSize: '20px',
                color: '#ffffff',
                align: 'center',
                fontFamily: 'yatra',
                wordWrap: {width: number}, // la puta polla: es lo de \n pero pro.
                wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
            }
        ).setOrigin(0.5);
    }

    createGameSelectorMenu(){

        this.bg = this.make.image({ 
            key: 'EscenaPrincipal',
        }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(1, 1.1);

        this.createIcon('Icon1', 350, 225, 'Game1');
        this.createIcon('Icon2', 670, 225, 'Game2');
        this.createIcon('Icon3', 350, 450, 'Game3');
        this.createIcon('Icon4', 670, 450, 'Game4');
        this.createIcon('Icon5', this.cameras.main.centerX - 7, this.cameras.main.centerY - 50, 'Game5');

        this.infoText;
        let textCode;
        let genericTextCode = `DÍA: ${gameState.currentDay} - Aún puedes escribir ${gameState.actionsLeft} carta`
        if(gameState.actionsLeft > 0 && gameState.actionsLeft != 1) {
            textCode = genericTextCode + 's';
        }
        else if(gameState.actionsLeft == 1) {
            textCode = genericTextCode;
        }
        else {
            textCode = `DÍA: ${gameState.currentDay} - Estás muy cansado para mandar cartas, ve a dormir`
        }

        this.createInfoText(textCode);

        this.createButton('Dormir', this.cameras.main.width - 100, 30, '#735500', '40px');
    }

    createIcon(sprite, x, y, sceneName) {
        let icon = this.make.image({ 
            key: sprite,
        }).setPosition(x, y);

        icon.on('pointerover', () => // Al pasar el ratón por encima...
        {
            icon.setTint(0x8a9597);
        });

        icon.on('pointerout', () => // Al quitar el ratón de encima...
        {
            icon.clearTint();
        });

        icon.setInteractive();

        icon.on("pointerdown", () => { // Al hacer clic...
            const gameIndex = parseInt(sceneName.split('Game')[1]) - 1;

            if(gameState.playedInCurrentDay[gameIndex])
            {
                alert('Ya has jugado este minijuego hoy.');
                return;
            }

            if (gameState.actionsLeft > 0) {
                gameState.actionsLeft--;
                gameState.playedInCurrentDay[gameIndex] = true;
                this.scene.start(sceneName, { gameState: gameState });
            } else {
                alert('No te quedan acciones hoy. Pasa al siguiente dia.');
            }
        });
    }

    createInfoText(textCode){
        this.infoText = this.add.text(10, 10, textCode, {
            fontFamily: 'yatra',
            fontSize: '24px',
            color: '#ffffff',
        });
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
            button.setColor('#0032c3');
        });

        button.on('pointerout', () => // Al quitar el ratón de encima...
        {
            button.setColor('#735500');
        });

        button.setInteractive();
        button.on("pointerdown", () => this.nextDay());
    }

    nextDay() {
        this.fadeTween.play();

        if (gameState.currentDay < gameState.maxDays) {
          this.resetDay();
        } else {
            alert('¡Has alcanzado el ultimo dia!');
            this.saveEndResults();
           
            this.scene.start("EndMenu", { gameState: gameState });
            this.resetGame();
        }
    }

    resetDay() {
        gameState.currentDay++;
        gameState.actionsLeft = 3;
        gameState.playedInCurrentDay = [false, false, false, false, false]; 

        this.infoText.setText(`Día: ${gameState.currentDay} - Acciones restantes: ${gameState.actionsLeft}`);

        if(gameState.actionsLeft > 0 && gameState.actionsLeft != 1) {
            this.infoText.setText(`DÍA: ${gameState.currentDay} - Aún puedes escribir ${gameState.actionsLeft} cartas`);
        }
        else if(gameState.actionsLeft == 1) {
            this.infoText.setText(`DÍA: ${gameState.currentDay} - Aún puedes escribir ${gameState.actionsLeft} carta`);
        }
        else {
            this.infoText.setText(`DÍA: ${gameState.currentDay} - Estás muy cansado para escribir cartas, ve a dormir`);
        }
    }

   saveEndResults(){
        gameState.endResults.Game1 = gameState.minigamesResults.Game1;
        gameState.endResults.Game2 = gameState.minigamesResults.Game2;
        gameState.endResults.Game3 = gameState.minigamesResults.Game3;
        gameState.endResults.Game4 = gameState.minigamesResults.Game4;
        gameState.endResults.Game5 = gameState.minigamesResults.Game5;
   }

   resetGame() {
        gameState.currentDay = 1;
        gameState.actionsLeft = 3;
        gameState.maxDays = 5;
        gameState.minigamesResults = {
            Game1: [null, null, null, null, null] ,
            Game2: [null, null, null, null, null] ,
            Game3: [null, null, null, null, null] ,
            Game4: [null, null, null, null, null] ,
            Game5: [null, null, null, null, null] 
        };
    }
}