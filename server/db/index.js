const mongoose = require("mongoose");
const { log } = require("../utilities/logs");
const BusinessProfile = require("./models/BusinessProfile");

const { DB_URI } = process.env;

const connect = async () => {
    try {
        await mongoose.connect(DB_URI);

        log("Database connected...");
    } catch (err) {
        log(err.message, "error");
    }
}

const disconnect = async () => {
    try {
        await mongoose.disconnect();

        log("Database disconnected...");
    } catch (err) {
        log(err.message, "error");
    }
}

const models = {
    User: require("./models/User"),
    Address: require("./models/Address"),
    Category: require("./models/Category"),
    Review: require("./models/Review"),
    Label: require("./models/Label"),
    Product: require("./models/Product"),
    BusinessProfile: require("./models/BusinessProfile"),
    Order: require("./models/Order"),
}

module.exports = {
    connect,
    disconnect,
    ...models,
}