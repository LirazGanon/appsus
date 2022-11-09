import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service";

const NOTE_KEY = 'noteDB'

export const noteService = {
    query,
    get,
    remove,
    save
}

function query(){
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


function _crateNotes(){
    
}