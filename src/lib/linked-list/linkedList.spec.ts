import {LinkedList} from "./linkedList";

describe("linked-list", function () {
    test("Can add items", () => {
        const linkedList = new LinkedList();

        linkedList.add(1);
        linkedList.add(3);
        linkedList.add(2);

        expect(linkedList.first.value).toBe(1);
        expect(linkedList.last.value).toBe(2);
        expect(linkedList.first.next.value).toBe(3);
        expect(linkedList.first.next.next.prev.value).toBe(3);
        expect(linkedList.last.next).toBe(null);
    });
    test("Can pop items", () => {
        const linkedList = new LinkedList();

        linkedList.add(1);
        linkedList.add(3);
        linkedList.add(2);

        expect(linkedList.pop()).toBe(2);
        expect(linkedList.pop()).toBe(3);
        expect(linkedList.pop()).toBe(1);
        expect(linkedList.pop()).toBe(null);
    });
    test("Can iterate over list", () => {
        const expectedValues = [1, 3, 5];
        const linkedList = new LinkedList(new Set(expectedValues));
        let i = 0;
        for (const value of linkedList) {
            expect(value).toBe(expectedValues[i++]);
        }
    });
    test("Can initialize list with iterable", () => {
        const linkedList = new LinkedList(new Set([1, 3, 5]));

        expect(linkedList.first.value).toBe(1);
        expect(linkedList.last.value).toBe(5);
        expect(linkedList.first.next.value).toBe(3);
        expect(linkedList.first.next.next.prev.value).toBe(3);
        expect(linkedList.last.next).toBe(null);
    });
});
