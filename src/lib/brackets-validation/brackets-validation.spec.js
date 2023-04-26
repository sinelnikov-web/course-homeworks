import {isValid} from "./brackets-validation.js";

describe("brackets validation", function () {
    test("validate brackets", () => {
        expect(isValid("(hello{world} and [me])")).toBe(true);  // true
        expect(isValid("(hello{world)} and [me])")).toBe(false); // false
        expect(isValid(")")).toBe(false);
    });
});