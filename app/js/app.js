'use strict';
class App {
    constructor() {
        this.setCanvas();
        this.setGrid();
        this.mouse = new Mouse(this.canvas);
        this.renderer = new Renderer(this.ctx);
        this.updater = new Updater();
        this.state = App.states.DRAWING;
        this.init();

        this.loop();
    }

    setCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = 500;
        this.canvas.height = 500;

        this.canvas.style.border = '1px solid black';

        document.body.appendChild(this.canvas);
    }

    setGrid() {
        this.grid = new Grid(100, 100);
    }

    init() {
        this.mouse.setOnClickHandler(() => {
            let pos = Mouse.pxToNode(this.mouse.x, this.mouse.y);
            this.grid.getNodeAt(pos.x, pos.y).payload.isObstacle = true;

        });

        this.mouse.setOnPositionChangeHandler(() => {
            if (this.mouse.isPressed) {
                let pos = Mouse.pxToNode(this.mouse.x, this.mouse.y);
                let gnode = this.grid.getNodeAt(pos.x, pos.y)
                gnode.payload.isObstacle = true;

                if (typeof gnode.payload.block === 'undefined') {
                    gnode.payload.block = new Block(pos.x, pos.y, 'RGBA(255,0,0,0.5)');
                    this.updater.push(gnode.payload.block);
                    this.renderer.push(gnode.payload.block);
                }
            }
        });

        document.getElementsByClassName('js-search')[0].addEventListener('click', () => {

            let astar = new Astar(this.grid, new Point(0, 0), new Point(99, 99), this.ctx);

            astar.searchDoneHandler = (astar) => {
                if (astar.isPathFound === true) {
                    this.renderer.push(astar.path);
                } else {
                    console.log('path not found');
                }
            }
            this.updater.push(astar)
        });
    }

    loop() {
        this.updater.update();
        this.renderer.render();

        requestAnimationFrame(this.loop.bind(this));
    }
}

App.nodeSize = 5;
App.states = {
    DRAWING: 'DRAWING',
    PATHFINDING: 'PATHFINDING',
    PAUSED: 'PAUSED'
}