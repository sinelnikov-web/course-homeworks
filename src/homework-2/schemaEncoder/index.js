// import {decode, encode} from "../../lib/binary-encoder";
// import {Schema} from "lib/binary-encoder/types";
//
// const data = [8, 3, true, false, "abc"];
// const buffer = encode(data, schema);
//
// console.log(decode(
//     buffer,
//     [
//         [3, "number"],
//         [6, "number"],
//         [1, "boolean"],
//         [1, "boolean"],
//         [16, "ascii"],
//     ]
// )); // [0, 3, true, false, 'bc'

import {encode} from "../../lib/binary-encoder/index.js";
import {decode} from "../../lib/binary-encoder/index.js";

const schema = [
    [3, "number"],
    [2, "number"],
    [1, "boolean"],
    [1, "boolean"],
    [16, "ascii"],
];



console.log(decode(encode([
    2,
    3,
    true,
    false,
    "ab",
], schema), schema));