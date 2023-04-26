import {Stack} from "./stack.js";

describe("stack", function () {
    test("Can push items", () => {
        const stack = new Stack(Int8Array, 5);

        stack.push(5, 15);
        expect(stack.head).toBe(15);
        stack.push(12);
        expect(stack.head).toBe(12);
    });
    test("Can pop items", () => {
        const stack = new Stack(Int8Array, 5);

        stack.push(5, 15);
        stack.push(12);
        expect(stack.pop()).toBe(12);
        expect(stack.pop()).toBe(15);
        expect(stack.pop()).toBe(5);
        expect(() => stack.pop()).toThrowError("Stack is empty!");
    });
    test("Throw error when overflow", () => {
        const stack = new Stack(Int8Array, 5);

        stack.push(5, 15);
        stack.push(12, 4);
        stack.push(7);
        expect(() => stack.push(8)).toThrowError("Too many items, stack will overflowed!!!");
    });
});
