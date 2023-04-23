import {LinkedListNode} from "./linkedListNode.js";

export class LinkedList {
    #first = null;
    #last = null;

    constructor(iterable) {
        if (iterable) {
            for (const item of iterable) {
                this.appendRight(item);
            }
        }
    }

    appendRight(value) {
        const node = new LinkedListNode(value);
        if (this.#last === null) {
            this.#first = node;
            this.#last = node;
            return;
        }
        node.prev = this.#last;
        this.#last.next = node;
        this.#last = node;
    }

    appendLeft(value) {
        const node = new LinkedListNode(value);
        if (this.#first === null) {
            this.#first = node;
            this.#last = node;
            return;
        }
        node.next = this.#first;
        this.#first.prev = node;
        this.#first = node;
    }

    popRight() {
        if (this.#last === null) {
            return null;
        }
        const value = this.#last.value;
        if (this.#last === this.#first) {
            this.#first = null;
            this.#last = null;
        } else {
            const prev = this.#last.prev;
            if (prev) {
                prev.next = null;
            }
            this.#last = prev;
        }
        return value;
    }

    popLeft() {
        if (this.#first === null) {
            return null;
        }
        const value = this.#first.value;
        if (this.#last === this.#first) {
            this.#first = null;
            this.#last = null;
        } else {
            const next = this.#first.next;
            if (next) {
                next.prev = null;
            }
            this.#first = next;
        }
        return value;
    }

    get first() {
        return this.#first;
    }

    get last() {
        return this.#last;
    }

    *[Symbol.iterator]() {
        let current = this.first;
        while (current !== null) {
            yield current.value;
            current = current.next;
        }
    }
}