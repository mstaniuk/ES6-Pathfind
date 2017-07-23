'use strict';
class GNode {
    constructor(x, y, payload) {
        this.x = x;
        this.y = y;
        this.payload = payload;
    }
}
class Grid {
    constructor(width = 32, height = 32) {
        this.width = width;
        this.height = height;
        this.grid = this._generateGrid();
    }

    static nodeRealPosiion(x, y) {
        return {
            x: x * App.nodeSize,
            y: y * App.nodeSize,
        }
    }

    static nodeRealPositionCenter(x, y) {
        return {
            x: x * App.nodeSize + App.nodeSize / 2,
            y: y * App.nodeSize + App.nodeSize / 2,
        }
    }

    _generateGrid() {
        let grid = [];
        for (let x = 0, xx = this.width; x < xx; x++) {
            grid[x] = [];
            for (let y = 0, yy = this.height; y < yy; y++) {
                grid[x][y] = new GNode(x, y, { isObstacle: false });
            }
        }
        return grid;
    }

    getNodeAt(x, y) {
        if (typeof this.grid[x] === 'undefined') {
            return undefined;
        }

        return this.grid[x][y];
    }

    setNodeAt(x, y, v) {
        if (typeof this.getNodeAt(x, y) !== 'undefined') {
            this.grid[x][y] = v;
        }
    }

    setPayloadAt(x, y, payload) {
        let gnode = this.getNodeAt(x, y);
        if (typeof gnode !== 'undefined') {
            gnode.payload = payload;
        }
    }
}