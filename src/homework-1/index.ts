import {createBitGetter} from "../lib/bit-getter";

const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));

const num: number = "dsf";

// Второй параметр это порядок бита "справа-налево"
console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0

bitGetter.set(0, 1, 0);
console.log(bitGetter.get(0, 1)); // 0
