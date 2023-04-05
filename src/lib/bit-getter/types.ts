
export interface BitGetter {
    get(elementIndex: number, bitIndex: number): number,
    set(elementIndex: number, bitIndex: number, newBitValue: number): void,
}