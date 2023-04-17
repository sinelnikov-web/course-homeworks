import {Nullable} from "../../shared/types";
import {ILinkedList, ILinkedListNode} from "./types";
import {LinkedListNode} from "./linkedListNode";

export class LinkedList<T> implements ILinkedList<T>{
    #first: Nullable<ILinkedListNode<T>> = null;
    #last: Nullable<ILinkedListNode<T>> = null;

    constructor(iterable?: Iterable<T>) {
        if (iterable) {
            for (const item of iterable) {
                this.add(item);
            }
        }
    }

    public add(value: T): void {
        const node = new LinkedListNode(value);
        if (this.#first === null) {
            this.#first = node;
            this.#last = node;
            return;
        }
        node.prev = this.#last;
        this.#last.next = node;
        this.#last = node;
    }

    public pop(): T {
        if (this.#last === null) {
            return null;
        }
        const value = this.#last.value;
        if (this.#last === this.#first) {
            this.#first = null;
            this.#last = null;
        } else {
            const prev = this.#last.prev;
            prev.next = null;
            this.#last = prev;
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