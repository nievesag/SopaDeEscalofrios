import MainMenu from './scenes/MainMenu.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */

let config = {     
  parent: 'Juego',  
  type: Phaser.AUTO,      

  scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
     
      mode: Phaser.Scale.FIT,  
      max: {
        width: 1000,   
        height: 550, 
      }
     
  },
  
  scene: [MainMenu],
  // physics: {
  //   default: 'arcade', 
  //   arcade: {
  //     gravity: { y : 500 }, 
  //     debug: false,
  //   }
  // },
  title: "Introito",
  version: "1.0.0"
}

new Phaser.Game(config);
