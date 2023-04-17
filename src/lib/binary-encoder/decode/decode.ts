import {AllowedTypes, Schema} from "../types";
import {createBitGetter} from "../../bit-getter";
import {BYTE_SIZE} from "../consts";
import {convertValueByType} from "../helpers";

export function decode(buffer: ArrayBuffer, schema: Schema): Array<AllowedTypes> {
    const result: AllowedTypes[] = new Array(schema.length).fill(0) as AllowedTypes[];

    const view = new Uint8Array(buffer);
    const accessor = createBitGetter(view);

    let offset = 0;
    let currentElement = 0;

    for (const [size, type] of schema) {
        let value = "";
        for (let i = 0; i < size; i++) {
            const byteIndex = Math.floor((offset + i) / BYTE_SIZE);
            const bitIndex = 7 - ((offset + i) % BYTE_SIZE);
            value += accessor.get(byteIndex, bitIndex).toString();
        }

        result[currentElement] = convertValueByType(value, type, size);

        currentElement++;
        offset += size;
    }

    return result;
}
