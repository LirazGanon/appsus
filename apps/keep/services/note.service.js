import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js";

import notesJson from '../data/notes.json' assert {type: 'json'}

const NOTE_KEY = 'noteDB'
_crateNotes()

export const noteService = {
    query,
    get,
    addTodo,
    deleteTodo,
    getEmptyNote,
    remove,
    save
}

function query() {
    return storageService.query(NOTE_KEY) || null
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {

    return note.id ?
        storageService.put(NOTE_KEY, note)
        :
        storageService.post(NOTE_KEY, note)
}

function getEmptyNote(type = 'note-txt') {
    return {
        id: '',
        type: 'note-txt',
        isPinned: false,
        info: {
            txt: '',
            
        }
    }
}

function addTodo(noteId, todo) {
    return get(noteId).then(note => {
        console.log(note);
        note.info.todos.push({ txt: todo, isDone: null, id: utilService.makeId() })
        return note
    }).then(note => storageService.put(NOTE_KEY, note))
}

function deleteTodo(noteId, todoId) {
    return get(noteId).then(note => {
        const idx = note.info.todos.findIndex(todo => todo.id === todoId)
        note.info.todos.splice(idx, 1)
        return note
    }).then(note => storageService.put(NOTE_KEY, note))
}

function _crateNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    console.log('notes:', notes)
    if (!notes || !notes.length) {
        notes = notesJson
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}

