export default {
    template: `
<section>


<form @submit.prevent="addNote" class="add-note">
        <input v-model="note.info.title" type="search" placeholder="title.." ref="title"/>
        <input v-model="note.info.url" @change="onFileChange" type="file" placeholder=""/>
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
                style: {
                    backgroundColor: "#00d"
                }
            }
        }
    },
    mounted() {
        this.$refs.title.focus()
      },
    methods: {
        addNote(){
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
    },
    components: {
    }
}