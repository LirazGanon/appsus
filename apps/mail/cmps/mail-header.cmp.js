export default {
    name: 'mail-header',
    props: [''],
    template:/*html*/ `
	<section class="app-header flex justify-between align-center">
	  <section class="logo-container flex">
	    <i class="fa-solid fa-bars"></i>
	    <img src="assets/img/mail-logo.png" class="mail-logo" />
	    <p>Amail</p>
	  </section>
	  <section class="mail-filter">
	    <input
	      @input="filter"
	      v-model="filterBy.subject"
	      type="text"
	      placeholder="Search"
	    />
	  </section>
	  <span class="end-icons">
	    <img src="../assets/img/svg/help.svg" alt="" />
	    <img src="../assets/img/svg/setting.svg" alt="" />
	    <img src="../assets/img/svg/apps.svg" alt="" @click="goToApp" />
      <span class="user-wrapper">
      <img src="../assets/img/liraz.jpg" class="user-img" alt="">
	    <img src="../assets/img/svg/ring.svg" class="user-img-ring" alt="" />
      </span>
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
