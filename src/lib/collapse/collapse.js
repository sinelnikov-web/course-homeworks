export function collapse(obj) {
    const result = {};

    traverse(obj);

    function traverse(value, currentKey="") {
        if (typeof value !== "object" || value == null || value instanceof Function) {
            result[currentKey] = value;
            return;
        }
        if (!Array.isArray(value) && value[Symbol.iterator]) {
            value = [...value];
        }
        for (let key in value) {
            let newKey = currentKey === "" ? key : currentKey + `.${key}`;
            traverse(value[key], newKey);
        }
    }

    return result;
}
