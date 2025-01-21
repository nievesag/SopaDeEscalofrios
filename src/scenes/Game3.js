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
        ).setOrigin(0.5).setDepth(5); // danzhu lo tenia y funciona.

        let tanqia = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 175, 
            'Icon3'
        ).setScale(1.5, 1.5).setInteractive().setDepth(4); // x, y, tag.

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
        }).setDepth(5);

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
        ).setOrigin(0.5).setInteractive().setDepth(6);

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
        // --- PUNTUACIÓN ---.
        this.points = 0;
        this.pointUI = this.add.text(
        850, 
        200,
        'Puntos\n0',
        {
            fontSize: 40,
            color: 'white',
            fontFamily: 'yatra'
        }).setDepth(3).setVisible(true);

        // --- OBJETIVO ---.
        this.victory = 2000;
        this.goalUI = this.add.text(
        850, 
        50,
        'Objetivo\n0',
        {
            fontSize: 40,
            color: 'white',
            fontFamily: 'yatra'
        }).setDepth(3).setVisible(true);

        // --- TIEMPO ---.
        this.shootTime = 10;
        this.timeUI = this.add.text(
        20, 
        50,
        'Tiempo\n10',
        {
            fontSize: 40,
            color: 'white',
            fontFamily: 'yatra'
        }).setDepth(3).setVisible(true);


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

        // --- PLAYER ---.
        this.player = new Player(this, 500, 775);
        // Línea de input
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffffff , alpha: 0.5 } });
        const line = new Phaser.Geom.Line(); 

        // --- SHOOTABLES ---. 
        this.beetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];
        // El que vamos a disparar
        //Instancia escarabajo   
        this.shootingBeetle = new ShootingBeetle(this, this.player.x, this.player.y - 28).setDepth(5).setScale(1.25);

        // --- GRID DE BICHOS ---.
        this.level = new Matrix(this, 220, 40);
        //La dificultad, que depende de beetles
        this.setDifficulty();
        //Ponemos el texto del objetivo
        this.goalUI.setText('Objetivo\n' + this.victory)
        //Creamos el nivel en base a esos parámetros
        this.createLevel();

        // --- GESTION VECINOS ---
        //Creamos un array de visitados
        this.visitados = [];
        //Iniciamos los índices en 0
        this.final = 0;
        this.pendientes = 0;

        // --- GESTION SUELTOS ---
        //Creamos un arrays de posibles sueltos
        this.posiblesSueltos = [];
        //Iniciamos los índices en 0
        this.finSueltos = 0;
        this.pendSueltos = 0;
        
        //Colisiones Level - Shooting Beetle
        this.colisionesBichoNivel();
        
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
            //Bloquea el input para que no se pueda mover el escarabajo en el aire
            this.input.mouse.enabled = false;
            //Disparamos
            this.player.shoot(this.shootingBeetle);
            // --- COLISIONES CON BORDERS ---.
            this.physics.add.collider(this.borders, this.shootingBeetle);
            //Reseteamos el tiempo de disparo
            this.shootTime = 11; 
            // --- COLISIONES LEVEL CON DISPARO ---. //EN UPDATE
            this.level.freeBeetle = true;
        })

    }

    updateTime(){ 
        const updateTimer = () => {
            if (this.shootTime > 0 && !this.level.freeBeetle){
                this.shootTime -= 1; 
                this.timeUI.setText('Tiempo\n' + this.shootTime);
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
            if (j % 2 == 1) //Miramos las filas impares
            {
                //Añadimos un offset
                this.level.x += this.level.width / 2;
            }
            for (let i = 0; i < this.level.cols; i++)
            {
                //Color random
                if (j < this.level.filIni)
                {
                    this.level.lvl[j][i] = new MatrixBeetle(this, this.level.x + this.level.width * i,  this.level.y, i, j).setScale(1.25);
                }
                //Color Empty
                else 
                {
                    this.level.lvl[j][i] = new MatrixBeetle(this, this.level.x + this.level.width * i,  this.level.y, i , j).setScale(1.25);
                    this.level.lvl[j][i].setTexture("EmptyBeetle");
                }
            }

            //Reseteamos la x 
            this.level.x = 220;
            this.level.y += this.level.height;
        }
    }

    colisionesBichoNivel()
    {
        //Colisiones Level - Shooting Beetle
        for (let j = 0; j < this.level.fils; j++)
        {
            for (let i = 0; i < this.level.cols; i++) 
            {
                if (this.level.lvl[j][i].texture.key != "EmptyBeetle")
                {
                    this.physics.add.collider(this.level.lvl[j][i], this.shootingBeetle, null, this.addToMatrix, this);
                }
            }
        }
    }

    addToMatrix(level, shootingBeetle)
    {
        //Fila en la que toca anadirlo con el offset de la primera fila (10)
        let j = (shootingBeetle.y - 10 - ((shootingBeetle.y - 10) % this.level.height)) / this.level.height; 
        console.log ("la y: " + shootingBeetle.y + "y la x: " + shootingBeetle.x);
        console.log ("j: " + j);
        let i = 0;
        //Columna en la que toca anadirlo
        //Impares con offset fila impar (214.5 = 192 + (this.level.width/2))
        if (j % 2 == 1){
            i = (shootingBeetle.x - 220 - (this.level.width/2) - ((shootingBeetle.x - 220 - (this.level.width/2)) % this.level.width)) / this.level.width;
            console.log("i impar: " + i);
        }
        //Pares con offset fila par (192)
        else{
            i = (shootingBeetle.x - 220 - ((shootingBeetle.x - 220) % this.level.width)) / this.level.width;
            console.log("i par: " + i);
        }

        //Forzamos por el límite derecho
        if (i>12) i = 12;

        if (j == this.level.fils)
        {
            //Derrota
            this.endGame(false);
        }
        else 
        {
            if (this.level.lvl[j][i].texture.key == "EmptyBeetle") //Y la posición nueva está vacía
            {    
                //Destruye lo que había antes
                this.level.lvl[j][i].selfDestroy();
                //Añade otro sprite 
                this.level.lvl[j][i] = new MatrixBeetle(this, this.level.lvl[j][i].x, this.level.lvl[j][i].y, i, j).setScale(1.25);
                this.level.lvl[j][i].setTexture(this.shootingBeetle.texture);
                //Destruimos el lanzado
                this.shootingBeetle.selfDestroy();
                //Ya no hay escarabajo pululando por ahí
                this.level.freeBeetle = false;
                //Volvemos a activar el input
                this.input.mouse.enabled = true;
                //Creamos el siguiente bicho  
                this.shootingBeetle = new ShootingBeetle(this, this.player.x, this.player.y - 28).setDepth(5).setScale(1.25);
                //Reseteamos los coliders para el nuevo shooting beetle
                this.colisionesBichoNivel();
                //Destruir vecinos del mismo color
                this.processNeighbours(this.level.lvl[j][i]);
            }
        }

    }

    // Determina si el beetle está en la estructura de beetles visitados
    visitedNeighbour(beetle)
    {
        //Damos por hecho que inicialmente no se ha visitado
        let visitado = false;

        //Buscamos pos en el array de posiciones visitadas
        let i = 0;
        //Buscará hasta que llegue al final del array o encuentre el beetle
        while (i < this.final && this.visitados[i] != beetle)
        { 
            i++;
        }

        //Si coinciden ambas coordenadas de la posicion
        if (this.visitados[i] == beetle)
        {
            //Significara que dicha posición se ha visitado
            visitado = true;
        }
        //Si no, seguirá como al principio

        //Devolvemos visitado
        return visitado;
    }

    //Añade al array visitados las posiciones adyacentes al escarabajo actual que aun no han sido visitadas
    addNeighbours(beetle){
        let j = beetle.j;
        let i = beetle.i;

        //Miraremos si han sido visitados los vecinos adyacentes, y si no lo han sido, se añadirán al array para procesarlos
        //Fila impar
        if (j % 2 == 1)
        {
            //Arriba-Dcha
            if ((j-1) >= 0 && (i+1) < this.level.cols 
            && !this.visitedNeighbour(this.level.lvl[j-1][i + 1])
            && this.level.lvl[j-1][i + 1].texture.key != "EmptyBeetle") 
            {    
                this.visitados.push(this.level.lvl[j-1][i + 1]);
                //Se aumenta el índice de fin
                this.final++;
            }

            //Abajo-Dcha
            if ((j+1) < this.level.fils && (i+1) < this.level.cols 
            && !this.visitedNeighbour(this.level.lvl[j+ 1][i + 1])
            && this.level.lvl[j+ 1][i + 1].texture.key != "EmptyBeetle") 
            {    
                this.visitados.push(this.level.lvl[j+ 1][i + 1]);
                //Se aumenta el índice de fin
                this.final++;
            }
        }
        //Fila par
        else
        {
            //Arriba-Izqd
            if ((j-1) >= 0 && (i-1) >= 0 
            && !this.visitedNeighbour(this.level.lvl[j-1][i - 1])
            && this.level.lvl[j-1][i - 1].texture.key != "EmptyBeetle") 
            {    
                this.visitados.push(this.level.lvl[j-1][i - 1]);
                //Se aumenta el índice de fin
                this.final++;
            }
            //Abajo-Izqd
            if ((j+1) < this.level.fils && (i-1) >= 0 
            && !this.visitedNeighbour(this.level.lvl[j+1][i - 1])
            && this.level.lvl[j+1][i - 1].texture.key != "EmptyBeetle" )
            {    
                this.visitados.push(this.level.lvl[j+1][i - 1]);
                //Se aumenta el índice de fin
                this.final++;
            }
        }

        //Arriba
        if ((j-1) >= 0 && !this.visitedNeighbour(this.level.lvl[j-1][i])
        && this.level.lvl[j-1][i].texture.key != "EmptyBeetle" )
        {    
            this.visitados.push(this.level.lvl[j-1][i]);
            //Se aumenta el índice de fin
            this.final++;
        } 
        //Abajo
        if ((j+1) < this.levelfils && !this.visitedNeighbour(this.level.lvl[j+1][i])
        && this.level.lvl[j+1][i].texture.key!= "EmptyBeetle") 
        {    
            this.visitados.push(this.level.lvl[j+1][i]);
            //Se aumenta el índice de fin
            this.final++;
        } 
        //Dcha
        if ((i+1) < this.level.cols && !this.visitedNeighbour(this.level.lvl[j][i+1])
        && this.level.lvl[j][i+1].texture.key != "EmptyBeetle") 
        {    
            this.visitados.push(this.level.lvl[j][i+1]);
            //Se aumenta el índice de fin
            this.final++;
        } 
        //Izqd
        if ((i-1) >= 0 && !this.visitedNeighbour(this.level.lvl[j][i-1])
        && this.level.lvl[j][i-1].texture.key != "EmptyBeetle")
        {    
            this.visitados.push(this.level.lvl[j][i-1]);
            //Se aumenta el índice de fin
            this.final++;
        }
    }

    //Algoritmo de propagación de los vecinos de color
    processNeighbours(beetle){
   
        //Array de beetles a destruir
        let destroyArray = [];
        
        //Añadimos el beetle actual al array
        this.visitados.push(beetle);
        //Y se le añadirá también al de para destruir
        destroyArray.push(beetle);
        //Se aumenta el índice de fin y de pendientes, porque la casilla de referencia ya está procesada
        this.final++;
        this.pendientes++;
      
        //Analizamos las adyacentes
        this.addNeighbours(beetle);
      
        //Mientras que queden pendientes por procesar
        while (this.pendientes < this.final && this.final <= (this.level.cols * this.level.fils))
        {
            //Actualizamos el beetle referencia
            let beetleVecino = this.visitados[this.pendientes];

            //Si el beetle vecino tiene el color del que lanzamos
            if (beetleVecino.texture.key == beetle.texture.key)
            {
                //se le añadirá también al de para destruir
                destroyArray.push(beetleVecino);
                //Anadimos a pendientes a sus vecinos
                this.addNeighbours(beetleVecino);
            }
      
            //Y el escarabajo nuevo queda procesado
            this.pendientes++;
        }

        //Si hay 3 o mas vecinos de ese color, los destruye
        if (destroyArray.length >= 3)
        {
            for (let i = destroyArray.length - 1; i >= 0; i--){
                //Suma puntos
                this.points += 100;
                this.pointUI.setText('Puntos\n' + this.points);
                //Cambiamos la textura
                destroyArray[i].setTexture("EmptyBeetle");
                //Nos lo cargamos
                destroyArray[i].selfDestroy();
                //Lo sacamos del array
                destroyArray.pop(); 
            }

            //Procesamos la matriz, en busca de los que hayan podido quedar sueltos para destruirlos
            //Partimos de la fila 1, ya que los de la fila 0 sabemos que no están sueltos
            //Solo miraremos donde haya bicho. Si no lo hay no puede estar suelto
            for (let j = 1; j <  this.level.fils; j++)
            {
                for(let i = 0; i <this.level.cols; i++)
                {
                    if (this.level.lvl[j][i].texture.key != "EmptyBeetle")
                    {
                        //Destruimos los que hayan podido quedar sueltos
                        this.processSueltos(this.level.lvl[j][i]);
                    }
                }
            }
        }

        //Reiniciamos los arrays y reseteamos los valores
        else
        {
            for (let i = destroyArray.length - 1; i >= 0; i--){
                //Lo sacamos del array
                destroyArray.pop(); 
            }
        }

        for (let i = this.visitados.length - 1; i >= 0; i--){
            //Lo sacamos del array
            this.visitados.pop(); 
        }

        this.final = 0;
        this.pendientes = 0;

        //Reinicia el sonido del pitidito
        this.beep.play();

        if (this.points >= this.victory){
            //Victoria
            this.endGame(true);
        }

    }

    // Determina si el beetle está en la estructura de beetles visitados
    visitedSueltos(beetle)
    {
        //Damos por hecho que inicialmente no se ha visitado
        let visitado = false;

        //Buscamos pos en el array de posiciones visitadas
        let i = 0;
        //Buscará hasta que llegue al final del array o encuentre el beetle
        while (i < this.finSueltos && this.posiblesSueltos[i] != beetle)
        { 
            i++;
        }

        //Si coinciden ambas coordenadas de la posicion
        if (this.posiblesSueltos[i] == beetle)
        {
            //Significara que dicha posición se ha visitado
            visitado = true;
        }
        //Si no, seguirá como al principio

        //Devolvemos visitado
        return visitado;
    }

    //Añade al array visitados las posiciones adyacentes al escarabajo actual que aun no han sido visitadas
    addSueltos(beetle){
        let j = beetle.j;
        let i = beetle.i;

        //Miraremos si han sido visitados los vecinos adyacentes, y si no lo han sido, se añadirán al array para procesarlos
        //Fila impar
        if (j % 2 == 1)
        {
            //Arriba-Dcha
            if ((j-1) >= 0 && (i+1) < this.level.cols 
            && !this.visitedSueltos(this.level.lvl[j-1][i + 1])
            && this.level.lvl[j-1][i + 1].texture.key != "EmptyBeetle") 
            {    
                this.posiblesSueltos.push(this.level.lvl[j-1][i + 1]);
                //Se aumenta el índice de fin
                this.finSueltos++;
            }

            //Abajo-Dcha
            if ((j+1) < this.level.fils && (i+1) < this.level.cols 
            && !this.visitedSueltos(this.level.lvl[j+ 1][i + 1])
            && this.level.lvl[j+ 1][i + 1].texture.key != "EmptyBeetle") 
            {    
                this.posiblesSueltos.push(this.level.lvl[j+ 1][i + 1]);
                //Se aumenta el índice de fin
                this.finSueltos++;
            }
        }
        //Fila par
        else
        {
            //Arriba-Izqd
            if ((j-1) >= 0 && (i-1) >= 0 
            && !this.visitedSueltos(this.level.lvl[j-1][i - 1])
            && this.level.lvl[j-1][i - 1].texture.key != "EmptyBeetle") 
            {    
                this.posiblesSueltos.push(this.level.lvl[j-1][i - 1]);
                //Se aumenta el índice de fin
                this.finSueltos++;
            }
            //Abajo-Izqd
            if ((j+1) < this.level.fils && (i-1) >= 0 
            && !this.visitedSueltos(this.level.lvl[j+1][i - 1])
            && this.level.lvl[j+1][i - 1].texture.key != "EmptyBeetle" )
            {    
                this.posiblesSueltos.push(this.level.lvl[j+1][i - 1]);
                //Se aumenta el índice de fin
                this.finSueltos++;
            }
        }

        //Arriba
        if ((j-1) >= 0 && !this.visitedSueltos(this.level.lvl[j-1][i])
        && this.level.lvl[j-1][i].texture.key != "EmptyBeetle" )
        {    
            this.posiblesSueltos.push(this.level.lvl[j-1][i]);
            //Se aumenta el índice de fin
            this.finSueltos++;
        } 
        //Abajo
        if ((j+1) < this.levelfils && !this.visitedSueltos(this.level.lvl[j+1][i])
        && this.level.lvl[j+1][i].texture.key!= "EmptyBeetle") 
        {    
            this.posiblesSueltos.push(this.level.lvl[j+1][i]);
            //Se aumenta el índice de fin
            this.finSueltos++;
        } 
        //Dcha
        if ((i+1) < this.level.cols && !this.visitedSueltos(this.level.lvl[j][i+1])
        && this.level.lvl[j][i+1].texture.key != "EmptyBeetle") 
        {    
            this.posiblesSueltos.push(this.level.lvl[j][i+1]);
            //Se aumenta el índice de fin
            this.finSueltos++;
        } 
        //Izqd
        if ((i-1) >= 0 && !this.visitedSueltos(this.level.lvl[j][i-1])
        && this.level.lvl[j][i-1].texture.key != "EmptyBeetle")
        {    
            this.posiblesSueltos.push(this.level.lvl[j][i-1]);
            //Se aumenta el índice de fin
            this.finSueltos++;
        }
    }

    //Algoritmo de propagación de los sueltos
    //A partir del this.level.lvl[1][0] (primero de la fila 1)
    processSueltos(bettleSuelto){
        //Añadimos el beetle actual al array
        this.posiblesSueltos.push(bettleSuelto);
        //Se aumenta el índice de fin y de pendientes, porque la casilla de referencia ya está procesada
        this.finSueltos++;
        this.pendSueltos++;

        //Analizamos las adyacentes
        this.addSueltos(bettleSuelto);

        //Mientras que queden pendientes por procesar
        while (this.pendSueltos < this.finSueltos && this.finSueltos <= (this.level.cols * this.level.fils))
        {
            //Actualizamos el beetle referencia
            let beetleVecinoSuelto = this.posiblesSueltos[this.pendSueltos];
            //Anadimos a pendientes a sus vecinos
            this.addSueltos(beetleVecinoSuelto);
            //Y el escarabajo nuevo queda procesado
            //console.log(this.posiblesSueltos[this.pendSueltos].texture.key + " ")
            this.pendSueltos++;
            
        }
        //Recorremos posiblesSueltos en busca de algunos que esté en la fila j = 0. 
        //En ese caso, no son sueltos, y no se destruyen. En el caso contrario, se destruyen.
        let k = 0;
        //En un principio destruyo todo
        let destruir = true;
        while(k < this.posiblesSueltos.length && destruir)
        {
            if (this.posiblesSueltos[k].j == 0)
            {
                destruir = false;
            }
            k++;
        }

        if (destruir && this.posiblesSueltos.length>0)
        {
            console.log(" length:" + this.posiblesSueltos.length);
            for (let i = this.posiblesSueltos.length - 1; i >= 0; i--){
                //Suma puntos
                this.points += 50;
                this.pointUI.setText('Puntos\n' + this.points);
                //Cambiamos la textura
                this.posiblesSueltos[i].setTexture("EmptyBeetle");
                //Nos lo cargamos
                this.posiblesSueltos[i].selfDestroy();
            }
        }

        //Lo vacíamos al final
        for (let i = this.posiblesSueltos.length - 1; i >= 0; i--){
            //Lo sacamos del array
            this.posiblesSueltos.pop(); 
        }

        this.finSueltos = 0;
        this.pendSueltos = 0;
    }

    followMouse(pointer)
    {
        this.player.angle = Phaser.Math.Angle.BetweenPoints(this.player, pointer);
        this.player.rotation = this.player.angle + 1.5708; // Pone la rotación del cañón mirando al mouse en radianes
    }
 
    destroySueltos(){
        //Recorremos la matriz en busca de bichos sueltos
        for (let j = 0; j < this.level.fils; j--)
        {
            for (let i = 0; i < this.level.cols; i++) 
            {
                //Si el bicho de ahora no es vacío
                if (this.level.lvl[j][i].texture.key != "EmptyBeetle")
                {
                    //Fila impar
                    if (j % 2 == 1)
                    {   
                        //Límite derecho
                        if (i == this.level.cols - 1){
                            //Solo miro arriba e izquierda
                            if ((j-1) >= 0 && this.level.lvl[j-1][i].texture.key == "EmptyBeetle" 
                            && this.level.lvl[j][i-1].texture.key == "EmptyBeetle")
                            {
                                this.eliminaSueltos(j, i);
                            }
                        }
                        //Límite izquierdo
                        else if (i == 0){
                            //Solo miro arriba, arriba-dcha e dcha
                            if ((j-1) >= 0 && this.level.lvl[j-1][i].texture.key == "EmptyBeetle" 
                            && this.level.lvl[j-1][i+1].texture.key == "EmptyBeetle"
                            && this.level.lvl[j][i+1].texture.key == "EmptyBeetle")
                            {
                                this.eliminaSueltos(j, i);
                            }
                        }
                        //Caso promedio
                        else {
                            //Arriba, arriba-dcha, dcha, izqd
                            if ((j-1) >= 0 && this.level.lvl[j-1][i].texture.key == "EmptyBeetle" 
                            && this.level.lvl[j-1][i+1].texture.key == "EmptyBeetle"
                            && this.level.lvl[j][i+1].texture.key == "EmptyBeetle"
                            && this.level.lvl[j][i-1].texture.key == "EmptyBeetle")
                            {
                                this.eliminaSueltos(j, i);
                            }
                        }
                    }
                    //Fila par
                    else
                    {
                        //Límite derecho
                        if (i == this.level.cols - 1){
                            //Solo miro arriba, arriba-izqd e izquierda
                            if ((j-1) >= 0 && this.level.lvl[j-1][i].texture.key == "EmptyBeetle" 
                            && this.level.lvl[j-1][i-1].texture.key == "EmptyBeetle"
                            && this.level.lvl[j][i-1].texture.key == "EmptyBeetle")
                            {
                                this.eliminaSueltos(j, i);
                            }
                        }
                        //Límite izquierdo
                        else if (i == 0){
                            //Solo miro arriba y dcha
                            if ((j-1) >= 0 && this.level.lvl[j-1][i].texture.key == "EmptyBeetle" 
                            && this.level.lvl[j][i+1].texture.key == "EmptyBeetle")
                            {
                                this.eliminaSueltos(j, i);
                            }
                        }
                        //Caso promedio
                        else {
                            //Arriba, arriba-izqd, dcha, izqd
                            if ((j-1) >= 0 && this.level.lvl[j-1][i].texture.key == "EmptyBeetle" 
                            && this.level.lvl[j-1][i-1].texture.key == "EmptyBeetle"
                            && this.level.lvl[j][i+1].texture.key == "EmptyBeetle"
                            && this.level.lvl[j][i-1].texture.key == "EmptyBeetle")
                            {
                                this.eliminaSueltos(j, i);
                            }
                        }
                    }
                }
            }
        }
    }

    eliminaSueltos(j, i)
    {
        //Cambiamos la textura
        this.level.lvl[j][i].setTexture("EmptyBeetle");
        //Lo destruimos
        this.level.lvl[j][i].selfDestroy();
        //Suma puntos (menos, porque es efecto secundario)
        this.points += 50;
        this.pointUI.setText('Puntos\n' + this.points);
    }

    endGame(finish){
        //Vuelve a activar el input
        this.input.mouse.enabled = true;
        let result; 
        let mode = -1;
        //Victoria, alcanzar this.victory puntos
        if (finish){
            console.log("Victoria");
            alert('Has obtenido el logro ' + this.gameState.logros.Game3[this.gameState.currentDay - 1] + ' por enviarle una carta a Jepri el día ' + this.gameState.currentDay);
            result = 'victoria';
            mode = 0;
        }
        //Derrota si hay en la fila final 
        else {
            console.log("Derrota");
            result = 'derrota';
            mode = 1;
        }

        if (result) {
            const currentDayIndex = this.gameState.currentDay - 1; 
            this.gameState.minigamesResults.Game3[currentDayIndex] = result;
        }

        // Final de nivel 
        if (mode != -1)
        {
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
        //Muestra el marcador de objetivo
        this.goalUI.setVisible(true);

        if(this.gameState.currentDay == 1)
        {
            this.victory = 3000;
            this.beetles.length = 4;
            this.level.filIni = 3;
        }
        else if (this.gameState.currentDay == 2)
        {
            this.victory = 4000;
            this.beetles.length = 7;
            this.level.filIni = 4;
        }
        else if(this.gameState.currentDay == 3)
        {
            this.victory = 5000;
            this.beetles.length = 6;
            this.level.filIni = 5;
        }
        else if(this.gameState.currentDay == 4)
        {
            this.victory = 5500;
            this.beetles.length = 5;
            this.level.filIni = 6;
        }
        else if(this.gameState.currentDay == 5)
        {
            this.victory = 6000;
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
