import {createMask, getByteSize, getOffsets, normalizeSchema} from "../helpers.js";

export function decode(buffer, schema) {
    const normalizedSchema = normalizeSchema(schema);
    const byteSize = getByteSize(normalizedSchema);
    const offsets = getOffsets(normalizedSchema);
    const array = new globalThis[`Uint${byteSize}Array`](buffer);

    const result = [];

    offsets.forEach(({size, offset, index, type, partial}) => {
        const value = (array[index] & createMask(size, offset)) >> offset;

        switch (type) {
        case "number": {
            result.push(value);
            break;
        }
        case "boolean": {
            result.push(Boolean(value));
            break;
        }
        case "ascii": {
            if (partial) {
                result[result.length - 1] += String.fromCharCode(value);
            } else {
                result.push(String.fromCharCode(value));
            }
            break;
        }
        default: {
            throw new Error(`Invalid schema type: ${type}`);
        }
        }
    });

    return result;
}

