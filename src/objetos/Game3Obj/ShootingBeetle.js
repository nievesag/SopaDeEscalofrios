import Beetle from './Beetle.js';

export default class ShootingBeetle extends Beetle
{
  //Constructora del objeto
  constructor(scene, x, y) {
    super(scene, x, y)
    this.scene.physics.world.enable(this);
    this.setDisplaySize(40, 40);
    this.setOrigin(0, 0); 

    this.speed = 1000;

    this.body.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
    this.body.setBounce(1); // rebote con colisiones.
    this.body.setAllowGravity(false); //Inicialmente no tienen. La activamos cuando nos conviene

  }
}