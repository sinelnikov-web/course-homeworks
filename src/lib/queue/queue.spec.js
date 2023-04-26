import {Queue} from "./queue.js";

describe("queue", function () {
    test("Can append items", () => {
        const queue = new Queue();

        queue.push(5, 15);
        expect(queue.head).toBe(5);
        queue.push(12);
        expect(queue.head).toBe(5);
    });
    test("Can pop items", () => {
        const queue = new Queue();

        queue.push(5, 15);
        queue.push(12);
        expect(queue.pop()).toBe(5);
        expect(queue.pop()).toBe(15);
        expect(queue.pop()).toBe(12);
        expect(queue.pop()).toBe(null);
    });
    test("Can initialize list with iterable", () => {
        const queue = new Queue(new Set([1, 3, 5]));

        expect(queue.pop()).toBe(1);
        expect(queue.pop()).toBe(3);
        expect(queue.pop()).toBe(5);
        expect(queue.pop()).toBe(null);
    });
});
