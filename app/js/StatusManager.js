export default class StatusManager {
    constructor() {
        this.dom = {
            root: document.getElementById('summary'),
            mouseStatus: document.getElementById('mouseStatus'),
            pathfindStatus: document.getElementById('pathfindStatus'),
            pathfindLastTime: document.getElementById('pathfindLastTime'),
            pathfindLastTimeInFrames: document.getElementById('pathfindLastTimeInFrames'),
            renderedObjectsCount: document.getElementById('renderedObjectsCount'),
            renderedBlocksCount: document.getElementById('renderedBlocksCount'),
        }
        this.resetAll();
    };

    resetAll() {
        this.mouseStatus = "Idle"; // Adding blocks, Removing Blocks, Idle
        this.pathfindStatus = "Idle"; // Searching, Getting Path, Not found, Path Found, Idle
        this.pathfindLastTime = '0ms'; // Time in ms
        this.pathfindLastTimeInFrames = '0f'; // Time in frames
        this.renderedObjectsCount = '0';
        this.renderedBlocks = '0';
    }

    get mouseStatus() {
        return this.dom.mouseStatus.innerHTML
    }
    set mouseStatus(val) {
        this.dom.mouseStatus.innerHTML = val;
    }

    get pathfindStatus() {
        return this.dom.pathfindStatus.innerHTML
    }
    set pathfindStatus(val) {
        this.dom.pathfindStatus.innerHTML = val;
    }

    get pathfindLastTime() {
        return this.dom.pathfindLastTime.innerHTML
    }
    set pathfindLastTime(val) {
        this.dom.pathfindLastTime.innerHTML = val;
    }

    get pathfindLastTimeInFrames() {
        return this.dom.pathfindLastTimeInFrames.innerHTML
    }
    set pathfindLastTimeInFrames(val) {
        this.dom.pathfindLastTimeInFrames.innerHTML = val;
    }

    get renderedBlocksCount() {
        return this.dom.renderedBlocksCount.innerHTML
    }
    set renderedBlocksCount(val) {
        this.dom.renderedBlocksCount.innerHTML = val;
    }
}