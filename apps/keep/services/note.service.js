import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js";

import notesJson from '../data/notes.json' assert {type: 'json'}

const NOTE_KEY = 'noteDB'
_crateNotes()

export const noteService = {
    query,
    get,
    getEmptyNote,
    remove,
    save
}

function query() {
    return storageService.query(NOTE_KEY)
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
        type,
        isPinned: false,
        info: {
            txt: ''
        }
    }
}

function _crateNotes() {
    return query().then(notes => {
        console.log('notes:', notes)
        if (!notes || !notes.length) {
            notes = notesJson
            utilService.saveToStorage(NOTE_KEY, notes)
        }
        return notes
    })
}

