require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use(express.json());

const keyValueRouter = require("./routes/KeyValue");
app.use("/KeyValue", keyValueRouter);

app.listen(process.env.PORT, () => console.log(`server has started at port ${process.env.PORT}`));