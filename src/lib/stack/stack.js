
export class Stack {
    #array = null;
    #length = 0;
    #capacity = 0;

    constructor(TypedArrayClass, size) {
        this.#array = new TypedArrayClass(size);
        this.#capacity = size;
    }

    push(...values) {
        if (this.#length + values.length > this.#capacity) {
            throw new Error("Too many items, stack will overflowed!!!");
        }
        for (const value of values) {
            this.#array[this.#length++] = value;
        }
    }

    pop() {
        if (this.#length === 0) {
            throw new Error("Stack is empty!");
        }
        return this.#array[--this.#length];
    }

    get head() {
        return this.#array[this.#length - 1];
    }
}