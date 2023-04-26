import {LinkedList} from "../lib/linked-list/index.js";

const list = new LinkedList();

list.appendRight(1);
list.appendRight(2);
list.appendRight(3);
list.appendRight(4);
list.appendRight(5);
list.appendRight(6);

for (const value of list) {
    console.log(value); // 1 2 3
    if (value === 3) {
        break;
    }
}

for (const value of list) {
    console.log(value); // ничего
}

import {Structure} from "../lib/structure/index.js";

const s = Structure([
    ["firstName", "utf16", 10],
    ["lastName", "utf16", 10],
    ["age", "u16"],
]);

s.firstName = "Jack 😀";
s.age = 256;
s.lastName = "Black 🇮🇹";

console.log(s.firstName); // Jack 😀
console.log(s.lastName); // Black 🇮🇹
console.log(s.age); // 33
