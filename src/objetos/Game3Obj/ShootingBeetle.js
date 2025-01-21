import Beetle from './Beetle.js';

export default class ShootingBeetle extends Beetle
{
  //Constructora del objeto
  constructor(scene, x, y) {
    super(scene, x, y)
    //Habilitamos las físicas
    this.scene.physics.world.enable(this);
    //Tamaño del cuerpo 
    //(menor en x que en y para colarlo entre dos escabajos más cómodamente)
    this.body.setSize(30, 35);

    //Velocidad de lanzamiento
    this.speed = 600;

    //Propiedades físicas
    this.body.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
    this.body.setBounce(1); // rebote con colisiones.
    this.body.setAllowGravity(false); //Inicialmente no tienen. La activamos cuando nos conviene

  }
}