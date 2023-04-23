
export function createBitGetter(array) {
    const resetBit = (elementIndex, bitIndex) => {
        array[elementIndex] = array[elementIndex] & ~(0b1 << bitIndex);
    };

    const setBit = (elementIndex, bitIndex) => {
        array[elementIndex] = array[elementIndex] | (0b1 << bitIndex);
    };

    const assertValidation = (elementIndex, bitIndex) => {
        if (elementIndex >= array.length || elementIndex < 0) {
            throw new Error("Array index out of range!");
        }
        if (bitIndex > 0b111) {
            throw new Error("The bit index must be less than or equal to 7");
        }
        if (bitIndex < 0b0) {
            throw new Error("The bit index must be more than or equal to 0");
        }
    };

    return {
        get(elementIndex, bitIndex) {
            assertValidation(elementIndex, bitIndex);
            const bit = array[elementIndex] & (0b1 << bitIndex);
            return bit >> bitIndex;
        },
        set(elementIndex, bitIndex, newBitValue) {
            assertValidation(elementIndex, bitIndex);
            if (newBitValue === 0) {
                resetBit(elementIndex, bitIndex);
            } else {
                setBit(elementIndex, bitIndex);
            }
        }
    };
}