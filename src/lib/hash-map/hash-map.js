import {getObjectHash, getStringHash, nextPrime} from "./helpers.js";
import {LinkedList} from "../linked-list/index.js";

export class HashMap {
    #buffer;
    #fillRate;
    #length = 0;

    constructor(bufferSize = 31, config = {}) {
        const {getHash, fillRate = 0.7} = config;
        this.#buffer = new Array(bufferSize);
        this.#fillRate = fillRate;
        if (getHash) {
            this.#getHash = getHash;
        }
    }

    get(key) {
        const currentCell = this.#buffer[this.#getHash(key) % this.#buffer.length];
        if (currentCell === undefined) {
            return;
        }
        let currentItem = currentCell.first;
        while (currentItem && currentItem.value.key !== key) {
            currentItem = currentItem.next;
        }
        return currentItem !== null ? currentItem.value.value : undefined;
    }

    set(key, value) {
        if (this.#length / this.#buffer.length >= this.#fillRate) {
            this.#resize();
        }
        const hash = this.#getHash(key) % this.#buffer.length;
        if (this.#buffer[hash] === undefined) {
            this.#length++;
            this.#buffer[hash] = new LinkedList();
            this.#buffer[hash].appendRight({key, value});
        } else {
            let currentItem = this.#buffer[hash].first;
            while (currentItem) {
                if (currentItem.value.key === key) {
                    break;
                }
                currentItem = currentItem.next;
            }
            if (currentItem) {
                currentItem.value.value = value;
            } else {
                this.#length++;
                this.#buffer[hash].appendRight({key, value});
            }
        }
    }

    has(key) {
        const hash = this.#getHash(key) % this.#buffer.length;
        const currentCell = this.#buffer[hash];
        if (currentCell === undefined) {
            return false;
        }
        let currentItem = currentCell.first;
        while (currentItem) {
            const {key: currentKey} = currentItem.value;
            if (key === currentKey) {
                return true;
            }
            currentItem = currentItem.next;
        }
        return false;
    }

    get size() {
        return this.#length;
    }

    get fillRate() {
        return this.#length / this.#buffer.length;
    }

    #resize() {
        const oldBuffer = this.#buffer;
        this.#length = 0;
        this.#buffer = new Array(nextPrime(this.#buffer.length * 2));
        for (let cell of oldBuffer) {
            if (cell === undefined) {
                continue;
            }
            let current = cell.first;
            while (current) {
                const {key, value} = current.value;
                this.set(key, value);
                current = current.next;
            }
        }
    }

    #getHash(key) {
        switch (typeof key) {
            case "number": {
                return key;
            }
            case "string": {
                return getStringHash(key, this.#buffer.length);
            }
            case "object": {
                return getObjectHash(key);
            }
            default: {
                throw new Error(`Unhashable type ${typeof key}`);
            }
        }
    }
}