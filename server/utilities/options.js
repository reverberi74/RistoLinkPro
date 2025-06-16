const mergeOptions = (defaultOptions, options) => {
    return { ...defaultOptions, ...options };
}

module.exports = {
    mergeOptions,
}