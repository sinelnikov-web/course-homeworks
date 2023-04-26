import {Matrix3D} from "./matrix3d.js";

describe("3D Matrix", function () {
    test("Can set and get items", () => {
        const matrix = new Matrix3D(Int8Array, {x: 4, y: 4, z: 4});

        matrix.set({x: 1, y: 3, z: 2}, 10);
        expect(matrix.get({x: 1, y: 3, z: 2})).toBe(10);
    });
});