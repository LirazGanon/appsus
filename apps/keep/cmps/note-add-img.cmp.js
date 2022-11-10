export default {
    template: `
<section>


<form @submit.prevent="addNote" class="add-note flex center">
        <input v-model="note.info.title" type="search" placeholder="title.."/>
        <input v-model="note.info.url" @change="onFileChange" type="file" placeholder=""/>
        <button>submit</button>
    </form>
hi
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
    methods: {
        addNote(){
            const note = JSON.parse(JSON.stringify(this.note))
            this.$emit('addNote', note)
            console.log('this.note:', this.note)
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.note.info.url = URL.createObjectURL(file);
          }
    },
    computed: {
    },
    components: {
    }
}