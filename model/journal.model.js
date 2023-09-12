const { Schema, model } = require("mongoose");

const journalSchema = new Schema(
  {
    author: [{ type: Schema.Types.ObjectId, ref: "User" }],
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
      }
  },
  {
    timestamps: true
  }
);

const Journal = model("Journal", journalSchema);

module.exports = Journal;
