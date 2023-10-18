
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

		// body
		const body = this.add.container(0, 0);

		// background
		const background = this.add.image(540, 963, "background");
		body.add(background);

		// tank
		const tank = this.add.image(650, 1770, "tank");
		body.add(tank);

		// score_Txt
		const score_Txt = this.add.text(540, 184, "", {});
		score_Txt.setOrigin(0.5, 0.5);
		score_Txt.alpha = 0.54;
		score_Txt.alphaTopLeft = 0.54;
		score_Txt.alphaTopRight = 0.54;
		score_Txt.alphaBottomLeft = 0.54;
		score_Txt.alphaBottomRight = 0.54;
		score_Txt.text = "0";
		score_Txt.setStyle({ "color": "#422D0E", "fontFamily": "Score", "fontSize": "250px" });
		body.add(score_Txt);

		// fire_7
		const fire_7 = this.add.image(650, 372, "fire-7");
		body.add(fire_7);

		// fire_1
		const fire_1 = this.add.image(650, 1601, "fire-1");
		body.add(fire_1);

		// fire_2
		const fire_2 = this.add.image(650, 1474, "fire-2");
		body.add(fire_2);

		// fire_3
		const fire_3 = this.add.image(650, 1296, "fire-3");
		body.add(fire_3);

		// bomb_2
		const bomb_2 = this.add.image(861, 638, "bomb-2");
		body.add(bomb_2);

		// bomb_4
		const bomb_4 = this.add.image(307, 1284, "bomb-4");
		body.add(bomb_4);

		// black_layer
		const black_layer = this.add.image(540, 960, "black-layer");
		body.add(black_layer);

		// game_over_board
		const game_over_board = this.add.image(540, 960, "game-over-board");
		body.add(game_over_board);

		// replay_button
		const replay_button = this.add.image(540, 1419, "replay-button");
		body.add(replay_button);

		// currentScore
		const currentScore = this.add.text(540, 986, "", {});
		currentScore.setOrigin(0.5, 0.5);
		currentScore.text = "0";
		currentScore.setStyle({ "color": "#FFE633", "fontFamily": "Score", "fontSize": "80px", "stroke": "#662205 ", "strokeThickness":2});
		body.add(currentScore);

		// bestScore
		const bestScore = this.add.text(540, 1169, "", {});
		bestScore.setOrigin(0.5, 0.5);
		bestScore.text = "0";
		bestScore.setStyle({ "color": "#FFE633", "fontFamily": "Score", "fontSize": "80px", "stroke": "#662205 ", "strokeThickness":2});
		body.add(bestScore);

		this.score_Txt = score_Txt;
		this.replay_button = replay_button;
		this.currentScore = currentScore;
		this.bestScore = bestScore;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	score_Txt;
	/** @type {Phaser.GameObjects.Image} */
	replay_button;
	/** @type {Phaser.GameObjects.Text} */
	currentScore;
	/** @type {Phaser.GameObjects.Text} */
	bestScore;

	/* START-USER-CODE */

	// Write your code here
	create() {
		this.editorCreate();

		this.score_Txt.setText(Number(localStorage.getItem("currentScore")));
		this.currentScore.setText(Number(localStorage.getItem("currentScore")));
		this.bestScore.setText(Number(localStorage.getItem('steelClashBestScore')));
		this.replay_button.on("pointerover", () => {
			this.input.setDefaultCursor("pointer");
			this.replay_button.setScale(1.05, 1.05);
		});
		this.replay_button.on("pointerout", () => {
			this.input.setDefaultCursor("default");
			this.replay_button.setScale(1, 1);
		});
		this.replay_button.setInteractive().on("pointerdown", () => {
			this.input.setDefaultCursor("default");
			this.replay_button.setScale(0.7, 0.7);
			this.scene.stop("Result");
			this.scene.start("Level");
		});
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
