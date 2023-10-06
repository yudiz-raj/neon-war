// You can write more code here
let nBestScore = 0;
/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// body
		const body = this.add.container(0, 0);

		// background
		const background = this.add.image(960, 540, "background");
		background.scaleX = 3;
		background.scaleY = 3;
		background.alpha = 0.5;
		background.alphaTopLeft = 0.5;
		background.alphaTopRight = 0.5;
		background.alphaBottomLeft = 0.5;
		background.alphaBottomRight = 0.5;
		body.add(background);

		// dragArea
		const dragArea = this.add.rectangle(720, 1001, 480, 80);
		dragArea.setOrigin(0, 0);
		body.add(dragArea);

		// container_warArea
		const container_warArea = this.add.container(0, 0);
		body.add(container_warArea);

		// warArea
		const warArea = this.add.rectangle(635, 22, 650, 980);
		warArea.setOrigin(0, 0);
		warArea.isFilled = true;
		warArea.fillColor = 0;
		warArea.fillAlpha = 0.5;
		warArea.isStroked = true;
		warArea.strokeColor = 14324483;
		warArea.lineWidth = 3;
		container_warArea.add(warArea);

		// container_bombGenerator
		const container_bombGenerator = this.add.container(0, 0);
		body.add(container_bombGenerator);

		// container_Bombs
		const container_Bombs = this.add.container(0, 0);
		body.add(container_Bombs);

		// score_Txt
		const score_Txt = this.add.text(664, 75, "", {});
		score_Txt.setOrigin(0, 0.5);
		score_Txt.text = "Score:0";
		score_Txt.setStyle({ "fontSize": "60px" });
		body.add(score_Txt);

		// start_button
		const start_button = this.add.text(960, 1038, "", {});
		start_button.setOrigin(0.5, 0.5);
		start_button.text = "Tap to play";
		start_button.setStyle({ "fontSize": "60px" });
		body.add(start_button);

		this.dragArea = dragArea;
		this.warArea = warArea;
		this.container_warArea = container_warArea;
		this.container_bombGenerator = container_bombGenerator;
		this.container_Bombs = container_Bombs;
		this.score_Txt = score_Txt;
		this.start_button = start_button;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Rectangle} */
	dragArea;
	/** @type {Phaser.GameObjects.Rectangle} */
	warArea;
	/** @type {Phaser.GameObjects.Container} */
	container_warArea;
	/** @type {Phaser.GameObjects.Container} */
	container_bombGenerator;
	/** @type {Phaser.GameObjects.Container} */
	container_Bombs;
	/** @type {Phaser.GameObjects.Text} */
	score_Txt;
	/** @type {Phaser.GameObjects.Text} */
	start_button;

	/* START-USER-CODE */
	// Write more your code here
	setBullet() {
		const bullet = this.bulletGroup.create(this.tankGroup.children.entries[0].x, this.tankGroup.children.entries[0].y, "bullet").setScale(0.1).setVelocityY(-1200);
		bullet.body.setCircle(100, 150, 150);
		bullet.setCollideWorldBounds();
	}
	setTank() {
		this.tank = this.tankGroup.create(720, 811, "tank").setScale(0.9, 0.9);
		this.tank.body.setSize(130, 200);
		this.tank.body.setOffset(190, 255);
	}
	scroll() {
		this.interactiveArea = this.dragArea;
		this.interactiveArea.on("pointerdown", () => {
			this.isPointerDown = true;
			this.interval = setInterval(() => {
				this.setBullet();
			}, 300);
		});
		this.input.on("pointerup", () => {
			this.isPointerDown = false;
			clearInterval(this.interval);
		});
		this.interactiveArea.on("pointermove", (pointer) => {
			if (this.isPointerDown) {
				this.tank.x = pointer.x;
			}
		});
	}
	create() {
		this.editorCreate();
		this.nScore = 0;
		this.nLevelCount = 1;
		this.oLevelManager = new LevelManager(this);
		this.oTweenManager = new TweenManager(this);
		this.bulletGroup = this.physics.add.group();
		this.bombGroup = this.physics.add.group();
		this.tankGroup = this.physics.add.group();
		this.physics.world.setBounds(635, 22, 650, 980);
		this.scroll();
		this.start_button.setInteractive().on("pointerdown", () => {
			this.start_button.setVisible(false);
			this.start_button.disableInteractive();
			this.interactiveArea.setInteractive();
			this.setTank();
			let nNumberofBombs = Object.keys(this.oLevelManager.aLevel[this.nLevelCount - 1].oBombs).length;
			let bombsData = this.oLevelManager.aLevel[this.nLevelCount - 1].oBombs;
			setTimeout(() => {
				this.setBombGenerator(nNumberofBombs, bombsData, 1);
			}, 1000);
		})
		this.physics.add.collider(this.bulletGroup, this.bombGroup, (bullet, bomb) => {
			this.nScore += 2;
			this.score_Txt.setText("Score:" + this.nScore);
			const popUpText = this.add.text(bomb.x, bomb.y + 20, "+2", { "fontSize": 60 }).setOrigin(0.5, 0).setAngle(-10);
			this.oTweenManager.popUpAnimation(popUpText);
			bullet.destroy();
			switch (bomb.texture.key) {
				case "ball_1":
					bomb.destroy();
					break;
				case "ball_2":
					this.controlBombVelocity(bomb);
					bomb.setTexture("ball_1");
					break;
				case "ball_3":
					this.controlBombVelocity(bomb);
					bomb.setTexture("ball_1");
					break;
				case "ball_4":
					this.controlBombVelocity(bomb);
					bomb.setTexture("ball_2");
					break;
				case "ball_5":
					this.controlBombVelocity(bomb);
					bomb.setTexture("ball_3");
					break;
				default:
					break;
			}
			if (this.container_Bombs.list.length == 0) {
				this.nLevelCount += 1;
				this.checkForLevel();
			}
		});
		this.physics.add.collider(this.tankGroup, this.bombGroup, (tank, bomb) => {
			clearInterval(this.interval);
			this.container_Bombs.list.forEach((otherBombs) => {
				otherBombs.destroy();

			});
			this.container_bombGenerator.list.forEach((generator) => {
				generator.destroy();
			});
			tank.destroy();
			this.interactiveArea.disableInteractive();
			if (this.nScore > nBestScore) {
				nBestScore = this.nScore;
			}
			let nScore = this.nScore;
			this.cameras.main.shake(800, 0.006);
			this.cameras.main.alpha = 0.5;
			setTimeout(() => {
				this.scene.stop("Level");
				this.scene.start("Result", { nScore, nBestScore });
			}, 800);
		});
	}
	checkForLevel() {
		if (this.nLevelCount <= 4) {
			let nNumberofBombs = Object.keys(this.oLevelManager.aLevel[this.nLevelCount - 1].oBombs).length;
			let bombsData = this.oLevelManager.aLevel[this.nLevelCount - 1].oBombs;
			this.setBombGenerator(nNumberofBombs, bombsData, 1);
		} else {
			clearInterval(this.interval);
			this.container_Bombs.list.forEach((otherBombs) => {
				otherBombs.destroy();

			});
			this.container_bombGenerator.list.forEach((generator) => {
				generator.destroy();
			});
			if (this.nScore > nBestScore) {
				nBestScore = this.nScore;
			}
			let nScore = this.nScore;
			this.scene.stop("Level");
			this.scene.start("Result", { nScore, nBestScore });
		}
	}
	setBombGenerator(nNumberofBombs, bombsData, i) {
		const nRandomX = Math.floor(Math.random() * (1215 - 705)) + 705;
		const nRandomY = Math.floor(Math.random() * (407 - 115)) + 115;
		const generator = this.add.image(nRandomX, nRandomY, "bullet").setScale(0.5, 0.5);
		generator.tintFill = true;
		generator.setTintFill(2894892);
		this.container_bombGenerator.add(generator);
		this.setBombs(nNumberofBombs, bombsData, generator, i);
	}
	setBombs(nNumberofBombs, bombsData, generator, i) {

		let bomb = this.add.image(generator.x, generator.y, bombsData[`bomb_${i - 1}`].texture).setScale(2, 2);
		this.container_Bombs.add(bomb);
		this.oTweenManager.bombAnimation(bomb, generator, this.tank);
		i++;
		i <= nNumberofBombs ?
			this.setBombs(nNumberofBombs, bombsData, generator, i) :
			setTimeout(() => { generator.destroy(); }, 500);
	}
	controlBombVelocity(bomb) {
		if (bomb.body.velocity.x < 0) {
			bomb.body.velocity.x = -150;
		}
		if (bomb.body.velocity.x > 0) {
			bomb.body.velocity.x = 150;
		}
		if (bomb.body.velocity.y < 0) {
			bomb.body.velocity.y += 300;
		}
		if (bomb.body.velocity.x > 0) {
			bomb.body.velocity.y -= 300;
		}
	}
	update() {
		if (this.bulletGroup.children.entries.length > 0) {
			this.bulletGroup.children.entries.forEach((bullet) => {
				if (!bullet.body.blocked.none) {
					bullet.destroy();
				}
			});
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
