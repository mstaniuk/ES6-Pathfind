'use strict';

import App from './App.js';

class Mouse {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
        this.isPressed = false;
        this.clickCallback = function() {};
        this.positionChangeCallback = function() {};
        this.setEvents();
    }

    setOnClickHandler(cb) {
        this.clickCallback = cb;
    }

    setOnPositionChangeHandler(cb) {
        this.positionChangeCallback = cb;
    }

    setEvents() {
        this.canvas.addEventListener('mousemove', this.onMove.bind(this));
        this.canvas.addEventListener('click', this.onClick.bind(this));
        this.canvas.addEventListener('mousedown', this.onDown.bind(this));
        this.canvas.addEventListener('mouseup', this.onUp.bind(this));
        this.canvas.addEventListener('mouseout', this.onOut.bind(this));
    }

    onDown(event) {
        this.isPressed = true;
    }

    onUp(event) {
        this.isPressed = false;
    }

    onOut(event) {
        this.isPressed = false;
    }

    onMove(event) {
        let bounds = this.canvas.getBoundingClientRect();
        let x = Math.floor(event.clientX - bounds.left);
        let y = Math.floor(event.clientY - bounds.top);

        if (x !== this.x) {
            this.positionChangeCallback(event);
            this.x = x;
        }

        if (y !== this.y) {
            this.positionChangeCallback(event);
            this.y = y;
        }
    }

    onClick(event) {
        this.clickCallback(event);
    }

    static pxToNode(x, y) {
        return {
            x: Math.floor(x / App.nodeSize),
            y: Math.floor(y / App.nodeSize)
        }
    }
}

export default Mouse;