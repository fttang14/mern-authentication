// jshint esversion:10
import express from "express";
import passport from "passport";

const router = express.Router();

router.route("/")
  .get(async (req, res) => {
    req.logout();
    return res.json({
      ok: true,
      message: "Logout successful!"
    });
  });

export default router;
