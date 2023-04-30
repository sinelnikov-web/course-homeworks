const hashSymbol = Symbol();

export function isPrime(num) {
    for (let i = 2; i < Math.floor(Math.sqrt(num)); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

export function nextPrime(num) {
    while (!isPrime(num)) {
        num++;
    }
    return num;
}

export function getStringHash(str, bufferSize) {
    return str.split("").reduce((acc, char) => (acc * 27 + char.charCodeAt(0)) % bufferSize, 0);
}

export function getObjectHash(obj) {
    if (obj[hashSymbol] != null) {
        return obj[hashSymbol];
    }
    obj[hashSymbol] = Math.floor(Math.random() * (2 ** 32 - 1));

    return obj[hashSymbol];
}