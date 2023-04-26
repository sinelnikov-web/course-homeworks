
let sizeMap = new Map([
    ["utf16", 16],
    ["ascii", 8],
    ["u32", 32],
    ["u16", 16],
    ["u8", 8],
    ["boolean", 1]
]);

export function getByteSize(normalizedSchema) {
    return Math.max(...normalizedSchema.map(({type}) => sizeMap.get(type)));
}

export function normalizeSchema(schema) {
    return schema.flatMap(([key, type, length]) => {
        if (type === "utf16" || type === "ascii") {
            return new Array(length).fill(0).map(() => ({
                size: sizeMap.get(type),
                key,
                type,
                length,
            }));
        }
        return {
            size: sizeMap.get(type), key, type, length
        };
    });
}
