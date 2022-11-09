export default {
    template: `
        <header class="app-header">
            <router-link to="/">
            <img src="assets/img/main-logo.png" alt="">

            </router-link> 
            
            <nav>
                <router-link to="/about">About</router-link>
                <br />
                <br />
                <router-link to="/note">notes</router-link>
                <br />
                <br />
                
                <router-link to="/mail">mail</router-link>
                <br />
                <br />
                
                <!-- <router-link :to="'/mail/' + 'id'">dits</router-link> -->

            </nav>
        </header>
    `,
}

