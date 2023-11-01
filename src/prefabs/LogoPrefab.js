
// You can write more code here

/* START OF COMPILED CODE */

class LogoPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// blast
		const blast = scene.add.image(11, -9, "blast");
		blast.visible = false;
		this.add(blast);

		// logo_tank
		const logo_tank = scene.add.image(-32, 132, "logo-tank");
		this.add(logo_tank);

		// game_title
		const game_title = scene.add.image(-1, 172, "game-title-1");
		this.add(game_title);

		// smoke
		const smoke = scene.add.image(-54, 292, "smoke");
		this.add(smoke);

		this.blast = blast;
		this.game_title = game_title;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	blast;
	/** @type {Phaser.GameObjects.Image} */
	game_title;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
