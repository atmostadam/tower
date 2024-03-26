import {
    TILE_PREFIX,
    NUMBER_OF_TILE_IMAGES
} from "./../configuration/GameConfiguration.js";
import { loadImage } from "./../context/GameContext.js";

for (let i = 0; i < NUMBER_OF_TILE_IMAGES; i++) {
    await loadImage(TILE_PREFIX + NUMBER_OF_TILE_IMAGES);
}

export class Tile {
    constructor(context, percentX, percentY, percentW, percentH) {
        this.context = context;
        this.percentX = percentX;
        this.percentY = percentY;
        this.percentW = percentW;
        this.percentH = percentH;
        this.images = [];
    }

    update(tick) {
        this.tick = tick;
    }

    draw() {
        if (BRICK_EMPTY == this.state) {
            return;
        }
        let ctx = this.context.getCtx();
        if (EXPLOSION_SRC == this.state) {
            var w = EXPLOSION_W;
            var h = EXPLOSION_H;
            // TODO: Add some fireworks
        } else {
            var w = BRICK_W;
            var h = BRICK_H;
        }
        ctx.drawImage(
            this.context.getImage(this.state),
            0,
            0,
            w,
            h,
            this.getX(),
            this.getY(),
            this.getSw(),
            this.getSh()
        );
    }

    onHit() {
        switch (this.state) {
            case BRICK_GREEN_SRC:
                this.state = EXPLOSION_SRC;
                this.context.getScore().increaseScore(BRICK_GREEN_POINTS);
                this.finalTick = this.tick + explosionNumberOfTicks;
                break;
            case BRICK_YELLOW_SRC:
                this.state = BRICK_GREEN_SRC;
                this.context.getScore().increaseScore(BRICK_YELLOW_POINTS);
                break;
            case BRICK_BLUE_SRC:
                this.state = BRICK_YELLOW_SRC;
                this.context.getScore().increaseScore(BRICK_BLUE_POINTS);
                break;
            case BRICK_PURPLE_SRC:
                this.state = BRICK_BLUE_SRC;
                this.context.getScore().increaseScore(BRICK_PURPLE_POINTS);
                break;
            case BRICK_ORANGE_SRC:
                this.state = BRICK_PURPLE_SRC;
                this.context.getScore().increaseScore(BRICK_ORANGE_POINTS);
                break;
            case BRICK_RED_SRC:
                this.state = BRICK_ORANGE_SRC;
                this.context.getScore().increaseScore(BRICK_RED_POINTS);
                break;
        }
    }

    getX() {
        return this.context.getWidthPercent(this.percentX);
    }

    getY() {
        return this.context.getHeightPercent(this.percentY);
    }

    getSw() {
        return this.context.getWidthPercent(this.percentW);
    }

    getSh() {
        return this.context.getHeightPercent(this.percentH);
    }

    getState() {
        return this.state;
    }

    isEmpty() {
        if (BRICK_EMPTY == this.state || EXPLOSION_SRC == this.state) {
            return true;
        }
        return false;
    }

    setState(state) {
        this.state = state;
    }
}