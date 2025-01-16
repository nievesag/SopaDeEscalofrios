export default class GameManager {
    constructor(scene) {
        this.gameState = {
            // dia actual
            currentDay: 1,

            // acciones restantes por dia
            actionsLeft: 3,

            // maximo de dias en el juego
            maxDays: 5,

            // victoria o derrota por minijuego
            // juego [vic/derr dia 1 , ... , vic/derr dia n]
            minigamesResults: {
                Game1: [null, null, null, null, null] ,
                Game2: [null, null, null, null, null] ,
                Game3: [null, null, null, null, null] ,
                Game4: [null, null, null, null, null] ,
                Game5: [null, null, null, null, null] 
            },

            // registro de si cada juego se ha jugado ya o no
            // para mostrar tutorial
            hasStartedBefore: [
                false, // game1.
                false, // game2.
                false, // game3.
                false, // game4.
                false  // game5.
            ],

            // si se ha jugado ya en este dia, solo se puede jugar 1 vez por dia cada juego
            playedInCurrentDay: [false, false, false, false, false],

            // victoria o derrota por minijuego AL FINAL
            // juego [vic/derr dia 1 , ... , vic/derr dia n]
            endResults: {
                Game1: [null, null, null, null, null] ,
                Game2: [null, null, null, null, null] ,
                Game3: [null, null, null, null, null] ,
                Game4: [null, null, null, null, null] ,
                Game5: [null, null, null, null, null] 
            },

            // si es la primera vez que estas en el gameSelectorMenu
            gameSelectorMenuHasStartedBefore: false,

            // todos los logros de cada juego
            logros : {
                Game1: ['Amset', 'Hapy', 'Kebeshenuef', 'Duamutef', 'Henu'] ,
                Game2: ['Pluma de la corona', 'Concha cauri', 'Frasco Asuán', 'Cetro de Papiro', 'Cefalea bóvida'] ,
                Game3: ['Escarabajo negro', 'Escarabajo verde', 'Escarabajo azul', 'Escarabajo rojo', 'Escarabajo dorado'] ,
                Game4: ['Flecha', 'Lanza', 'Flecha mágica', 'Lanza mágica', 'Pluma'] ,
                Game5: ['Pequeña estrella', 'Estrella', 'Gran estrella', 'Sol', 'Sol radiante'] 
            },

            // ir almacenando logros por juego
            logros1 : [],
            logros2 : [],
            logros3 : [],
            logros4 : [],
            logros5 : []
        };
    }

    // ---- GESTION DE DIAS ----
    nextDay() {
        if (gameState.currentDay < gameState.maxDays) 
        {
          this.resetDay();
        } 
        else 
        {
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

        if(gameState.actionsLeft > 0 && gameState.actionsLeft != 1) 
        {
            this.infoText.setText(`DÍA: ${gameState.currentDay} - Aún puedes escribir ${gameState.actionsLeft} cartas`);
        }
        else if(gameState.actionsLeft == 1) 
        {
            this.infoText.setText(`DÍA: ${gameState.currentDay} - Aún puedes escribir ${gameState.actionsLeft} carta`);
        }
        else 
        {
            this.infoText.setText(`DÍA: ${gameState.currentDay} - Estás muy cansado para escribir cartas, ve a dormir`);
        }
    }
    // ---

    // ---- GESTION DE VICTORIA / DERROTA ----
    saveEndResults() {
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
    // ---

    // ---- GESTION DE LOGROS ----
    manageLogros() {
        for(var i = 0; i < this.gameState.endResults.Game1.length; i++) {
            // --- logros g1
            if(this.gameState.endResults.Game1[i] != null && this.gameState.endResults.Game1[i] != 'derrota') {
                this.gameState.logros1.push(this.gameState.logros.Game1[i]);
            }
            // --- logros g2
            if(this.gameState.endResults.Game2[i] != null && this.gameState.endResults.Game2[i] != 'derrota') {
                this.gameState.logros2.push(this.gameState.logros.Game2[i]);
            }
            // --- logros g3
            if(this.gameState.endResults.Game3[i] != null && this.gameState.endResults.Game3[i] != 'derrota') {
                this.gameState.logros3.push(this.gameState.logros.Game3[i]);
            }
            // --- logros g4
            if(this.gameState.endResults.Game4[i] != null && this.gameState.endResults.Game4[i] != 'derrota') {
                this.gameState.logros4.push(this.gameState.logros.Game4[i]);
            }
            // --- logros g5
            if(this.gameState.endResults.Game5[i] != null && this.gameState.endResults.Game5[i] != 'derrota') {
                this.gameState.logros5.push(this.gameState.logros.Game5[i]);
            }
        }

        console.log(this.gameState.logros1);
        console.log(this.gameState.logros2);
        console.log(this.gameState.logros3);
        console.log(this.gameState.logros4);
        console.log(this.gameState.logros5);
    }

    savelogrosEnd() {
        // logros 1
        for(var i = 0; i < this.gameState.logros1.length; i++) {
            logrosEnd.push(this.gameState.logros1[i]);
        }
        // logros 2
        for(var i = 0; i < this.gameState.logros2.length; i++) {
            logrosEnd.push(this.gameState.logros2[i]);
        }
        // logros 3
        for(var i = 0; i < this.gameState.logros3.length; i++) {
            logrosEnd.push(this.gameState.logros3[i]);
        }
        // logros 4
        for(var i = 0; i < this.gameState.logros4.length; i++) {
            logrosEnd.push(this.gameState.logros4[i]);
        }
        // logros 5
        for(var i = 0; i < this.gameState.logros5.length; i++) {
            logrosEnd.push(this.gameState.logros5[i]);
        }
    }

    resetLogros() {
        this.gameState.logros1 = [];
        this.gameState.logros2 = [];
        this.gameState.logros3 = [];
        this.gameState.logros4 = [];
        this.gameState.logros5 = [];
    }
    // ---
}