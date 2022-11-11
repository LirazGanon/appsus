import noteActionsCmp from "./note-actions.cmp.js"

export default {
    props: ['state'],
    template: `
<section >


    <!-- <component></component> -->

    
    <form @submit.prevent="addNote" class="add-note ">
        <input v-model="note.info.title" :type="search" placeholder="title.."/>
        <input v-model="note.info.txt" :type="search" placeholder="text..." ref="txt" required :class="animate"/>
        <button><i class="fa-solid fa-plus"></i></button>
    </form>
    <!-- <note-actions-cmp :note="note"> -->


</section>
`,
    data() {
        return {
            note: {
                id: '',
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: '',
                    txt: '',
                },
                style: { backgroundColor: '#61c3ed' }
            }
        }
    },
    mounted() {
        this.$refs.txt.focus()
    },
    methods: {
        addNote() {
            if (!this.note.info.txt) return
            const note = JSON.parse(JSON.stringify(this.note))
            this.$emit('addNote', note)
            this.note = {
                id: '',
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: '',
                    txt: '',
                }
            }
        },
        changeNoteType(ev) {
            this.noteToEdit.type = "note-img"
            // this.noteToEdit.info.url = 
        }


    },
    computed: {
        animate() {
            return { 'animate__animated animate__slideInDown': this.state }
        }
    },
    components: {
        noteActionsCmp
    }
}