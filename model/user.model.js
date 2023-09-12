const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: [true, "Username is already taken."],
      trim: true,
      // match: [
      //   /^[A-Za-z][A-Za-z0-9_]{5,21}$/,
      //   "Your username should be at least 6 characters long, start with a letter, and can include letters, numbers, or underscores.",
      // ],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
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
    journals: [{ type: Schema.Types.ObjectId, ref: "Journal" }],
  },
  {
    timestamps: true,
  }
);
//This line sets up a Mongoose middleware function that will be executed before a document of the userSchema is saved to the database. The "save" argument specifies that this middleware should run before a save operation is performed on a user document.

//Your pre-save middleware ensures that any time a new password is set or an existing password is modified during user registration or updates, it gets hashed automatically before being saved to the database. This way, the stored passwords in the database are always in hashed form for security reasons.

// userSchema.pre("save", function (next) {
//   if (!this.isModified("password")) return next();
//   //Returns true if any of the given paths is modified, else false.
//   //If it hasn't been modified, the middleware exits early by calling next(), skipping the password hashing process because there's no need to rehash an unchanged password.
//   console.log("before saving...");

//   bcrypt
//     .genSalt(10)
//     .then((salt) => {
//       return bcrypt.hash(this.password, salt);
//     })
//     .then((hashedPassword) => {
//       this.password = hashedPassword;
//       next();
//     })
//     .catch((error) => {
//       console.error("Error in password hashing:", error);
//       next(error); // Pass the error to the next middleware or callback
//     });
// });

//In Mongoose, you can add custom methods to your schema
// using the methods property.
// userSchema.methods.comparePassword =
// function (password) {
//   return bcrypt
//   .compare(password, this.password)

//   .then((isMatched) => {return isMatched})
//   // Returns a boolean indicating whether the passwords match
//   .catch ((error) => { throw error});
// };

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = model("User", userSchema);
module.exports = User;
