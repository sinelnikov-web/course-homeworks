import {encode} from "./encode.js";

describe("encode", function () {
    test("Can encode by schema", () => {
        const schema = [
            [3, "number"],
            [6, "number"],
            [1, "boolean"],
            [1, "boolean"],
            [16, "ascii"],
        ];
        const data = [2, 3, true, false, "ab"];
        const buffer = encode(data, schema);
        const arr = new Uint8Array(buffer);
        expect(arr[0]).toBe(2);
        expect(arr[1]).toBe(67);
        expect(arr[2]).toBe(97);
        expect(arr[3]).toBe(98);
    });
    test("Throw error when invalid data type", () => {
        const schema = [
            [3, "number"],
            [6, "number"],
            [1, "boolean"],
            [1, "boolean"],
            [16, "ascii"],
        ];
        const data = [2, 3, true, 4, "ab"];
        expect(() => encode(data, schema)).toThrowError();
    });
    test("Can't encode overflowed data", () => {
        const schema = [
            [3, "number"],
            [6, "number"],
            [1, "boolean"],
            [1, "boolean"],
            [16, "ascii"],
        ];
        const data = [8, 3, true, false, "abc"];
        const buffer = encode(data, schema);
        const arr = new Uint8Array(buffer);
        expect(arr[0]).toBe(0);
        expect(arr[1]).toBe(67);
        expect(arr[2]).toBe(97);
        expect(arr[3]).toBe(98);
    });
    test("Can't encode less data than in scheme", () => {
        const schema = [
            [3, "number"],
            [6, "number"],
            [1, "boolean"],
            [1, "boolean"],
            [16, "ascii"],
        ];
        const data = [2, 3, true];
        expect(() => encode(data, schema)).toThrowError("Data doesn't match scheme at 1 byte, 7 offset!");
    });
    test("Can encode more data than in scheme", () => {
        const schema = [
            [3, "number"],
            [6, "number"],
            [1, "boolean"],
            [1, "boolean"],
            [16, "ascii"],
        ];
        const data = [2, 3, true, false, "ab", 12, "test"];
        const buffer = encode(data, schema);
        const arr = new Uint8Array(buffer);
        expect(arr[0]).toBe(2);
        expect(arr[1]).toBe(67);
        expect(arr[2]).toBe(97);
        expect(arr[3]).toBe(98);
    });
});
