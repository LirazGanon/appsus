import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
<section>
  
      <section class="app-nav note-nav" :class="navState">
     
        <ul class="note-filters clean-list">
            <li>
                <label @cl>
                <i class="fa-regular fa-lightbulb"></i>
                    <span>Notes</span>
                    <input
                    v-model="filterBy.type"
                    type="radio"
                    @input="filter('note')"
                    value="note"
                    checked
                    />
                </label>
            </li>
            <li>
                <label>
                <i class="fa-solid fa-font"></i>
                    <span>Text</span>
                    <input
                    v-model="filterBy.type"

                    type="radio"
                    @input="filter('note-txt')"
                    value="note-txt"/>
                </label>
            </li>
            <li>
                <label>
                <i class="fa-solid fa-list"></i>
                    <span>Todos</span>
                    <input
                    v-model="filterBy.type"

                    type="radio"
                    @input="filter('note-todos')"
                    value="note-todos"/>
                </label>
            </li>
            <li>

                <label>
                <i class="fa-solid fa-camera"></i>
                        <span>Images</span>
                        <input
                    v-model="filterBy.type"

                        type="radio"
                        @input="filter('note-img')"
                        value="note-img"/>
                </label>
            
            </li>
         
            <li>
                <label>
                <i class="fa-brands fa-youtube"></i>
                    <span>Videos</span>
                    <input
                    v-model="filterBy.type"

                    type="radio"
                    @input="filter('note-video')"
                    value="note-video"/>
                </label>
            </li>
           
        </ul>
     
      
    
      </section>
`,
    data() {
        return {
            filterBy: {
                type: ''
            },
            expanded: false
        }
    },
    mounted() {
        eventBus.on('expandNav', this.expandNav)
    }
    ,
    methods: {
        filter(filter) {
            this.$emit('filter', { type: filter })
        },
        expandNav() {
            this.expanded = !this.expanded
        }
    },
    computed: {
        navState() {
            return { active: this.expanded }
        }
    },
    components: {
    },
    watch: {

    }
}