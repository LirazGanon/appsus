export default {
    template: `
<section>
<div class="actions">
        <div class="action delete-note" title="delete">
            <img src="../../../assets/img/trash.png" alt="" @click="deleteNote" />
        </div>
        <div class="action edit-note">
            <img src="../../../assets/img/editing.png" alt="" />
        </div>
        <div class="action send-note">
            <img src="../../../assets/img/envelope.png" alt="" />
        </div>
        <div class="action color-note">
            <img src="../../../assets/img/paint.png" alt="" />
            
       
        
        </div>
        <div class="action edit-note">
            <img src="../../../assets/img/pin.png" alt="" />
        </div>
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
            this.$emit('deleteNote')
        }
    },
    computed: {
    },
    components: {
    }
}