import {Dequeue} from "./dequeue.js";

describe("dequeue", function () {
    test("Can append items", () => {
        const queue = new Dequeue();

        queue.push(5, 15);
        expect(queue.head).toBe(5);
        queue.push(12);
        expect(queue.head).toBe(5);
    });
    test("Can pop items", () => {
        const queue = new Dequeue();

        queue.push(5, 15);
        queue.push(12);
        expect(queue.pop()).toBe(12);
        expect(queue.pop()).toBe(15);
        expect(queue.pop()).toBe(5);
        expect(queue.pop()).toBe(null);
    });
    test("Can unshift items", () => {
        const queue = new Dequeue();

        queue.unshift(5, 15);
        expect(queue.head).toBe(15);
        queue.unshift(12);
        expect(queue.head).toBe(12);
    });
    test("Can shift items", () => {
        const queue = new Dequeue();

        queue.push(5, 15);
        queue.push(12);
        expect(queue.shift()).toBe(5);
        expect(queue.pop()).toBe(12);
        expect(queue.shift()).toBe(15);
        expect(queue.pop()).toBe(null);
    });
    test("Can initialize list with iterable", () => {
        const queue = new Dequeue(new Set([1, 3, 5]));

        expect(queue.pop()).toBe(5);
        expect(queue.shift()).toBe(1);
        expect(queue.pop()).toBe(3);
        expect(queue.pop()).toBe(null);
    });
});
