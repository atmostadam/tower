import { GameScreen } from "./GameScreen.js";

export class NextLevelScreen {
    constructor(context) {
        this.context = context;
        this.context.getScore().nextLevel();
    }

    update(tick) {
        this.tick = tick;
    }

    draw() {
        let ctx = this.context.getCtx();
        ctx.font = "50pt Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(
            "Click for NEXT LEVEL",
            this.context.getWidthPercent(40),
            this.context.getHeightPercent(48));
    }

    onClick(x, y) {
        this.context.setScreen(new GameScreen(this.context));
    }
}