export default {
    props: ['note'],
    template: `
<section class="note">
    <p>{{ note.info.txt }}</p>

    <div class="actions">
        <div class="action delete-note">
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
<!-- <pre>{{note}}</pre> -->
</section>
`,
    data() {
        return {

        }
    },
    methods: {
        deleteNote(){
            this.$emit('delete',this.note.id)
        }
    },
    computed: {
    },
    components: {
    }
}