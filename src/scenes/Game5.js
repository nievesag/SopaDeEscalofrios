
import Wall from '../objetos/Game5Obj/Wall.js';
import Gun from '../objetos/Game5Obj/Gun.js';
import Void from '../objetos/Game5Obj/Void.js';
import Destiny from '../objetos/Game5Obj/Destiny.js';
import Gate from '../objetos/Game5Obj/Gate.js';

export default class Game5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game5' });
    }

    init(data) {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }
    
    preload () {
        this.load.json('tableroData', './src/objetos/Game5Obj/tablero.json');
    }
    
    create() {
        this.cameras.main.setBackgroundColor(0x181818);

        this.gameOver = false; // comprueba si se ha terminado el juego (aunque solo lo uso para saber si ha ganado)

        // si es la primera vez q se inicia...
        if(!this.gameState.hasStartedBefore[4]){
            this.gameState.hasStartedBefore[4] = true; // ala ya ha salio el tutorial.
            this.createTanqiaPopUp();
        }
        else{ // si ya se ha iniciado anteriormente...
            this.startGame(); // empieza el game directamente.
        }
    }

    createTanqiaPopUp(){

        this.isClickingOnUI = true; // inicialmente lo de Tanqia es UI (bloquea interacciones).
        
        let tanqiaText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 100, 
            'Shu, divinidad danzante del aire, él desea iluminar todo a su paso,  él es la sequedad, él es el tenue brillo de atardecer… Ayuda a Shu a apartar la tenebrosa oscuridad de las profundidades de la pirámide para completar su destino. Coloca y mueve los espejos para guiar a Shu, y él te dará su bendición.',
            {
                fontSize: '20px',
                color: '#ffffff',
                align: 'center',
                fontFamily: 'yatra',
                wordWrap: {width: 500}, // la puta polla: es lo de \n pero pro.
                wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
            }
        ).setOrigin(0.5); // danzhu lo tenia y funciona.

        let tanqia = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 175, 
            'Icon5'
        ).setScale(1.5, 1.5).setInteractive(); // x, y, tag.

        tanqia.on('pointerover', () => // Al pasar el ratón por encima...
        {
            tanqia.setTint(0x8a9597);
        });

        tanqia.on('pointerout', () => // Al quitar el ratón de encima...
        {
            tanqia.clearTint();
        });

        tanqia.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            tanqia.destroy();
            tanqiaText.destroy();
            this.showTutorial();
        });
    }

    showTutorial(){
        let tutoImage = this.make.image({
            x: this.cameras.main.centerX, // x
            y: this.cameras.main.centerY, // y
            scale:{
                x: 1, // anchura
                y: 1.1, // altura
            },
            key: 'Tuto5',
        });

        let tuto5Text = this.add.text( // diapo 1 text.
            this.cameras.main.width - 30, 
            this.cameras.main.scrollY + 30, 
            'X',
            {
                fontSize: '40px',
                color: '#181818',
                align: 'center',
                fontFamily: 'yatra',
            }
        ).setOrigin(0.5).setInteractive();

        tuto5Text.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            tutoImage.destroy();
            tuto5Text.destroy();
            this.startGame();
        });

        tuto5Text.on('pointerover', () => // Al pasar el ratón por encima...
        {
            tuto5Text.setColor('#0032c3');
        });

        tuto5Text.on('pointerout', () => // Al quitar el ratón de encima...
        {
            tuto5Text.setColor('#181818');
        });
    }

    startGame() {

        // Fondo
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg3')
        .setOrigin(0.5, 0.5)
        .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Los tableros son un array de arrays
        // La primera fila de cada tablero solo tiene tres numeros que representan:
        // 0 -> el numero de espejos maximo
        // 1 -> la direccion del disparador
        // 2 -> el tiempo maximo 

        const level = this.gameState.currentDay; // Nivel actual
        const tableroData = this.cache.json.get('tableroData');
        const tablero = tableroData.levels[level]; // Acceder al nivel requerido

        // variables auxiliares para recorrer el tablero y crearlo
        const tileSize = 100;
        const centroX = this.cameras.main.centerX - tablero[1].length * tileSize / 2;
        const centroY = this.cameras.main.centerY - (tablero.length - 1) * tileSize / 2 - tileSize;
        this.boardMinX = centroX;
        this.boardMaxX = centroX + tablero[1].length * tileSize;
        this.boardMinY = centroY + tileSize;
        this.boardMaxY = centroY + tablero.length * tileSize;

        // arrays y objetos del juego
        this.voids = [];
        this.walls = [];
        this.mirrors = [];
        this.gates = [];
        this.laser = null;
        this.gun = null;
        this.destiny = null;
        
        this.maxMirros = tablero[0][0]; // numero maximo de espejos
        this.currMirrors = 0; // numero actual de espejos
        this.gameTime = tablero[0][2]; // tiempo maximo de la partida

        // generar los objetos del tablero
        for (let row = 1; row < tablero.length; row++) {
            for (let col = 0; col < tablero[1].length; col++) {
                const tileValue = tablero[row][col];
                let x = col * tileSize + tileSize / 2 + centroX;
                let y = row * tileSize + tileSize / 2 + centroY;

                if (tileValue === 1) {
                    const wall = new Wall(this, x, y, tileSize);
                    this.walls.push(wall);
                } else if (tileValue === 2 && this.gun == null) {
                    let direction = this.getDirection(tablero[0][1]); // para sacra la dirección del gun
                    this.gun = new Gun(this, x, y, direction, tileSize);
                } else if (tileValue === 3 && this.destiny == null) {
                    this.destiny = new Destiny(this, x, y, 'DestinoApagado', 'DestinoEncendido');
                } else if (tileValue === 4) {
                    const g = new Gate(this, x, y, 'horizontal', 'PuertaApagada', 'PuertaEncendida');
                    this.gates.push(g);
                } else if (tileValue === 5) {
                    const g = new Gate(this, x, y, 'vertical', 'PuertaApagada', 'PuertaEncendida');
                    this.gates.push(g);
                } else {
                    const v = new Void(this, x, y, tileSize);
                    this.voids.push(v);
                }
                
            }
        }

        // generar el laser y sus colisiones del laser
        if (this.gun) {
            this.gun.setInteractive();
            this.gun.on('pointerdown', () => {
                if (this.laser == null && this.gameOver == false) {
                    this.laser = this.gun.shootLaser(this);
                    this.mirrors.forEach(mirror => {
                        this.physics.add.overlap(this.laser, mirror, this.TrayChangeDirection, null, this);
                    });
                    this.walls.forEach(wall => {
                        this.physics.add.collider(this.laser, wall, this.DestroyLaser, null, this);
                    });
                    this.physics.add.overlap(this.laser, this.destiny, this.CollideWithDestiny, null, this);
                    this.gates.forEach(gate => {
                        this.physics.add.overlap(this.laser, gate, this.CollideWithGate, null, this);
                    });
                }
            });
            this.gun.on('pointerover', () => 
                {
                    this.gun.setTint(0xdddddd);
                });
            this.gun.on('pointerout', () => 
                {
                    this.gun.clearTint();
                });
        }

        // generar contadores de espejos y tiempo
        this.caunter;
        this.mirrorCaunter(); 
        this.timerCaunter();
    }

    timerCaunter() {
        // --- CONTROL DE TIEMPO PARA PODER PERDER --- 

        this.timerText = this.add.text(
            80,
            80,
            this.gameTime,
             {
                 fontFamily: 'yatra',
                 fontSize: 40,
                 color: 'black'
             }
         ).setOrigin(0.5, 0.5);
            
        this.timerHUD();
    }

    timerHUD() {
        const updateTimer = () => {
            this.gameTime -= 1; // disminuye contador
            this.timerText.setText(this.gameTime);
            
        };

        // temporizador
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: updateTimer,
            callbackScope: this
        });
    }

    getDirection(number) { // para sacar una direccion dependiendo de un numero del 1 al 4
        let direction;
        switch (number) {
            case 1:
                direction = 'left';
                break;
            case 2:
                direction = 'up';
                break;
            case 3:
                direction = 'right';
                break;
            case 4:
                direction = 'down';
                break;
            default:
                direction = 'up';
        }
        return direction;
    }

    mirrorCaunter(){
        
        this.add.sprite(this.cameras.main.width - 50,  50, 'EspejoTablero').setScale(0.7, 0.7);

        let num = this.maxMirros;
        this.caunter = this.add.text(
            this.cameras.main.width - 50,
            100,
            num,
             {
                 fontFamily: 'yatra',
                 fontSize: 40,
                 color: 'black'
             }
         ).setOrigin(0.5, 0.5);
    }

    updateMirrorCaunter() {
        if (this.caunter) {
            let num = this.maxMirros - this.currMirrors;
            this.caunter.setText(num);
        }
    }

    update() {

        if(this.gameTime <= 0 && !this.gameOver) { // comprueba si ha perdido
            this.EndGame();
        }

        if (this.laser) {
            if (this.laser.x < this.boardMinX ||
                this.laser.x > this.boardMaxX ||
                this.laser.y < this.boardMinY ||
                this.laser.y > this.boardMaxY
            ) {
                this.DestroyLaser(this.laser);
            }
        }
        this.updateMirrorCaunter();
    }

    TrayChangeDirection(laser, mirror) { // colision laser-espejo
        mirror.changeLaserDirection(laser);
    }

    DestroyLaser(laser) { // destruir laser / colision laser-muro
        if (this.gameOver === false){
            this.ResetGates();
            this.destiny.Reset();
        }
        laser.destroy();
        this.laser = null;
    }

    CollideWithDestiny(laser, destiny) { // colision laser-destino
        destiny.laserColision(laser);
        this.DestroyLaser(laser);
    }

    CollideWithGate(laser, gate){ // colision laser-puerta
        if (gate.laserColision(laser) === false) { // si la colision no es la correcta la puerta(gate) actua como un muro(wall)
            this.DestroyLaser(laser);
        }
    }
    
    startEndGame(){ // hace que cuando ganes no te vayas del juego tan rapido
        this.gameOver = true;
        this.stopTimer = this.time.addEvent({
            delay: 1500, // tiempo de espera
            callback: () => 
            {
                this.EndGame();
            }
        });
    }

    CheckGates() { // comprueba que todas las puertas estén activas
        let i = 0;
        if (this.gates) {
            while (i < this.gates.length) {
                if (this.gates[i].getActive() === false){
                    return false;
                }
                i++;
            }
        }
        return true;
    }

    ResetGates() { // resetea todas las puertas
        if (this.gates) {
            this.gates.forEach(gate => {
                gate.Reset();
            });
        }
    }

    EndGame() { // final del juego con el resultado y el cambio de escena
        let result;
        let victory = this.gameTime > 0 && this.gameOver;
        let defeat = this.gameTime <= 0 && !this.gameOver;
        if(defeat) {
            result = 'derrota';
        }

        if (victory) {
            alert('Has obtenido el logro ' + this.gameState.logros.Game5[this.gameState.currentDay - 1] + ' por enviarle una carta a Shu el día ' + this.gameState.currentDay);
            result = 'victoria';
        }
        
        console.log(result);

        const currentDayIndex = this.gameState.currentDay - 1; 
        this.gameState.minigamesResults.Game5[currentDayIndex] = result;
        
        // ENDLEVEL.
        let mode;
        if(victory){
            mode = 0;
            this.scene.start('EndLevel', {mode: mode});
        }
        else if(defeat){
            mode = 1;
            this.scene.start('EndLevel', {mode: mode});
        }
    }

    shutdown() { // eliminar elementos dinamicos al cambiar de escena

        this.gates.forEach(g => {
            g.destroy();
        });
        this.mirrors.forEach(m => {
            m.destroy();
        });
        this.voids.forEach(v => {
            v.destroy();
        });
        this.walls.forEach(w => {
            w.destroy();
        });

        this.gates.length = 0;
        this.mirror.length = 0;
        this.walls.length = 0;
        this.voids.length = 0;

        this.destiny.destroy();
        this.gun.destroy();
        this.DestroyLaser(laser);
    }
}