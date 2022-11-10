import { eventBus, showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { noteService } from "../apps/keep/services/note.service.js"


import noteAddTxt from "../apps/keep/cmps/note-add-txt.cmp.js"
import noteAddImg from "../apps/keep/cmps/note-add-img.cmp.js"
import noteAddVideo from "../apps/keep/cmps/note-add-video.cmp.js"
import noteAddTodo from "../apps/keep/cmps/note-add-todo.cmp.js"


import noteDetails from "../apps/keep/pages/note-details.cmp.js"

import noteList from "../apps/keep/cmps/note-list.cmp.js"
import noteFilter from "../apps/keep/cmps/note.filter.cmp.js"

//TODO:fix the addTODO

{/* <img src="assets/img/note-logo.png" alt="" /> */ }
export default {
    name:'note-app',
    template:/*html*/ `
	
    <section class="note-app">
        <note-filter @filter="filter"  />
        
        <section class=" main-content">
            <section>
            <note-add-txt @addNote="add" v-if="addType === 'txt'"/>
            <note-add-img @addNote="add"  v-if="addType === 'img'"/>
            <note-add-video @addNote="add" v-if="addType === 'video'"/>
            
            <div class="fake-note">
            <p @click="addType='txt'" v-if="!addType">text...</p>
                <div class="add-note-controls">
                    <button @click="addType='txt'">txt</button>
                    <button @click="addType='img'">img</button>
                    <button @click="addType='video'">video</button>
                </div>
            </div>
        </section> 
        <section class="note-content">
        
                <section>
                <span>Pinned</span>
                <note-list
                    v-if="notes" 
                    :notes="notesToShow"
                    @delete="deleteNote" />
                </section>

                <section>
                <span>unPinned</span>
                <note-list
                    v-if="notes" 
                    :notes="notesToShowNonPinned"
                    @delete="deleteNote" />
                </section>
        </section>
    </section>


    </section>

       
        
        
       
	`,
    data() {
        return {
            notes: null,
            filterBy: {
                title: '',
                type: ''
            },
            addType: null
        }
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
        eventBus.on('updated', this.updateNote)
    },
    methods: {
        add(note) {
            noteService.save(note)
                .then(note => {
                    this.notes.push(note)
                    showSuccessMsg('note added!')
                    this.addType = null
                })
        },
        updateNote(note) {
            noteService.save(note)
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
            return this.notes.filter(note =>
                regex.test(note.info.title)
                && note.type.includes(this.filterBy.type)
                && note.isPinned
            )
        },
        notesToShowNonPinned() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.notes.filter(note =>
                regex.test(note.info.title)
                && note.type.includes(this.filterBy.type)
                && !note.isPinned
            )
        },

    },
    components: {
        noteFilter,
        noteAddTxt,
        noteAddVideo,
        noteList,
        noteAddTodo,
        noteAddImg,
        noteDetails
    }
}