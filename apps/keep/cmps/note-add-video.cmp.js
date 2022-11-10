
export default {
    template: `
<section>


    <!-- <component></component> -->

    
    <form @submit.prevent="addNote" class="add-note flex center">
        <input v-model="note.info.title" :type="search" placeholder="title.."/>
        <input v-model="note.info.url" @change="onFileChange" :type="search" placeholder="Youtube URL.."/>
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
    created() {

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
        onFileChange(ev) {
            let url = ev.target.value
            let newUrl = url.match(/(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/)
            newUrl[5] = '/embed'
            newUrl.splice(0,1)
            newUrl = newUrl.join('')
            console.log(newUrl)
            this.note.info.url = newUrl
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