import Movable from './movable.js'

export default class Box extends Movable {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.setScale(0.5,.5);
		this.body.setSize(28, 28); // Para que entre mejor por los pasillos
    }
}