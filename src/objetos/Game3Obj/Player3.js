// Clase del Player del Minijuego 3. 
export default class Player3 extends Phaser.GameObjects.Container
{
  //Constructora del objeto
  constructor (scene, x, y)
  {
    super(scene, x, y, { key: "Player3" });

    //Cualidades
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.dir = dir;
    this.color = color;
    this.force = force;

    //Se añade a escena
    this.scene.add.existing(this);
    this.isDead = false;

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

  //Colisiones círculo
  colisions() 
  {
    container.setInteractive(new Phaser.Geom.Circle(0, 0, radius), Phaser.Geom.Circle.Contains);
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