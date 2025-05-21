import React from "react";

const Sidebar = ({
  notes = [],
  selectedNote,
  handleNoteClick,
  setSelectedNote,
  clearFields,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="title">Notepadd ---</h1>
        <button
          className="add-note-button"
          onClick={() => {
            setSelectedNote(null);
            clearFields();
          }}
        >
          +
        </button>
      </div>

      <ul className="note-titles">
        {notes.length > 0 ? (
          notes.map((note) => (
            <li
              key={note.id}
              onClick={() => handleNoteClick(note)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedNote && selectedNote.id === note.id
                    ? "#ddd"
                    : "transparent",
                padding: "8px",
                borderRadius: "4px",
                marginBottom: "4px",
                userSelect: "none",
              }}
            >
              {note.title}
            </li>
          ))
        ) : (
          <li style={{ padding: "8px", color: "#666" }}>No notes available</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;