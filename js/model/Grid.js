import {
    NUMBER_OF_ROWS,
    NUMBER_OF_COLUMNS
} from "./../configuration/GameConfiguration.js";

export class Grid {
    constructor(context) {
        this.context = context;
        this.grid = this.createGrid(this.context.getLevel());
    }

    update(tick) {
        for (let r = 0; r < NUMBER_OF_ROWS; r++) {
            for (let c = 0; c < NUMBER_OF_COLUMNS; c++) {
                if (this.grid[r][c]) {
                    this.grid[r][c].update(tick);
                }
            }
        }
    }

    draw() {
        for (let r = 0; r < NUMBER_OF_ROWS; r++) {
            for (let c = 0; c < NUMBER_OF_COLUMNS; c++) {
                if (this.grid[r][c]) {
                    this.grid[r][c].draw();
                }
            }
        }
    }

    get(row, column) {
        return this.grid[row][column];
    }

    set(row, column, instance) {
        this.grid[row][column] = instance;
    }

    isEmpty() {
        for (let r = 0; r < NUMBER_OF_ROWS; r++) {
            for (let c = 0; c < NUMBER_OF_COLUMNS; c++) {
                if (!this.grid[r][c].isEmpty()) {
                    return false;
                }
            }
        }
        return true;
    }

    createGrid(levelNumber) {
        let grid = [];
        let level = this.context.getLevelConfiguration()
            .getLevel(levelNumber, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);
        for (let r = 0; r < NUMBER_OF_ROWS; r++) {
            let row = [];
            for (let c = 0; c < NUMBER_OF_COLUMNS; c++) {
                let tile = new Tile(
                    this.context,
                    this.percentW * c,
                    this.percentH * r,
                    this.percentW,
                    this.percentH
                )
                switch (level[r][c]) {
                    case "G":
                        brick.setState(BRICK_GREEN_SRC);
                        break;
                    case "Y":
                        brick.setState(BRICK_YELLOW_SRC);
                        break;
                    case "B":
                        brick.setState(BRICK_BLUE_SRC);
                        break;
                    case "P":
                        brick.setState(BRICK_PURPLE_SRC);
                        break;
                    case "O":
                        brick.setState(BRICK_ORANGE_SRC);
                        break;
                    case "R":
                        brick.setState(BRICK_RED_SRC);
                        break;
                    case "X":
                        brick.setState(BRICK_GRAY_SRC);
                        break;
                }
                row.push(brick);
            }
            grid.push(row);
        }
        return grid;
    }

    getNumberOfRows() {
        return NUMBER_OF_ROWS;
    }

    getNumberOfColumns() {
        return NUMBER_OF_COLUMNS;
    }
}