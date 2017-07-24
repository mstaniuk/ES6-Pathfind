'use strict';

import Point from './Point.js';
import Heap from './Heap.js';
import Path from './Path.js';


export class ANode {
    constructor(parent, point, f = 0, g = 0) {
        this.parent = parent;
        this.point = point;
        this.f = f;
        this.g = g;
        this.id = point.toString();
    }
}

class Astar {
    constructor(grid, startPoint, endPoint) {
        this.grid = grid;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.closedList = {};

        this.openList = new Heap((a, b) => a.f < b.f);
        this.openList.push(new ANode(null, this.startPoint));

        this.isDone = false;
        this.isPaused = false;
        this.isPathFound = false;
        this.path = new Path();


        this.onSearchDoneCallback = () => {};
        this.onSearchPausedCallback = () => {};
        this.onSearchResumedCallback = () => {};

        this.validate();
    }

    clear() {
        this.closedList = {};

        this.openList = new Heap((a, b) => a.f < b.f);
        this.openList.push(new ANode(null, this.startPoint));
    }

    validate() {
        if (this.grid.getNodeAt(this.startPoint.x, this.startPoint.y).payload.isObstacle === true) {
            this.startPoint = null;
        }

        if (this.grid.getNodeAt(this.endPoint.x, this.endPoint.y).payload.isObstacle === true) {
            this.endPoint = null;
        }
    }

    generateSuccesor(x, y, i, j, parentNode) {
        let point = new Point(x, y);
        let g = parentNode.g;

        if ((i !== 0) && (j !== 0)) {
            g += 12;
        } else {
            g += 10;
        }

        let h = Point.distance(point, this.endPoint) * 10;
        let f = g + h;

        return new ANode(parentNode, point, f, g);
    }

    getSuccessors(node) {
        let successors = [];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {

                if (i === 0 && j === 0) {
                    continue;
                }

                let x = node.point.x + i;
                let y = node.point.y + j;
                let gridNode = this.grid.getNodeAt(x, y);

                if ((typeof gridNode !== 'undefined') && (gridNode.payload.isObstacle === false)) {
                    successors.push(this.generateSuccesor(x, y, i, j, node));
                }
            }
        }

        return successors;
    }

    isInClosedList(node) {
        if (typeof this.closedList[node.id] !== 'undefined') {
            return true;
        }

        return false;
    }

    isInOpenList(node) {
        let found = this.openList.find((el) => el.id === node.id)
        if (found !== null) {
            if (found[1].f > node.f) {
                this.openList.replace(found[0], node);
            }

            return true;
        }

        return false;
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    set searchDoneHandler(callback) {
        this.onSearchDoneCallback = callback;

    }

    set searchPausedHandler(callback) {
        this.onSearchPausedCallback = callback;

    }

    set searchResumedHandler(callback) {
        this.onSearchResumedCallback = callback;
    }

    search(dt) {
        let timer = Date.now();
        if (this.isDone === true) {
            return null;
        }

        if (this.startPoint === null || this.endPoint === null) return null;

        while (!this.openList.isEmpty()) {

            if (Date.now() - timer > 5) {
                return null;
            }

            if (this.isPaused === true) {
                return null;
            }

            let parentNode = this.openList.first;
            this.openList.shift();

            let successors = this.getSuccessors(parentNode);

            for (let i = 0, ii = successors.length; i < ii; i++) {
                let successor = successors[i];

                if (Point.isEqual(successor.point, this.endPoint)) {
                    this.onPathFound(successor)
                    return successor;
                }

                if (this.isInOpenList(successor, this.openList)) {
                    continue;
                }

                if (this.isInClosedList(successor)) {
                    continue;
                }
                this.openList.push(successor);
            }

            this.closedList[parentNode.id] = parentNode;
        }
        this.onPathNotFound();
        return null;
    }

    onPathFound(foundNode) {
        this.isDone = true;
        this.isPathFound = true;
        this.path.fromANode(foundNode);
        this.onSearchDoneCallback(this);
    }

    onPathNotFound() {
        this.isDone = true;
        this.isPathFound = false;
        this.onSearchDoneCallback(this);
    }

    update(dt) {
        this.search(dt);
    }
}

export default Astar;