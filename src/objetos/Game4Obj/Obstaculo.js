export default class Obstaculo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, fragments, orientation) {
        super(scene, x, y, 'obstaculo1');
      
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.offsetRight = {x: 0, y: 0};
        this.offsetLeft = {x: 0, y: 0};
        this.setImmovable(true);
        this.isDead = false;

        this.body.setOffset(this.offsetRight.x, this.offsetLeft.y);
        this.orientation = orientation;

        if (this.orientation === 'vertical') {
            this.setDisplaySize(30, 100); 
        } else {
            this.setDisplaySize(100, 30); 
        }

        this.body.setAllowGravity(false);
        this.fragments = fragments; 
    }


    preUpdate(t, dt) {
        super.preUpdate(t, dt);   
    }

    breakApart() {
        this.setVisible(false); 
        this.body.destroy(); 

        for (let i = 0; i < this.fragments; i++) {
            const fragment = this.scene.add.sprite(
                this.x + Phaser.Math.Between(-10, 10),
                this.y + Phaser.Math.Between(-10, 10),
                'obstaculo2' 
            );

            fragment.setDisplaySize(30, 30); 
            this.scene.physics.world.enable(fragment);

            fragment.body.setAllowGravity(true);
 
            fragment.body.setVelocity(
                Phaser.Math.Between(-100, 100),
                Phaser.Math.Between(-200, 0)
            );
            fragment.body.setCollideWorldBounds(true);
           
            fragment.body.setBounce(0.3); 

            this.scene.physics.add.collider(fragment, this.scene.ground, () => {
                fragment.body.setVelocityX(0); 
                fragment.body.setBounce(0);  
            });

            this.scene.time.delayedCall(4000, () => {
                fragment.destroy();
            });
        }

        this.isDead = true;
        this.destroy();
    }

    checkCollisionWithArrowObs(scene, arrow) 
    {
       
        if (this.isDead) 
        {
            return false;
        }
            arrow.destroy();
            this.isDead = true;
            this.breakApart();


    }
}
