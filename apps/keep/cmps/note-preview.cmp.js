
import noteTxt from "../cmps/note-txt.cmp.js"
import noteImg from "../cmps/note-img.cmp.js"
import noteVideo from "../cmps/note-video.cmp.js"
import noteTodos from "../cmps/note-todos.cmp.js"


import noteActions from './note-actions.cmp.js'


export default {
    props: ['note'],
    template: `
    <section className="note" :style='note.style'>

        <component
        :note="note"
        :is="note.type"
        @save="saveNote"/>  
          
        <note-actions 
            :id="note.id"
              @delete="deleteNote"
              
              />
    </section>
   
        
`,
    data() {
        return {
        }
    },
    methods: {
        deleteNote() {
            this.$emit('delete', this.note.id)
        },
        saveNote() {
            this.$emit('save', this.note.id)
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