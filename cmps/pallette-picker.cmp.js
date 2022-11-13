

export default {
    template:/*html*/ `
<section class="pallette-picker animate__animated animate__fadeInDown" :class="puki">
    <div v-for="(theme,idx) in themes" :style="theme" @click="setTheme(idx)" ></div>
</section>
`,
    data() {
        return {
            themes: [
                { backgroundColor: '#333' },
                { backgroundColor: '#aaa' },
                { backgroundColor: '#fff475' },
                { backgroundColor: '#ccff90' }
            ],
            theme: 0,
            rootVars: [
            
                [{
                    var: '--bg-light-white',
                    color: '#333'
                },
                {
                    var: '--nav-bg',
                    color: '#959595'
                },
                {
                    var: '--txt',
                    color: '#d3d3d3'
                },
                {
                    var: '--main-background',
                    color: '#444'
                },
                {
                    var: '--inp-bg',
                    color: '#555'
                },
                {
                    var: '--btn-hover-bg',
                    color: '#222'
                },
                {
                    var: '--mail-unread-bg',
                    color: '#999'
                },
                {
                    var: '--active-nav-background',
                    color: '#777'
                },
                {
                    var: '--composed-bg',
                    color: '#777'
                },
                {
                    var: '--nav-hover',
                    color: '#777'
                },
                ],
// --------------------------------------------- gray
                [{
                    var: '--bg-light-white',
                    color: '#a0a0a0'
                },
                {
                    var: '--nav-bg',
                    color: '#f1f1f1'
                },
                {
                    var: '--txt',
                    color: '#555'
                },
                {
                    var: '--main-background',
                    color: '#fcfcfc'
                },
                {
                    var: '--inp-bg',
                    color: '#aaa'
                },
                {
                    var: '--btn-hover-bg',
                    color: '#aaa'
                },
                {
                    var: '--mail-unread-bg',
                    color: '#aaa'
                },
                {
                    var: '--active-nav-background',
                    color: '#aaa'
                },
                {
                    var: '--composed-bg',
                    color: '#aaa'
                },
                {
                    var: '--nav-hover',
                    color: '#aaa'
                },
                ],

               // --------------------------------------------- yellow
               [{
                var: '--bg-light-white',
                color: '#fffde1'
            },
            {
                var: '--nav-bg',
                color: '#f5f5d6'
            },
            {
                var: '--txt',
                color: '#555'
            },
            {
                var: '--main-background',
                color: '#fffcc5'
            },
            {
                var: '--inp-bg',
                color: '#fffedd'
            },
            {
                var: '--btn-hover-bg',
                color: '#f1eeae'
            },
            {
                var: '--mail-unread-bg',
                color: '#fefee6'
            },
            {
                var: '--active-nav-background',
                color: '#fffba6'
            },
            {
                var: '--composed-bg',
                color: '#f4ef95'
            },
            {
                var: '--nav-hover',
                color: '#fffdd0'
            },],
                     // --------------------------------------------- yellow
               [{
                var: '--bg-light-white',
                color: '#ddffe7'
            },
            {
                var: '--nav-bg',
                color: '#bcffd0'
            },
            {
                var: '--txt',
                color: '#555'
            },
            {
                var: '--main-background',
                color: '#ddffe7'
            },
            {
                var: '--inp-bg',
                color: '#a8ffaa'
            },
            {
                var: '--btn-hover-bg',
                color: '#bcffd0'
            },
            {
                var: '--mail-unread-bg',
                color: '#d4ffdd'
            },
            {
                var: '--active-nav-background',
                color: '#87fca1'
            },
            {
                var: '--composed-bg',
                color: '#87fca1'
            },
            {
                var: '--nav-hover',
                color: '#acffbe'
            },
                ],

            ]
        }
    },
    methods: {
        setTheme(idx) {
            this.theme = idx
            let root = document.querySelector(":root")
            this.rootVars[idx].forEach(theme => {
                root.style.setProperty(theme.var, theme.color);
            });

        }
    },
    computed: {
        puki() {
            return {
                'light': this.theme === 0,
                'dark': this.theme === 1,
                'warm': this.theme === 2,
                'chill': this.theme === 3
            }
        }
    }
}
