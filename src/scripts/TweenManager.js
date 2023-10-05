class TweenManager {
    constructor(oScene) {
        this.oScene = oScene;
    }
    bombAnimation(bomb, generator, tank) {
        this.oScene.add.tween({
            targets: bomb,
            scaleX: 1,
            scaleY: 1,
            ease: "Power2",
            duration: 10,
            onComplete: () => {
                this.oScene.bombGroup.add(bomb);
                bomb.body.setCircle(20, 12, 12);
                bomb.body.setCollideWorldBounds();
                bomb.body.setGravityY(1000);
                tank.x <= 960 ? bomb.body.setVelocity(-200, -200) : bomb.body.setVelocity(200, -200);
                bomb.body.setBounce(1);
            }
        });
    }
    popUpAnimation(target) {
        this.oScene.add.tween({
            targets: target,
            angle: +10,
            y: +50,
            alpha: -0.5,
            duration: 1000,
            onComplete: () => {
                target.destroy();
            }
        });
    }
}