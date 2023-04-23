export class LinkedListNode {
    next = null;
    prev = null;
    value;

    constructor(value, config) {
        this.value = value;
        if (config) {
            const {next, prev} = config;
            if (next) {
                this.next = next;
            }
            if (prev) {
                this.prev = prev;
            }
        }
    }
}