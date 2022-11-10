import chooseColor from './choose-color.cmp.js'

export default {
    name: 'note-actions',
    props: ['id'],
    template: `
<section>
<div class="actions">
        <div class="action delete-note" title="delete">
            <img src="assets/img/trash.png" alt="" @click="deleteNote" />
        </div>
        <div class="action edit-note">
            <router-link :to="'/note/' + id">
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
        <div class="action pin-note">
            <img src="assets/img/pin.png" alt="" />
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
        setColor(theme){
            console.log('theme:', theme)
            this.pickColor = false
        }

    },
    computed: {
        
    },
    components: {
        chooseColor
    }
}