import {encode} from "./encode";
import {Schema} from "../types";

describe("encode", function () {
    test("Can encode by schema", () => {
        const schema: Schema = [
            [3, "number"],
            [6, "number"],
            [1, "boolean"],
            [1, "boolean"],
            [16, "ascii"],
        ];
        const data = [2, 3, true, false, "ab"];
        const buffer = encode(data, schema);
        const arr = new Uint8Array(buffer);
        expect(arr[0]).toBe(65);
        expect(arr[1]).toBe(204);
        expect(arr[2]).toBe(44);
        expect(arr[3]).toBe(64);
    });
    test("Throw error when invalid data type", () => {
        const schema: Schema = [
            [3, "number"],
            [6, "number"],
            [1, "boolean"],
            [1, "boolean"],
            [16, "ascii"],
        ];
        const data = [2, 3, true, 4, "ab"];
        expect(() => encode(data, schema)).toThrowError();
    });
    test("Can encode overflowed data", () => {
        const schema: Schema = [
            [3, "number"],
            [6, "number"],
            [1, "boolean"],
            [1, "boolean"],
            [16, "ascii"],
        ];
        const data = [8, 3, true, false, "abc"];
        const buffer = encode(data, schema);
        const arr = new Uint8Array(buffer);
        expect(arr[0]).toBe(1);
        expect(arr[1]).toBe(204);
        expect(arr[2]).toBe(76);
        expect(arr[3]).toBe(96);
    });
    test("Can encode less data than in scheme", () => {
        const schema: Schema = [
            [3, "number"],
            [6, "number"],
            [1, "boolean"],
            [1, "boolean"],
            [16, "ascii"],
        ];
        const data = [2, 3, true];
        const buffer = encode(data, schema);
        const arr = new Uint8Array(buffer);
        expect(arr[0]).toBe(65);
        expect(arr[1]).toBe(192);
        expect(arr[2]).toBe(0);
        expect(arr[3]).toBe(0);
    });
    test("Can encode more data than in scheme", () => {
        const schema: Schema = [
            [3, "number"],
            [6, "number"],
            [1, "boolean"],
            [1, "boolean"],
            [16, "ascii"],
        ];
        const data = [2, 3, true, false, "ab", 12, "test"];
        const buffer = encode(data, schema);
        const arr = new Uint8Array(buffer);
        expect(arr[0]).toBe(65);
        expect(arr[1]).toBe(204);
        expect(arr[2]).toBe(44);
        expect(arr[3]).toBe(64);
    });
});
