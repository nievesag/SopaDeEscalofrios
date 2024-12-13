import MainMenu from './scenes/MainMenu.js';
import Boot from './scenes/Boot.js';
import GameSelectorMenu from './scenes/GameSelectorMenu.js';
import Game1 from './scenes/Game1.js';
import Game2 from './scenes/Game2.js';
import Game3 from './scenes/Game3.js';
import Game4 from './scenes/Game4.js';
import Game5 from './scenes/Game5.js';
import EndMenu from './scenes/EndMenu.js';
import LogrosMenu from './scenes/LogrosMenu.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */

let config = {     
  parent: 'phaser-game',  
  type: Phaser.AUTO,      

  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
     
    mode: Phaser.Scale.FIT,  
    max: {
      width: 1280,   
      height: 720, 
    }
     
  },
  
  scene: [Boot, MainMenu, GameSelectorMenu, Game1, Game2, Game3, Game4, Game5, EndMenu, LogrosMenu],
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
