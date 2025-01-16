import MatrixBeetle from './MatrixBeetle.js';

export default class Matrix extends Phaser.GameObjects.Sprite
{
  //Constructora del objeto
  constructor (scene, x, y)
  {
    super(scene, x, y);

    this.scene = scene;
    this.scene.add.existing(this);

    this.x = x; 
    this.y = y;

    this.lvl = [];
    this.cols = 12; //Columnas totales
    this.fils = 12; //Filas totales 
    this.filIni = 3; //Filas que se instancian al principio. Dependen de la dificultad
    this.height = 50; //Alto bicho
    this.width = 50; //Ancho bicho
    this.freeBeetle = false; //Si hay escarabajo sin engancharse
    
    this.beetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];

    this.isDead = false;

  }

  //Destructora 
  selfDestroy ()
  {
    this.destroy();
  }

  addToMatrix(beetle)
  {
    //console.log(beetle.x);
    // ACOPLAR LANZADO A LVL
    for (let j = 0; j < this.fils; j++)
    {
      for (let i = 0; i < this.cols; i++) 
      {
        if (beetle.y <= this.lvl[j][i].y + this.height //Entonces lo pone en j+1
          && beetle.x >= this.lvl[j][i].x
          && beetle.x <= this.lvl[j][i].x + this.lvlwidth 
          && this.lvl[j][i].texture.key != "EmptyBeetle" //Si el de encima esá lleno
          && this.lvl[j+1][i].texture.key == "EmptyBeetle" //Y la posición nueva está vacía
          && this.freeBeetle)
        {
          this.physics.world.enable(this.lvl[j+1][i]);
          this.lvl[j+1][i].body.setImmovable(false); // Se pueden mover
          this.lvl[j+1][i].body.setAllowGravity(true); // Tienen gravedad
          this.lvl[j+1][i].texture.key = "EmptyBeetle";
          //Destruye lo que había antes
          this.lvl[j+1][i].destroy();
          //Añade otro sprite
          this.lvl[j+1][i] = new MatrixBeetle(his.lvl[j+1][i].x, this.lvl[j + 1][i].y, beetle.texture.key).setScale(1.25);
          //                 this.add.sprite(this.lvl[j+1][i].x, this.lvl[j + 1][i].y, this.shootingBeetle.texture.key).setScale(1.25);
          //Destruimos el lanzado
          this.beetle.destroy();
          //Ya no hay escarabajo pululando por ahí, porque está en la matriz
          this.freeBeetle = false;

          /*
          //Creamos el siguiente bicho
          //Randomizamos el color
          const texture = Phaser.Math.RND.between(0, this.beetles.length - 1);
          //Instancia escarabajo   
          this.shootingBeetle = this.physics.add.sprite(this.player.x, this.player.y, this.beetles[texture]).setDepth(5).setScale(1.25);
          //Quitar gravedad 
          this.shootingBeetle.body.setAllowGravity(false);*/

          //Destruir vecinos contiguos
          //this.destroyNeighbour(j+1, i);
        }
      }
    }
  }

  destroyNeighbour(y , x, points)
  {
    let neighbourCount = 1;
    let myBeetle= this.lvl[y][x];
    //Lo que nos vamos a quitar
    let destroyArray = [];
    destroyArray.push(myBeetle);
    //Fila par
    if (y % 2 == 1)
    {
      //Arriba-Dcha
      if ((y-1) > 0 && (x+1) < this.cols && this.lvl[y-1][x + 1].texture.key == myBeetle.texture.key) 
      {    
        neighbourCount++;
        destroyArray.push(this.lvl[y-1][x + 1]);
      }
      //Abajo-Dcha
      if ((y+1) < this.fils && (x+1) < this.cols && this.lvl[y + 1][x + 1].texture.key == myBeetle.texture.key) 
      {    
        neighbourCount++;
        destroyArray.push(this.lvl[y + 1][x + 1]);
      }
    }
    //Fila impar
    else
    {
      //Arriba-Izqd
      if ((y-1) > 0 && (x-1) > 0 && this.lvl[y-1][x - 1].texture.key == myBeetle.texture.key) 
      {    
        neighbourCount++;
        destroyArray.push(this.lvl[y-1][x - 1]);
      }
      //Abajo-Izqd
      if ((y+1) < this.lvlfils && (x-1) > 0 && this.lvl[y + 1][x - 1].texture.key == myBeetle.texture.key) 
      {    
        neighbourCount++;
        destroyArray.push(this.lvl[y+1][x - 1]);
      }
    }

    //Arriba
    if ((y-1) > 0 && this.lvl[y-1][x].texture.key == myBeetle.texture.key) 
    {    
      neighbourCount++;
      destroyArray.push(this.lvl[y-1][x]);
    } 
    //Abajo
    if ((y+1) < this.lvlfils && this.lvl[y+1][x].texture.key == myBeetle.texture.key) 
    {    
      neighbourCount++;
      destroyArray.push(this.lvl[y+1][x]);
    } 
    //Dcha
    if ((x+1) < this.lvlcols && this.lvl[y][x+1].texture.key == myBeetle.texture.key) 
    {    
      neighbourCount++;
      destroyArray.push(this.lvl[y][x+1]);
    } 
    //Izqd
    if ((x-1) > 0 && this.lvl[y][x-1].texture.key == myBeetle.texture.key)
    {    
      neighbourCount++;
      destroyArray.push(this.lvl[y][x-1]);
    }

    //Si hay 3 o mas vecinos de ese color, los destruye
    if (neighbourCount >= 3)
    {
      for (let i = destroyArray.length - 1; i >= 0; i--){
        //Suma puntos --- SON DEL GENERAL, LOS PASAMOS POR REFE
        points += 100; 

        //Que se caigan
        this.physics.world.enable(destroyArray[i]);
        destroyArray[i].body.setImmovable(false); // Se pueden mover
        destroyArray[i].body.setAllowGravity(true); // Tienen gravedad
        destroyArray[i].texture.key = "EmptyBeetle";
        destroyArray[i].destroy(true); //Los destruimos
        //Añadimos el color nuevo - Creo uno nuevo o cómo? No sé...
        destroyArray[i] = this.add.sprite(destroyArray[i].x, destroyArray[i].y, "EmptyBeetle").setDepth(5).setScale(1.25);
      }

    }
}

}
