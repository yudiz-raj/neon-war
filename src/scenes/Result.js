
// You can write more code here

/* START OF COMPILED CODE */

class Result extends Phaser.Scene {

	constructor() {
		super("Result");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.image(960, 540, "background");
		background.scaleX = 3;
		background.scaleY = 3;
		background.alpha = 0.5;
		background.alphaTopLeft = 0.5;
		background.alphaTopRight = 0.5;
		background.alphaBottomLeft = 0.5;
		background.alphaBottomRight = 0.5;

		// warArea
		const warArea = this.add.rectangle(635, 22, 650, 980);
		warArea.setOrigin(0, 0);
		warArea.isFilled = true;
		warArea.fillColor = 0;
		warArea.fillAlpha = 0.5;
		warArea.isStroked = true;
		warArea.strokeColor = 14324483;
		warArea.lineWidth = 3;

		// tank
		const tank = this.add.image(960, 810, "tank");
		tank.scaleX = 0.9;
		tank.scaleY = 0.9;

		// replay_button
		const replay_button = this.add.text(960, 1038, "", {});
		replay_button.setOrigin(0.5, 0.5);
		replay_button.text = "Replay";
		replay_button.setStyle({ "fontSize": "60px" });

		this.warArea = warArea;
		this.replay_button = replay_button;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Rectangle} */
	warArea;
	/** @type {Phaser.GameObjects.Text} */
	replay_button;

	/* START-USER-CODE */

	// Write your code here
	init(score){
		this.score = score;
		console.table(this.score);
	}

	create() {

		this.editorCreate();
		// this.cameras.main.shake(500, 0.01);
		this.replay_button.setInteractive().on("pointerdown", ()=>{
			this.scene.stop("Result");
			this.scene.start("Level");
		})

		this.add.text(960, 450, `Score: ${this.score.nScore}`, { "fontSize": "60px" }).setOrigin(0.5, 0.5);
		this.add.text(960, 540, `Best Score: ${this.score.nBestScore}`, { "fontSize": "60px" }).setOrigin(0.5, 0.5);

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
