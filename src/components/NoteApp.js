import React, { useState, useEffect, useReducer } from 'react'
import notesReducer from '../reducers/notes'
import NoteList from './NoteList'
import AddNoteForm from './AddNoteForm'
import NotesContext from '../context/notes-context'

const NoteApp = () => {
    const [notes, dispatch] = useReducer(notesReducer, [])

    // the pattern when fetching data from DB
    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem('notes'))

        if(notes) {
            dispatch({ type: 'POPULATE_NOTES', notes })
            // setNotes(notesData)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])

    return (
        <NotesContext.Provider value={ { notes, dispatch } }>
            <h1>Notes</h1>
            <NoteList />
            <AddNoteForm dispatch={dispatch} />
        </NotesContext.Provider>
    )
}

export { NoteApp as default }