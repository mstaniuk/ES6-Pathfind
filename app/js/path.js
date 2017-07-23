class Path {
    constructor() {
        this.path = [];
    }

    fromANode(anode) {
        while (anode.parent !== null) {
            this.path.push(anode.point);
            anode = anode.parent;
        }

        this.path.reverse();
    }

    render(ctx) {
        if (this.path.length === 0) return;
        let pos = Grid.nodeRealPositionCenter(this.path[0].x, this.path[0].y);

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y)
        for (let i = 1, ii = this.path.length; i < ii; i++) {
            let pos = Grid.nodeRealPositionCenter(this.path[i].x, this.path[i].y);
            ctx.lineTo(pos.x, pos.y)
        }

        ctx.strokeStyle = "blue";
        ctx.stroke();
    }
}