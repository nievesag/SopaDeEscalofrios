// Clase del Player del Minijuego 3. 
import Beetle from '../objetos/Game3Obj/Beetle.js';

export default class Player3 extends Phaser.GameObjects.Sprite
{
  //Constructora del objeto
  constructor (scene, x, y)
  {
    super(scene, x, y, 'Player3');

    this.scene.add.existing(this);
    this.scene = scene;
    this.setDisplaySize(100, 200);
    this.origin = new Phaser.Math.Vector2(x, y);

    //Randomizamos el color;
    this.randomBeetle = Phaser.Math.RND.between(0, beetles.length - 1);
    //El que vamos a disparar
    this.shootingBeetle;
    //El siguiente
    this.nextBeetle;

    this.setProjectile(); // Inicializa el primer proyectil y el siguiente
    this.inputEvents();
    //Se empieza con todos los colores, según se vayan eliminando de pantalla todos los esc de un color, ese color ya no aparece más.
  }

  setProjectile() {
    // Array de posibles a disparar. 
    let beetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];
    //console.log(randomBeetle);
    this.shootingBeetle = this.add.image(cannonDisparo.x, cannonDisparo.y, beetles[randomBeetle]).setScale(1); //Instancia el escarabajo             
    // y preparamos el siguiente
    this.nextBeetle = this.add.image(cannonDisparo.x, cannonDisparo.y, beetles[randomBeetle]).setScale(1); 
    //console.log(beetles[randomBeetle].texture);
    console.log(shootingBeetle.texture.key);

    this.shootingBeetle.body.setAllowGravity(false);
    this.shootingBeetle.body.setImmovable(true);
  }

  setNextProjectile(nextBeetle){
    //Ahora el que se dispara es el siguiente
    this.shootingBeetle = nextBeetle;
    //Y creamos un nuevo siguiente
    nextBeetle = this.add.image(cannonDisparo.x, cannonDisparo.y, beetles[randomBeetle]).setScale(1); 
  }

  inputEvents() {
    this.pointer = this.scene.input.activePointer;
    // AL MOVER EL RATON. REDIRECCIONO
    this.input.on('pointermove', (pointer) =>
    {
      this.findDirection();
    });

    // AL HACER CLIC. DISPARO
    this.input.on('pointerup', () =>
    {
      this.shoot();
      this.setNextProjectile(this.nextBeetle);
    });

    // AL PULSAR ESPACIO. CAMBIA ESCARABAJO POR EL SIGUIENTE
    this.scene.input.keyboard.on('keydown-SPACE', () => {
      this.changeBeetle()
  });
  }

  //Intercambia los escarabajos dentro del cannon
  changeBeetle(shootingBeetle, nextBeetle)
  {
    shootingBeetle = this.shootingBeetle;
    nextBeetle = this.nextBeetle;
    this.swap(shootingBeetle, nextBeetle);
  }

  //Según la posición del ratón en pantalla, la convierte en coordenadas del ordenador
  //Método auxiliar del shoot()
  findDirection()
  {
    angle = Phaser.Math.Angle.BetweenPoints(cannonBase, pointer); // Ángulo cañón -> mouse.
    cannonDisparo.rotation = angle; // Pone la rotación del cañón mirando al mouse (con unos ajustes).

    // Línea gráfica de la dir.
    Phaser.Geom.Line.SetToAngle(line, cannonDisparo.x, cannonDisparo.y, angle, 128); 
    graphics.clear().strokeLineShape(line); // Limpia y redibuja la línea.
  }

  //Dispara en la dirección del input
  shoot()
  {
    //Le metemos físicas
    //this.physics.world.enable(shootingBeetle);
    shootingBeetle.setCircle(22.5); //Collider circular
    // Para que no se salga de los límites del mundo.
    shootingBeetle.setBounce(1).setCollideWorldBounds(true);

    shootingBeetle.enableBody(true, this.x, this.y, true, true); 

    this.physics.velocityFromRotation(angle, 1000, shootingBeetle.body.velocity); // Lanza el escarabajo con un ángulo y velocidad.
  }

}