export default {
    template: `
        <header class="app-header">
            <router-link to="/">
            <img src="assets/img/main-logo.png" alt="">

            </router-link> 
            
            <!-- <div class="grid-menu">
                <span class="dot" style="--i:-1;--j:-1"></span>
                <span class="dot" style="--i:-1;--j:0"></span>
                <span class="dot" style="--i:-1;--j:1"></span>
                <span class="dot" style="--i:0;--j:-1"></span>
                <span class="dot" style="--i:0;--j:0"></span>
                <span class="dot" style="--i:0;--j:1"></span>
                <span class="dot" style="--i:1;--j:-1"></span>
                <span class="dot" style="--i:1;--j:0"></span>
                <span class="dot" style="--i:1;--j:1"></span>
            </div> -->

            <nav>
                <router-link to="/about">About</router-link>
                <router-link to="/note">notes</router-link>
                <router-link to="/mail">mail</router-link>
           
                <!-- <router-link :to="'/mail/' + 'id'">dits</router-link> -->

            </nav>
        </header>
    `,
}

