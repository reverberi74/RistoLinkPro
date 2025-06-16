require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");
const { log } = require("./utilities/logs");
const db = require("./db");

const { SERVER_PORT } = process.env;

app.use(cors());
app.use(helmet());

app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static("./assets"));


app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.listen(SERVER_PORT, async () => {
    log(`Server up and running on port ${SERVER_PORT}...`);

    await db.connect();
});