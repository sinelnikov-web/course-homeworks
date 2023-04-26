export class Matrix3D {
    #array;
    #x;
    #y;
    #z;
    constructor(TypedArrayClass, {x, y, z}) {
        if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
            throw new Error("TypeError: x, y, z must be a numbers");
        }
        this.#x = x;
        this.#y = y;
        this.#z = z;
        this.#array = new TypedArrayClass(x * y * z);
    }

    #getIndex({x, y, z}) {
        return this.#y * this.#x * y + this.#x * x + z;
    }

    get(coordinates) {
        return this.#array[this.#getIndex(coordinates)];
    }

    set(coordinates, value) {
        this.#array[this.#getIndex(coordinates)] = value;
    }
}