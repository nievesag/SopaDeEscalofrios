import Arrow from '../Game4Obj/Arrow.js';

export default class BallArrow extends Arrow {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.type = 'ball';  // Tipo de flecha
    }

    // Método para convertir la flecha en una bola cuando se hace clic
    transformToBall() {
        this.arrow.setFillStyle(0xFF4500);  // Cambiar el color a naranja para simular una bola
        this.arrow.setSize(100, 100);  // Cambiar el tamaño a una bola
        this.arrow.body.setCircle(15);  // Configurar el cuerpo para que sea circular
        this.arrow.body.setAllowGravity(true);
        this.arrow.body.setBounce(0.8);  // Añadir rebote
        this.arrow.body.setImmovable(false);  // Dejar de ser inmovil
    }
}
