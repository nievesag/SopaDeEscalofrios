export default class Background{
    constructor(scene){
        this.scene = scene;
    }

    createLandscape () // Dibujar un paisaje "procedural(?)"
    {
        //  Draw a random 'landscape'
        const landscape = this.scene.add.graphics();

        landscape.fillStyle(0x008800, 1); // Color de relleno.
        landscape.lineStyle(2, 0x00ff00, 1); // Color de línea.

        landscape.beginPath();

        // Mínimo y máximo absolutos de cada pico.
        const maxY = 550;
        const minY = 400;

        let x = 0;
        let y = maxY;
        let range = 0;

        let up = true; // Para ver si sube o baja el pico. 

        // Dibuja el inicio del terreno.
        landscape.moveTo(0, 600);
        landscape.lineTo(0, 550);

        // Dibujar el paisaje.
        do
        {
            // Longitud de cada segmento.
            range = Phaser.Math.Between(20, 100);

            if (up) // Máximos.
            {
                y = Phaser.Math.Between(y, minY);
                up = false;
            }
            else // Mínimos.
            {
                y = Phaser.Math.Between(y, maxY);
                up = true;
            }


            // Traza el siguiente segmento.
            landscape.lineTo(x + range, y);

            x += range;

        } while (x < 3100); // Repite hasta que llegue al borde derecho.

        // Cierra el trazado a la derecha
        landscape.lineTo(3200, maxY);
        landscape.lineTo(3200, 600);
        landscape.closePath();

        // Traza y rellena.
        landscape.strokePath();
        landscape.fillPath();
    }
}