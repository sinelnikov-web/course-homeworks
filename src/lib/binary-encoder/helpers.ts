export function cutValue(value: any, bitCount: number): number {
    return value & (2 ** 32 - 1 >>> 32 - bitCount);
}

export function convertToNumber(value: unknown): number {
    if (typeof value === "string") {
        return parseInt([...value].reduce((acc: string, char: string, index) => acc + cutValue(char.charCodeAt(0), 8).toString(2).padStart(8, '0'), ''), 2);
    }
    return Number(value);
}
