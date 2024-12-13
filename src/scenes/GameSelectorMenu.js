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
    }
    

    init(data) {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }

    create () {
        // Música.
        const music = this.sound.add('ambience');
        music.play();
        this.sound.pauseOnBlur = true;

        this.cameras.main.setBackgroundColor(0x181818);
        if(gameState.gameSelectorMenuHasStartedBefore === false){
            
            
            let actualDiapo = 0; // inicialmente la 0.
            
            // ----- TEXTOS -----.
            let D1Text = this.add.text( // diapo 1 text.
                this.cameras.main.centerX, 
                this.cameras.main.centerY - 310, 
                'Querido escriba mío, no sé si eres si quiera consciente de la magnitud del motivo por el que he pedido que te reúnas conmigo hoy aquí...',
                {
                    fontSize: '20px',
                    color: '#ffffff',
                    align: 'center',
                    fontFamily: 'yatra',
                    wordWrap: {width: 500}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5); // danzhu lo tenia y funciona.

            let D2Text = this.add.text( // diapo 1 text.
                this.cameras.main.centerX, 
                this.cameras.main.centerY - 310, 
                '... He estado últimamente manteniendo infinidad de conversaciones con la Luna y esta me ha susurrado al oído una inconmesurable cantidad de secretos... secretos que hoy te vengo a confiar:',
                {
                    fontSize: '20px',
                    color: '#ffffff',
                    align: 'center',
                    fontFamily: 'yatra',
                    wordWrap: {width: 500}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5).setVisible(false); // danzhu lo tenia y funciona.

            let D3Text = this.add.text( // diapo 1 text.
                this.cameras.main.centerX, 
                this.cameras.main.centerY - 310, 
                'El destino apunta a que pronto voy a convertirme en diosa. Mi sangre se volverá oro, mi dientes y ojos se transmutarán en perlas, mi gloriosa corona desprenderá una imperecedera luz que iluminará hasta el rincón más recóndito de Kemet, esta nuestra tierra negra.',
                {
                    fontSize: '20px',
                    color: '#ffffff',
                    align: 'center',
                    fontFamily: 'yatra',
                    wordWrap: {width: 700}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5).setVisible(false); // danzhu lo tenia y funciona.

            let D4Text = this.add.text( // diapo 1 text.
                this.cameras.main.centerX, 
                this.cameras.main.centerY - 310, 
                'Para ello necesito que mandes unas cartas de recomendación a algunos dioses para convencerlos de que yo también he de formar parte de su panteón. Estas cartas han de realizarse por medio de rituales, si estos son completados con éxito yo podré ascender y ser uno más de ellos.',
                {
                    fontSize: '20px',
                    color: '#ffffff',
                    align: 'center',
                    fontFamily: 'yatra',
                    wordWrap: {width: 800}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5).setVisible(false); // danzhu lo tenia y funciona.

            let D5Text = this.add.text( // diapo 1 text.
                this.cameras.main.centerX, 
                this.cameras.main.centerY - 310, 
                'Solo serás capaz de realizar tres rituales por día antes de desfallecer, así que ten en cuenta a qué dioses veneras con mayor frecuencia, porque los hilos del destino pueden verse alterados.',
                {
                    fontSize: '20px',
                    color: '#ffffff',
                    align: 'center',
                    fontFamily: 'yatra',
                    wordWrap: {width: 500}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5).setVisible(false); // danzhu lo tenia y funciona.

            let D6Text = this.add.text( // diapo 1 text.
                this.cameras.main.centerX, 
                this.cameras.main.centerY - 310, 
                'Los dioses con los que necesito que contactes son: Socar, dios protector de los muertos, Anuket, diosa del agua, Jepri, dios solar, Inheret, dios de la guerra y de la caza y Shu, dios de luz.',
                {
                    fontSize: '20px',
                    color: '#ffffff',
                    align: 'center',
                    fontFamily: 'yatra',
                    wordWrap: {width: 500}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5).setVisible(false); // danzhu lo tenia y funciona.

            // ----- IMÁGENES -----.
            let D1Image = this.make.image({
                x: this.cameras.main.centerX, // x
                y: this.cameras.main.centerY, // y
                scale:{
                    x: 0.7, // anchura
                    y: 0.7, // altura
                },
                key: 'Intro1',
            });

            let D2Image = this.make.image({
                x: this.cameras.main.centerX, // x
                y: this.cameras.main.centerY, // y
                scale:{
                    x: 0.7, // anchura
                    y: 0.7, // altura
                },
                key: 'Intro2',
            }).setVisible(false);;

            let D3Image = this.make.image({
                x: this.cameras.main.centerX, // x
                y: this.cameras.main.centerY, // y
                scale:{
                    x: 0.7, // anchura
                    y: 0.7, // altura
                },
                key: 'Intro3',
            }).setVisible(false);;

            let D4Image = this.make.image({
                x: this.cameras.main.centerX, // x
                y: this.cameras.main.centerY, // y
                scale:{
                    x: 0.7, // anchura
                    y: 0.7, // altura
                },
                key: 'Intro4',
            }).setVisible(false);

            let D5Image = this.make.image({
                x: this.cameras.main.centerX, // x
                y: this.cameras.main.centerY, // y
                scale:{
                    x: 0.7, // anchura
                    y: 0.7, // altura
                },
                key: 'Intro5',
            }).setVisible(false);;

            let D6Image = this.make.image({
                x: this.cameras.main.centerX, // x
                y: this.cameras.main.centerY, // y
                scale:{
                    x: 0.7, // anchura
                    y: 0.7, // altura
                },
                key: 'Intro6',
            }).setVisible(false);;

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
        if(gameState.actionsLeft > 0 && gameState.actionsLeft != 1) {
            this.infoText = this.add.text(10, 10, `DÍA: ${gameState.currentDay} - Aún puedes escribir ${gameState.actionsLeft} cartas`, {
                fontFamily: 'yatra',
                fontSize: '24px',
                color: '#ffffff',
            });
        }
        else if(gameState.actionsLeft == 1) {
            this.infoText = this.add.text(10, 10, `DÍA: ${gameState.currentDay} - Aún puedes escribir ${gameState.actionsLeft} carta`, {
                fontFamily: 'yatra',
                fontSize: '24px',
                color: '#ffffff',
            });
        }
        else {
            this.infoText = this.add.text(10, 10, `DÍA: ${gameState.currentDay} - Estás muy cansado para mandar cartas, ve a dormir`, {
                fontFamily: 'yatra',
                fontSize: '24px',
                color: '#ffffff',
            });
        }

        // Boton para pasar al siguiente día
        this.nextDayButton = this.add.text(this.cameras.main.width - 100, 30, 'Dormir', {
            fontFamily: 'yatra',
            fontSize: '40px',
            color: '#735500',
        }).setOrigin(0.5, 0.5);

        this.nextDayButton.setInteractive();

        this.nextDayButton.on('pointerover', () => // Al pasar el ratón por encima...
        {
            this.nextDayButton.setColor('#0032c3');
            //this.nextDayButton.setTint(0xdfa919);
        });

        this.nextDayButton.on('pointerout', () => // Al quitar el ratón de encima...
        {
            this.nextDayButton.setColor('#735500');
        });

        this.nextDayButton.on('pointerdown', () => this.nextDay());
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

    nextDay() {
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