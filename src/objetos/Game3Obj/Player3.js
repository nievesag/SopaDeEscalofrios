// Clase del Player del Minijuego 3. 
import { Tilemaps } from 'phaser';
import Beetle from './Beetle.js';
import Matrix from './Matrix.js';

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

    this.x = 500; //Pos en x
    this.y = 700; //Pos en y
    this.angle = 90; //Angulo de disparo
    this.cellType = 0; //0 - empty, 1 - normal, 2 - bomb, 3 - color bomb
    this.actualBeetle = 
    {
      x : 0,
      y : 0,
      angle : 0,
      speed : 1000,
      dropspeed : 900,
      cellType : 1,
      visible : false
    };
    this.nextBeetle = 
    {
      x : this.x,
      y: this.y + 20,
      celltype: 1
    }

    //Randomizamos el color;
    this.randomBeetle = Phaser.Math.RND.between(0, Beetle.beetles.length - 1);
    //El que vamos a disparar
    this.shootingBeetle;
    //El siguiente
    this.nextBeetle;

    this.setProjectile(); // Inicializa el primer proyectil y el siguiente
    this.inputEvents();
    //Se empieza con todos los colores, según se vayan eliminando de pantalla todos los esc de un color, ese color ya no aparece más.
  }

  setProjectile() {
    this.shootingBeetle = this.add.image(this.x, this.y, Beetle.beetles[randomBeetle]).setScale(1); //Instancia el escarabajo             
    // y preparamos el siguiente
    this.nextBeetle = this.add.image(this.x, this.y, Beetle.beetles[randomBeetle]).setScale(1); 
    //console.log(beetles[randomBeetle].texture);
    console.log(shootingBeetle.texture.key);

    this.shootingBeetle.body.setAllowGravity(false);
    this.shootingBeetle.body.setImmovable(true);
  }

  setNextProjectile(nextBeetle){
    //Ahora el que se dispara es el siguiente
    this.shootingBeetle = nextBeetle;
    //Y creamos un nuevo siguiente
    nextBeetle = this.add.image(this.x, this.y, beetles[randomBeetle]).setScale(1); 
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
    angle = Phaser.Math.Angle.BetweenPoints(this, pointer); // Ángulo cañón -> mouse.
    cannonDisparo.rotation = angle; // Pone la rotación del cañón mirando al mouse (con unos ajustes).

    // Línea gráfica de la dir.
    Phaser.Geom.Line.SetToAngle(line, this.x, this.y, angle, 128); 
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