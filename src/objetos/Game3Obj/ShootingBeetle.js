import Beetle from './Beetle.js';

export default class ShootingBeetle extends Beetle
{
  //Constructora del objeto
  constructor(scene, x, y) {
    super(scene, x, y)

    this.speed = 500;
    
    this.body.setBounce(1); // rebote con colisiones.

  }
}