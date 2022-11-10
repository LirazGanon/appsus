import { noteService } from "../services/note.service.js";



export default {
    template: `
<section>


    <!-- <component></component> -->

    
    <form @submit.prevent="addNote" class="add-note flex center">
        <input v-model="noteToEdit.info.txt" :type="search"/>
       <label>
           <input type="file" @change="changeNoteType">

       </label>
        <button>submit</button>
    </form>


</section>
`,
    data() {
        return {
            noteToEdit: noteService.getEmptyNote()
        }
    },
    created() {
        console.log(this.noteToEdit);
    },
    methods: {
        addNote() {
            const note = JSON.parse(JSON.stringify(this.noteToEdit))
            this.$emit('addNote', note)
            this.noteToEdit = noteService.getEmptyNote()
        },
        changeNoteType(ev) {
            this.noteToEdit.type = "note-img"
            // this.noteToEdit.info.url = 
        }

        // saveURL(ev) {
        //     let url = ev.target.value
        //     let newUrl = url.match(/(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/)
        //     newUrl[5] = '/embed'
        //     newUrl.splice(0,1)
        //     newUrl = newUrl.join('')
        //     console.log(newUrl)
        //     this.info.videoURL = newUrl
        // }

    },
    computed: {

    },
    components: {
    }
}

