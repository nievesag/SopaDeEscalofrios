
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
        this.gameOver = false;
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
        }).setDepth(3);

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
                wordWrap: {width: 500}, // la puta polla: es lo de \n pero pro.
                wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
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
            // Destruye todo y pone el juego a funcionarch.
            tanqia.destroy();
            tanqiaText.destroy();
            this.startGame();
        });
    }

    startGame()
    {
        this.input.mouse.enabled = false;
        // durante 100 milisegs bloquea el input.
        this.time.delayedCall(100, ()=>{
            this.input.mouse.enabled = true;
        })

        // --- MUSIC ---.
        const music = this.sound.add('theme3');
        music.play();
        this.sound.pauseOnBlur = true;

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

        // Línea de lanzamiento
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffffff , alpha: 0.5 } });
        const line = new Phaser.Geom.Line(); 

        this.angle = 90; // Inicializa el ángulo a 90.

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
        for (let j = 0; j <  this.lvlfils; j++){
        this.lvl[j] = []; 
        if (j % 2 == 1) //Miramos las filas pares
        {
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
        
        // --- INPUT ---.
        // SIGUE AL MOUSE.
        this.input.on('pointermove', (pointer) =>
        {
            this.angle = Phaser.Math.Angle.BetweenPoints(this.player, pointer);
            this.player.rotation = this.angle + 1.5708; // Pone la rotación del cañón mirando al mouse en radianes

            // Línea gráfica de la dir.
            Phaser.Geom.Line.SetToAngle(line, this.player.x, this.player.y, this.angle, 225); 
            graphics.clear().strokeLineShape(line); // Limpia y redibuja la línea.

        });
        
        // AL HACER CLIC. DISPARO
        this.input.on('pointerup', () =>
        {
            // Para que rebote
            this.shootingBeetle.setBounce(1);
            // Lanza el escarabajo con un ángulo y velocidad.
            this.physics.velocityFromRotation(this.angle, 1000, this.shootingBeetle.body.velocity); 
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
                        console.log(this.lvl[j][i].texture.key);
                        this.lvl[j+1][i].destroy();
                        this.lvl[j+1][i] = this.add.sprite(this.lvl[j+1][i].x, this.lvl[j + 1][i].y, this.shootingBeetle.texture.key).setScale(1.25);
                        //Destruimos el lanzado
                        this.shootingBeetle.destroy();
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

        this.pointUI.setText('Puntos: ' + this.points);

        this.endGame();
    }

    destroyNeighbour(y , x){
        let neighbourCount = 1;
        let myBeetle= this.lvl[y][x];
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

        if ((y-1) > 0 && this.lvl[y-1][x].texture.key == myBeetle.texture.key) 
        {    
            neighbourCount++;
            destroyArray.push(this.lvl[y-1][x]);
        } 
        if ((y+1) < this.lvlfils && this.lvl[y+1][x].texture.key == myBeetle.texture.key) 
        {    
            neighbourCount++;
            destroyArray.push(this.lvl[y+1][x]);
        } 
        if ((x+1) < this.lvlcols && this.lvl[y][x+1].texture.key == myBeetle.texture.key) 
        {    
            neighbourCount++;
            destroyArray.push(this.lvl[y][x+1]);
        } 
        if ((x-1) > 0 && this.lvl[y][x-1].texture.key == myBeetle.texture.key)
        {    
            neighbourCount++;
            destroyArray.push(this.lvl[y][x-1]);
        }

        //Si hay 3 o mas vecinos de ese color, los destruye
        if (neighbourCount >= 3)
        {
            for (let i = destroyArray.length - 1; i >= 0; i--){
                this.points += 100;
                console.log(this.points);
                destroyArray[i].texture.key = "EmptyBeetle";
                destroyArray[i].destroy(true);
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
            this.sound.stopAll();

        });
    }

    endGame(){

        let result; 
        //Victoria, alcanzar 2000 puntos
        if (this.points >= 500){
            console.log("Victoria");
            result = 'victoria';
            this.hayEscarabajo = true;
            this.start = false;
            this.time.delayedCall(2000, () => {
                this.scene.start('GameSelectorMenu');
            });
        }
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
        if(this.gameState.currentDay == 1 || this.gameState.currentDay == 2)
        {
            this.lvlfilIni = 3;
        }
        else if(this.gameState.currentDay == 3 || this.gameState.currentDay == 4)
        {
            this.lvlfilIni = 4;
        }
        else if(this.gameState.currentDay == 5)
        {
            this.lvlfilIni = 5;
        }
    }

}



/*
Fuentes: 
https://labs.phaser.io/edit.html?src=src\physics\arcade\closest%20furthest.js
https://labs.phaser.io/edit.html?src=src\utils\array\translate%20matrix.js
https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle
*/
