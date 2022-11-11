export default {
    template: `
<section>
  
      <section class="app-nav">
     
        <ul class="note-filters clean-list">
            <li>
                <label>
                <i class="fa-solid fa-inbox"></i>
                    <span>inbox</span>
                    <input
                    type="radio"
                    v-model="filterBy.type"
                    @input="filter"
                    checked
                    value=""/>
                </label>
            </li>
            <li>
                <label>
                <i class="fa-solid fa-font"></i>
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
                <i class="fa-solid fa-camera">
                        <span></i>images</span>
                        <input
                        type="radio"
                        v-model="filterBy.type"
                        @input="filter"
                    value="note-img"/>
                </label>
            
            </li>
            <li>
                <label>
                <i class="fa-solid fa-list"></i>
                    <span>Todos</span>
                    <input
                    type="radio"
                    v-model="filterBy.type"
                    @input="filter"
                    value="note-todos"/>
                </label>
            </li>
            <li>
                <label>
                <i class="fa-brands fa-youtube"></i>
                    <span>videos</span>
                    <input
                    type="radio"
                    v-model="filterBy.type"
                    @input="filter"
                    value="note-video"/>
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