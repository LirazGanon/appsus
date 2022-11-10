export default {
    template: `
<section>
    <input
        v-model="filterBy.title"
        @input="filter"
        type="text"
      />
      <section>
        <label>
            <span>Notes</span>
            <input
            type="radio"
            v-model="filterBy.type"
            @input="filter"
            checked
            value=""/>
        </label>
        <label>
            <span>text</span>
            <input
            type="radio"
            v-model="filterBy.type"
            @input="filter"
            value="note-txt"/>
        </label>
        <label>
                <span>images</span>
                <input
                type="radio"
                v-model="filterBy.type"
                @input="filter"
                value="note-img"/>
            </label>
            <label>
                <span>Todos</span>
                <input
                type="radio"
                v-model="filterBy.type"
                @input="filter"
                value="note-todos"/>
            </label>
      </section>
</section>
`,
    data() {
        return {
            filterBy: {
                title: '',
                type: null
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    },
    computed: {
    },
    components: {
    },
    watch: {

    }
}