
export default {
    template: `
<section>


    <!-- <component></component> -->

    
    <form @submit.prevent="addNote" class="add-note">
        <input v-model="note.info.title" :type="search" placeholder="title.." ref="title"/>
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
                    txt: '',
                }
            }
        },
        onFileChange(ev) {
            let url = ev.target.value
         

            var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                this.note.info.url = `https://www.youtube.com/embed/${match[2]}` 
             
            }
            
        }

     

    },
    computed: {

    },
    components: {
    }
}