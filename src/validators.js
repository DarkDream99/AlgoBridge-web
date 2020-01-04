const numberPattern = RegExp(String.raw`^[+-]?\d+$`);
const variablePattern = RegExp(String.raw`^[a-z]+\w*$`);


function isValidNumber(value) {
    return value.match(numberPattern) !== null;
}


function isValidVariable(value) {
    return value.match(variablePattern) !== null;
}


export {isValidVariable, isValidNumber};
