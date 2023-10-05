class LevelManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.aLevel = [
            {
                oBombs: {
                    bomb_0: {
                        x: 966,
                        y: 400,
                        texture: "ball_1",
                    },
                }
            },
            {
                oBombs: {
                    bomb_0: {
                        x: 966,
                        y: 400,
                        texture: "ball_2"
                    },
                }
            },
            {
                oBombs: {
                    bomb_0: {
                        x: 966,
                        y: 400,
                        texture: "ball_3"
                    },
                    bomb_1: {
                        x: 1000,
                        y: 400,
                        texture: "ball_4"
                    },
                }
            },
            {
                oBombs: {
                    bomb_0: {
                        x: 950,
                        y: 400,
                        texture: "ball_5"
                    },
                    bomb_1: {
                        x: 1000,
                        y: 400,
                        texture: "ball_1"
                    },
                    bomb_2: {
                        x: 900,
                        y: 400,
                        texture: "ball_1"
                    },
                }
            },
        ]
    }
}