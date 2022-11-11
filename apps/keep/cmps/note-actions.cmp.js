import chooseColor from './choose-color.cmp.js'

export default {
    name: 'note-actions',
    props: ['note'],
    template: `
<section>
<div class="actions">
        <div class="action delete-note" title="delete" @click="deleteNote">
            <img src="assets/img/trash.png" alt=""  />
        </div>
        <div class="action edit-note">
            <router-link :to="'/note/edit/' + note.id">
                <img src="assets/img/editing.png" 
                />
            </router-link>
        </div>
        <div class="action send-note">
            <img src="assets/img/envelope.png" alt="" />
        </div>
        <div class="action color-note">
            <img src="assets/img/paint.png" @click="pickColor = !pickColor"/>
        </div>
        <div class="action pin-note" @click="pinNote">
            <img :src="pinImg" alt="" />
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
        deleteNote() {
            this.$emit('delete')
        },
        setColor(theme) {
            this.pickColor = false
            this.$emit('setColor', theme)
        },
        pinNote() {
            console.log('hi');
            this.$emit('pinNote')
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