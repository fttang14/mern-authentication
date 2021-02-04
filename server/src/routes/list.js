// jshint esversion:10
import express from "express";
import passport from "passport";

import User from "../models/userModel.js";
import Item from "../models/itemModel.js";

const router = express.Router();
router.route("/")
  .get(async(req, res) => {
    if(req.isAuthenticated()){
      await Item.findOne({userId: req.user.id})
        .then(foundItem => {
          return res.json({
            ok: true,
            message: "Retrieving items...",
            items: foundItem.items
          });
        })
        .catch(err => {
          return res.json({
            ok: false,
            message: "No items found",
            items: null
          });
        });
    }
  })
  .post(async (req, res) => {
    if(req.isAuthenticated()){
      const {content} = req.body;
      await Item.findOne({userId: req.user.id})
        .then(foundItem => {
          if(foundItem){
            foundItem.items.push({content});
            foundItem.save();
            return res.json({
              ok: true,
              message: "Entry has been added!"
            });
          }
          else{
            const item = new Item({
              userId: req.user.id,
              items: [{content: content}]
            });
            item.save();
            return res.json({
              ok: true,
              message: "Entry has been created!"
            });
          }
        })
        .catch(err => {
          return res.json({
            ok: false,
            message: "Content could not be found..."
          });
        });
    }
  })
  .delete(async (req, res) => {
    if(req.isAuthenticated()){
      const {contentId} = req.body;
      await Item.findOneAndUpdate({userId: req.user.id}, {$pull: {items: {_id: contentId}}})
      .then(() => {
        return res.json({
          ok: true,
          message: "Entry has been deleted!"
        });
      })
      .catch(err => {
        return res.json({
          ok: false,
          message: "Content could not be found..."
        });
      });
    }
  });

export default router;
