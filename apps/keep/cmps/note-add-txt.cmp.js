import noteActionsCmp from "./note-actions.cmp.js"
import chooseColor from './choose-color.cmp.js'

export default {
    props: ['state'],
    template: `
<section >


    <!-- <component></component> -->

    
    <form @submit.prevent="addNote" class="add-note " :style="note.style">
        <input v-model="note.info.title" :type="search" placeholder="title.."/>
        <input v-model="note.info.txt" :type="search" placeholder="text..." ref="txt" required :class="animate"/>
        <div class="action color-note">
            <img src="assets/img/paint.png" @click="pickColor = !pickColor"/>
        </div>
        <button><i class="fa-solid fa-plus"></i></button>
        <choose-color v-if="pickColor" @setColor="setColor">
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
                style: { backgroundColor: '#ebf1fa' }
            },
            pickColor:false
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
                },
                style: { backgroundColor: '#ebf1fa' }
            }
        },
        changeNoteType(ev) {
            this.noteToEdit.type = "note-img"
            // this.noteToEdit.info.url = 
        },
        setColor(theme) {
            this.pickColor = false
            this.note.style = theme
        }


    },
    computed: {
        animate() {
            return { 'animate__animated animate__slideInDown': this.state }
        }
    },
    components: {
        noteActionsCmp,
        chooseColor
    }
}