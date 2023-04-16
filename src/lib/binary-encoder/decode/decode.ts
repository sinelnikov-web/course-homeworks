import {AllowedTypes, Schema} from "../types";
import {createBitGetter} from "../../bit-getter";
import {BYTE_SIZE} from "../consts";

export function decode(buffer: ArrayBuffer, schema: Schema): Array<AllowedTypes> {
    const view = new Uint8Array(buffer);
    const accessor = createBitGetter(view);
    const result: AllowedTypes[] = new Array(schema.length).fill(0) as AllowedTypes[];
    let offset = 0;
    let currentElement = 0;
    for (let [size, type] of schema) {
        let value = '';
        for (let i = 0; i < size; i++) {
            const byteIndex = Math.floor((offset + i) / BYTE_SIZE);
            const bitIndex = 7 - ((offset + i) % BYTE_SIZE);
            value += accessor.get(byteIndex, bitIndex).toString();
        }
        switch (type) {
            case "number": {
                result[currentElement] = parseInt(value, 2);
                break;
            }
            case "boolean": {
                result[currentElement] = Boolean(parseInt(value, 2));
                break;
            }
            case "ascii": {
                let str = '';
                for (let i = 0; i < Math.ceil(size / BYTE_SIZE); i++) {
                    const charCode = parseInt(value.slice(BYTE_SIZE * i, BYTE_SIZE * (i + 1)), 2)
                    if (charCode !== 0) {
                        str += String.fromCharCode(charCode);
                    }
                }
                result[currentElement] = str;
                break;
            }
            default: {
                throw new Error(`TypeError: type ${type} is not assignable to types number, boolean, ascii.`)
            }
        }
        currentElement++;
        offset += size;
    }

    return result;
}
