import {Matrix3D} from "../lib/matrix/index.js";
import {Vector} from "../lib/vector/index.js";
import {HashMap} from "../lib/hash-map/index.js";

const uint8Vector = new Vector(Uint8Array, {capacity: 100});

uint8Vector.push(100);    // 1
uint8Vector.push(20, 10); // 3

uint8Vector.pop();        // 10
uint8Vector.shift();      // 100

uint8Vector.unshift(1);          // 2
console.log(uint8Vector.length); // 2

const matrix = new Matrix3D(Uint8Array, {x: 10, y: 10, z: 10});

matrix.set({x: 1, y: 3, z: 2}, 10);
matrix.get({x: 1, y: 3, z: 2}); // 10

const map = new HashMap(120);

map.set("foo", 1);
map.set(42, 10);
map.set(document, 100);

console.log(map.get(42));          // 10
console.log(map.has(document));    // true
console.log(map.delete(document)); // 10
console.log(map.has(document));    // false
