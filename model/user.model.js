

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

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
//Returns true if any of the given paths is modified, else false. 
//If it hasn't been modified, the middleware exits early by calling next(), skipping the password hashing process because there's no need to rehash an unchanged password.
  console.log("before saving...");

  bcrypt
  .genSalt(10)
  .then ((salt) => {
    return bcrypt.hash(this.password,salt);
  })
  .then((hashedPassword) => {
    this.password = hashedPassword;
    next();
  })
  .catch((error) => {
    console.error("Error in password hashing:", error);
    next(error); // Pass the error to the next middleware or callback
  });
});


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


const User = model("User", userSchema);
module.exports = User;