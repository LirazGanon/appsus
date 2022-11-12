import chooseColor from './choose-color.cmp.js'
export default {
    props: ['state'],
    template: `
<section>


    <!-- <component></component> -->

    
    <form @submit.prevent="addNote" class="add-note" :style="note.style">
        <input v-model="note.info.title" :type="search" placeholder="title.." ref="title"/>
        <input  @change="onFileChange" :type="search" placeholder="Youtube URL.." :class="animate"/>
        <div class="action color-note">
            <img src="assets/img/paint.png" @click="pickColor = !pickColor"/>
        </div>
        <button><i class="fa-solid fa-plus"></i></button>
        <choose-color v-if="pickColor" @setColor="setColor">
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
                },
                style: { backgroundColor: '#ebf1fa' }
            },
            pickColor: false
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
                style: { backgroundColor: '#ebf1fa' }
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
        chooseColor
    }
}