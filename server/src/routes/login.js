// jshint esversion:10
import express from "express";
import passport from "passport";

import User from "../models/userModel.js";

const router = express.Router();
router.route("/")
	.post(async (req, res) => {
		passport.authenticate("local", (err, user) => {
			if(err || !user){
				return res.json({
					ok: false,
					message: "Invalid username or password"
				});
			}
			req.login(user, (err) => {
				if(err) {
					return res.json({
						ok: false,
						message: err
					});
				}
				return res.json({
					ok: true,
					message: "Hooray, login success!"
				});
			});
		})(req, res);
	});

export default router;
