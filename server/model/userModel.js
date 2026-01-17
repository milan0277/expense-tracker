const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    monthlybudget: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  if (this.isModified("Name") && this.Name) { this.Name = this.Name.trim(); }
  if (this.isModified("Email") && this.Email) { this.Email = this.Email.toLowerCase(); }
  if (this.isModified("monthlybudget") && this.monthlybudget <= 0) { throw new Error("Monthly budget must be greater than 0"); }
});


const userModel = mongoose.model("user", userSchema);
module.exports = userModel
