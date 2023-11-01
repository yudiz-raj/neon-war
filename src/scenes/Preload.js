
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.add.image(540, 960, "background");

		// outerBar
		this.add.image(540, 1498, "loading-case");

		// innerBar
		const innerBar = this.add.image(245, 1518, "load");
		innerBar.setOrigin(0, 0.5);

		// load_bomb
		const load_bomb = this.add.image(270, 1509, "load-bomb");

		// logo
		const logo = new LogoPrefab(this, 540, 473);
		this.add.existing(logo);
		logo.alpha = 1;

		// bomb
		const bomb = this.add.sprite(525, 2034, "fire-1");
		bomb.angle = 10;

		// bomb_1
		const bomb_1 = this.add.sprite(531.1997560279415, 2032.0388312772975, "fire-1");
		bomb_1.angle = -10;

		this.innerBar = innerBar;
		this.load_bomb = load_bomb;
		this.logo = logo;
		this.bomb = bomb;
		this.bomb_1 = bomb_1;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	innerBar;
	/** @type {Phaser.GameObjects.Image} */
	load_bomb;
	/** @type {LogoPrefab} */
	logo;
	/** @type {Phaser.GameObjects.Sprite} */
	bomb;
	/** @type {Phaser.GameObjects.Sprite} */
	bomb_1;

	/* START-USER-CODE */

	// Write your code here
	bombAnimation(bomb, X, Y) {
		bomb.anims.play("fireAnimation", true);
		this.tweens.add({
			targets: bomb,
			x: X,
			y: Y,
			duration: 1000,
			onComplete: () => {
				bomb.anims.play("blastAnimation", true).once('animationcomplete', () => {
					this.logo.game_title.setTexture("game-title");
					setTimeout(() => {
						bomb.destroy();
					}, 100);
				});
			}
		});
	}

	preload() {

		this.editorCreate();

		this.editorPreload();
		this.bombAnimation(this.bomb, 696, 627);
		this.bombAnimation(this.bomb_1, 215, 614);
		this.isGameLoaded1 = false;
		this.isGameLoaded2 = false;
		this.load.on(Phaser.Loader.Events.COMPLETE, (p) => {
			this.isGameLoaded1 = true;
		});

		this.innerBarWidth = this.innerBar.displayWidth;

		this.maskGraphics = this.make.graphics();
		this.maskGraphics.fillStyle(0xffffff);
		this.maskGraphics.fillRect(
			this.innerBar.x,
			this.innerBar.y - this.innerBar.displayHeight / 2,
			this.innerBar.displayWidth,
			this.innerBar.displayHeight
		);

		this.innerBar.setMask(this.maskGraphics.createGeometryMask());
		const loadingDuration = 3000;
		const intervalDuration = 30;
		const numIntervals = loadingDuration / intervalDuration;
		let currentInterval = 0;
		const progressIncrement = 1 / numIntervals;

		const updateProgressBar = () => {
			this.innerBar.setVisible(true);
			const currentProgress = currentInterval * progressIncrement;
			this.maskGraphics.clear();
			this.maskGraphics.fillStyle(0xffffff);
			this.maskGraphics.fillRect(
				this.innerBar.x,
				this.innerBar.y - this.innerBar.displayHeight / 2,
				this.innerBarWidth * currentProgress,
				this.innerBar.displayHeight
			);
			this.load_bomb.x = this.innerBar.x + (this.innerBarWidth * currentProgress) - (this.load_bomb.displayWidth / 5);
			currentInterval++;
			if (currentProgress >= 1.07) {
				clearInterval(progressInterval);
				this.isGameLoaded2 = true;
			}
		};
		const progressInterval = setInterval(updateProgressBar, intervalDuration);
	}
	update() {
		if (this.isGameLoaded1 && this.isGameLoaded2) {
			this.scene.stop("Preload");
			this.scene.start("Home");
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
