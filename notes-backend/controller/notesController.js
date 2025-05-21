import Note from "../models/note.js";

export const getNotes = async (req, res) => {
  try {
    const response = await Note.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const response = await Note.findOne({
      where: { id: req.params.id },
    });
    if (!response) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    await Note.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Note updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await Note.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
