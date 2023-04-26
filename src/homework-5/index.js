import {collapse} from "../lib/collapse/index.js";
import {isValid} from "../lib/brackets-validation/index.js";

const obj = {
    a: {
        b: [1, 2],
        "": {c: 2}
    }
};

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
console.log(collapse(obj));


console.log(isValid("(hello{world} and [me])"));  // true
console.log(isValid("(hello{world)} and [me])")); // false
console.log(isValid(")"));                        // false
