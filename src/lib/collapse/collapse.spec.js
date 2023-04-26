import {collapse} from "./collapse.js";

describe("collapse", function () {
    test("collapse object", () => {
        const obj = {
            a: {
                b: 4,
                c: [1, {f: 5}, [1, 3]]
            }
        };
        const collapsed = collapse(obj);
        expect(collapsed["a.b"]).toBe(4);
        expect(collapsed["a.c.0"]).toBe(1);
        expect(collapsed["a.c.1.f"]).toBe(5);
        expect(collapsed["a.c.2.0"]).toBe(1);
        expect(collapsed["a.c.2.1"]).toBe(3);
    });
});