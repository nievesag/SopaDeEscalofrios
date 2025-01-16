import Beetle from './Beetle.js';

export default class MatrixBeetle extends Beetle
{
  //Constructora del objeto
  constructor(scene, x, y) {
    super(scene, x, y)

    this.isDead = false;

  }
}