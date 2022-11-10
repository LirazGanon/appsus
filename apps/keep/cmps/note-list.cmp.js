import notePreview from '../cmps/note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `

<ul class="note-list clean-list">
    <li v-for='note in notes' class="note">
        <note-preview
        :note="note"
         @delete="deleteNote"
          />

    </li>
</ul>


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