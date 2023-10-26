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
                const nRandomVelocity = Math.floor(Math.random() * (500 - (-500) + 10)) + (-500);
                bomb.body.setVelocity(nRandomVelocity, -500);
                bomb.body.setBounce(1);
            }
        });
    }
    instructionAnimation() {
        this.instructionTween = this.oScene.tweens.add({
            targets: this.oScene.instruction_text,
            scale: 1.08,
            ease: "power2",
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        this.instructionDestroyTween = this.oScene.tweens.add({
            targets: this.oScene.instruction_text,
            alpha: { from: 1, to: 0 },
            ease: "power2",
            duration: 2000,
            onComplete: () => {
                this.instructionTween.stop();
                this.oScene.instruction_text.destroy();
            }
        });
        this.instructionDestroyTween.stop();
    }
    buttonAnimation(target) {
        this.oScene.tweens.add({
            targets: target,
            scale: "-=0.08",
            ease: "power2",
            duration: 200,
            yoyo: true,
            onComplete: () => {
                switch (target.name) {
                    case "home_button":
                        this.oScene.scene.stop("Level");
                        this.oScene.scene.start("Home");
                        break;
                    case "replay_button":
                        this.oScene.scene.restart("Level");
                        break;
                    case "play_button":
                        this.oScene.scene.stop("Home");
                        this.oScene.scene.start("Level");
                        break;
                    default:
                        break;
                }
            }
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