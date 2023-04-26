import {encode} from "../../lib/binary-encoder/index.js";
import {decode} from "../../lib/binary-encoder/index.js";

const schema = [
    [3, "number"],
    [2, "number"],
    [1, "boolean"],
    [1, "boolean"],
    [64, "ascii"],
];

const encodedData = encode([
    2,
    3,
    true,
    false,
    "Hello!!!",
], schema);

console.log(encodedData);

console.log(decode(encodedData, schema));

Function("class T { get name() {}; set name(value) {}; }")();