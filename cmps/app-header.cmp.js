export default {
    template:/*html*/ `
        <header class="app-header home-header flex">
                 
        <span class="end-icons">
          <img src="assets/img/svg/help.svg" @click="goAbout" alt="" />
          <img src="assets/img/svg/setting.svg" alt="" />
          <img src="assets/img/svg/apps.svg" alt="" @click="goToApp" />
        <span class="user-wrapper">
        <img src="assets/img/liraz.jpg" class="user-img" alt="">
          <img src="assets/img/svg/ring.svg" class="user-img-ring" alt="" />
        </span>
        </span>
      </section>

        </header>
    `, 
   
    methods:{
        goAbout(){
            this.$router.push('/about')
        }
    }
}

