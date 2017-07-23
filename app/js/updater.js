class Updater {
    constructor() {
        this.lastTime = Date.now();
        this.dt = 0;

        this.queue = new DoublyLinkedList();
    }

    push(el) {
        if (typeof el.update === 'undefined') {
            throw new Error('Updated item have to have "update" method');
            return false;
        }

        this.queue.push(el);
    }

    beforeUpdate() {
        let now = Date.now();
        this.dt = (now - this.lastTime);
        this.lastTime = now;
    }

    update() {
        this.beforeUpdate();
        let node = this.queue.head;

        while (node !== null) {
            if (node.data.isDone !== true) {
                node.data.update(this.dt);
            }
            node = node.next;
        }
    }
}