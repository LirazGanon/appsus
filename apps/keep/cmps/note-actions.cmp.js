import { eventBus } from '../../../services/event-bus.service.js'
import chooseColor from './choose-color.cmp.js'


export default {
    name: 'note-actions',
    props: ['note'],
    template: `
<section>
<div class="actions">
        <div class="action delete-note" title="delete" @click="deleteNote(note.id)">
            <img src="assets/img/trash.png" alt=""  />
        </div>
        <div class="action edit-note" v-if="note.type !== 'note-todos'" title="edit">
            <router-link :to="'/note/edit/' + note.id">
                <img src="assets/img/editing.png" 
                />
            </router-link>
        </div>
        <div class="action send-note" title="email" @click="sendMail">
            <img src="assets/img/envelope.png" alt=""  />
        </div>
        <div class="action color-note" title="color">
            <img src="assets/img/paint.png" @click="pickColor = !pickColor"/>
        </div>
        <div class="action pin-note" @click="pinNote" title="pin">
            <img :src="pinImg" alt="" />
        </div>
        <div class="action pin-note" @click="copyNote" title="copy">
        <img src="assets/img/copy.png" alt="" />
        </div>
        <choose-color v-if="pickColor" @setColor="setColor">
            
    </div>
</section>
`,
    data() {
        return {
            pickColor: false,
        }
    },
    methods: {
        deleteNote(noteId) {
            this.$emit('delete',noteId)
        },
        setColor(theme) {
            this.pickColor = false
            this.$emit('setColor', theme)
        },
        pinNote() {
            this.$emit('pinNote')
        },
        copyNote(){
            this.$emit('copyNote')
        },
        sendMail(){
            eventBus.emit('noteToMail',this.note)
        }

    },
    computed: {
        pinImg() {
            return this.note.isPinned ? 'assets/img/pinned.png' : 'assets/img/pin.png'
        }
    },
    components: {
        chooseColor
    }
}