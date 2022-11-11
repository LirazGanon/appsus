export default {
    name: 'mail-tab-filter',
    props: ['unread'],
    template:/*html*/ `
        <section class="mail-tab-filter">
         <button v-for="(filter,idx) in filterBy" class="filter-btn" :key="idx" 
         @click="setFilter(filter)" :class="{'btn-selected':filter===selected}"><i :class="fa[idx]" ></i>&nbsp {{ filter }} {{unread[filter]}} </button>
        </section>
    `,
    data() {
        return {
            filterBy: [
                'Primary',
                'Promotion',
                'Social'
            ],
            fa:[
                'fa-solid fa-inbox',
                'fa-solid fa-tag',
               'fa-solid fa-user-group'
            ],
            selected:'Primary'
        }
    },
    methods: {
        setFilter(filter) {
            this.selected = filter
            if (filter === 'Primary') filter = ''
            this.$emit('tabFilter', filter)
        },
    }
}