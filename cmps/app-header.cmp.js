import appsPicker from './apps-picker.cmp.js'

export default {
    template:/*html*/ `
    <header class="app-header home-header flex">
    <span class="end-icons">
    <img src="assets/img/svg/help.svg" @click="goAbout" alt="" />
    <img src="assets/img/svg/setting.svg" alt="" />
    <span class="apps-wrapper flex align-center" @click.stop="toggleShowApps">
    <img src="assets/img/svg/apps.svg" alt="" @click="goToApp" />
    <apps-picker :class="{'opacity-1':appsIsShowing}">
    </span>
    <span class="user-wrapper">
    <img src="assets/img/liraz.jpg" class="user-img" alt="">
    <img src="assets/img/svg/ring.svg" class="user-img-ring" alt="" />
    </span>
    </span>
    </section>
    <section  class="apps-screen" @click="toggleShowApps" :class="{'opacity-1':appsIsShowing}">
        </header>
    `,
    data(){
      return{
        appsIsShowing:false
      }
    },   
    methods:{
        goAbout(){
            this.$router.push('/about')
        },
        toggleShowApps(){
          this.appsIsShowing = !this.appsIsShowing
        }
    },
    components: {
      appsPicker
    }
}

