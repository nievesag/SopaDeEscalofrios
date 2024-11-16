// Clase del Player del Minijuego 3. 
//import Beetle from '../objetos/Game3Obj/Beetle.js';

export default class Player3 extends Phaser.GameObjects.Container
{
  //Constructora del objeto
  constructor (scene, x, y, key = 'Player3')
  {
    super(scene, x, y, key);

    this.scene.add.existing(this);
    this.scene = scene;
    this.origin = new Phaser.Math.Vector2(x, y);

    //Input de ratón
    this.pointer = this.scene.input.activePointer;
    //https://github.com/f0reil/Gorgo-Division/blob/main/src/characters/Player.js
    //Se empieza con todos los colores, según se vayan eliminando de pantalla todos los esc de un color, ese color ya no aparece más.
  }

  //Destructora del objeto
  destructor ()
  {
    this.destroy();
  }

  InputEvents() {
    this.input.on('pointermove', (pointer) =>
    {
      angle = Phaser.Math.Angle.BetweenPoints(cannonBase, pointer); // Ángulo cañón -> mouse.
      cannonDisparo.rotation = angle; // Pone la rotación del cañón mirando al mouse (con unos ajustes).

      // Línea gráfica de la dir.
      Phaser.Geom.Line.SetToAngle(line, cannonDisparo.x, cannonDisparo.y, angle, 128); 
      graphics.clear().strokeLineShape(line); // Limpia y redibuja la línea.

    });

    // AL HACER CLIC. DISPARO
    this.input.on('pointerup', () =>
    {
        //Randomizamos el color;
      const randomBeetle = Phaser.Math.RND.between(0, beetles.length - 1);
      //console.log(randomBeetle);
      shootingBeetle = this.physics.add.image(cannonDisparo.x, cannonDisparo.y, beetles[randomBeetle]).setScale(1); //Instancia el escarabajo             
      //console.log(beetles[randomBeetle].texture);
      console.log(shootingBeetle.texture.key);
      //Le metemos físicas
      //this.physics.world.enable(shootingBeetle);
      shootingBeetle.setCircle(22.5); //Collider circular
      // Para que no se salga de los límites del mundo.
      shootingBeetle.setBounce(1).setCollideWorldBounds(true);

      shootingBeetle.enableBody(true, cannonDisparo.x, cannonDisparo.y, true, true); // Activa la vessel y la pone donde cannonHead.

      this.physics.velocityFromRotation(angle, 1000, shootingBeetle.body.velocity); // Lanza el escarabajo con un ángulo y velocidad.
  

      // --- COLISIONES CON BORDERS ---.
      this.physics.add.collider(borders, shootingBeetle);

      // --- COLISIONES MATRIX - DISPARO ---.
      for (let i = 0; i < groupMatrix.length; i++){
          groupMatrix[i].getChildren().forEach(element => {
          //Hacemos que se llame a la función cuando se choque el escarabajo con la matriz
          this.physics.add.collider(shootingBeetle, element);
          //this.physics.add.collider(shootingBeetle, element, this.addToMatrix(shootingBeetle, element));
          //console.log(shootingBeetle);
          //console.log(element);

      })
  }
          
  });


  }



  //Colisiones círculo
  colisions() 
  {
    container.setInteractive(new Phaser.Geom.Circle(0, 0, 25), Phaser.Geom.Circle.Contains);
    // container.setInteractive(false); // disable
  }

  //Intercambia los escarabajos
  changeBeetle()
  {
    this.swap(child1, child2);
  }

  //Determina de forma random el siguiente escarabajo. 
  nextBeetle()
  {

  }

  //Según la posición del ratón en pantalla, la convierte en coordenadas del ordenador
  //Método auxiliar del shoot()
  findDirection()
  {

  }

  //Dispara en la dirección del input
  shoot()
  {

  }

}