const isValidJson = (input) => {
    return (/^[\],:{}\s]*$/.test(input.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
};

module.exports = {
    isValidJson
};