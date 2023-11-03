// You can write more code here
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

		// container_result
		const container_result = this.add.container(0, 0);
		container_result.visible = false;
		body.add(container_result);

		// black_layer
		const black_layer = this.add.image(540, 960, "black-layer");
		container_result.add(black_layer);

		// game_over_board
		const game_over_board = this.add.image(540, 960, "game-over-board");
		container_result.add(game_over_board);

		// replay_button
		const replay_button = this.add.image(674, 1419, "replay-button");
		replay_button.name = "replay_button";
		replay_button.setInteractive(new Phaser.Geom.Rectangle(5, -5, 305, 145), Phaser.Geom.Rectangle.Contains);
		container_result.add(replay_button);

		// home_button
		const home_button = this.add.image(328, 1422, "home-button");
		home_button.name = "home_button";
		home_button.setInteractive(new Phaser.Geom.Rectangle(5, -5, 100, 100), Phaser.Geom.Rectangle.Contains);
		home_button.scaleX = 1.5;
		home_button.scaleY = 1.5;
		container_result.add(home_button);

		// currentScore
		const currentScore = this.add.text(540, 986, "", {});
		currentScore.setOrigin(0.5, 0.5);
		currentScore.text = "0";
		currentScore.setStyle({ "color": "#FFE633", "fontFamily": "Score", "fontSize": "80px", "stroke": "#662205 ", "strokeThickness": 2 });
		container_result.add(currentScore);

		// bestScore
		const bestScore = this.add.text(540, 1168, "", {});
		bestScore.setOrigin(0.5, 0.5);
		bestScore.text = "0";
		bestScore.setStyle({ "color": "#FFE633", "fontFamily": "Score", "fontSize": "80px", "stroke": "#662205 ", "strokeThickness": 2 });
		container_result.add(bestScore);

		// instruction_text
		const instruction_text = this.add.text(540, 1792, "", {});
		instruction_text.setOrigin(0.5, 0.5);
		instruction_text.text = "TOUCH AND DRAG THE TANK TO MOVE";
		instruction_text.setStyle({ "color": "#FFE633", "fontFamily": "Score", "fontSize": "46px" });
		body.add(instruction_text);

		// music_button
		const music_button = this.add.image(102, 104, "music-on");
		music_button.name = "music_button";
		body.add(music_button);

		// sound_button
		const sound_button = this.add.image(978, 104, "sound-on");
		sound_button.name = "sound_button";
		body.add(sound_button);

		this.warArea = warArea;
		this.container_warArea = container_warArea;
		this.container_bombGenerator = container_bombGenerator;
		this.container_Bombs = container_Bombs;
		this.container_tank = container_tank;
		this.score_Txt = score_Txt;
		this.replay_button = replay_button;
		this.home_button = home_button;
		this.currentScore = currentScore;
		this.bestScore = bestScore;
		this.container_result = container_result;
		this.instruction_text = instruction_text;
		this.music_button = music_button;
		this.sound_button = sound_button;

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
	/** @type {Phaser.GameObjects.Image} */
	replay_button;
	/** @type {Phaser.GameObjects.Image} */
	home_button;
	/** @type {Phaser.GameObjects.Text} */
	currentScore;
	/** @type {Phaser.GameObjects.Text} */
	bestScore;
	/** @type {Phaser.GameObjects.Container} */
	container_result;
	/** @type {Phaser.GameObjects.Text} */
	instruction_text;
	/** @type {Phaser.GameObjects.Image} */
	music_button;
	/** @type {Phaser.GameObjects.Image} */
	sound_button;

	/* START-USER-CODE */
	// Write more your code here
	setBullet() {
		Number(localStorage.getItem('currentScore')) > 18 ? this.nTime = 120 : this.nTime = 250;
		if (Number(localStorage.getItem('currentScore')) < 18) {
			this.nTime = 250;
		}
		if (Number(localStorage.getItem('currentScore')) > 18 && Number(localStorage.getItem('currentScore')) < 50) {
			this.nTime = 190;
		}
		if (Number(localStorage.getItem('currentScore')) > 50 && Number(localStorage.getItem('currentScore')) < 150) {
			this.nTime = 150;
		}
		if (Number(localStorage.getItem('currentScore')) > 150) {
			this.nTime = 120;
		}

		const bullet = this.bulletGroup.create(this.tank.x, this.tank.y - 130, "fire-1").setVelocityY(-1500);
		bullet.body.setCircle(17, 20, 20);
		bullet.setCollideWorldBounds();
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
				this.oSoundManager.playSound(this.oSoundManager.shotSound, false);
				this.setBullet();
			}, this.nTime);
		});
		this.input.on('drag', (pointer, gameObject, dragX) => {
			gameObject.x = dragX;
			gameObject.x = Math.min(Math.max(172, this.tank.x), 890);
		});
		this.input.on("dragend", () => {
			clearInterval(this.interval);
		});
	}
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
		this.nScore = 0;
		this.nLevelCount = 1;
		this.nTime = 250;
		localStorage.setItem('currentScore', 0);

		this.oLevelManager = new LevelManager(this);
		this.oTweenManager = new TweenManager(this);
		this.oInputManager = new InputManager(this);
		this.oSoundManager = new SoundManager(this);

		this.bombGroup = this.physics.add.group();
		this.tankGroup = this.physics.add.group();
		this.bulletGroup = this.physics.add.group();
		this.setTank();
		this.scroll();
		this.setAudio();
		this.oInputManager.buttonClick(this.music_button);
		this.oInputManager.buttonClick(this.music_button);
		let nNumberofBombs = Object.keys(this.oLevelManager.aLevel[this.nLevelCount - 1].oBombs).length;
		let bombsData = this.oLevelManager.aLevel[this.nLevelCount - 1].oBombs;
		this.oTweenManager.instructionAnimation();
		this.input.once("pointerdown", () => {
			setTimeout(() => {
				this.oTweenManager.instructionDestroyTween.play();
				this.setBombGenerator(nNumberofBombs, bombsData, 1);
			}, 700);
		});
		this.physics.add.collider(this.bulletGroup, this.bombGroup, (bullet, bomb) => {
			this.oSoundManager.playSound(this.oSoundManager.bombBlastSound, false);
			bullet.anims.play('blastAnimation', true).once('animationcomplete', () => {
				bullet.destroy();
			});
			switch (bomb.texture.key) {
				case "bomb-1":
					this.nScore += 1;
					bomb.destroy();
					break;
				case "bomb-2":
					this.nScore += 1;
					this.controlBombVelocity(bomb);
					bomb.setTexture("bomb-1");
					bomb.body.setCircle(57, 25, 0);
					break;
				case "bomb-3":
					this.nScore += 3;
					this.controlBombVelocity(bomb);
					bomb.setTexture("bomb-2");
					bomb.body.setCircle(70, 20, 15);
					break;
				case "bomb-4":
					this.nScore += 5;
					this.controlBombVelocity(bomb);
					bomb.setTexture("bomb-3");
					bomb.body.setCircle(80, 30, 0);
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
			this.score_Txt.setText(this.nScore);
			const popUpText = this.add.text(bomb.x, bomb.y + 20, `${this.nScore - Number(localStorage.getItem('currentScore'))}`, { "color": "#4F5B56", "fontSize": 60, "fontFamily": "Score" }).setOrigin(0.5, 0).setAngle(-10);
			this.oTweenManager.popUpAnimation(popUpText);
			localStorage.setItem('currentScore', this.nScore);
			if (this.container_Bombs.list.length == 0) {
				setTimeout(() => {
					this.checkForLevel();
				}, 200);
			}
		});
		this.physics.add.collider(this.tankGroup, this.bombGroup, (tank, bomb) => {
			clearInterval(this.interval);
			bomb.destroy();
			const blastTank = this.add.sprite(tank.x, tank.y, "tank");
			tank.destroy();
			this.oSoundManager.playSound(this.oSoundManager.tankBlastSound, false);
			blastTank.anims.play('blastAnimation', true).once('animationcomplete', () => {
				blastTank.destroy();
			});;
			Number(localStorage.getItem('steelClashBestScore')) <= Number(this.nScore) ?
				localStorage.setItem('steelClashBestScore', Number(this.nScore)) :
				localStorage.setItem('steelClashBestScore', Number(localStorage.getItem('steelClashBestScore')));
			this.cameras.main.shake(500, 0.006);
			this.container_result.setVisible(true);
			this.oTweenManager.opacityAnimation();
			this.currentScore.setText(Number(localStorage.getItem("currentScore")));
			this.bestScore.setText(Number(localStorage.getItem('steelClashBestScore')));
			this.oInputManager.buttonClick(this.home_button);
			this.oInputManager.buttonClick(this.replay_button);
		});
	}
	checkForLevel() {
		this.nLevelCount += 1;
		if (this.nLevelCount > 7) {
			this.nLevelCount = 3;
		}
		let nNumberofBombs = Object.keys(this.oLevelManager.aLevel[this.nLevelCount - 1].oBombs).length;
		let bombsData = this.oLevelManager.aLevel[this.nLevelCount - 1].oBombs;
		if (!this.container_result.visible && this.container_Bombs.list.length == 0) {
			this.setBombGenerator(nNumberofBombs, bombsData, 1);
		}
	}
	setBombGenerator(nNumberofBombs, bombsData, i) {
		const nRandomX = Math.floor(Math.random() * (886 - 197)) + 197;
		const nRandomY = Math.floor(Math.random() * (481 - 167)) + 167;
		const generator = this.add.image(nRandomX, nRandomY, "whole").setScale(1.2);
		this.container_bombGenerator.add(generator);
		setTimeout(() => {
			this.setBombs(nNumberofBombs, bombsData, generator, i);
		}, 200);
	}
	setBombs(nNumberofBombs, bombsData, generator, i) {

		let generateBombs = () => {
			let bomb = this.add.sprite(generator.x, generator.y, bombsData[`bomb_${i - 1}`].texture).setScale(2, 2);
			this.container_Bombs.add(bomb);
			this.oTweenManager.bombAnimation(bomb);
			i++;
			i <= nNumberofBombs ?
				setTimeout(() => {
					generateBombs();
				}, 300) :
				generator.destroy();

		}
		generateBombs();
	}
	controlBombVelocity(bomb) {
		if (bomb.body.velocity.x < 0) {
			bomb.body.velocity.x = -300;
		}
		if (bomb.body.velocity.x > 0) {
			bomb.body.velocity.x = 300;
		}
		if (bomb.body.velocity.y < 0) {
			bomb.body.velocity.y += 100;
		}
		if (bomb.body.velocity.x > 0) {
			bomb.body.velocity.y -= 100;
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
