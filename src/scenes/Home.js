
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
		this.add.image(540, 960, "background");

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

		this.container_bombs = container_bombs;
		this.logo = logo;
		this.play_button = play_button;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	container_bombs;
	/** @type {LogoPrefab} */
	logo;
	/** @type {Phaser.GameObjects.Image} */
	play_button;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.oInputManager = new InputManager(this);
		this.oTweenManager = new TweenManager(this);
		localStorage.setItem('steelClashBestScore', localStorage.getItem('steelClashBestScore') == undefined ? 0 : localStorage.getItem('steelClashBestScore'));
		this.logo.game_title.setTexture("game-title");
		const bomb = this.add.sprite(1150, -52, "fire-1");
		bomb.angle = -135;
		this.container_bombs.add(bomb);
		this.blastAnimation(bomb);
		this.oInputManager.buttonClick(this.play_button);
	}
	blastAnimation(target) {
		let targetX = target.x;
		let angle = target.angle;
		target.x == 1150 ? targetX = -121 : targetX = 1150;
		target.anims.play("fireAnimation", true);
		this.tweens.add({
			targets: target,
			x: 551,
			y: 471,
			duration: 1000,
			delay: 1000,
			onComplete: () => {
				target.setScale(1.5);
				target.anims.play("blastAnimation", true).once('animationcomplete', () => {
					setTimeout(() => {
						target.destroy();
					}, 1000);
					const bomb = this.add.sprite(targetX, -52, "fire-1");
					bomb.angle = -angle;
					this.container_bombs.add(bomb);
					this.blastAnimation(bomb);
				});
				this.cameras.main.shake(200, 0.002);
			}
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
