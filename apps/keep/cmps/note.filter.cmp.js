import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
<section>
  
      <section class="app-nav" :class="navState">
     
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
                <i class="fa-solid fa-camera"></i>
                        <span>images</span>
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
            },
            expanded: false
        }
    },
    mounted() {
        eventBus.on('expandNav', this.expandNav)
    }
    ,
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        },
        expandNav() {
            this.expanded = !this.expanded
        }
    },
    computed: {
        navState(){
            return {active:this.expanded}
        }
    },
    components: {
    },
    watch: {

    }
}