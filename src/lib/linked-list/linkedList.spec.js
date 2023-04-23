import {LinkedList} from "./linkedList.js";

describe("linked-list", function () {
    test("Can append items", () => {
        const linkedList = new LinkedList();

        linkedList.appendRight(1);
        linkedList.appendRight(3);
        linkedList.appendLeft(2);
        linkedList.appendLeft(4);
        linkedList.appendLeft(5);

        expect(linkedList.first?.value).toBe(5);
        expect(linkedList.last?.value).toBe(3);
        expect(linkedList.first?.next?.value).toBe(4);
        expect(linkedList.first?.next?.next?.prev?.value).toBe(4);
        expect(linkedList.last?.next).toBe(null);
    });
    test("Can pop items", () => {
        const linkedList = new LinkedList();

        linkedList.appendRight(1);
        linkedList.appendRight(3);
        linkedList.appendLeft(2);
        linkedList.appendLeft(4);
        linkedList.appendLeft(5);

        expect(linkedList.popRight()).toBe(3);
        expect(linkedList.popRight()).toBe(1);
        expect(linkedList.popLeft()).toBe(5);
        expect(linkedList.popRight()).toBe(2);
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

        expect(linkedList.first?.value).toBe(1);
        expect(linkedList.last?.value).toBe(5);
        expect(linkedList.first?.next?.value).toBe(3);
        expect(linkedList.first?.next?.next?.prev?.value).toBe(3);
        expect(linkedList.last?.next).toBe(null);
    });
});
