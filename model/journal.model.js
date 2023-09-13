const { Schema, model } = require("mongoose");

const journalSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    content: String,
    createdAt: {
        type: Date,
        // default: Date.now
      }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.createdAtFormatted = formatDate(ret.createdAt);
        delete ret.createdAt; // Remove the original createdAt field
      }
    }
  }
);

function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

const Journal = model("Journal", journalSchema);

module.exports = Journal;
