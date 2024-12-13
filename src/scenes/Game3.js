
import Player3 from '../objetos/Game3Obj/Player3.js';
import Beetle from '../objetos/Game3Obj/Beetle.js';
import Matrix from '../objetos/Game3Obj/Matrix.js';
import Time from '../objetos/Game3Obj/Time.js';

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
        //Empieza sin ser game over
        //this.gameOver = false;
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
        this.victory = 2000;

        //Desactiva el click al principio
        //Evita que se lance el primer escarabajo al quitar el tutorial
        this.input.mouse.enabled = false;
        // durante 100 milisegs bloquea el input.
        this.time.delayedCall(100, ()=>{
            this.input.mouse.enabled = true;
        })

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
        const borderLeft = this.add.rectangle(90, 385, 200, 775, 0x181818, 10);
        const borderRight = this.add.rectangle(933, 385, 230, 775, 0x181818, 10);
        const borderUp = this.add.rectangle(550, 5, 1100, 10, 0x181818, 10);
        const borderDown = this.add.rectangle(550, 765, 1100, 10, 0x181818, 10);
        const borders = [borderLeft, borderRight, borderUp, borderDown];
        // Fisicas para bordes
        for (let i = 0; i < borders.length; i++){
            this.physics.world.enable(borders[i]);
            borders[i].body.setImmovable(true); // El suelo no se moverá
            borders[i].body.setAllowGravity(false); // No tendrá gravedad
        }

        //Boton SALIR
        //this.createButton('Exit',  100, 200, 'white', 30, 'GameSelectorMenu');

        // --- PLAYER ---.
        this.player = this.make.image({ 
            x: 500,
            y: 700, 
            key: 'player3',
            scale : {
                x: 0.3,
                y: 0.3
            },
        }).setDepth(1);
        //Inicializamos el ángulo a 90 (en vertical, vamos)
        this.angle = 90; 
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffffff , alpha: 0.5 } });
        const line = new Phaser.Geom.Line(); 

        // --- SHOOTABLES ---. 
        this.beetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];
        // El que vamos a disparar
        this.shootingBeetle;
        //Randomizamos el color
        const texture = Phaser.Math.RND.between(0, this.beetles.length - 1);
        //Instancia escarabajo   
        this.shootingBeetle = this.physics.add.sprite(this.player.x, this.player.y, this.beetles[texture]).setDepth(5).setScale(1.25);
        //Quitar gravedad 
        this.shootingBeetle.body.setAllowGravity(false);

        // --- GRID DE BICHOS ---.
        this.lvl = [];
        this.lvlcols = 12; //Columnas totales
        this.lvlfils = 12; //Filas totales - Rellenable solo hasta fila 13
        this.lvlfilIni;
        //La dificultad, que depende de beetles
        this.setDifficulty();
        this.lvlheight = 50; //Alto bicho
        this.lvlwidth = 50; //Ancho bicho
        this.lvlx = 220;
        this.lvly = 40;
        this.lvloffset = this.lvlwidth / 2;
        this.hayEscarabajo = false;
        //Creamos el nivel en base a esos parámetros
        this.createLevel();

        // --- INPUT ---.
        // SIGUE AL MOUSE.
        this.input.on('pointermove', (pointer) =>
        {
            //Sigue el ratón en función del puntero
            this.followMouse(pointer);
            // Línea de lanzamiento 
            Phaser.Geom.Line.SetToAngle(line, this.player.x, this.player.y, this.angle, 225); 
            graphics.clear().strokeLineShape(line); // Limpia y redibuja la línea.
        });
        
        // AL HACER CLIC. DISPARO
        this.input.on('pointerup', () =>
        {
            this.shoot();
            // --- COLISIONES CON BORDERS ---.
            this.physics.add.collider(borders, this.shootingBeetle);
            // --- COLISIONES LEVEL CON DISPARO ---. //EN UPDATE
            this.hayEscarabajo = true;
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
        this.endGame();
    }

    createLevel(){
        for (let j = 0; j <  this.lvlfils; j++){
            this.lvl[j] = []; 
            if (j % 2 == 1) //Miramos las filas pares
            {
                //Añadimos un offset
                this.lvlx += this.lvloffset;
            }
            for (let i = 0; i < this.lvlcols; i++)
            {
                //Rellena filas
                let texture = Phaser.Math.RND.between(0, this.beetles.length - 1);
                //Color random
                if (j < this.lvlfilIni)
                {
                    this.lvl[j][i] = this.add.sprite(this.lvlx + this.lvlwidth * i, this.lvly, this.beetles[texture]).setScale(1.25);
                }
                //Color Empty
                else 
                {
                    this.lvl[j][i] = this.add.sprite(this.lvlx + this.lvlwidth * i, this.lvly, "EmptyBeetle").setScale(1.25);
                }
            }
                //Reseteamos la x 
                this.lvlx = 220;
                this.lvly += this.lvlheight;
            }
    }

    followMouse(pointer)
    {
        this.angle = Phaser.Math.Angle.BetweenPoints(this.player, pointer);
        this.player.rotation = this.angle + 1.5708; // Pone la rotación del cañón mirando al mouse en radianes
    }

    shoot()
    {
        // Para que rebote
        this.shootingBeetle.setBounce(1);
        // Lanza el escarabajo con un ángulo y velocidad.
        this.physics.velocityFromRotation(this.angle, 1000, this.shootingBeetle.body.velocity); 
    }

    addToMatrix()
    {
        // ACOPLAR LANZADO A LVL
        for (let j = 0; j < this.lvlfils; j++)
            {
                for (let i = 0; i < this.lvlcols; i++) 
                {
                    if (this.shootingBeetle.y <= this.lvl[j][i].y + this.lvlheight //Entonces lo pone en j+1
                        && this.shootingBeetle.x >= this.lvl[j][i].x
                        && this.shootingBeetle.x <= this.lvl[j][i].x + this.lvlwidth 
                        && this.lvl[j][i].texture.key != "EmptyBeetle" //Si el de encima esá lleno
                        && this.lvl[j+1][i].texture.key == "EmptyBeetle" //Y la posición nueva está vacía
                        && this.hayEscarabajo)
                    {
                        this.physics.world.enable(this.lvl[j+1][i]);
                        this.lvl[j+1][i].body.setImmovable(false); // Se pueden mover
                        this.lvl[j+1][i].body.setAllowGravity(true); // Tienen gravedad
                        this.lvl[j+1][i].texture.key = "EmptyBeetle";
                        //Destruye lo que había antes
                        this.lvl[j+1][i].destroy();
                        //Añade otro sprite
                        this.lvl[j+1][i] = this.add.sprite(this.lvl[j+1][i].x, this.lvl[j + 1][i].y, this.shootingBeetle.texture.key).setScale(1.25);
                        //Destruimos el lanzado
                        this.shootingBeetle.destroy();
                        //Ya no hay escarabajo pululando por ahí
                        this.hayEscarabajo = false;

                        //Creamos el siguiente bicho
                        //Randomizamos el color
                        const texture = Phaser.Math.RND.between(0, this.beetles.length - 1);
                        //Instancia escarabajo   
                        this.shootingBeetle = this.physics.add.sprite(this.player.x, this.player.y, this.beetles[texture]).setDepth(5).setScale(1.25);
                        //Quitar gravedad 
                        this.shootingBeetle.body.setAllowGravity(false);
                        //Destruir vecinos contiguos
                        this.destroyNeighbour(j+1, i);

                    }
                }
            }
    }
 
    destroyNeighbour(y , x){

        let neighbourCount = 1;
        let myBeetle= this.lvl[y][x];
        //Lo que nos vamos a quitar
        let destroyArray = [];
        destroyArray.push(myBeetle);
        //Fila par
        if (y % 2 == 1)
        {
            //Arriba-Dcha
            if ((y-1) > 0 && (x+1) < this.lvlcols && this.lvl[y-1][x + 1].texture.key == myBeetle.texture.key) 
            {    
                neighbourCount++;
                destroyArray.push(this.lvl[y-1][x + 1]);
            }
            //Abajo-Dcha
            if ((y+1) < this.lvlfils && (x+1) < this.lvlcols && this.lvl[y + 1][x + 1].texture.key == myBeetle.texture.key) 
            {    
                neighbourCount++;
                destroyArray.push(this.lvl[y + 1][x + 1]);
            }
        }
        //Fila impar
        else
        {
            //Arriba-Izqd
            if ((y-1) > 0 && (x-1) > 0 && this.lvl[y-1][x - 1].texture.key == myBeetle.texture.key) 
            {    
                neighbourCount++;
                destroyArray.push(this.lvl[y-1][x - 1]);
            }
            //Abajo-Izqd
            if ((y+1) < this.lvlfils && (x-1) > 0 && this.lvl[y + 1][x - 1].texture.key == myBeetle.texture.key) 
            {    
                neighbourCount++;
                destroyArray.push(this.lvl[y+1][x - 1]);
            }
        }

        //Arriba
        if ((y-1) > 0 && this.lvl[y-1][x].texture.key == myBeetle.texture.key) 
        {    
            neighbourCount++;
            destroyArray.push(this.lvl[y-1][x]);
        } 
        //Abajo
        if ((y+1) < this.lvlfils && this.lvl[y+1][x].texture.key == myBeetle.texture.key) 
        {    
            neighbourCount++;
            destroyArray.push(this.lvl[y+1][x]);
        } 
        //Dcha
        if ((x+1) < this.lvlcols && this.lvl[y][x+1].texture.key == myBeetle.texture.key) 
        {    
            neighbourCount++;
            destroyArray.push(this.lvl[y][x+1]);
        } 
        //Izqd
        if ((x-1) > 0 && this.lvl[y][x-1].texture.key == myBeetle.texture.key)
        {    
            neighbourCount++;
            destroyArray.push(this.lvl[y][x-1]);
        }

        //Si hay 3 o mas vecinos de ese color, los destruye
        if (neighbourCount >= 3)
        {
            for (let i = destroyArray.length - 1; i >= 0; i--){
                //Suma puntos
                this.points += 100;

                //Que se caigan
                this.physics.world.enable(destroyArray[i]);
                destroyArray[i].body.setImmovable(false); // Se pueden mover
                destroyArray[i].body.setAllowGravity(true); // Tienen gravedad
                destroyArray[i].texture.key = "EmptyBeetle";
                destroyArray[i].destroy(true); //Los destruimos
                //Añadimos el color nuevo
                destroyArray[i] = this.add.sprite(destroyArray[i].x, destroyArray[i].y, "EmptyBeetle").setDepth(5).setScale(1.25);
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

    endGame(){

        let result; 
        //Victoria, alcanzar this.victory puntos
        if (this.points >= this.victory){
            console.log("Victoria");
            result = 'victoria';
            this.hayEscarabajo = true;
            this.start = false;
            this.time.delayedCall(500, () => {
                this.scene.start('GameSelectorMenu');
            });
        }
        //Derrota si hay en la fila 10 bichos
        else {

            for (let i = 0; i < this.lvlcols; i++)
            {
                if (this.lvl[10][i].texture.key != "EmptyBeetle"){
                    console.log("Derrota");
                    result = 'victoria';
                    this.hayEscarabajo = true;
                    this.start = false;
                    this.time.delayedCall(500, () => {
                    this.scene.start('GameSelectorMenu'); });
                }
            }
        }

        if (result) {
            const currentDayIndex = this.gameState.currentDay - 1; 
            this.gameState.minigamesResults.Game3[currentDayIndex] = result;
        }
    }


    // --- DIFICULTAD ---.
    setDifficulty() 
    {
        if(this.gameState.currentDay == 1)
        {
            this.victory = 6000;
            this.beetles.length = 4;
            this.lvlfilIni = 3;
        }
        else if (this.gameState.currentDay == 2)
        {
            this.victory = 5000;
            this.beetles.length = 7;
            this.lvlfilIni = 4;
        }
        else if(this.gameState.currentDay == 3)
        {
            this.victory = 4000;
            this.beetles.length = 6;
            this.lvlfilIni = 5;
        }
        else if(this.gameState.currentDay == 4)
        {
            this.victory = 3000;
            this.beetles.length = 5;
            this.lvlfilIni = 6;
        }
        else if(this.gameState.currentDay == 5)
        {
            this.victory = 2000;
            this.beetles.length = 5;
            this.lvlfilIni = 7;
        }
    }

}



/*
Fuentes: 
https://labs.phaser.io/edit.html?src=src\physics\arcade\closest%20furthest.js
https://labs.phaser.io/edit.html?src=src\utils\array\translate%20matrix.js
https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle
*/
