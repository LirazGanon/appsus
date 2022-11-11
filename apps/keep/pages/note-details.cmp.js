import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"


export default {
    name: 'note-dits',
    template: `
<section class="full-screen" v-if="noteToEdit">
    
    <section class="note-editor note">

    
    <form  
    @submit="saveNote" 
    :v-if="noteToEdit.type === 'note-txt'"
    class="flex flex-column">
    
        <input type="search" v-model="noteToEdit.info.title" />
        <input type="search" v-model="noteToEdit.info.txt" />
        <button>save!</button>
    </form>



    <router-link to="/note">back</router-link>
    <pre  >
        {{ noteToEdit }}
        <router-link to="/note"></router-link>
    </pre>
    </section>
</section>
`,
    data() {
        return {
            noteToEdit: null
        }
    },
    created() {
        this.loadNote()
    },
    methods: {
        loadNote() {
            noteService.get(this.noteId)
                .then(note => {
                    this.noteToEdit = note
                    console.log(note);
                })
        },
        saveNote() {
            noteService.save(this.noteToEdit).then(note => {
                showSuccessMsg('note saved')
                this.$router.push('/note')
            }
            )
        }
    },
    computed: {
        noteId() {
            return this.$route.params.id
        }
    },
    components: {
    },
    watch: {
        noteId() {
            this.loadNote()
        }

    }
}