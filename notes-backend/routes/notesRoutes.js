import express from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
  getNoteById,
} from "../controller/notesController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getNotes);
router.get("/:id", verifyToken, getNoteById);
router.post("/", verifyToken, createNote);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

export default router;
