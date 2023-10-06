class LevelManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.aLevel = [
            {
                oBombs: {
                    bomb_0: {
                        texture: "ball_1",
                    },
                }
            },
            {
                oBombs: {
                    bomb_0: {
                        texture: "ball_2"
                    },
                }
            },
            {
                oBombs: {
                    bomb_0: {
                        texture: "ball_3"
                    },
                    bomb_1: {
                        texture: "ball_4"
                    },
                }
            },
            {
                oBombs: {
                    bomb_0: {
                        texture: "ball_5"
                    },
                    bomb_1: {
                        texture: "ball_1"
                    },
                    bomb_2: {
                        texture: "ball_1"
                    },
                }
            },
        ]
    }
}