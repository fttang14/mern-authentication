// jshint esversion:10
import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";
import passportLM from "passport-local-mongoose";

const itemSchema = new mongoose.Schema({
	userId: String,
	items: [{
		content: String
	}]
});
itemSchema.plugin(findOrCreate);
const Item = mongoose.model("item", itemSchema);

export default Item;
