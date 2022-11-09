import { noteService } from "../apps/keep/services/note.service.js"

import noteTxt from "../apps/keep/cmps/note-txt.cmp.js"
import noteImg from "../apps/keep/cmps/note-img.cmp.js"
// import noteVideo from "../apps/keep/cmps/note-video.cmp.js"
import noteTodos from "../apps/keep/cmps/note-todos.cmp.js"

import noteAdd from "../apps/keep/cmps/note.add.cmp.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
//TODO:fix the img
{/* <img src="assets/img/note-logo.png" alt="" /> */ }

export default {
    template:/*html*/ `
	<section class="main-content">

        <note-add @addNote="add"/>
        <section class="notes-list">
            <component
                v-for="note in notes"
                :note="note"
                :is="note.type"
                @delete="deleteNote"
                @add="addTodo" />  
        </section>

	</section>
	`,
    data() {
        return {
            notes: null
        }
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    methods: {
        add(note) {
            noteService.save(note)
                .then(note => {
                    this.notes.push(note)
                    showSuccessMsg('note added!')
                })
        },
        deleteNote(noteId) {
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    showSuccessMsg(`Note deleted`)

                })
        },
        addTodo(noteId, todo) {
            noteService.addTodo(noteId, todo)
                .then(note => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes[idx] = note
                })
            console.log('noteId:', noteId)
            console.log('todo:', todo)
        }
    },
    computed: {
    },
    components: {
        noteTxt,
        noteImg,
        // noteVideo,
        noteTodos,
        noteAdd
    }
}