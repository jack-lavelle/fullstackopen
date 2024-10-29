import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const ErrorNotification = ({ message }) => {
    if (message === null) {
        return null;
    }

    return <div className="error">{message}</div>;
};

const Footer = () => {
    const footerStyle = {
        color: "green",
        fontStyle: "italic",
        fontSize: 16,
    };

    return (
        <div style={footerStyle}>
            <br />
            <em>
                Note app, Department of Computer Science, University of Helsinki
                2024
            </em>
        </div>
    );
};

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("a new note...");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        noteService.getAll().then((initialNotes) => {
            setNotes(initialNotes);
        });
    }, []);

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important === true);

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        };

        noteService.create(noteObject).then((returnedNote) => {
            notes.concat(returnedNote);
            setNewNote("");
        });
    };

    const toggleImportanceOf = (id) => {
        const note = notes.find((note) => note.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then((returnedNote) => {
                setNotes(
                    notes.map((note) => (note.id !== id ? note : returnedNote))
                );
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage(
                    `The following note: "${note.content}" was already removed from the server`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setNotes(notes.filter((n) => n.id !== id));
            });
    };

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    };

    return (
        <div>
            <h1>Notes</h1>
            <ErrorNotification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    );
};

export default App;
