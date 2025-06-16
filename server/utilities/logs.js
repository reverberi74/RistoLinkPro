const log = (message, type = "log") => {
    return console[type](`[Server]: ${message}`);
}

module.exports = {
    log,
}