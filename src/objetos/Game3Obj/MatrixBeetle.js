import Beetle from './Beetle.js';

export default class MatrixBeetle extends Beetle
{
  //Constructora del objeto
  constructor(scene, x, y, i, j) {
    super(scene, x, y)
    this.i = i;  //Indice columna dentro de la matriz
    this.j = j;  //Indice fila dentro de la matriz

    this.isDead = false;
    this.body.setBounce(0); // rebote con colisiones.
    this.body.setImmovable(true);
  }
}