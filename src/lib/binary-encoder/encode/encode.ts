import {createBitGetter} from "../..//bit-getter";
import {AllowedTypes, Schema} from "../types";
import {BYTE_SIZE} from "../consts";
import {assertDataType} from "../validation";
import {cutValue, convertToNumber} from "../helpers";

export function encode(data: Iterable<AllowedTypes>, schema: Schema): ArrayBuffer {
    const dataIter = data[Symbol.iterator]();
    const schemaIter = schema[Symbol.iterator]();

    const schemaBitsCount = schema.reduce((acc, dataSpec) => acc + dataSpec[0], 0);
    const bytesCount = Math.ceil( schemaBitsCount / BYTE_SIZE);
    const buffer = new ArrayBuffer(bytesCount);
    const view = new Uint8Array(buffer);
    const accessor = createBitGetter(view);

    let dataNext = dataIter.next();
    let schemaNext = schemaIter.next();

    let bitOffset = -1;
    let encodedData = 0b0;
    let encodedBits = 0;

    while (!dataNext.done && !schemaNext.done) {
        const {value} = dataNext;
        const {value: [size, type]} = schemaNext;
        assertDataType(typeof value, type);
        const numberValue = cutValue(convertToNumber(value), size);

        bitOffset += size;
        encodedData <<= bitOffset;
        encodedData |= numberValue;
        bitOffset = 0;
        encodedBits += size;

        dataNext = dataIter.next();
        schemaNext = schemaIter.next();
    }

    const encodedDataString = encodedData.toString(2).padStart(encodedBits, "0").padEnd(BYTE_SIZE * bytesCount, "0");

    for (let i = 0; i < encodedDataString.length; i++) {
        const byteIndex = Math.floor(i / BYTE_SIZE);
        const bitIndex = 7 - i % BYTE_SIZE;
        accessor.set(byteIndex, bitIndex, parseInt(encodedDataString[i]));
    }

    return view.buffer;
}
