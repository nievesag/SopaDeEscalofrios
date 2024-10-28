class Player3 extends Phaser.GameObjects.Sprite
{   constructor (scene, x, y, texture, posX, posY, dir, force)
    {
        super(scene, x, y, texture, dir, force, { key: "Player3" });

        this.scene.add;
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.force = force;

        this.scene.add.existing(this);
        this.isDead = false;

        this.pointer = this.scene.input.activePointer; //input por ratón
        //https://github.com/f0reil/Gorgo-Division/blob/main/src/characters/Player.js
    }


    addedToScene ()
    {
        super.addedToScene();

        //  This Game Object has been added to a Scene
    }

    removedFromScene ()
    {
        super.removedFromScene();

        //  This Game Object has been removed from a Scene
    }
}