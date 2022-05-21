import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import "./style.css";
import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
    /**
     * Challenge:
     * 1. Every time the `notes` array changes, save it
     *    in localStorage. You'll need to use JSON.stringify()
     *    to turn the array into a string to save in localStorage.
     * 2. When the app first loads, initialize the notes state
     *    with the notes saved in localStorage. You'll need to
     *    use JSON.parse() to turn the stringified array back
     *    into a real JS array.
     */

    const [notes, setNotes] = React.useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
    );

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    );
    // console.log(notes);
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here",
        };
        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setCurrentNoteId(newNote.id);
    }
    console.log(123);
    function updateNote(text) {
        setNotes((oldNotes) => {
            const newArray = [];
            for (let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i];
                if (oldNote.id === currentNoteId) {
                    newArray.unshift({ ...oldNote, body: text });
                } else {
                    newArray.push(oldNote);
                }
            }
            return newArray;
        });

        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function findCurrentNote() {
        return (
            notes.find((note) => {
                return note.id === currentNoteId;
            }) || notes[0]
        );
    }

    return (
        <main>
            {notes.length > 0 ? (
                <Split
                    sizes={[30, 70]}
                    direction="horizontal"
                    className="split"
                >
                    <Sidebar
                        notes={notes}
                        currentNote={findCurrentNote()}
                        setCurrentNoteId={setCurrentNoteId}
                        newNote={createNewNote}
                    />
                    {currentNoteId && notes.length > 0 && (
                        <Editor
                            currentNote={findCurrentNote()}
                            updateNote={updateNote}
                        />
                    )}
                </Split>
            ) : (
                <div className="no-notes">
                    <h1>You have no notes</h1>
                    <button className="first-note" onClick={createNewNote}>
                        Create one now
                    </button>
                </div>
            )}
        </main>
    );
}

// If we Need to put every not into key value in localStorage
/*
    function updateLocalStorage() {
        notes.filter((el) => {
            if (el["id"] === currentNoteId) {
                currentNoteBody = el.body;
            }
        });
        localStorage.setItem(
            JSON.stringify(currentNoteId),
            JSON.stringify(currentNoteBody)
        );
    }
*/
