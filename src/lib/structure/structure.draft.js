import {Structure} from "./structure.js";

describe("structure", function () {
    test("Can set items", () => {
        const s = Structure([
            ["firstName", "utf16", 10],
            ["lastName", "utf16", 10],
            ["age", "u16"],
        ]);

        s.firstName = "Maxim";
        s.lastName = "Синельников";
        s.age = 21;

        expect(s.firstName).toBe("Maxim");
        expect(s.lastName).toBe("Синельников");
        expect(s.age).toBe(21);
    });
    test("Can set overflowed data", () => {
        const s = Structure([
            ["firstName", "utf16", 10],
            ["lastName", "utf16", 5],
            ["age", "u8"],
        ]);

        s.firstName = "VeryLongName";
        s.lastName = "Синельников";
        s.age = 256;

        expect(s.firstName).toBe("VeryLongNa");
        expect(s.lastName).toBe("Синел");
        expect(s.age).toBe(0);
    });
});
