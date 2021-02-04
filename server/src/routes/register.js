// jshint esversion:10
import express from "express";
import passport from "passport";

import User from "../models/userModel.js";

const router = express.Router();
router.route("/")
  .post( async (req, res) => {
	   const {username, password} = req.body;
	   const user = await User.findOne({username}).exec();
		 if(user) {
			 return res.json({
				 ok: false,
				 message: "User already exists!"
			 });
		 }
	   await User.register({username: username}, password)
	     .then(() => {
				passport.authenticate("local")(req, res, () => {
					return res.json({
						ok: true,
						message: "User has been created!"
					});
				});
	     })
	     .catch((err) => {
	       return res.json({
					ok: false,
					message: `Registration error: ${err}`
				});
	   	});
	 });

export default router;
