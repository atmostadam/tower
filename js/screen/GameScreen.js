import {
    BRICK_EMPTY
} from "./../configuration/GameConfiguration.js";
import { Grid } from "./../model/Grid.js";
import { NextLevelScreen } from "./NextLevelScreen.js";
import { RanOutOfLevelsScreen } from "./RanOutOfLevelsScreen.js";

export class GameScreen {
    constructor(context) {
        this.context = context;
        this.solidTiles = new Grid(this.context);
        this.backgroundTiles = new Grid(this.context);
        this.enemies = [];
        this.towers = [];
        this.projectiles = [];
        this.explosions = [];
        this.foregroundTiles = new Grid(this.context);
    }

    update(tick) {
        this.bombs.forEach(b => b.update(tick));
        this.paddle.update(tick);
        this.context.getScore().update(tick);

        for (let rowNumber = 0; rowNumber < this.grid.getNumberOfRows(); rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.grid.getNumberOfColumns(); columnNumber++) {
                var brick = this.grid.get(rowNumber, columnNumber);
                if (brick && BRICK_EMPTY != brick.getState()) {
                    if (this.checkCollisions(brick)) {
                        break;
                    }
                }
            }
        }

        this.grid.update(tick);
    }

    draw() {
        this.grid.draw();
        this.context.getScore().draw();
        this.drawLevelNumber();
        this.drawLevelDesigner();
        if (this.grid.isEmpty()) {
            if (this.context.getLevel() >= this.context.getLevelConfiguration().size()) {
                this.context.setScreen(new RanOutOfLevelsScreen(this.context));
            } else {
                this.context.setScreen(new NextLevelScreen(this.context));
            }
        }
    }

    drawLevelNumber() {
        let ctx = this.context.getCtx();
        ctx.font = "48px Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText("LEVEL " + this.context.getLevel(), 15, 50);
    }

    drawLevelDesigner() {
        let ctx = this.context.getCtx();
        ctx.font = "12pt Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(
            "Level Designed by: " + this.context.getLevelConfiguration().getLevelDesigner(this.context.getLevel()),
            this.context.getWidth() - 200,
            this.context.getHeight() - 30);
    }

    onClick(x, y) {

    }

    getGrid() {
        return this.grid;
    }

    setGrid(grid) {
        this.grid = grid;
    }

    getBombs() {
        return this.bombs
    }

    setBombs(bombs) {
        this.bombs = bombs;
    }

    addBomb() {
        this.bombs.push(new Bomb(this.context, this, this.grid, this.paddle));
    }

    deleteBomb(bomb) {
        this.bombs = this.bombs.filter(e => e !== bomb)
    }

    getPaddle() {
        return this.paddle;
    }

    setPaddle(paddle) {
        this.paddle = paddle;
    }
}