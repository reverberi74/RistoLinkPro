const { log } = require("./logs");
const { mergeOptions } = require("./options");

const DEFAULT_ERROR_OPTIONS = {
    code: 500,
    message: "Internal Server Error",
}

const outError = (res, error, options = DEFAULT_ERROR_OPTIONS) => {
    options = mergeOptions(DEFAULT_ERROR_OPTIONS, options);

    console.log(error);

    return res.status(options.code).json({ message: options.message });
}

module.exports = {
    outError
}