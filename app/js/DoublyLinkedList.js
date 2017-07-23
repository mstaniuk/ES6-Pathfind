class ListNode {
    constructor(data, prev = null, next = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    clear() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    push(data) {
        let node = new ListNode(data);

        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }

        this.length++;
        return node;
    }

    prepend(data) {
        let node = ListNode(data);

        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }

        this.length++;
        return node;
    }

    getByIndex(index) {
        if ((index >= 0) && (index < this.length)) {
            if (index <= this.length / 2) {
                var current = this.head;

                for (var i = 0, ii = index; i < ii; i++) {
                    current = current.next;
                }
            } else {
                var current = this.tail;

                for (var i = this.length, ii = index + 1; i > ii; i--) {
                    current = current.prev;
                }
            }

            return current;

        } else {
            return null;
        }
    }

    remove(index) {
        let node = this.getByIndex(index);

        if (node !== null) {
            if (index === 0) {
                this.head = node.next;
            }

            if (index === this.length - 1) {
                this.tail = node.prev;
            }

            this.node.next = null;
            this.node.prev = null;

            this.length--;
            return this;
        }
    }

}