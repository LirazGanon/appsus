export default {
    template: `
<section>
    <!-- <input
        v-model="filterBy.title"
        @input="filter"
        type="text"
      /> -->
      <section class="app-nav">
        <ul class="clean-list">
            <li>
                <label>
                    <span>text</span>
                    <input
                    type="radio"
                    v-model="filterBy.type"
                    @input="filter"
                    value="note-txt"/>
                </label>
            </li>
            <li>
                <label>
                        <span><i class="fa-solid fa-camera"></i></span>
                        <input
                        type="radio"
                        v-model="filterBy.type"
                        @input="filter"
                    value="note-img"/>
                </label>
            
            </li>
            <li>
                <label>
                    <span>Todos</span>
                    <input
                    type="radio"
                    v-model="filterBy.type"
                    @input="filter"
                    value="note-todos"/>
                </label>
            </li>
        </ul>
     
      
    
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