export default {
    name: 'note-header',
    props: [''],
    template:/*html*/ `
        <section class="app-header note-header flex justify-between align-center">

        <section class="logo-container flex">
        <button>
        <i class="fa-solid fa-bars"></i>
        </button>
            <img src="assets/img/note-logo.png" class="note-logo"alt="" />
            <p>ote</p>
        </section>
            <label>
            <span><i class="fa-solid fa-magnifying-glass"></i></span>
             <input
                v-model="filterBy.title"
                @input="filter"
                type="search"
                placeholder="search..."/> 
            </label>
                <span class=end-icons>
                <img src="assets/img/svg/help.svg" alt="">
                <img src="assets/img/svg/setting.svg" alt="">
                <img src="assets/img/svg/apps.svg" alt="" @click="goToApp">
                <span class="user-wrapper">
                <img src="assets/img/nadav.png" class="user-img" alt="">
                  <img src="assets/img/svg/ring.svg" class="user-img-ring" alt="" />
                </span>
        </section>
    `,
    data() {
        return {
            filterBy:{
                title:''
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filterTitle', this.filterBy)
        },
        goToApp() {
            this.$router.push('/mail')
        }
    }
}
