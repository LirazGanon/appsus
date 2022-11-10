
export default {
    template: `
<section>


    <!-- <component></component> -->

    
    <form @submit.prevent="addNote" class="add-note">
        <input v-model="note.info.title" :type="search" placeholder="title.." ref="title"/>
        <input  @change="onFileChange" :type="search" placeholder="Youtube URL.."/>
        <button>submit</button>
    </form>


</section>
`,
    data() {
        return {
            note: {
                id: '',
                type: 'note-video',
                isPinned: false,
                info: {
                    title: '',
                    url: '',
                }
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
            this.note = {
                id: '',
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: '',
                    url: '',
                },
                style: {
                    backgroundColor: "#888"
                }
            }
        },
        onFileChange(ev) {
            let url = ev.target.value
            const regExp =
                /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
            const match = url.match(regExp)
            const id = match && match[7].length == 11 ? match[7] : null
            const newURL = 'https://www.youtube.com/embed/' + id
            this.note.info.url = newURL
        },



    },
    computed: {
    },
    components: {
    }
}