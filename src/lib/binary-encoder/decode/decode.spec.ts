import {encode} from '../encode/encode';
import {decode} from './decode';
import {Schema} from "../types";

describe('decode', function () {
    test('Can decode by schema', () => {
        const schema: Schema = [
            [3, 'number'],
            [6, 'number'],
            [1, 'boolean'],
            [1, 'boolean'],
            [16, 'ascii'],
        ]
        const data = [2, 3, true, false, 'ab'];
        const buffer = encode(data, schema);
        const result = decode(buffer, schema);
        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(true);
        expect(result[3]).toBe(false);
        expect(result[4]).toBe('ab');
    })
    test('Can decode overflowed data', () => {
        const schema: Schema = [
            [3, 'number'],
            [6, 'number'],
            [1, 'boolean'],
            [1, 'boolean'],
            [16, 'ascii'],
        ]
        const data = [8, 3, true, false, 'abc'];
        const buffer = encode(data, schema);
        const result = decode(buffer, schema);
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(true);
        expect(result[3]).toBe(false);
        expect(result[4]).toBe('bc');
    })
    test("Can decode less data than in scheme", () => {
        const schema: Schema = [
            [3, 'number'],
            [6, 'number'],
            [1, 'boolean'],
            [1, 'boolean'],
            [16, 'ascii'],
        ]
        const data = [2, 3, true];
        const buffer = encode(data, schema);
        const result = decode(buffer, schema);
        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(true);
        expect(result[3]).toBe(false);
        expect(result[4]).toBe('');
    })
    test("Can decode more data than in scheme", () => {
        const schema: Schema = [
            [3, 'number'],
            [6, 'number'],
            [1, 'boolean'],
            [1, 'boolean'],
            [16, 'ascii'],
        ]
        const data = [2, 3, true, false, 'ab', 12, 'test'];
        const buffer = encode(data, schema);
        const result = decode(buffer, schema);
        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(true);
        expect(result[3]).toBe(false);
        expect(result[4]).toBe('ab');
    })
});
