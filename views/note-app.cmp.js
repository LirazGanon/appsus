import { eventBus, showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { noteService } from "../apps/keep/services/note.service.js"


import noteAddTxt from "../apps/keep/cmps/note-add-txt.cmp.js"
import noteAddImg from "../apps/keep/cmps/note-add-img.cmp.js"
import noteAddVideo from "../apps/keep/cmps/note-add-video.cmp.js"
import noteAddTodo from "../apps/keep/cmps/note-add-todo.cmp.js"
import noteHeader from '../apps/keep/cmps/note-header.cmp.js'


import noteDetails from "../apps/keep/pages/note-details.cmp.js"

import noteList from "../apps/keep/cmps/note-list.cmp.js"
import noteFilter from "../apps/keep/cmps/note.filter.cmp.js"

//TODO:fix the addTODO

{/* <img src="assets/img/note-logo.png" alt="" /> */ }
export default {
    name: 'note-app',
    template:/*html*/ `
	
    <note-header /> 
    <section class="note-app">
        
    <note-filter @filter="filter"  />
        
        <section class=" main-content">
            <section class="above-notes ">
            <div v-if="addType" >
                <note-add-txt
                    :state="state"
                    @addNote="add
                    " v-if="addType === 'txt'"/>
                <note-add-img
                    :state="state"
                    @addNote="add"  
                    v-if="addType === 'img'"/>
                <note-add-video 
                    :state="state"
                    @addNote="add" 
                    v-if="addType === 'video'"/>
                <note-add-todo 
                    :state="state"
                    @addNote="add" 
                    v-if="addType === 'todo'"/>
                </div>

                <div class="fake-note"  v-if="!addType">
                    <p 
                    :class="animateOut"
                    @click="addType='txt'"
                   >
                        text...
                    </p>
                </div>
                    <div class="add-note-controls">
                        <button @click="setType('txt')"><i class="fa-solid fa-font"></i></button>
                        <button @click="setType('img')"><i class="fa-regular fa-image"></i></button>
                        <button @click="setType('video')"><i class="fa-brands fa-youtube"></i></button>
                        <button @click="setType('todo')"><i class="fa-solid fa-list"></i></button>
                    </div>
            
        </section> 

        <section class="note-content">
        
            <section>
                <div class="notes-pin">Pinned</div>
                <note-list
                    v-if="notes" 
                    :notes="notesToShow"
                    @delete="deleteNote" />
                </section>

                <section>
                <div class="notes-pin">unPinned</div>
                <note-list
                    v-if="notes" 
                    :notes="notesToShowNonPinned"
                    @delete="deleteNote" />
                </section>
        </section>
    </section>

    <router-view/>
    
    </section>
       
	`,
    data() {
        return {
            notes: null,
            filterBy: {
                title: '',
                type: ''
            },
            addType: null,
            state: true
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
                    this.state = true
                })
        },
        updateNote(note) {
            noteService.save(note)
        },
        deleteNote(noteId) {
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    if (idx === -1) return
                    this.notes.splice(idx, 1)
                    console.log('this.note:', noteId)
                    showSuccessMsg(`Note deleted`)
                }).catch(err => {
                    console.log(err);
                    showErrorMsg(`cannot delete note`)
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

        },
        deleteTodo(noteId, todoId) {
            noteService.deleteTodo(noteId, todoId)
                .then(note => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes[idx] = note
                })

        },
        setType(type) {
            this.addType = type
            if (this.state) {
                setTimeout(() => this.state = false, 0)
            }
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
        animateOut() {
            return { 'animate__animated': this.addType }
        }
    },
    components: {
        noteFilter,
        noteAddTxt,
        noteAddVideo,
        noteList,
        noteAddTodo,
        noteAddImg,
        noteDetails,
        noteHeader
    }
}