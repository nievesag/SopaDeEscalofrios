export default class Matrix extends Phaser.GameObjects.Sprite
{
  //Constructora del objeto
  constructor (scene, x, y)
  {
    super(scene, x, y);

    this.scene = scene;
    this.scene.add.existing(this);
    this.setOrigin(0, 0); 
    this.x = x; 
    this.y = y;

    this.lvl = [];
    this.cols = 13; //Columnas totales
    this.fils = 13; //Filas totales 
    this.filIni = 3; //Filas que se instancian al principio. Dependen de la dificultad
    this.height = 45; //Alto bicho
    this.width = 45; //Ancho bicho
    this.freeBeetle = false; //Si hay escarabajo sin engancharse
    
    this.beetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];

    this.isDead = false;

  }
}
