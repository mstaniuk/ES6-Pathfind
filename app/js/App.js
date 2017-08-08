'use strict';
import Astar from './Astar.js';
import Grid from './Grid.js';
import Mouse from './Mouse.js';
import Renderer from './Renderer.js';
import Updater from './Updater.js';
import Block from './Block.js';
import Point from './Point.js';
import StatusManager from './StatusManager.js';

class App {
    constructor() {
        this.setCanvas();
        this.setGrid();
        this.statusManages = new StatusManager();
        this.mouse = new Mouse(this.canvas, this.statusManages);
        this.renderer = new Renderer(this.ctx);
        this.updater = new Updater();
        this.dom = {};
        this.blocksCount = 0;
        this.init();

        this.loop();
    }

    setCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = 500;
        this.canvas.height = 500;

        this.canvas.style.border = '1px solid black';
    }

    setGrid() {
        this.grid = new Grid(100, 100);
    }

    updateStatus() {
        this.dom.mouseStatus.innerHtml = this.states.mouse;
        this.dom.mouseStatus.pathfindStatus = this.states.mouse;
    }

    getDomElements() {
        let dom = {};
        dom.app = document.getElementById('app');
        dom.pathfindButton = document.getElementById('pathfind');
        return dom;
    }

    init() {
        this.dom = this.getDomElements();
        this.dom.app.appendChild(this.canvas);

        // Start Point
        let startNode = this.grid.getNodeAt(0, 0);
        startNode.payload.block = new Block(startNode.x, startNode.y, 'RGBA(0,255,0,0.5)');
        this.updater.push(startNode.payload.block);
        this.renderer.push(startNode.payload.block);

        // End Point
        let endNode = this.grid.getNodeAt(99, 99);
        endNode.payload.block = new Block(endNode.x, endNode.y, 'RGBA(0,0,255,0.5)');
        this.updater.push(endNode.payload.block);
        this.renderer.push(endNode.payload.block);

        this.mouse.setOnClickHandler(() => {
            let pos = Mouse.pxToNode(this.mouse.x, this.mouse.y);
            this.grid.getNodeAt(pos.x, pos.y).payload.isObstacle = true;
        });

        this.mouse.setOnPositionChangeHandler(() => {
            if (this.mouse.isPressed) {
                let pos = Mouse.pxToNode(this.mouse.x, this.mouse.y);
                let gnode = this.grid.getNodeAt(pos.x, pos.y);
                if (typeof gnode === 'undefined') return;
                gnode.payload.isObstacle = true;

                if (typeof gnode.payload.block === 'undefined') {
                    gnode.payload.block = new Block(pos.x, pos.y, 'RGBA(255,0,0,0.5)');
                    this.updater.push(gnode.payload.block);
                    this.renderer.push(gnode.payload.block);
                    this.statusManages.renderedBlocksCount = ++this.blocksCount;
                }
            }
        });

        this.dom.pathfindButton.addEventListener('click', () => {
            this.statusManages.pathfindStatus = "Seatching";
            let astar = new Astar(this.grid, new Point(0, 0), new Point(99, 99), this.ctx);

            astar.searchDoneHandler = (astar) => {
                this.statusManages.pathfindLastTime = astar.getTime() + 'ms';
                this.statusManages.pathfindLastTimeInFrames = parseInt(astar.getTime() / 5) + 'f';

                if (astar.isPathFound === true) {
                    this.statusManages.pathfindStatus = "Path found";
                    this.renderer.push(astar.path);
                } else {
                    this.statusManages.pathfindStatus = "Path not found";
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

export default App;