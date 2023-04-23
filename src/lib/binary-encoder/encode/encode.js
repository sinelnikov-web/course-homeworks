import {createMask, getByteSize, getOffsets, normalizeSchema} from "../helpers.js";
import {assertDataType} from "../validation.js";

export function encode(data, schema) {
    const normalizedSchema = normalizeSchema(schema);
    const byteSize = getByteSize(normalizedSchema);
    const offsets = getOffsets(normalizedSchema);
    const array = new globalThis[`Uint${byteSize}Array`](offsets.at(-1)?.index + 1);

    function* dataIterator() {
        for (const item of data) {
            if (typeof item === "string") {
                yield* item;
            }
            yield item;
        }
    }
    const iter = dataIterator();
    offsets.forEach(({size, offset, index, type}) => {
        const {done, value} = iter.next();
        assertDataType(typeof value, type);
        if (done) {
            throw new Error(`Data doesn't match scheme at ${index} byte, ${offset} offset!`);
        }
        const bytes = type === "ascii" ? value.charCodeAt(0) : value;
        array[index] |= (bytes & createMask(size)) << offset;
    });

    return array.buffer;
}