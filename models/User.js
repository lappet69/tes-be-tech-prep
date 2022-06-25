import mongoose from "mongoose";
import bcrypt from "bcrypt";



const User = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);
const checkPassword = (password) => bcrypt.compareSync(password, this.password);
User.methods.authenticate = async ({ email, password }) => {
  try {
    const user = await this.findOne({ where: { email } });
    if (!user) {
      return Promise.reject("user not found");
    }
    const isPasswordValid = user.checkPassword(password);
    if (!isPasswordValid) {
      return Promise.reject("wrong password");
    }

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default mongoose.model("Users", User);
