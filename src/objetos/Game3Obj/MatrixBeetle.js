import Beetle from './Beetle.js';

export default class MatrixBeetle extends Beetle
{
  //Constructora del objeto
  constructor(scene, x, y) {
    super(scene, x, y)
    this.scene.physics.world.enable(this);
    this.body.setSize(30, 30);
    this.isDead = false;
    this.body.setImmovable(true); // Para que no se salga de los límites del mundo.
    this.body.setBounce(0); // rebote con colisiones.
    this.body.setAllowGravity(false); //Inicialmente no tienen. La activamos cuando nos conviene
  }
}