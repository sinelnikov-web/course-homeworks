import {SchemaDataType} from "./types";
import {BYTE_SIZE} from "./consts";

export function cutValue(value: any, bitCount: number): number {
    return value & (2 ** 32 - 1 >>> 32 - bitCount);
}

export function convertToNumber(value: unknown): number {
    if (typeof value === "string") {
        return parseInt([...value].reduce((acc: string, char: string, index) => acc + cutValue(char.charCodeAt(0), 8).toString(2).padStart(8, '0'), ''), 2);
    }
    return Number(value);
}

export function convertValueByType(value: string, type: SchemaDataType, size: number) {
    if (type === 'boolean') {
        return Boolean(parseInt(value, 2));
    }
    if (type === 'number') {
        return parseInt(value, 2);
    }
    if (type === 'ascii') {
        let str = '';
        for (let i = 0; i < Math.ceil(size / BYTE_SIZE); i++) {
            const charCode = parseInt(value.slice(BYTE_SIZE * i, BYTE_SIZE * (i + 1)), 2)
            if (charCode !== 0) {
                str += String.fromCharCode(charCode);
            }
        }
        return str;
    }
}