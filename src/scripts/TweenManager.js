class TweenManager {
    constructor(oScene) {
        this.oScene = oScene;
    }
    bombAnimation(bomb) {
        this.oScene.tweens.add({
            targets: bomb,
            scaleX: 1,
            scaleY: 1,
            ease: "Power2",
            duration: 10,
            onComplete: () => {
                this.oScene.bombGroup.add(bomb);
                switch (bomb.texture.key) {
                    case "bomb-1":
                        bomb.body.setCircle(60, 50, 30);
                        break;
                    case "bomb-2":
                        bomb.body.setCircle(70, 20, 15);
                        break;
                    case "bomb-3":
                        bomb.body.setCircle(80, 70, 45);
                        break;
                    case "bomb-4":
                        bomb.body.setCircle(85, 45, 25);
                        break;
                    case "bomb-5":
                        bomb.body.setCircle(100, 45, 25);
                        break;
                    default:
                        break;
                }
                bomb.body.setCollideWorldBounds();
                bomb.body.setGravityY(2000);
                const nRandomVelocity = Math.floor(Math.random() * (500 - (-500))) + (-500);
                bomb.body.setVelocity(nRandomVelocity, -500);
                bomb.body.setBounce(1);
            }
        });
    }
    instructionAnimation() {
        this.instructionTween = this.oScene.tweens.add({
            targets: this.oScene.instruction_text,
            scale: 1.05,
            ease: "power2",
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }
    popUpAnimation(target) {
        this.oScene.tweens.add({
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
    opacityAnimation() {
        this.oScene.tweens.add({
            targets: this.oScene.container_Bombs.list,
            alpha: 0,
            duration: 2000,
        })
    }
}