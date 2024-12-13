export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        
        this.setImmovable(false);
        this.isDead = false;
       
        this.sprite = sprite;
        if(this.sprite == 'lion')
        {
            this.offsetRight = {x: 50, y: 0};
            this.offsetLeft = {x: 0, y: 20};
            this.body.setSize(150, 150);
            this.setScale(0.4, 0.4);
            this.body.setOffset(this.offsetRight.x, this.offsetLeft.y);
        }
        else if(this.sprite == 'rat')
        {
           
            this.setScale(0.1, 0.1);
        }

        // Desactivar la gravedad
        this.body.setAllowGravity(true);

        this.scene.physics.add.collider(this, this.scene.ground, () => {
            this.body.setVelocityX(0); 
            this.body.setVelocityY(0);
            this.body.setBounce(0);  
        });

    
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);   
    }

    checkCollisionWithArrow(scene, arrow) {
        if (this.isDead) {
            return false;
        }

        // Verifica la colisión con el jugador
        const collision = this.scene.physics.world.collide(this, arrow);

        if (collision) {
            this.scene.enemiesCounter++;
            //arrow.destroy();
            this.isDead = true;
            this.selfDestroy();
        }

        return collision;
    }

    selfDestroy(){
        this.destroy();
    }



    getId() {
        return this.enemyId;
    }
}
