import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const NoteForm = ({
  selectedNote,
  title,
  setTitle,
  content,
  setcontent,
  createNote,
  updateNote,
  deleteNote,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="note-details" style={{ position: "relative" }}>
      {/* Tombol Logout di kanan atas */}
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <button
          onClick={handleLogout}
          className="logout-link"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#007bff",
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <form onSubmit={selectedNote ? updateNote : createNote}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>content</label>
          <textarea
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <button type="submit" className="save-button">
          {selectedNote ? "Update Note" : "Add Note"}
        </button>
        {selectedNote && (
          <button
            type="button"
            className="delete-button"
            onClick={() => deleteNote(selectedNote.id)}
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default NoteForm;