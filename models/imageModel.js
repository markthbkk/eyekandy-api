const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    created_at: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    alt_description: {
      type: String,
      required: false,
    },
    urls: {
      type: Object,
      required: true,
    },
    tags: {
      type: Array,
      required: false,
    },
    current_user_collections: {
      type: Array,
      required: false,
    },
    user: {
      type: Object,
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const image = mongoose.model("Image", imageSchema);

module.exports = image;
