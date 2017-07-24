'use strict';
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static isEqual(point1, point2) {
        return (point1.x === point2.x && point1.y === point2.y);
    }

    static distance(point1, point2) {
        return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
    }

    toString() {
        return this.x + ':' + this.y;
    }
}

export default Point;