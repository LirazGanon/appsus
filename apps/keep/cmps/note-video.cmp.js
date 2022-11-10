export default {
    props: ['note'],
    template: `
    <h2>{{ note.info.title}}</h2>
    <iframe :src="note.info.url" frameborder="0"></iframe>
    <span>{{ note.info.url}}</span>
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