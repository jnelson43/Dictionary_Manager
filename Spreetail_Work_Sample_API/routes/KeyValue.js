const express = require("express");
const router = express.Router();
const KeyValue = require("../models/KeyValue");

// Get all keys
router.get("/", async (req, res) => {
    try {
      const keyValues = await KeyValue.find()
      res.json(keyValues)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });

//Get by key
router.get("/:key", getKeyValue, (req, res) => {
  res.json(res.keyValue);
});

// Create key
router.post("/", async (req, res) => {
    const keyValue = new KeyValue({
        key: req.body.key,
        value: req.body.value
    });
    try {
        const newKeyValue = await keyValue.save();
        res.status(201).json({ newKeyValue });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Patch key
router.patch("/:key", getKeyValue, async (req, res) => {
  if (req.body.key != null) {
    res.keyValue.key = req.body.key;
  }
  if (req.body.value != null) {
    res.keyValue.value = req.body.value;
  }
  try {
    const updatedKeyValue = await res.keyValue.save();
    res.json(updatedKeyValue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete key
router.delete("/:key", getKeyValue, async (req, res) => {
  try {
    await KeyValue.findOneAndDelete({ key: req.params.key });
    res.json({ message: "Key value pair with the key '" + req.params.key + "' has been deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getKeyValue(req, res, next) {
    let keyValue;
    try {
      keyValue = await KeyValue.findOne({ key: req.params.key });
      if (keyValue == null) {
        return res.json({ message: "Cannot find key '" + req.params.key + "'"});
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.keyValue = keyValue;
    next();
  }

module.exports = router;