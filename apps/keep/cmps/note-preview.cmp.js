import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import noteTxt from "../cmps/note-txt.cmp.js"
import noteImg from "../cmps/note-img.cmp.js"
import noteVideo from "../cmps/note-video.cmp.js"
import noteTodos from "../cmps/note-todos.cmp.js"


import noteActions from './note-actions.cmp.js'
import { utilService } from "../../../services/util.service.js"


export default {
    props: ['note'],
    template: `
    <section className="note" :style='note.style'>

        <component
        :note="note"
        :is="note.type"
        
       />  
          
        <note-actions 
            :note="note"
              @delete="deleteNote"
              @setColor="setColor"
              @pinNote="pinNote"
              @copyNote="copyNote"
              
              />
    </section>
   
        
`,
    data() {
        return {
        }
    },
    methods: {
        deleteNote(noteId) {
            this.$emit('delete', noteId)
        },
        setColor(theme) {
            this.note.style = theme
            eventBus.emit('updated', this.deepCopy)
            showSuccessMsg('color changed!')
        },
        pinNote() {
            this.note.isPinned = !this.note.isPinned
            eventBus.emit('updated', this.deepCopy)
            showSuccessMsg('Note Pinned')

        },
        copyNote() {
            let copy = this.deepCopy()
            copy.id = null
            eventBus.emit('addNote', copy)
        },
        deepCopy() {
            return JSON.parse(JSON.stringify(this.note))
        }
    },
    computed: {
        
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
        noteActions

    }
}