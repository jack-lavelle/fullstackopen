import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = model("User", userSchema);

export default User;
