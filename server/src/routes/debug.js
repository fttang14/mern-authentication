// jshint esversion:10
import express from "express";
import passport from "passport";

const router = express.Router();
router.route("/")
  .get(async (req, res) => {
    if(req.isAuthenticated()){
      return res.json({
        ok: true,
        message: "Welcome to the debug page!",
        user: req.user
      });
    }
    else{
      return res.json({
        ok: false,
        message: "You are not logged in to see this page!"
      });
    }
  });

export default router;
