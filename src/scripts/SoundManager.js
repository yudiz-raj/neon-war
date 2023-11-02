class SoundManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.backgroundMusic = this.oScene.sound.add("background-music");
        this.clickSound = this.oScene.sound.add("click-sound").setVolume(0.3);
        this.shotSound = this.oScene.sound.add("shot-sound").setVolume(0.2);
        this.bombBlastSound = this.oScene.sound.add("bombBlast-sound").setVolume(5);
        this.tankBlastSound = this.oScene.sound.add("tankBlast-sound");
    }
    playSound(key, loop) {
        key.play();
        key.loop = loop;
    }
    stopSound(key, loop) {
        key.loop = loop
        key.stop();
    }
}