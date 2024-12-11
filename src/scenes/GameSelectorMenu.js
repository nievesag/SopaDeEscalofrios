
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
    gameSelectorMenuHasStartedBefore: false
};

export default class GameSelectorMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'GameSelectorMenu'});
    }
    

    init(data) {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }
    preload () {
    
    }

    create () {

        if(gameState.gameSelectorMenuHasStartedBefore === false){
            let actualDiapo = 0; // inicialmente la 0.

            // Fondo de las diapositivas de lore.
            this.diaposBG = this.make.image({
                x: this.cameras.main.centerX, // x
                y: this.cameras.main.centerY, // y
                scale:{
                    x: 1.9, // anchura
                    y: 2.22, // altura
                },
                key: 'tanqiaBg',
            });

            let D1Text = this.add.text( // diapo 1 text.
                this.cameras.main.centerX, 
                this.cameras.main.centerY - 150, 
                'hola esto es la diapo 1',
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
                this.cameras.main.centerY - 150, 
                'hola esto es la diapo 2',
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
                this.cameras.main.centerY - 150, 
                'hola esto es la diapo 3',
                {
                    fontSize: '20px',
                    color: '#ffffff',
                    align: 'center',
                    fontFamily: 'yatra',
                    wordWrap: {width: 500}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5).setVisible(false); // danzhu lo tenia y funciona.

            this.continueButton = this.add.text(
                this.cameras.main.centerX, 
                this.cameras.main.centerY + 340, 
                'Continuar',
                {
                fontSize: '50px',
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
                    D2Text.setVisible(true);
                    actualDiapo++;
                }
                else if(actualDiapo === 1){
                    D2Text.setVisible(false);
                    D3Text.setVisible(true);
                    actualDiapo++;
                }
                else if(actualDiapo === 2){
                    D1Text.destroy();
                    D2Text.destroy();
                    D3Text.destroy();
                    this.continueButton.destroy();
                    this.diaposBG.destroy();
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
        this.sound.stopAll();

        // Música.
        const music = this.sound.add('f3ale');
        music.play();
        this.sound.pauseOnBlur = true;

        this.createButton("Camino a la Duat", 200, 200, 'white', 50, 'Game1');
        this.createButton("La Vasija Entresija", 800, 200, 'white', 50, 'Game2');
        this.createButton("Al Rescate de los Escarabajos", 200, 600, 'white', 35, 'Game3');
        this.createButton("Tiro al Arco Mágico", 800, 600, 'white', 50, 'Game4');
        this.createButton("El Sendero al Sol", this.cameras.main.centerX, this.cameras.main.centerY, 'white', 50, 'Game5');

        this.infoText = this.add.text(10, 10, `Día: ${gameState.currentDay} - Acciones restantes: ${gameState.actionsLeft}`, {
            fontFamily: 'yatra',
            fontSize: '24px',
            color: '#ffffff',
        });

        // Boton para pasar al siguiente día
        this.nextDayButton = this.add.text(this.cameras.main.width - 100, 40, 'Next Day', {
            fontFamily: 'yatra',
            fontSize: '30px',
            color: '#ffffff',
        }).setOrigin(0.5, 0.5);

        this.nextDayButton.setInteractive();
        this.nextDayButton.on('pointerdown', () => this.nextDay());
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
                this.sound.stopAll();
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