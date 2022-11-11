export default {
    props:['state'],
    template: `
<section>


<form @submit.prevent="addNote" class="add-note">
        <input v-model="note.info.title" type="search" placeholder="title.." ref="title"/>
        <input v-model="note.info.url" @change="onFileChange" type="file" required :class="animate"/>
        <button>submit</button>
    </form>
</section>
`,
    data() {
        return {
            note: {
                id: '',
                type: "note-img",
                info: {
                    url: "",
                    title: ""
                },
                style: { backgroundColor: '#61c3ed' }
            }
        }
    },
    mounted() {
        this.$refs.title.focus()
    },
    methods: {
        addNote() {
            const note = JSON.parse(JSON.stringify(this.note))
            this.$emit('addNote', note)
            console.log('this.note:', this.note)
        },
        onFileChange(e) {
            const file = e.target.files[0]
            this.note.info.url = URL.createObjectURL(file)
        }
    },
    computed: {
        animate() {
            return { 'animate__animated animate__slideInDown': this.state }
        }
    },
    components: {
    }
}