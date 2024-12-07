import Arrow from '../Game4Obj/Arrow.js';

export default class ExplosiveArrow extends Arrow {
    constructor(scene, x, y) {
        super(scene, x, y, 'arrow4'); 
        this.type = 'explosive';
        this.scene = scene;
    }

    
    handleCollision(obstacle) {
      
        this.body.setVelocity(0);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        obstacle.body.setVelocity(0);

        this.explode()
      
    }

 
    explode() {
        const explosionRadius = 120; 
        
        const obstaclesToDestroy = this.scene.obstaclePool.filter(obstacle => {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, obstacle.x, obstacle.y);
            return distance <= explosionRadius && !obstacle.isDead;
        });

        console.log(obstaclesToDestroy)

      

        this.scene.time.delayedCall(2000, () => {
            obstaclesToDestroy.forEach(obstacle => {
                obstacle.breakApart();
            });
            this.destroy();
        });

        // const explosion = this.scene.add.sprite(this.x, this.y, 'explosion');
        // explosion.play('explodeAnimation'); // Define esta animación en tu preload
        // explosion.once('animationcomplete', () => {
        //     explosion.destroy();
        // });

      
    }
}
