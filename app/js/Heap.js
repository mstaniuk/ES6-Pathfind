'use strict';

class Heap {
    constructor(test = Heap.defaultTest) {
        this.heap = [];
        this.testFunction = test;
    }

    get first() {
        return this.heap[0];
    }
    static defaultTest(node1, node2) {
        return node1 < node2;
    }

    toArray() {
        return this.heap;
    }

    isEmpty() {
        if (this.heap.length <= 0) return true;
        return false;
    }
    find(test) {
        for (let i = 0, ii = this.heap.length; i < ii; i++) {
            if (test(this.heap[i]) === true) {
                return [i, this.heap[i]];
            }
        }

        return null;
    }

    getParentPosition(position) {
        return Math.floor((position - 1) >> 1);
    }

    swap(a, b) {
        let temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    }

    push(item) {
        // get position of new item
        let position = this.heap.length;

        // push new item into heap
        this.heap.push(item);

        while (position !== 0) {
            //get parent position
            let parentPosition = this.getParentPosition(position);

            // check if new item is better than parent
            if (this.testFunction(this.heap[position], this.heap[parentPosition]) === true) {
                // if (this.heap[position].f < this.heap[parentPosition].f === true) {
                // swap places
                this.swap(parentPosition, position);

                // set new position in heap
                position = parentPosition;
            } else {
                // leave on current position
                return this.heap;
            }
        }
    }

    shift() {
        if (this.heap.length === 1) {
            this.heap = [];
            return this.heap;
        }

        let newPosition = 0;
        this.heap[newPosition] = this.heap.pop();

        while (true) {
            var currentPosition = newPosition;

            // If both children exist
            if (((currentPosition << 1) + 2) < this.heap.length === true) {
                // select better children
                if (this.testFunction(this.heap[currentPosition], this.heap[(currentPosition << 1) + 1]) === false) {
                    // choose if better than parent
                    newPosition = (currentPosition << 1) + 1;
                }
                if (this.testFunction(this.heap[newPosition], this.heap[(currentPosition * 2) + 2]) === false) {
                    // choose if better than parent and brother
                    newPosition = (currentPosition << 1) + 2;
                }
                // Check if one child exist
            } else if (((currentPosition << 1) + 1) < this.heap.length === true) {
                if (this.testFunction(this.heap[currentPosition], this.heap[(currentPosition << 1) + 1]) === false) {
                    // choose if better than parent
                    newPosition = (currentPosition << 1) + 1;
                }
            }

            // if new position found
            if (currentPosition != newPosition) {
                // swap
                this.swap(currentPosition, newPosition);
            } else {
                return this.heap;
            }
        }
    }

    replace(position, node) {
        this.heap[position] = node;
        while (position != 0) {
            //get parent position
            var parentPosition = this.getParentPosition(position);
            // check if new item is better than parent
            if (this.testFunction(this.heap[position], this.heap[parentPosition]) === true) {
                // if (this.heap[position].f < this.heap[parentPosition].f === true) {
                // swap places
                this.swap(parentPosition, position);
                position = parentPosition;
            } else {
                // leave on current position
                return this.heap;
            }
        }
    }
}

export default Heap;