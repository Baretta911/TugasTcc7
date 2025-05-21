import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { BASE_URL } from "../utils";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNotes();
    const interval = setInterval(getNotes, 5000);
    return () => clearInterval(interval);
  }, []);

  const getNotes = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      const response = await axios.get(`${BASE_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error(
        "Error fetching notes:",
        error.response?.data || error.message
      );
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note.id !== id));
      if (selectedNote && selectedNote.id === id) setSelectedNote(null);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${BASE_URL}/notes`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setContent("");
      getNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    if (!selectedNote) return;
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `${BASE_URL}/notes/${selectedNote.id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedNote(null);
      setTitle("");
      setContent("");
      getNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const clearFields = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.heading}>My Notes</h2>
        <button style={styles.addBtn} onClick={clearFields}>
          <FaPlus /> New Note
        </button>
        <ul style={styles.noteList}>
          {notes.map((note) => (
            <li
              key={note.id}
              style={{
                ...styles.noteItem,
                background:
                  selectedNote && selectedNote.id === note.id
                    ? "#e3f2fd"
                    : "#fff",
              }}
              onClick={() => handleNoteClick(note)}
            >
              <div>
                <strong>{note.title}</strong>
                <div style={{ fontSize: 12, color: "#888" }}>
                  {note.content.slice(0, 30)}
                  {note.content.length > 30 && "..."}
                </div>
              </div>
              <div>
                <button
                  style={styles.iconBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNoteClick(note);
                  }}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  style={styles.iconBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.formArea}>
        <form
          onSubmit={selectedNote ? updateNote : createNote}
          style={styles.form}
        >
          <h3>{selectedNote ? "Edit Note" : "Add Note"}</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            style={styles.input}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            style={styles.textarea}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" style={styles.saveBtn}>
              {selectedNote ? "Update" : "Save"}
            </button>
            {selectedNote && (
              <button
                type="button"
                style={styles.cancelBtn}
                onClick={clearFields}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "80vh",
    background: "#f5f7fa",
    borderRadius: 10,
    boxShadow: "0 2px 8px #0001",
    margin: 24,
    overflow: "hidden",
  },
  sidebar: {
    width: 300,
    background: "#fff",
    borderRight: "1px solid #e3e3e3",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  heading: {
    margin: 0,
    marginBottom: 16,
    color: "#1976d2",
    fontWeight: 700,
    letterSpacing: 1,
  },
  addBtn: {
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "8px 12px",
    cursor: "pointer",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontWeight: 600,
  },
  noteList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flex: 1,
    overflowY: "auto",
  },
  noteItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 10px",
    borderRadius: 6,
    marginBottom: 8,
    cursor: "pointer",
    border: "1px solid #e3e3e3",
    transition: "background 0.2s",
  },
  iconBtn: {
    background: "none",
    border: "none",
    color: "#1976d2",
    cursor: "pointer",
    fontSize: 18,
    marginLeft: 8,
  },
  formArea: {
    flex: 1,
    padding: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f9fbfd",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    background: "#fff",
    padding: 24,
    borderRadius: 10,
    boxShadow: "0 2px 8px #0001",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 16,
    marginBottom: 8,
  },
  textarea: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 16,
    minHeight: 80,
    marginBottom: 8,
    resize: "vertical",
  },
  saveBtn: {
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: 600,
  },
  cancelBtn: {
    background: "#e0e0e0",
    color: "#333",
    border: "none",
    borderRadius: 6,
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default NoteList;
