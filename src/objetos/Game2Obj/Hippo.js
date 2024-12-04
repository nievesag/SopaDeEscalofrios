import Obstacle from '../Game2Obj/Obstacle.js';
export default class Hippo extends Obstacle{
    constructor(scene, x, y){ // Ponerle tambien obsGen aqui.
        super(scene, x, y, 'hippo');
    }
}