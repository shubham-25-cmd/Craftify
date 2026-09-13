import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//hashPassword before saving
userSchema.pre('save',async()=>{
  if(!this.isModified('password')) return;
  const salt = bcrypt.genSalt(10)
  this.password= bcrypt.hash(this.password,salt)
})
//compare password method
userSchema.method.comparePassword = async function (password){
  return bcrypt.compare(password,this.password)
}
export default mongoose.model("User", userSchema);