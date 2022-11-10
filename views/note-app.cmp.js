import { eventBus, showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { noteService } from "../apps/keep/services/note.service.js"


import noteAddTxt from "../apps/keep/cmps/note-add-txt.cmp.js"
import noteAddImg from "../apps/keep/cmps/note-add-img.cmp.js"
import noteAddVideo from "../apps/keep/cmps/note-add-video.cmp.js"


import noteList from "../apps/keep/cmps/note-list.cmp.js"
import noteFilter from "../apps/keep/cmps/note.filter.cmp.js"

//TODO:fix the img
{/* <img src="assets/img/note-logo.png" alt="" /> */ }

export default {
    template:/*html*/ `
	<section class="main-content">
    <note-filter @filter="filter"/>
    <note-add-txt @addNote="add"/>
    <note-add-img @addNote="add"/>
    <note-add-video @addNote="add"/>
        <note-list
             v-if="notes" 
             :notes="notesToShow"
             @delete="deleteNote" />

	</section>
	`,
    data() {
        return {
            notes: null,
            filterBy: {
                title: '',
                type: ''
            }
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
        filter(filterBy) {
            this.filterBy = filterBy
        }
        ,
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
        notesToShow() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.notes.filter(note => regex.test(note.info.title) && note.type.includes(this.filterBy.type))
        }
    },
    components: {
        noteFilter,
        noteAddTxt,
        noteAddVideo,
        noteList,
        noteAddImg
    }
}