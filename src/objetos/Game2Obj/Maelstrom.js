export default class Maelstrom{
    constructor(scene){ // Ponerle tambien obsGen aqui.
        this.scene = scene;
        //this.obstacleGenerator = obstacleGenerator;

        // ---MAELSTROM---.
        // NOTA (A FUTURO): al principio la pondremos en el centro, pero luego habrá que ponerlo donde (this.obstacleGenerator.x, this.obstacleGenerator.y) para que aparezca en esa ubi.
        // this.maelstrom = this.scene.physics.add.image(this.obstacleGenerator.x, this.obstacleGenerator.y, 'maelstrom') 

        this.maelstrom = this.scene.physics.add.image(this.scene.cameras.main.centerX + 200, this.scene.cameras.main.centerY +250, 'maelstrom').setScale(0.2);
        //this.scene.add.existing(this);
        //this.scene.physics.world.enable(this);
        this.maelstrom.body.setAllowGravity(false); // quita la gravedá.
    }

    
}