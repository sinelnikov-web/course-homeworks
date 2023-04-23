
export function normalizeSchema(schema) {
    return schema.flatMap(([size, type]) => {
        if (type === "ascii") {
            return new Array(size / 8)
                .fill(0)
                .map((v, i) => ({size: 8, type, partial: i !== 0}));
        }
        return {size, type, partial: false};
    });
}

export function getByteSize(normalizedSchema) {
    return Math.max(...normalizedSchema.map(({size}) => size <= 8 ? 8 : size <= 16 ? 16 : 32));
}

export function getOffsets(normalizedSchema) {
    const byteSize = getByteSize(normalizedSchema);
    const offsets = [];

    loop: for (let i = 0, index = 0; i < normalizedSchema.length; index++) {
        let offset = 0;

        while (offset + normalizedSchema[i].size <= byteSize) {
            const {size, type, partial} = normalizedSchema[i];
            offsets.push({size, type, index, offset, partial});
            offset += size;
            i++;

            if (i === normalizedSchema.length) {
                break loop;
            }
        }
    }
    return offsets;
}

export function createMask(size, offset = 0) {
    return (2 ** 32 - 1 >>> 32 - size) << offset;
}
