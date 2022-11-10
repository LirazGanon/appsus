
export default {
    template: `
<section>


    <!-- <component></component> -->

    
    <form @submit.prevent="addNote" class="add-note">
        <input v-model="note.info.title" :type="search" placeholder="title.."/>
        <input v-model="note.info.txt" :type="search" placeholder="text..." ref="txt"/>
        <button>submit</button>
    </form>


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
                }
            }
        }
    },
    mounted() {
        this.$refs.txt.focus()
      },
    methods: {
        addNote() {
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