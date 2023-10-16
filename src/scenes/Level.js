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
		const background = this.add.image(540, 960, "background");
		body.add(background);

		// whole
		const whole = this.add.image(260, 1406, "whole");
		body.add(whole);

		// container_warArea
		const container_warArea = this.add.container(0, 0);
		body.add(container_warArea);

		// warArea
		const warArea = this.add.rectangle(0, 0, 1080, 1920);
		warArea.setOrigin(0, 0);
		warArea.lineWidth = 3;
		container_warArea.add(warArea);

		// container_bombGenerator
		const container_bombGenerator = this.add.container(0, 0);
		body.add(container_bombGenerator);

		// container_Bombs
		const container_Bombs = this.add.container(0, 0);
		body.add(container_Bombs);

		// container_tank
		const container_tank = this.add.container(0, 4);
		body.add(container_tank);

		// score_Txt
		const score_Txt = this.add.text(413.5, 75, "", {});
		score_Txt.setOrigin(0, 0.5);
		score_Txt.text = "Score:0";
		score_Txt.setStyle({ "fontSize": "60px" });
		body.add(score_Txt);

		// start_button
		const start_button = this.add.text(540, 1810, "", {});
		start_button.setOrigin(0.5, 0.5);
		start_button.text = "Tap to play";
		start_button.setStyle({ "fontSize": "60px" });
		body.add(start_button);

		this.warArea = warArea;
		this.container_warArea = container_warArea;
		this.container_bombGenerator = container_bombGenerator;
		this.container_Bombs = container_Bombs;
		this.container_tank = container_tank;
		this.score_Txt = score_Txt;
		this.start_button = start_button;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Rectangle} */
	warArea;
	/** @type {Phaser.GameObjects.Container} */
	container_warArea;
	/** @type {Phaser.GameObjects.Container} */
	container_bombGenerator;
	/** @type {Phaser.GameObjects.Container} */
	container_Bombs;
	/** @type {Phaser.GameObjects.Container} */
	container_tank;
	/** @type {Phaser.GameObjects.Text} */
	score_Txt;
	/** @type {Phaser.GameObjects.Text} */
	start_button;

	/* START-USER-CODE */
	// Write more your code here
	setBullet() {
		const bullet = this.bulletGroup.create(this.tank.x, this.tank.y - 130, "fire-1").setVelocityY(-1500);
		bullet.body.setCircle(17, 20, 20);
		bullet.setCollideWorldBounds();
		bullet.anims.play('fireAnimation', true);
	}
	setTank() {
		this.tank = this.tankGroup.create(540, 1770, "tank");
		this.tank.body.setSize(230, 250);
		this.tank.body.setOffset(20, 20);
		this.container_tank.add(this.tank);
	}
	scroll() {
		this.tank.setInteractive();
		this.input.setDraggable(this.tank);
		this.input.on("dragstart", () => {
			this.interval = setInterval(() => {
				this.setBullet();
			}, 250);
		});
		this.input.on('drag', (pointer, gameObject, dragX) => {
			gameObject.x = dragX;
			gameObject.x = Math.min(Math.max(172, this.tank.x), 890);
		});
		this.input.on("dragend", () => {
			clearInterval(this.interval);
		});
	}
	create() {
		this.editorCreate();
		this.nScore = 0;
		this.nLevelCount = 1;
		localStorage.setItem('currentScore', 0);
		this.oLevelManager = new LevelManager(this);
		this.oTweenManager = new TweenManager(this);
		this.bombGroup = this.physics.add.group();
		this.tankGroup = this.physics.add.group();
		this.bulletGroup = this.physics.add.group();
		this.start_button.setInteractive().on("pointerdown", () => {
			this.start_button.setVisible(false);
			this.start_button.disableInteractive();
			this.setTank();
			this.scroll();
			let nNumberofBombs = Object.keys(this.oLevelManager.aLevel[this.nLevelCount - 1].oBombs).length;
			let bombsData = this.oLevelManager.aLevel[this.nLevelCount - 1].oBombs;
			setTimeout(() => {
				this.setBombGenerator(nNumberofBombs, bombsData, 1);
			}, 1000);
		})
		this.physics.add.collider(this.bulletGroup, this.bombGroup, (bullet, bomb) => {
			bullet.anims.play('blastAnimation', true).once('animationcomplete', () => {
				setTimeout(() => {
					bullet.destroy();
				}, 200);
			});
			switch (bomb.texture.key) {
				case "bomb-1":
					this.nScore += 2;
					bomb.destroy();
					break;
				case "bomb-2":
					this.nScore += 5;
					this.controlBombVelocity(bomb);
					bomb.setTexture("bomb-1");
					bomb.body.setCircle(60, 50, 30);
					break;
				case "bomb-3":
					this.nScore += 5;
					this.controlBombVelocity(bomb);
					bomb.setTexture("bomb-1");
					bomb.body.setCircle(60, 50, 30);
					break;
				case "bomb-4":
					this.nScore += 5;
					this.controlBombVelocity(bomb);
					bomb.setTexture("bomb-3");
					bomb.body.setCircle(80, 70, 45);
					break;
				case "bomb-5":
					this.nScore += 5;
					this.controlBombVelocity(bomb);
					bomb.setTexture("bomb-4");
					bomb.body.setCircle(85, 45, 25);
					break;
				default:
					break;
			}
			this.score_Txt.setText("Score:" + this.nScore);
			const popUpText = this.add.text(bomb.x, bomb.y + 20, `${this.nScore - Number(localStorage.getItem('currentScore'))}`, { "fontSize": 60 }).setOrigin(0.5, 0).setAngle(-10);
			this.oTweenManager.popUpAnimation(popUpText);
			localStorage.setItem('currentScore', this.nScore);
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
			Number(localStorage.getItem("bestScore")) <= Number(this.nScore) ?
				localStorage.setItem("bestScore", Number(this.nScore)) :
				localStorage.setItem("bestScore", Number(localStorage.getItem("bestScore")));
			this.cameras.main.shake(800, 0.006);
			setTimeout(() => {
				this.scene.stop("Level");
				this.scene.start("Result");
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
		const nRandomX = Math.floor(Math.random() * (984 - 112)) + 112;
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
