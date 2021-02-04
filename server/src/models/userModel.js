// jshint esversion:10
import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";
import passportLM from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
	username: String,
	password: String
});
userSchema.plugin(findOrCreate);
userSchema.plugin(passportLM);
const User = mongoose.model("user", userSchema);

export default User;
