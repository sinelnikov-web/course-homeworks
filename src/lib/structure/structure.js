import {createMask} from "../binary-encoder/helpers.js";
import {getByteSize, normalizeSchema} from "./helpers.js";

function getOffsets(normalizedSchema) {
    const byteSize = getByteSize(normalizedSchema);
    const offsets = [];
    for (let i = 0, element = 0; element < normalizedSchema.length; i++) {
        let offset = 0;

        while (offset + normalizedSchema[element].size <= byteSize) {
            offsets.push({
                ...normalizedSchema[element],
                index: i,
                offset
            });
            offset += normalizedSchema[element].size;
            element++;
            if (element === normalizedSchema.length) {
                break;
            }
        }
    }

    return offsets;
}

export function Structure(schema) {
    const normalizedSchema = normalizeSchema(schema);
    const offsets = getOffsets(normalizedSchema);
    const byteSize = getByteSize(normalizedSchema);
    const array = new globalThis[`Uint${byteSize}Array`](offsets.at(-1).index + 1);

    const result = {};

    for (let i = 0; i < offsets.length; i++) {
        const {size, key, length, index, offset, type} = offsets[i];
        Object.defineProperty(result, key, {
            enumerable: true,
            get() {
                let value;
                if (type === "utf16" || type === "ascii") {
                    value = "";
                    for (let i = 0; i < length; i++) {
                        const code = (array[index + i] & createMask(size, offset)) >> offset;
                        value += code !== 0 ? String.fromCharCode(code) : "";
                    }
                } else {
                    value = (array[index] & createMask(size, offset)) >> offsets;
                }
                return value;
            },
            set(value) {
                if (type === "utf16" || type === "ascii") {
                    [...value.slice(0, length)].forEach((char, i) => {
                        if (char.length === 2) {
                            array[index + i] |= (char.charCodeAt(0) & createMask(size)) << offset;
                        } else {
                            array[index + i] |= (char.charCodeAt(0) & createMask(size)) << offset;
                        }
                    });
                } else {
                    array[index] |= (value & createMask(size)) << offset;
                }
            }
        });
        if (type === "utf16" || type === "ascii") {
            i += length - 1;
        }
    }

    return result;
}
