class TweenManager {
    constructor(oScene) {
        this.oScene = oScene;
    }
    blastAnimation(target) {
        let targetX = target.x;
        let angle = target.angle;
        target.x == 1150 ? targetX = -121 : targetX = 1150;
        target.anims.play("fireAnimation", true);
        this.oScene.tweens.add({
            targets: target,
            x: 551,
            y: 480,
            duration: 1000,
            delay: 1000,
            onComplete: () => {
                target.setScale(1.5);
                this.oScene.oSoundManager.playSound(this.oScene.oSoundManager.bombBlastSound, false);
                this.oScene.tankCamera.shake(200, 0.004);
                target.anims.play("blastAnimation", true).once('animationcomplete', () => {
                    target.destroy();
                    const bomb = this.oScene.add.sprite(targetX, -52, "fire-1");
                    bomb.angle = -angle;
                    this.oScene.container_bombs.add(bomb);
                    this.blastAnimation(bomb);
                });
            }
        });
    }
    bombAnimation(bomb) {
        this.oScene.tweens.add({
            targets: bomb,
            scaleX: 1,
            scaleY: 1,
            ease: "Power2",
            duration: 50,
            onComplete: () => {
                this.oScene.bombGroup.add(bomb);
                switch (bomb.texture.key) {
                    case "bomb-1":
                        bomb.body.setCircle(57, 25, 0);
                        break;
                    case "bomb-2":
                        bomb.body.setCircle(70, 20, 15);
                        break;
                    case "bomb-3":
                        bomb.body.setCircle(80, 30, 0);
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
                const nRandomVelocity = Math.floor(Math.random() * (500 - (-500) + 50)) + (-500);
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
        target.disableInteractive();
        this.oScene.tweens.add({
            targets: target,
            scale: "-=0.08",
            ease: "power2",
            duration: 200,
            yoyo: true,
            onComplete: () => {
                switch (target.name) {
                    case "home_button":
                        this.oScene.oSoundManager.stopSound(this.oScene.oSoundManager.backgroundMusic, false);
                        this.oScene.scene.stop("Level");
                        this.oScene.scene.start("Home");
                        break;
                    case "replay_button":
                        this.oScene.oSoundManager.stopSound(this.oScene.oSoundManager.backgroundMusic, false);
                        this.oScene.scene.restart("Level");
                        break;
                    case "play_button":
                        this.oScene.oSoundManager.stopSound(this.oScene.oSoundManager.backgroundMusic, false);
                        this.oScene.scene.stop("Home");
                        this.oScene.scene.start("Level");
                        break;
                    default:
                        break;
                }
                target.setInteractive();
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