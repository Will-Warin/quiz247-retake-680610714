import { Router, type Request, type Response } from "express";
// import Zod validators
import {
  zUserId,
  zItemId,
  zItemPostBody,
  zItemPutBody,
  zItemDeleteBody
} from "../libs/zodValidators.js";
// import types
import type { Item } from "../libs/types.ts";
// import database
import { items } from "../db/db.ts";
//import uuid
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken } from "../middlewares/authenMiddleware.ts";

const router = Router();

// GET /api/vXXX/items/:userId 
router.get("/:userId", authenticateToken,(req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const parseResult = zUserId.safeParse(userId);

    if (!parseResult.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parseResult.error.issues[0]?.message,
      });
    }

    const foundIndex = items.findIndex(
      (c: Item) => c.userId === userId
    );

    if (foundIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `items for user Id ${userId} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: userId[foundIndex],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "forbidden access",
      error: err,
    });
  }
});

// POST /api/vXXX/items/:userId, body = {new item data}
// add a new Item for userId
router.post("/",async (req: Request, res: Response) => {
  
  res.status(201).json({
    success: true,
  });
  
});

// Delete /api/vXXX/items/:userId


export default router;