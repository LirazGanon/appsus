import { eventBus } from "../../../services/event-bus.service.js"
import chooseColor from './choose-color.cmp.js'


export default {
    props: ['state'],
    template: `
<section>


<form @submit.prevent="addNote" class="add-note" :style="note.style">
        <input
            v-model="note.info.title"
            type="search"
            placeholder="Title.."
            ref="title"
            class="animate__animated animate__fadeIn"/>
            <section class="img-holder">
                <img v-if="note.info.url" :src="note.info.url" alt="" />
            </section>
        <input 
            v-model="note.info.url" 
            @change="onFileChange" 
            type="file" 
            required 
            ref="image" 
            hidden
            />
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
                type: "note-img",
                info: {
                    url: "",
                    title: ""
                },
                style: { backgroundColor: '#ebf1fa' }
            },
            pickColor:false

        }
    },
    mounted() {
        this.uploadImg()
        this.$refs.title.focus()
        eventBus.on('uploadImg',this.uploadImg)
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
        },
        uploadImg(){
            this.$refs.image.click()
        },
        setColor(theme) {
            this.pickColor = false
            this.note.style = theme
        }
    },
    components: {
        chooseColor
    }
}