export default {
    props: ['note'],
    template: `
    <section class="note">

        <h2>{{ note.info.title}}</h2>
        <iframe :src="note.info.url" frameborder="0"></iframe>
    </section>
`,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
    },
    components: {
    }
}