
import { noteService } from "../services/note.service.js"


export default {
    props: ['note'],
    template: `
<section class="note">
    <h2>{{ note.info.title }}</h2>
    <p>{{ note.info.txt }}</p>
    
<!-- <pre>{{note}}</pre> -->
</section>
`,
    data() {
        return {

        }
    },
    methods: {
        deleteNote() {
            this.$emit('delete', this.note.id)
        }
    },
    computed: {
    },
    components: {
    }
}