import notePreview from '../cmps/note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
<section>

<ul class="note-list">
    <li v-for='note in notes' class="note">
        <note-preview
        :note="note"
         @delete="deleteNote"
          />

    </li>
</ul>


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
    },
    computed: {
    },
    components: {
        notePreview,
    }
}