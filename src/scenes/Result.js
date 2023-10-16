
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
		this.add.image(540, 960, "background");

		// tank
		this.add.image(540, 1770, "tank");

		// black_layer
		this.add.image(540, 960, "black-layer");

		// game_over_board
		this.add.image(540, 960, "game-over-board");

		// replay_button
		const replay_button = this.add.text(540, 1549, "", {});
		replay_button.setOrigin(0.5, 0.5);
		replay_button.text = "Replay";
		replay_button.setStyle({ "fontSize": "60px" });

		this.replay_button = replay_button;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	replay_button;

	/* START-USER-CODE */

	// Write your code here
	create() {
		this.editorCreate();
		// this.cameras.main.shake(500, 0.01);
		this.replay_button.setInteractive().on("pointerdown", () => {
			this.scene.stop("Result");
			this.scene.start("Level");
		})

		this.add.text(540, 985, localStorage.getItem("currentScore"), { "fontSize": "60px" }).setOrigin(0.5, 0.5);
		this.add.text(540, 1170, localStorage.getItem("bestScore"), { "fontSize": "60px" }).setOrigin(0.5, 0.5);

	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
