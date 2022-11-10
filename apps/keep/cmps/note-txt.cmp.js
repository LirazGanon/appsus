
import { noteService } from "../services/note.service.js"


export default {
    props: ['note'],
    template: `
<section class="note">
    <p>{{ note.info.txt }}</p>
    
<!-- <pre>{{note}}</pre> -->
</section>
`,
    data() {
        return {

        }
    },
    methods: {
        deleteNote(){
            this.$emit('delete',this.note.id)
        }
    },
    computed: {
    },
    components: {
    }
}