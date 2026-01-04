const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Image",
  new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true }
  }, { timestamps:true })
);
