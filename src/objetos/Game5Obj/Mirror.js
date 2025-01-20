import Void from './Void.js';

export default class Mirror extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, entryDirection1, entryDirection2) {
        super(scene, x, y, 'EspejoTablero');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.currMirrors = scene.currMirrors + 1;
        this.setOrigin(0.5, 0.5);
        // determina las direciones validas en las que puede entrar el laser y la direcciones en las que deve salir
        this.entryDirection1 = entryDirection1;
        this.entryDirection2 = entryDirection2;
        this.exitDirection1 = this.getContraryDirection(entryDirection1);
        this.exitDirection2 = this.getContraryDirection(entryDirection2);

        this.setImmovable(true);
        this.body.allowGravity = false;

        this.createButtons(scene);
    }

    createButtons(scene) { // botones principales para el manejo del espejo
        const buttonOffset = 30;

        // botón para rotar el espejo
        this.rotateButton = scene.add.sprite(this.x, this.y - buttonOffset, 'BotonRotar')
        this.rotateButton.setInteractive();
        this.rotateButton.setVisible(false);
        this.rotateButton.setScale(0.6);

        this.rotateButton.on('pointerdown', () => { // aquí rota el espejo 
            this.rotateMirror();
        });
        this.rotateButton.on('pointerover', () => {
            this.rotateButton.setVisible(true);
        });

        // botón para eliminar el espejo
        this.deleteButton = scene.add.sprite(this.x, this.y + buttonOffset, 'BotonEliminar')
        this.deleteButton.setInteractive();
        this.deleteButton.setVisible(false);
        this.deleteButton.setScale(0.6);

        this.deleteButton.on('pointerdown', () => { // aquí borra el espejo
            this.createVoid(scene);
        });
        this.deleteButton.on('pointerover', () => {
            this.deleteButton.setVisible(true);
        });

        this.setInteractive();
        this.on('pointerover', () => {
            this.rotateButton.setVisible(true);
            this.deleteButton.setVisible(true);
            this.setTint(0xdddddd);
        });
        this.on('pointerout', () => {
            this.rotateButton.setVisible(false);
            this.deleteButton.setVisible(false);
            this.clearTint();
        });
    }

    createVoid(scene) { // cunado un espejo es eliminado genera un vacio en el tablero
        scene.currMirrors = scene.currMirrors - 1;
        const v = new Void(scene, this.x, this.y, scene.tileSize);
        scene.voids.push(v);
        if (this.rotateButton) {
            this.rotateButton.destroy();
        }
        if (this.deleteButton) {
            this.deleteButton.destroy();
        }
        this.destroy();
    }

    rotateMirror(){ // rota el espejo hacia la derecha 90 grados
        this.angle += 90;
        this.entryDirection1 = this.rotateDir(this.entryDirection1);
        this.entryDirection2 = this.rotateDir(this.entryDirection2);
        this.exitDirection1 = this.getContraryDirection(this.entryDirection1);
        this.exitDirection2 = this.getContraryDirection(this.entryDirection2);
    }

    rotateDir(dir){
        switch (dir) {
            case 'up':
                return 'right';
            case 'down':
                return 'left';
            case 'left':
                return 'up';
            case 'right':
                return 'down';
            default:
                return null;
        }
    }

    changeLaserDirection(laser) { // comprueba si el laser puede cambiar de dirección
        if (laser.direction == this.entryDirection1 && this.canChange(laser)) {
            laser.setDirection(this.exitDirection2);
            laser.setPosition(this.x, this.y);
        } else if (laser.direction == this.entryDirection2 && this.canChange(laser)) {
            laser.setDirection(this.exitDirection1);
            laser.setPosition(this.x, this.y);
        }
    }

    getContraryDirection(dir) { // devuelve la dirección contraria
        switch (dir) {
            case 'up':
                return 'down';
            case 'down':
                return 'up';
            case 'left':
                return 'right';
            case 'right':
                return 'left';
            default:
                return null;
        }
    }

    canChange(laser){ // es para saber si el laser ha pasado el centro del espejo
        if (laser.direction == 'up'){
            return laser.y <= this.y;
        }
        else if (laser.direction == 'down'){
            return laser.y >= this.y;
        }
        else if (laser.direction == 'right'){
            return laser.x >= this.x;
        }
        else if (laser.direction == 'left'){
            return laser.x <= this.x;
        }
        else{
            return false;
        }
    }
}
