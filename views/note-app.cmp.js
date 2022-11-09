import { noteService } from "../apps/keep/services/note.service.js"

import noteTxt from "../apps/keep/cmps/note-txt.cmp.js"
import noteImg from "../apps/keep/cmps/note-img.cmp.js"
import noteVideo from "../apps/keep/cmps/note-video.cmp.js"
import noteTodos from "../apps/keep/cmps/note-todos.cmp.js"

import addNote from "../apps/keep/cmps/note.add.cmp.js"

//TODO:fix the img
{/* <img src="assets/img/note-logo.png" alt="" /> */ }

export default {
    template:/*html*/ `
	<section class="main-content">

    <add-note />

      <component :is="note.type" v-for="note in notes" :note="note" />

	</section>
	`,
    data() {
        return {
            notes: null
        }
    },
    created() {
        noteService.query()
            .then(notes => {
                console.log('notes:', notes)
                this.notes = notes
            })
    },
    methods: {

    },
    computed: {
    },
    components: {
        noteTxt,
        noteImg,
        noteVideo,
        noteTodos,
        addNote
    }
}