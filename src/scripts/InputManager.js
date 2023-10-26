class InputManager {
    constructor(oScene) {
        this.oScene = oScene;
    }
    buttonClick(button) {
        button.on("pointerover", () => {
            this.oScene.input.setDefaultCursor("pointer");
            button.setScale(button.scale += 0.05);
        });
        button.on("pointerout", () => {
            this.oScene.input.setDefaultCursor("default");
            button.setScale(button.scale -= 0.05);
        });
        button.setInteractive().on("pointerdown", () => {
            this.oScene.input.setDefaultCursor("default");
            this.oScene.oTweenManager.buttonAnimation(button);
        });
    }
}