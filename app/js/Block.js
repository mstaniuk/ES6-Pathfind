'use strict';

import App from './App.js';
import Grid from './Grid.js';

class Block {
    constructor(x, y, style) {
        this.x = x;
        this.y = y;
        this.style = style;
        this.scale = 2.5;
        this.idDone = false;
    }

    update(dt) {
        this.scale -= dt / 200;
        if (this.scale <= 1) {
            this.scale = 1;
            this.isDone = true;
        }
    }

    render(ctx) {
        ctx.fillStyle = this.style;
        let size = App.nodeSize * this.scale;
        let pos = Grid.nodeRealPosiion(this.x, this.y);
        pos.x = pos.x - (size - App.nodeSize) / 2;
        pos.y = pos.y - (size - App.nodeSize) / 2;
        ctx.fillRect(pos.x, pos.y, size, size);
    }
}

export default Block;