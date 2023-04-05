import {BitGetter} from './types';

export function createBitGetter(array: Uint8Array): BitGetter {
    const resetBit = (elementIndex: number, bitIndex: number) => {
        array[elementIndex] = array[elementIndex] & ~(0b1 << bitIndex);
    }

    const setBit = (elementIndex: number, bitIndex: number) => {
        array[elementIndex] = array[elementIndex] | (0b1 << bitIndex);
    }

    return {
        get(elementIndex: number, bitIndex: number): number {
            if (elementIndex >= array.length) {
                throw new Error('Array index out of range!');
            }
            if (bitIndex > 0b111) {
                throw new Error('The bit index must be less than or equal to 7');
            }
            const bit = array[elementIndex] & (0b1 << bitIndex);
            return bit === 0 ? 0 : 1;
        },
        set(elementIndex: number, bitIndex: number, newBitValue: number): void {
            if (elementIndex >= array.length) {
                throw new Error('Array index out of range!');
            }
            if (bitIndex > 0b111) {
                throw new Error('The bit index must be less than or equal to 7');
            }
            if (newBitValue === 0) {
                resetBit(elementIndex, bitIndex);
            } else {
                setBit(elementIndex, bitIndex);
            }
        }
    }
}