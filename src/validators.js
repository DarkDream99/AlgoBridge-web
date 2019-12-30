const numberPattern = RegExp('^[+-]?[0-9]+$');

function isValidNumber(value) {
    return value.match(numberPattern) !== null;
}

export {isValidNumber}