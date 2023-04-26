import {LinkedList} from "../linked-list/index.js";

export class Dequeue {
    _list = new LinkedList();

    constructor(initialValues = []) {
        this.push(...initialValues);
    }

    push(...values) {
        for (const value of values) {
            this._list.appendRight(value);
        }
    }

    pop() {
        return this._list.popRight();
    }

    shift() {
        return this._list.popLeft();
    }

    unshift(...values) {
        for (const value of values) {
            this._list.appendLeft(value);
        }
    }

    get head() {
        return this._list.first?.value;
    }
}