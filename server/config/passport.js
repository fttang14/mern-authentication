// jshint esversion:10
import mongoose from "mongoose";

// models
import User from "../src/models/userModel.js";

export function SetupPassport (passport) {
  
  // Passport init
  passport.use(User.createStrategy());
  passport.serializeUser((user, done) => {
  	done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
  	User.findById(id, (err, user) => {
  		done(err, user);
  	});
  });
}
