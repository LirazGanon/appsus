import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"
import chooseColor from '../cmps/choose-color.cmp.js'

export default {
    name: 'note-dits',
    template: `
<section class="full-screen" v-if="noteToEdit" @click="close">
    
    <section class="note-editor note" :style="noteToEdit.style" @click.stop>

    <!-- TXT -->
    <form  
    @submit="saveNote" 
    v-if="noteToEdit.type === 'note-txt'"
    class="flex flex-column">
    
    
    
    
    <input type="search" v-model="noteToEdit.info.title" />
    <textarea v-model="noteToEdit.info.txt" @keyup="resize" ref="textarea"></textarea>
        <!-- <input type="search" v-model="noteToEdit.info.txt" /> -->
        <button><i class="fa-solid fa-check"></i></i></button>
        

    </form>


<!-- IMG -->
    <form 
        class="flex flex-column" 
        @submit="saveNote"
        v-if="noteToEdit.type === 'note-img'">
        
        <input type="search" v-model="noteToEdit.info.title" />
        <img :src="noteToEdit.info.url" alt="" />

        <input 
                v-model="noteToEdit.info.url"
                type="text" 
                placeholder="Image URL..."/>
        <input 
            v-model="note.info.url" 
            @change="onImgInp" 
            type="file" 
            ref="image" 
            hidden
            />
            <div class="img-upload">
                <button @click.prevent="setRef">
                    <i class="fa-regular fa-image"></i>
                </button>
            </div>
            <button><i class="fa-solid fa-check"></i></button>
        </form>
        
        
        <!-- VIDEO -->
        <form class="flex flex-column" 
        @submit="saveNote" 
        v-if="noteToEdit.type === 'note-video'">
        <input type="search" v-model="noteToEdit.info.title" />
        <iframe :src="noteToEdit.info.url"></iframe>
        
        <input type="search" @input="onFileChange" placeholder="Youtube URL..." v-model="noteToEdit.info.url" />
        <button><i class="fa-solid fa-check"></i></button>
        
            </form>

            <section class="edit-actions flex">
                <router-link to="/note"><i class="fa-solid fa-angles-left"></i></router-link>

                <div class="action color-note">
                    <img src="assets/img/paint.png" @click="pickColor = !pickColor"/>
                </div>
                <choose-color v-if="pickColor" @setColor="setColor" />
            </section>
   
    </section>
</section>
`,
    data() {
        return {
            noteToEdit: null,
            pickColor: false
        }
    },
    created() {
        this.loadNote()
    },
    methods: {
        loadNote() {
            noteService.get(this.noteId)
                .then(note => {
                    console.log(note);
                    this.noteToEdit = note
                    console.log(note);
                })
        },
        saveNote() {
            noteService.save(this.noteToEdit).then(note => {
                showSuccessMsg('note saved')
                this.$router.push('/note')
            }
            )
        },
        setRef() {
            this.$refs.image.click()
        },
        onImgInp(e) {
            const file = e.target.files[0]
            this.noteToEdit.info.url = URL.createObjectURL(file)
        },
        onFileChange(ev) {
            let url = ev.target.value
            const regExp =
                /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
            const match = url.match(regExp)
            const id = match && match[7].length == 11 ? match[7] : null
            const newURL = 'https://www.youtube.com/embed/' + id
            this.noteToEdit.info.url = newURL
        },
        close(){
            this.$router.push({path:'/note'})
        },
        setColor(theme){
            this.noteToEdit.style = theme
            this.pickColor = false
        },
        resize(e){
            const textarea = this.$refs.textarea
            textarea.style.height = `55px`
            let scrollH = e.target.scrollHeight
            textarea.style.height = `${scrollH}px`
        }
    },
    computed: {
        noteId() {
            return this.$route.params.id
        }
    },
    components: {
        chooseColor
    },
    watch: {
        noteId() {
            this.loadNote()
        }

    }
}