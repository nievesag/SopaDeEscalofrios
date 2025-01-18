import Player from '../objetos/Game3Obj/Player3.js';
import Matrix from '../objetos/Game3Obj/Matrix.js';
import ShootingBeetle from '../objetos/Game3Obj/ShootingBeetle.js';
import MatrixBeetle from '../objetos/Game3Obj/MatrixBeetle.js';

export default class Game3 extends Phaser.Scene 
{
    constructor() 
    {
        super({ key: 'Game3'});
    }

    init(data) 
    {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x181818);
        // si es la primera vez q se inicia...
        if(!this.gameState.hasStartedBefore[2]){
            this.gameState.hasStartedBefore[2] = true; // ala ya ha salio el tutorial.
            this.createTanqiaPopUp();
        }
        else{ // si ya se ha iniciado anteriormente...
            this.startGame(); // empieza el game directamente.
        }
        this.start = false;

        // --- PUNTUACIÓN ---.
        this.points = 0;
        this.pointUI = this.add.text(
        40, 
        50,
        'Puntos: 0',
        {
            fontSize: 20,
            color: 'white',
            fontFamily: 'yatra'
        }).setDepth(3).setVisible(false);

        // --- TIEMPO ---.
        this.shootTime = 10;
        this.timeUI = this.add.text(
        40, 
        70,
        'Tiempo: 10',
        {
            fontSize: 20,
            color: 'white',
            fontFamily: 'yatra'
        }).setDepth(3).setVisible(false);
    }

    createTanqiaPopUp()
    {
        let tanqiaText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 100, 
            'Jepri, el dios del sol autocreado, sufre de una fuerte tristeza: sus adorados ahijados, los escarabajos de todo Egipto, han sido capturados.Para contentarle de nuevo, y evitar su ira, deberás rescatar al mayor número de escarabajos posibles, en el menor tiempo posible.',
            {
                fontSize: '20px',
                color: '#ffffff',
                align: 'center',
                fontFamily: 'yatra',
                wordWrap: {width: 500},
                wordWrapUseAdvanced: true,
            }
        ).setOrigin(0.5); // danzhu lo tenia y funciona.

        let tanqia = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 175, 
            'Icon3'
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
            // Destruye todo y pone el juego a funcionar.
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
            key: 'Tuto3',
        });

        let tuto3Text = this.add.text( // diapo 1 text.
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

        tuto3Text.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            tutoImage.destroy();
            tuto3Text.destroy();
            this.startGame();
        });

        tuto3Text.on('pointerover', () => // Al pasar el ratón por encima...
        {
            tuto3Text.setColor('#0032c3');
        });

        tuto3Text.on('pointerout', () => // Al quitar el ratón de encima...
        {
            tuto3Text.setColor('#181818');
        });
    }

    startGame()
    {
        //Muestra el marcador de puntos
        this.pointUI.setVisible(true);
        this.victory = 2000; //Puntos victoria

        //Muestra el temporizador del disparo
        this.timeUI.setVisible(true);

        //Desactiva el click al principio
        //Evita que se lance el primer escarabajo al quitar el tutorial
        this.input.mouse.enabled = false;
        // durante 100 milisegs bloquea el input.
        this.time.delayedCall(100, ()=>{
            this.input.mouse.enabled = true;
        })

        // --- TIME SOUND ---.
        this.beep = this.sound.add('beep');
        // Encendemos el pitidito
        this.beep.play();
        //Cronómetro del lanzamiento
        this.updateTime();

        /*// --- MUSIC ---.
        this.music = this.sound.add('theme3');
        this.music.play();
        this.sound.pauseOnBlur = true;

        // Botón de la música.
        this.musicButton = this.add.image(40, 40, 'musicButton');
        this.musicButton.on("pointerdown", () => { // PARAR Y REANUDAR MUSICA.
            this.isClickingOnUI = true; 
            if (this.music.isPlaying) {
                this.music.pause();
                this.musicButton.setTexture('muteButton');
            } 
            else {
                this.music.resume();
                this.musicButton.setTexture('musicButton');
            }
        }).setScale(0.3).setInteractive().setDepth(10).setScrollFactor(0); // pq es UI*/
    
        // --- BACKGROUND ---.
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg3')
        .setOrigin(0.5, 0.5)
        .setDisplaySize(this.cameras.main.width, this.cameras.main.height); 

        // --- BORDERS ---.
        this.borderLeft = this.add.rectangle(90, 385, 200, 775, 0x181818, 10);
        this.borderRight = this.add.rectangle(933, 385, 230, 775, 0x181818, 10);
        this.borderUp = this.add.rectangle(550, 5, 1100, 10, 0x181818, 10);
        this.borderDown = this.add.rectangle(550, 765, 1100, 10, 0x181818, 10);
        this.borders = [this.borderLeft, this.borderRight, this.borderUp, this.borderDown];
        // Fisicas para bordes
        for (let i = 0; i < this.borders.length; i++){
            this.physics.world.enable(this.borders[i]);
            this.borders[i].body.setImmovable(true); // El suelo no se moverá
            this.borders[i].body.setAllowGravity(false); // No tendrá gravedad
        }
        //Línea GameOver
        const gameOverLine = this.add.rectangle(550, 630, 1100, 0.5, 0x181818, 1);
        this.physics.world.enable(gameOverLine);
        gameOverLine.body.setImmovable(true); // No se moverá
        gameOverLine.body.setAllowGravity(false); // No tendrá gravedad

        //Boton SALIR
        //this.createButton('Exit',  100, 200, 'white', 30, 'GameSelectorMenu');

        // --- PLAYER ---.
        this.player = new Player(this, 500, 730);
        // Línea de input
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffffff , alpha: 0.5 } });
        const line = new Phaser.Geom.Line(); 

        // --- SHOOTABLES ---. 
        this.beetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];
        // El que vamos a disparar
        //Instancia escarabajo   
        this.shootingBeetle = new ShootingBeetle(this, this.player.x - 28, this.player.y - 28).setDepth(5).setScale(1.25);
        this.freeBeetle = false;
        this.start = false;

        // --- GRID DE BICHOS ---.
        this.level = new Matrix(this, 220, 40);
        //La dificultad, que depende de beetles
        this.setDifficulty();
        //Creamos el nivel en base a esos parámetros
        this.createLevel();
        
        // --- INPUT ---.
        // SIGUE AL MOUSE.
        this.input.on('pointermove', (pointer) =>
        {
            //Sigue el ratón en función del puntero
            this.followMouse(pointer);
            // Línea de lanzamiento 
            Phaser.Geom.Line.SetToAngle(line, this.player.x, this.player.y, (this.player.rotation - 1.57), 200); 
            graphics.clear().strokeLineShape(line); // Limpia y redibuja la línea.
        });
        // AL HACER CLIC. DISPARO
        this.input.on('pointerup', () =>
        {
            //Paramos el pitidito
            this.beep.stop();
            //Disparamos
            this.player.shoot(this.shootingBeetle);
            // --- COLISIONES CON BORDERS ---.
            this.physics.add.collider(this.borders, this.shootingBeetle);
            //Reseteamos el tiempo de disparo
            this.shootTime = 10; 
            // --- COLISIONES LEVEL CON DISPARO ---. //EN UPDATE
            this.level.freeBeetle = true;
            this.start = true;
        })

    }

    update ()
    {   
        if (this.start) {

            //Según se disparen escarabajos, se añaden a la matriz del nivel
            this.addToMatrix();
        }
        
        // Modificamos el marcador de puntos
        this.pointUI.setText('Puntos: ' + this.points);

        // Verificamos si se ha acabado el nivel
        // +this.victory puntos - victoria
        // bichos en fila 11 - derrota
        if (this.finish) this.endGame();
    }

    updateTime(){ 
        const updateTimer = () => {
            if (this.shootTime > 0 && !this.level.freeBeetle){
                this.shootTime -= 1; 
                this.timeUI.setText('Tiempo: ' + this.shootTime);
            }
            else if (this.shootTime == 0) { 
                // Paramos el pitido
                this.beep.stop();
                // Dispara
                this.player.shoot(this.shootingBeetle);
                // --- COLISIONES CON BORDERS ---.
                this.physics.add.collider(this.borders, this.shootingBeetle);
                this.level.freeBeetle = true;
                this.shootTime = 10;
                this.start = true;
            } 

        };

        // temporizador
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: updateTimer,
            callbackScope: this
        });

    }

    createLevel(){
        for (let j = 0; j <  this.level.fils; j++){
            this.level.lvl[j] = []; 
            if (j % 2 == 1) //Miramos las filas pares
            {
                //Añadimos un offset
                this.level.x += this.level.width / 2;
            }
            for (let i = 0; i < this.level.cols; i++)
            {
                //Color random
                if (j < this.level.filIni)
                {
                    this.level.lvl[j][i] = new MatrixBeetle(this, this.level.x + this.level.width * i,  this.level.y).setScale(1.25);
                }
                //Color Empty
                else 
                {
                    this.level.lvl[j][i] = new MatrixBeetle(this, this.level.x + this.level.width * i,  this.level.y).setScale(1.25);
                    this.level.lvl[j][i].setTexture("EmptyBeetle");
                }
            }
                //Reseteamos la x 
                this.level.x = 220;
                this.level.y += this.level.height;
            }
    }

    followMouse(pointer)
    {
        this.player.angle = Phaser.Math.Angle.BetweenPoints(this.player, pointer);
        this.player.rotation = this.player.angle + 1.5708; // Pone la rotación del cañón mirando al mouse en radianes
    }

    addToMatrix()
    {
        // ACOPLAR LANZADO A LVL
        for (let j = 0; j < this.level.fils; j++)
        {
            for (let i = 0; i < this.level.cols; i++) 
            {
                if (this.shootingBeetle.y <= this.level.lvl[j][i].y + this.level.height //Entonces lo pone en j+1
                    && this.shootingBeetle.x >= this.level.lvl[j][i].x
                    && this.shootingBeetle.x < this.level.lvl[j][i].x + this.level.width 
                    && this.level.lvl[j][i].texture.key != "EmptyBeetle" //Si el de encima esá lleno
                    && this.level.freeBeetle
                    )   
                {
                    if (j == this.level.fils - 1)
                    {
                        //Derrota
                        this.endGame(false);
                    }
                    else 
                    {
                        if (this.level.lvl[j+1][i].texture.key == "EmptyBeetle") //Y la posición nueva está vacía
                        {
                            //Destruye lo que había antes
                            this.level.lvl[j+1][i].selfDestroy();
                            //Añade otro sprite 
                            this.level.lvl[j+1][i] = new MatrixBeetle(this, this.level.lvl[j+1][i].x, this.level.lvl[j+1][i].y).setScale(1.25);
                            this.level.lvl[j+1][i].setTexture(this.shootingBeetle.texture);
                            //Destruimos el lanzado
                            this.shootingBeetle.selfDestroy();
                            //Ya no hay escarabajo pululando por ahí
                            this.level.freeBeetle = false;
        
                            //Creamos el siguiente bicho  
                            this.shootingBeetle = new ShootingBeetle(this, this.player.x - 28, this.player.y - 28).setDepth(5).setScale(1.25);
                            //Destruir vecinos contiguos
                            this.destroyNeighbour(j+1, i);
                        }
                    }
                }
            }
        }
    }
 
    destroyNeighbour(y , x){

        let neighbourCount = 1;
        let myBeetle= this.level.lvl[y][x];
        //Lo que nos vamos a quitar
        let destroyArray = [];
        destroyArray.push(myBeetle);
        //Fila par
        if (y % 2 == 1)
        {
            //Arriba-Dcha
            if ((y-1) > 0 && (x+1) < this.level.cols && this.level.lvl[y-1][x + 1].texture.key == myBeetle.texture.key) 
            {    
                neighbourCount++;
                destroyArray.push(this.level.lvl[y-1][x + 1]);
            }
            //Abajo-Dcha
            if ((y+1) < this.level.fils && (x+1) < this.level.cols && this.level.lvl[y + 1][x + 1].texture.key == myBeetle.texture.key) 
            {    
                neighbourCount++;
                destroyArray.push(this.level.lvl[y + 1][x + 1]);
            }
        }
        //Fila impar
        else
        {
            //Arriba-Izqd
            if ((y-1) > 0 && (x-1) > 0 && this.level.lvl[y-1][x - 1].texture.key == myBeetle.texture.key) 
            {    
                neighbourCount++;
                destroyArray.push(this.level.lvl[y-1][x - 1]);
            }
            //Abajo-Izqd
            if ((y+1) < this.level.fils && (x-1) > 0 && this.level.lvl[y + 1][x - 1].texture.key == myBeetle.texture.key) 
            {    
                neighbourCount++;
                destroyArray.push(this.level.lvl[y+1][x - 1]);
            }
        }

        //Arriba
        if ((y-1) > 0 && this.level.lvl[y-1][x].texture.key == myBeetle.texture.key) 
        {    
            neighbourCount++;
            destroyArray.push(this.level.lvl[y-1][x]);
        } 
        //Abajo
        if ((y+1) < this.levelfils && this.level.lvl[y+1][x].texture.key == myBeetle.texture.key) 
        {    
            neighbourCount++;
            destroyArray.push(this.level.lvl[y+1][x]);
        } 
        //Dcha
        if ((x+1) < this.level.cols && this.level.lvl[y][x+1].texture.key == myBeetle.texture.key) 
        {    
            neighbourCount++;
            destroyArray.push(this.level.lvl[y][x+1]);
        } 
        //Izqd
        if ((x-1) > 0 && this.level.lvl[y][x-1].texture.key == myBeetle.texture.key)
        {    
            neighbourCount++;
            destroyArray.push(this.level.lvl[y][x-1]);
        }

        //Si hay 3 o mas vecinos de ese color, los destruye
        if (neighbourCount >= 3)
        {
            for (let i = destroyArray.length - 1; i >= 0; i--){
                //Suma puntos
                this.points += 100;

                //Cambiamos la textura
                destroyArray[i].setTexture("EmptyBeetle");
                //Nos lo cargamos
                destroyArray[i].selfDestroy();
                //Lo sacamos del array
                destroyArray.pop(); 
            }

        }

        //Reinicia el sonido del pitidito
        this.beep.play();

        if (this.points >= this.victory){
            //Victoria
            this.endGame(true);
        }
    }

    quitarVoladoras()
    {
        // ACOPLAR LANZADO A LVL
        for (let j = 0; j < this.level.fils; j++)
        {
            for (let i = 0; i < this.level.cols; i++) 
            {
                if()
            }
        }
    }

    // --- BOTONES ---.
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
            this.scene.start(sceneName);

        });
    }

    endGame(finish){

        let result; 
        //Victoria, alcanzar this.victory puntos
        if (finish){
            console.log("Victoria");
            alert('Has obtenido el logro ' + this.gameState.logros.Game3[this.gameState.currentDay - 1] + ' por enviarle una carta a Jepri el día ' + this.gameState.currentDay);
            result = 'victoria';
        }
        //Derrota si hay en la fila final 
        else {
            console.log("Derrota");
            result = 'derrota';
        }

        this.freeBeetle = true;
        this.start = false;

        //Muestra el temporizador del disparo
        this.timeUI.setVisible(false);
        //Muestra el marcador de puntos
        this.pointUI.setVisible(false);

        if (result) {
            const currentDayIndex = this.gameState.currentDay - 1; 
            this.gameState.minigamesResults.Game3[currentDayIndex] = result;
        }

        // ENDLEVEL.
        let mode;
        if(finish){
            mode = 0;
            this.scene.start('EndLevel', {mode: mode});
        }
        else if(!finish){
            mode = 1;
            this.scene.start('EndLevel', {mode: mode});
        }
    }

    // --- DIFICULTAD ---.
    setDifficulty() 
    {
        //Muestra el temporizador del disparo
        this.timeUI.setVisible(true);
        //Muestra el marcador de puntos
        this.pointUI.setVisible(true);
        if(this.gameState.currentDay == 1)
        {
            this.victory = 3000;
            this.beetles.length = 4;
            this.level.filIni = 3;
        }
        else if (this.gameState.currentDay == 2)
        {
            this.victory = 2500;
            this.beetles.length = 7;
            this.level.filIni = 4;
        }
        else if(this.gameState.currentDay == 3)
        {
            this.victory = 2000;
            this.beetles.length = 6;
            this.level.filIni = 5;
        }
        else if(this.gameState.currentDay == 4)
        {
            this.victory = 1500;
            this.beetles.length = 5;
            this.level.filIni = 6;
        }
        else if(this.gameState.currentDay == 5)
        {
            this.victory = 1000;
            this.beetles.length = 5;
            this.level.filIni = 7;
        }
    }

}


/*
Fuentes: 
https://labs.phaser.io/edit.html?src=src\physics\arcade\closest%20furthest.js
https://labs.phaser.io/edit.html?src=src\utils\array\translate%20matrix.js
https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle
*/
