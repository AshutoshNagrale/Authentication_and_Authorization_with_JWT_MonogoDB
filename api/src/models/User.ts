import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("jwtUsers", UserSchema);
export default UserModel;
