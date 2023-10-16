class LevelManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.aLevel = [
            {
                oBombs: {
                    bomb_0: {
                        texture: "bomb-1",
                    },
                }
            },
            {
                oBombs: {
                    bomb_0: {
                        texture: "bomb-2"
                    },
                }
            },
            {
                oBombs: {
                    bomb_0: {
                        texture: "bomb-3"
                    },
                    bomb_1: {
                        texture: "bomb-4"
                    },
                }
            },
            {
                oBombs: {
                    bomb_0: {
                        texture: "bomb-5"
                    },
                    bomb_1: {
                        texture: "bomb-1"
                    },
                    bomb_2: {
                        texture: "bomb-1"
                    },
                }
            },
        ]
    }
}