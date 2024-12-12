export default class Background{
    constructor(scene){
        this.scene = scene;

        // los segmentos estos son las piramides y picos formaos.
        this.segments = []; // segmentos actuales.
        this.segmentSize = 5000; // tamaño de cada cacho.

        // VAN LOS NUMEROS AL REVES: MENOS ES MAS
        this.maxY = 550; // máximo absoluto.
        this.minY = 400; // mínimo absoluto.
    }
    // dibujar un paisaje "procedural(?)"

    initialLandscape(){
        // ancho de la cámara.
        let cameraWidth = this.scene.cameras.main.width;

        // Divides la anchura de cámara entre cada cacho para ver cuantos cachos pones luego.
        let visibleSegments = Math.ceil(cameraWidth/this.segmentSize); 

        /* MÉTODOS DE MATH (algunos q pueden valernos)
        Math.ceil(numero): redondea hacia arriba. (3.2 = 4)
        Math.floor(numero): redondea hacia abajo. (3.7 = 3)
        Math.round(numero): redondea a secas (3.2 = 3, 3.7 = 4)
        Math.trunc(numero): elimina los decimales (3.2 = 3, 3.7 = 3)
        Math.abs(numero): valor absoluto.
        Math.sign(numero): devuelve el signo (3 = 1 positivo, -3 = -1 negativo, 0 si cero)
        Math.min(n1, n2, ... nn): devuelve el minimo de tos los que le metas.
        Math.max(n1, n2, ... nn): devuelve el masimo de tos los que le metas.
        Math.pow(a, b): potencia (a^b).
        Math.sqrt(numero): raíz cuadrada.
        Math.random(): numero aleatorio entre 0 y 0.9999.....
        let xd = algo.toFixed(n): devuelve en xd algo con n decimales.
        */

        let totalSegments = visibleSegments + 2 // le sumamos 2 para que no se le vean las tripas al juego y tenga márgen cari.

        for(let i = 0; i < totalSegments; i++){
            let newSegment = i * this.segmentSize; // calcula la pos inicial del segmento actual en x.
            this.addSegment(newSegment); // lo dibuja
        }

        // al terminar el bucle se rellena el área visible con segmentos, y así cada vez que se carga terreno (camerawidth)


    }

    addSegment(newSegment){
        //  Draw a random 'landscape'
        let landscape = this.scene.add.graphics();

        landscape.fillStyle(0x0d0d0d, 1); // color de relleno.
        landscape.lineStyle(9, 0x0d0d0d, 1); // color de línea.

        landscape.beginPath();

        let x = newSegment;
        let y = this.maxY;
        let up = true; // para ver si sube o baja el pico. 

        // dibuja el inicio del terreno.
        landscape.moveTo(newSegment, 600);
        landscape.lineTo(newSegment, this.maxY);

        let range = 0;

        // newSegment + segmentSize es desde donde partes + lo que abarca: punto de inicio + tamaño.
        let realSize = newSegment + this.segmentSize
        
        while(x < realSize){
            // longitud de cada segmento
            range = Phaser.Math.Between(20, 100);

            if (up) // máximos.
            {
                y = Phaser.Math.Between(y, this.minY);
                up = false;
            }
            else // mínimos.
            {
                y = Phaser.Math.Between(y, this.maxY);
                up = true;
            }

            // Traza el siguiente cacho.
            landscape.lineTo(x + range, y);

            x += range;

        }

        // cierra el trazado a la derecha
        landscape.lineTo(realSize, this.maxY);
        landscape.lineTo(realSize, 600);
        landscape.closePath();

        // traza y rellena.
        landscape.strokePath();
        landscape.fillPath();

        let segment = { // crea un segment single.
            graphic: landscape, // graphic object (phaser)
            start: newSegment // pos ini
        };

        this.segments.push(segment); // mete el segment en el array.

    }

    deleteSegment(segment){ 
        segment.graphic.destroy(); // elimina elemento gráfico segment.
        this.segments.shift(); // elimina el primer elemento del array empezando por la izquierda.
    }

    update(){
        let cameraX = this.scene.cameras.main.scrollX; // lado izq de la cámara.
        let cameraWidth = this.scene.cameras.main.width; // ancho de cámara

        for(let i = 0; i < this.segments.length; i++){
            let segment = this.segments[i];

            // saca el punto final de ese segmento[i].
            let lastSegmentPosX = segment.start + this.segmentSize;

            if(lastSegmentPosX < cameraX){
                this.deleteSegment(segment);
            }
            else{
                i++ // solo avanza si el segment es deleted.
            }
        }

        // último segmento del array (último en pantalla).
        let lastSegment = this.segments[this.segments.length - 1];
        let nextSegment = lastSegment.start + this.segmentSize;

        // si el próximo segmento es menor que el lado derecho de la pantalla...
        while(nextSegment < cameraX + cameraWidth){
            this.addSegment(nextSegment); // ... lo añade y pinta.
            nextSegment = nextSegment + this.segmentSize; // CALCULA EL PRÓXIMO SEGMENTO9.

        }

        

       
    }

    destroy(){
        for(let i = 0; i < this.segments.length; i++){
            this.segments[i].graphic.destroy(); // destruye las pirámides.
        }
        this.segments = []; // limpia el array.
    }
}