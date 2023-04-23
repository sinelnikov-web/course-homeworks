import {LinkedList} from "src/lib/linked-list";

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
