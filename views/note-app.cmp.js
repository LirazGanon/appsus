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
	
    <note-header @filterTitle="filterTitle"/> 
    <section class="note-app">
        
    <note-filter @filter="filterType"  />
        
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
                        <button @click="setType('img')"@click="uploadImg"><i class="fa-regular fa-image"></i></button>
                        <button @click="setType('video')"><i class="fa-brands fa-youtube"></i></button>
                        <button @click="setType('todo')"><i class="fa-solid fa-list"></i></button>
                    </div>
            
        </section> 

        <section class="note-content" v-if="notes" >
            <section>
                <div class="notes-pin">Pinned</div>
                <note-list
                    :notes="notesToShow"
                    @delete="deleteNote" 
                    />
                </section>

                <section>
                <div class="notes-pin">unPinned</div>
                <note-list
                    :notes="notesToShowNonPinned"
                    @delete="deleteNote" />
                </section>
        </section>
        <section v-else class="skeleton-wrapper grid-auto-fit">
	  <div v-for="n in 50" class="card-preview is-loading">
	    <div class="image"></div>
	    <div class="content" >
	      <h2></h2>
	      <p></p>
	    </div>
	  </div>
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
        this.loadNotes()
        eventBus.on('addMail', this.addMail)
        eventBus.on('updated', this.updateNote)
        eventBus.on('addNote', this.add)
    },
    methods: {
        addMail(mail) {
            const { subject, body } = mail
            const note = {
                id: null,
                type: 'note-txt',
                isPinned: true,
                info: {
                    title: subject,
                    txt: body,
                },
                style: { backgroundColor: '#ebf1fa' }
            }
            this.add(note)

        },
        dragOverPinned(e) {
            const drag = document.querySelector('.drag')
            const el = this.getDragAfterEl(e.target, e.clientY)
            el ? e.target.insertBefore(drag, el) : e.target.appendChild(drag)

        },
        getDragAfterEl(container, y) {
            const draggableEl = [...container.querySelectorAll('.draggable:not(.drag)')]

            return draggableEl.reduce((closest, child) => {
                const box = child.getBoundingClientRect()
                const offset = y - box.top - box.height / 2
                if (offset < 0 && offset > closest.offset) {
                    return { offset, child }
                } else {
                    return closest
                }
            }, { offset: Number.NEGATIVE_INFINITY }).child
        }
        ,
        loadNotes() {
            noteService.query()
                .then(notes => this.notes = notes)
        }
        ,
        add(note) {
            noteService.save(note)
                .then(note => {
                    this.notes.unshift(note)
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
                    showSuccessMsg(`Note deleted`)
                }).catch(err => {
                    console.log(err);
                    showErrorMsg(`cannot delete note`)
                })
        },
        filterType(filterBy) {
            this.filterBy.type = filterBy.type
        },
        filterTitle(filterBy) {
            this.filterBy.title = filterBy.title
        },
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
                setTimeout(() => {
                    if (type === 'img') return
                    this.state = false
                }, 300)
            }
            if (type === 'img') this.state = true
        },
        uploadImg() {
            eventBus.emit('uploadImg')
        }
    },
    computed: {
        notesToShow() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.notes.filter(note => {
                if (!note) return false
                return regex.test(note.info.title)
                    && note.type.includes(this.filterBy.type)
                    && note.isPinned
            }
            )
        },
        notesToShowNonPinned() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.notes.filter(note => {
                if (!note) return false

                return regex.test(note.info.title)
                    && note.type.includes(this.filterBy.type)
                    && !note.isPinned
            }

            )
        },
        animateOut() {
            return { 'animate__animated': this.addType }
        },
        checkParams() {
            return this.$route.params.id

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
    },
    watch: {
        checkParams() {
            this.loadNotes()
        }
    }
}