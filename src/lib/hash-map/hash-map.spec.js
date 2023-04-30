import {HashMap} from "./hash-map.js";

describe("Hash map", function () {
    test("Can set in hash map", () => {
        const map = new HashMap();
        const obj = {};
        map.set("foo", "bar");
        map.set("bar", "baz");
        map.set({}, 1);
        map.set(obj, 2);
        map.set(99999, true);

        expect(map.get("foo")).toBe("bar");
        expect(map.get("bar")).toBe("baz");
        expect(map.get({})).toBe(undefined);
        expect(map.get(obj)).toBe(2);
        expect(map.get(99999)).toBe(true);
    });

    test("Can check key in hash map", () => {
        const map = new HashMap();
        const obj = {};
        map.set("foo", "bar");
        map.set("bar", "baz");
        map.set({}, 1);
        map.set(obj, 2);
        map.set(99999, true);

        expect(map.has("foo")).toBe(true);
        expect(map.has("bar")).toBe(true);
        expect(map.has({})).toBe(false);
        expect(map.has(obj)).toBe(true);
        expect(map.has(99999)).toBe(true);
    });

    test("Can get by key after resize", () => {
        const map = new HashMap(5);
        const obj = {};
        map.set("foo", "bar");
        map.set("bar", "baz");
        map.set({}, 1);
        map.set(obj, 2);
        expect(map.size).toBe(4);
        expect(map.fillRate).toBe(0.8);
        map.set(99999, true);
        map.set("test", false);
        expect(map.size).toBe(6);
        expect(map.fillRate).toBe(6 / 11);

        expect(map.get("foo")).toBe("bar");
        expect(map.get("bar")).toBe("baz");
        expect(map.get({})).toBe(undefined);
        expect(map.get(obj)).toBe(2);
        expect(map.get(99999)).toBe(true);
    });

    test("Hash Map doesn't resize when set same key", () => {
        const map = new HashMap(5);
        map.set("foo", "bar");
        map.set("foo", "bar");
        map.set("foo", "bar");
        map.set("foo", "bar");
        map.set("foo", "bar");
        map.set("foo", "bar");
        expect(map.size).toBe(1);
        expect(map.fillRate).toBe(0.2);
    });
});
