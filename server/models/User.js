import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Active :{ type: Boolean, default: false },
  isdelete :{ type: Boolean, default: false  },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update.password || typeof update.password !== "string") return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(update.password, salt);
    update.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
const adminuser = mongoose.model("user", userSchema);

export default adminuser;
