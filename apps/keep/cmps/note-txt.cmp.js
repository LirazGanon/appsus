import noteActions from './note-actions.cmp.js'

export default {
    props: ['note'],
    template: `
<section class="note">
    <p>{{ note.info.txt }}</p>
    <note-actions 
        @deleteNote="deleteNote">
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
        noteActions
    }
}