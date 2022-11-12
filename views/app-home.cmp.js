import appHeader from '../cmps/app-header.cmp.js'
import appFooter from '../cmps/app-footer.cmp.js'
import weather from '../cmps/weather.cmp.js'
import clock from '../cmps/clock.cmp.js'

export default {
	template:/*html*/ `
	<main class="flex flex-column home">
	  <app-header />
	  <section v-if="getPath==='/'" class="home-page">
	    <section class="home-info flex justify-between">
	      <weather />
	      <clock />
	    </section>
	    <span class="flex justify-center">
	      <img class="main-logo" src="assets/img/appsoos.png" alt="" />
	    </span>
	    <section class="apps flex justify-center">
	      <span
	        ><router-link to="/mail">
	          <img src="assets/img/mail-logo.png" alt="" />
	          <p>jQmail</p>
	        </router-link></span
	      >
	      <span
	        ><router-link to="/note">
	          <img class="note-img" src="assets/img/note-logo.png" alt="" />
	          <p>jQeep</p>
	        </router-link></span
	      >
	    </section>
	  </section>
	  <router-view v-else />
	  <app-footer />
	</main>
	`,
      created(){
        console.log(this.$route.path)
    },
    computed:{
        getPath(){
            return this.$route.path
        }
    },
    components: {
        appHeader,
        weather,
        clock,
        appFooter
    }
}


