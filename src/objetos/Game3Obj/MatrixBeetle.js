import Beetle from './Beetle.js';

export default class MatrixBeetle extends Beetle
{
  //Constructora del objeto
  constructor(scene, x, y, i, j) {
    super(scene, x, y)

    this.i = i;  //Indice columna dentro de la matriz
    this.j = j;  //Indice fila dentro de la matriz
    this.scene.physics.world.enable(this);
    this.body.setSize(35, 35);

    this.isDead = false;
    this.body.setImmovable(true); // Para que no se salga de los límites del mundo.
    this.body.setBounce(0); // rebote con colisiones.
    this.body.setAllowGravity(false); //Inicialmente no tienen. La activamos cuando nos conviene
  }
}