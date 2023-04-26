import {Vector} from "./vector.js";

describe("vector", function () {
    test("Can append items", () => {
        const vector = new Vector(Int8Array, {capacity: 10});

        vector.push(5, 15);
        expect(vector.pop()).toBe(15);
        vector.push(12);
        expect(vector.pop()).toBe(12);
    });
    test("Can pop items", () => {
        const vector = new Vector(Int8Array, {capacity: 10});

        vector.push(5, 15);
        vector.push(12);
        expect(vector.pop()).toBe(12);
        expect(vector.pop()).toBe(15);
        expect(vector.pop()).toBe(5);
        expect(vector.pop()).toBe(null);
    });
    test("Can unshift items", () => {
        const vector = new Vector(Int8Array, {capacity: 10});

        vector.push(5, 15);
        vector.unshift(12);
        expect(vector.shift()).toBe(12);
        vector.unshift(15, 32);
        expect(vector.shift()).toBe(32);
    });
    test("Can shift items", () => {
        const vector = new Vector(Int8Array, {capacity: 10});

        vector.push(5, 15);
        vector.unshift(12);
        vector.unshift(15, 32);
        expect(vector.shift()).toBe(32);
        expect(vector.shift()).toBe(15);
        expect(vector.pop()).toBe(15);
        expect(vector.shift()).toBe(12);
    });
});
