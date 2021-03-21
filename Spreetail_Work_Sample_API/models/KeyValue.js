const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const keyValueSchema = new Schema({
key: {
  type: String,
  required: true
 },
value: {
  type: Array,
  required: true
 },
});

const KeyValue = mongoose.model("KeyValue", keyValueSchema);
module.exports = KeyValue;