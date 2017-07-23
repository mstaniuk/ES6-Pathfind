class Renderer {
    constructor(ctx) {
        this.ctx = ctx;

        this.queue = new DoublyLinkedList();
    }

    push(el) {
        if (typeof el.render === 'undefined') {
            throw new Error('Rendered item have to have "render" method');
            return false;
        }

        this.queue.push(el);
    }

    beforeRender() {
        this.ctx.clearRect(0, 0, 500, 500);
    }

    render() {
        this.beforeRender();

        let node = this.queue.head;
        while (node !== null) {
            node.data.render(this.ctx);
            node = node.next;
        }
    }
}