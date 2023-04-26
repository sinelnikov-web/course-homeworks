
export function isValid(str) {
    let closeGroups = {
        ")": "(",
        "}": "{",
        "]": "[",
    };
    let stack = [];

    for (let char of str) {
        if (["(", "{", "["].includes(char)) {
            stack.push(char);
        } else if ([")", "}", "]"].includes(char)) {
            if (stack.pop() !== closeGroups[char]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}
