import MainMenu from './scenes/MainMenu.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */

let config = {
  width: 1280,              
  height: 720,            
  type: Phaser.AUTO,      
  parent: 'juego',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER, 
    max: {
          width: 1280,
          height: 720
      }
  },
  
  scene: [MainMenu],
  physics: {
    default: 'arcade', 
    arcade: {
      gravity: { y : 500 }, 
      debug: false,
    }
  },
  title: "Introito",
  version: "1.0.0"
}

new Phaser.Game(config);
