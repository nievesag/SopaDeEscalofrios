
import Game3 from '../../scenes/Game3.js';
import Beetle from './Beetle.js';
import Matrix from './Matrix.js';

export default class Player3 extends Phaser.GameObjects.Sprite
{
  //Constructora del objeto
  constructor (scene, x, y)
  {
    super(scene, x, y, 'player3');

    this.scene.add.existing(this);
    this.scene = scene;
    this.setDisplaySize(100, 200);
    this.origin = new Phaser.Math.Vector2(x, y);

    this.x = x; //Pos en x
    this.y = y; //Pos en y
    this.angle = 90; //Angulo de disparo
    this.cellType = "normal"; //0 - empty, 1 - normal, 2 - bomb, 3 - color bomb
    this.force = 1000;

    this.image = this.scene.make.image({
      x : this.x,
      y : this.y + 30,
      rotation : this.rotation,
      key: 'player3',
      flipY: true,
      scale : {
        x: 0.3,
        y: 0.3,
      }
    }).setDepth(2);

    // Dibuja la línea de la dir.
    this.graphics = this.scene.add.graphics({ 
      lineStyle: { width: 5, color: 0xffffff , alpha: 1} 
    });
    this.line = new Phaser.Geom.Line(); 

    this.possiblebeetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];

    //this.setProjectile(); // Inicializa el primer proyectil y el siguiente
    this.inputEvents();
    //Se empieza con todos los colores, según se vayan eliminando de pantalla todos los esc de un color, ese color ya no aparece más.
  }

  create()
  {
    if(this.scene.gameState.currentDay == 1 || this.scene.gameState.currentDay == 2)
      {
        this.possiblebeetles.length = 5;
      }
      else if(this.scene.gameState.currentDay == 3 || this.scene.gameState.currentDay == 4)
      {
        this.possiblebeetles.length = 6;
      }
      else if(this.scene.gameState.currentDay == 5)
      {
        this.possiblebeetles.length = 7;
      }
  }

  setProjectile() {
    this.randomBeetle = Phaser.Math.RND.between(0, this.possiblebeetles.length - 1);
    this.actualBeetle = this.scene.make.image({
      x : this.x,
      y : this.y + 25,
      key: this.possiblebeetles[this.randomBeetle]
    }).setDepth(2);   

    // y preparamos el siguiente
    this.randomBeetle = Phaser.Math.RND.between(0, this.possiblebeetles.length - 1);
    this.nextBeetleBeetle = this.scene.make.image({
      x : this.x,
      y : this.y + 15,
      key: this.possiblebeetles[this.randomBeetle]
    }).setDepth(2); 
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
    this.scene.input.on('pointermove', (pointer) =>
    {
      this.angle = Phaser.Math.Angle.BetweenPoints(this, pointer); // Pone la rotación del cañón mirando al mouse (con unos ajustes).
      this.image.rotation = this.angle + 30;

      // Línea gráfica de la dir.
      Phaser.Geom.Line.SetToAngle(this.line, this.x, this.y, this.angle+0.15, 100); 
      this.graphics.clear().strokeLineShape(this.line); // Limpia y redibuja la línea.
    });

    // AL HACER CLIC. DISPARO
    this.scene.input.on('pointerup', () =>
    {
      this.randomBeetle = Phaser.Math.RND.between(0, this.possiblebeetles.length - 1);
      const texture = this.possiblebeetles[this.randomBeetle];

      //console.log("scene: " + this.scene + " x: "+ this.x + " y: " + this.y + " cellType: " + this.cellType + " texture: " + texture)
      //this.shootingBeetle = new Beetle (this.scene, this.x, this.y, 'normal', texture);
      //console.log(this.shootingBeetle);
      //this.shootingBeetle.shoot(this.rotation);
      //this.setNextProjectile(this.nextBeetle);
    });

    // AL PULSAR ESPACIO. CAMBIA ESCARABAJO POR EL SIGUIENTE
    //this.scene.input.keyboard.on('keydown-SPACE', () => {
      //this.changeBeetle()
    //});
  }

  //Intercambia los escarabajos dentro del cannon
  changeBeetle(actualBeetle, nextBeetle)
  {
    actualBeetle = this.actualBeetle;
    nextBeetle = this.nextBeetle;
    this.swap(actualBeetle, nextBeetle);
  }

  //Dispara en la dirección del input
  shoot()
  {
    //Le metemos físicas
    //this.physics.world.enable(shootingBeetle);
    //this.actualBeetle.setCircle(22.5); //Collider circular
    // Para que no se salga de los límites del mundo.

    this.scene.actualBeetle.physics.velocityFromRotation(this.angle, 1000, this.speed); 
    //this.actualBeetle.setBounce(1).setCollideWorldBounds(true);

    //this.actualBeetle.enableBody(true, this.x, this.y, true, true); 

    //this.physics.velocityFromRotation(angle, 1000, this.actualBeetle.body.velocity); // Lanza el escarabajo con un ángulo y velocidad.
  }

}