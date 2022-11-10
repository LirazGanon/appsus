import { eventBus, showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { noteService } from "../apps/keep/services/note.service.js"


import noteList from "../apps/keep/cmps/note-list.cmp.js"
import noteAdd from "../apps/keep/cmps/note.add.cmp.js"

//TODO:fix the img
{/* <img src="assets/img/note-logo.png" alt="" /> */ }

export default {
    template:/*html*/ `
	< class="main-content">

        <note-add @addNote="add"/>
        <note-list
             v-if="notes" 
             :notes="notes"
             @delete="deleteNote" />

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
        },
        deleteTodo(noteId, todoId) {
            noteService.deleteTodo(noteId, todoId)
                .then(note => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes[idx] = note
                })
            console.log('noteId:', noteId)
            console.log('todoId:', todoId)
        }
    },
    computed: {
    },
    components: {

        // noteVideo,
        noteAdd,
        noteList
    }
}