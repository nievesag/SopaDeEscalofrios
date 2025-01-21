import Beetle from './Beetle.js';

export default class ShootingBeetle extends Beetle
{
  //Constructora del objeto
  constructor(scene, x, y) {
    super(scene, x, y)
    this.scene.physics.world.enable(this);
    this.body.setSize(40, 40);

    this.speed = 500;

    this.body.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
    this.body.setBounce(1); // rebote con colisiones.
    this.body.setAllowGravity(false); //Inicialmente no tienen. La activamos cuando nos conviene

  }
}