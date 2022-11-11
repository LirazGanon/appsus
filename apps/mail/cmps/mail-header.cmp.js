export default {
    name: 'mail-header',
    props: [''],
    template:/*html*/ `
        <section class="app-header flex justify-between">
        <section class="mail-filter">
            <input 
                @input="filter"
                v-model="filterBy.subject" 
                type="text" 
                placeholder="Search" />
        </section>
                <span class=end-icons>
                <img src="../assets/img/svg/help.svg" alt="">
                <img src="../assets/img/svg/setting.svg" alt="">
                <img src="../assets/img/svg/apps.svg" alt="" @click="goToApp">
                <img src="../assets/img/svg/ring.svg" alt="">
                </span>
        </section>
    `,
    data() {
        return {
            filterBy: {
                subject: '',
                minSpeed: 0
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        },
        goToApp(){
            this.$router.push('/note')
        }
    },
    func() {
        this.$emit('')
    }
}
