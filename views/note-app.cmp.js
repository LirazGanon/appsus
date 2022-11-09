import { noteService } from "../apps/keep/services/note.service.js"


export default {
    template:/*html*/ `
	<section class="main-content">
	  <img src="assets/img/note-logo.png" alt="" />
      note
	</section>
	`,
    data() {
        return {
            notes: null
        }
    },
    created(){
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
    }
}