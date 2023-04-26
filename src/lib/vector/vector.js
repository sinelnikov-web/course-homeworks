
export class Vector {
    #array;
    #capacity;
    #length = 0;

    constructor(TypedArrayClass, {capacity = 2}) {
        this.#array = new TypedArrayClass(capacity);
        this.#capacity = capacity;
    }

    #resize(newCapacity) {
        this.#capacity = newCapacity;
        const newArray = new this.#array.constructor(newCapacity);
        for (let i = 0; i < this.#length; i++) {
            newArray[i] = this.#array[i];
        }
    }

    push(...values) {
        if (this.#length + values.length > this.#capacity) {
            this.#resize(Math.max(this.#length + values.length, this.#capacity * 2));
        }
        for (const value of values) {
            this.#array[this.#length++] = value;
        }
    }

    pop() {
        if (this.#length === 0) {
            return null;
        }
        return this.#array[--this.#length];
    }

    shift() {
        if (this.#length === 0) {
            return null;
        }
        const value = this.#array[0];
        this.#length--;
        for (let i = 0; i < this.#length; i++) {
            this.#array[i] = this.#array[i + 1];
        }
        return value;
    }

    unshift(...values) {
        if (this.#length + values.length > this.#capacity) {
            this.#resize(Math.max(this.#length + values.length, this.#capacity * 2));
        }
        for (let i = this.#length - 1; i >= 0; i--) {
            this.#array[i + values.length] = this.#array[i];
        }
        for (let i = 0; i < values.length; i++) {
            this.#array[i] = values[values.length - 1 - i];
            this.#length++;
        }
    }

    get length() {
        return this.#length;
    }
}