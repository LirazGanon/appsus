export default {
    name: 'mail-tab-filter',
    props: ['unread','checked'],
    template:/*html*/ `
        <section class="mail-tab-filter">
        <section class="top-checkbox">
        <input type="checkbox" @input="checkedAll">
        <i v-if="checked.length" class="fa-regular fa-trash-can" @click='deleteChecked'></i>
        </section>
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
        deleteChecked(){
            this.$emit('deleteChecked')
        },
        checkedAll(ev){
            this.$emit('checkedAll',ev.target.checked)
        }
    }
}