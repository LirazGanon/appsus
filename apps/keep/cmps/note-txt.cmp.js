export default {
    props: ['note'],
    template: `
<section>
    <h2>TXT!</h2>
    <button @click="deleteNote">delete</button>
<pre>{{note}}</pre>
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