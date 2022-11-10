export default {
    template: `
<section>
hi
</section>
`,
    data() {
        return {
            note: {
                id: '',
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        {
                            txt: '',
                            doneAt: null,
                            id:'x'+ this.noteId++ 
                        }
                    ]
                }
            },
            noteId: 101
        }
    },
    methods: {
    },
    computed: {
    },
    components: {
    }
}