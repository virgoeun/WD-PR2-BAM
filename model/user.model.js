const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: [true, "Username is already taken."],
      match: [
        /^[A-Za-z][A-Za-z0-9_]{5,21}$/,
        "Your username should be at least 6 characters long, start with a letter, and can include letters, numbers, or underscores.",
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      match: [
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      ],
    },
    avatar: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    },
 
    fullName: {
      type: String,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema);
module.exports = User;
