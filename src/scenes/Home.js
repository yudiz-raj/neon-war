
// You can write more code here

/* START OF COMPILED CODE */

class Home extends Phaser.Scene {

	constructor() {
		super("Home");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.image(540, 960, "background");

		// container_bombs
		const container_bombs = this.add.container(0, 0);

		// logo
		const logo = new LogoPrefab(this, 540, 473);
		this.add.existing(logo);
		logo.alpha = 1;

		// play_button
		const play_button = this.add.image(540, 1498, "play-button");
		play_button.name = "play_button";
		play_button.setInteractive(this.input.makePixelPerfect());

		// music_button
		const music_button = this.add.image(102, 104, "music-on");
		music_button.name = "music_button";

		// sound_button
		const sound_button = this.add.image(978, 104, "sound-on");
		sound_button.name = "sound_button";

		this.background = background;
		this.container_bombs = container_bombs;
		this.logo = logo;
		this.play_button = play_button;
		this.music_button = music_button;
		this.sound_button = sound_button;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	background;
	/** @type {Phaser.GameObjects.Container} */
	container_bombs;
	/** @type {LogoPrefab} */
	logo;
	/** @type {Phaser.GameObjects.Image} */
	play_button;
	/** @type {Phaser.GameObjects.Image} */
	music_button;
	/** @type {Phaser.GameObjects.Image} */
	sound_button;

	/* START-USER-CODE */

	// Write your code here
	setAudio() {
		const isMusicOn = (flag) => {
			flag ? this.music_button.setTexture("music-on") : this.music_button.setTexture("music-off");
			localStorage.setItem("isSteelClashMusicOn", flag);
			this.oSoundManager.backgroundMusic.setMute(!flag);
			this.oSoundManager.playSound(this.oSoundManager.backgroundMusic, true);
		}
		const isSoundOn = (flag) => {
			flag ? this.sound_button.setTexture("sound-on") : this.sound_button.setTexture("sound-off");
			localStorage.setItem('isSteelClashSoundOn', flag);
			this.oSoundManager.clickSound.setMute(!flag);
			this.oSoundManager.bombBlastSound.setMute(!flag);
			this.oSoundManager.shotSound.setMute(!flag);
			this.oSoundManager.tankBlastSound.setMute(!flag);
		}
		this.sound_button.setInteractive().on('pointerdown', () => {
			this.oSoundManager.playSound(this.oSoundManager.clickSound, false);
			isSoundOn(!JSON.parse(localStorage.getItem("isSteelClashSoundOn")));
		});
		this.music_button.setInteractive().on('pointerdown', () => {
			this.oSoundManager.playSound(this.oSoundManager.clickSound, false);
			isMusicOn(!JSON.parse(localStorage.getItem("isSteelClashMusicOn")));
		});
		isMusicOn(JSON.parse(localStorage.getItem("isSteelClashMusicOn")));
		isSoundOn(JSON.parse(localStorage.getItem("isSteelClashSoundOn")));
	}
	create() {

		this.editorCreate();
		this.oInputManager = new InputManager(this);
		this.oTweenManager = new TweenManager(this);
		this.oSoundManager = new SoundManager(this);

		this.tankCamera = this.cameras.add(0, 0, this.sys.game.config.width, this.sys.game.config.height);
		this.tankCamera.ignore([this.play_button, this.sound_button, this.music_button, this.container_bombs, this.background]);

		this.setAudio();
		localStorage.setItem('steelClashBestScore', localStorage.getItem('steelClashBestScore') == undefined ? 0 : localStorage.getItem('steelClashBestScore'));
		this.logo.game_title.setTexture("game-title");
		const bomb = this.add.sprite(1150, -52, "fire-1");
		bomb.angle = -135;
		this.container_bombs.add(bomb);
		this.oTweenManager.blastAnimation(bomb);
		this.oInputManager.buttonClick(this.play_button);
		this.oInputManager.buttonClick(this.music_button);
		this.oInputManager.buttonClick(this.music_button);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
