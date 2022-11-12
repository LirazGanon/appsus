import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['state'],
    template: `
<section>


<form @submit.prevent="addNote" class="add-note">
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
        <button><i class="fa-solid fa-plus"></i></button>
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
        }
    }
}