

export default {
    template: `
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
                    color: '#8d0000'
                },
                {
                    var: '--nav-bg',
                    color: '#44ff00'
                }
                ],

                [{
                    var: '--bg-light-white',
                    color: '#333'
                },
                {
                    var: '--nav-bg',
                    color: '#333'
                }
                ],

                [{
                    var: '--bg-light-white',
                    color: '#fff475'
                },
                {
                    var: '--nav-bg',
                    color: '#fff475'
                }
                ],
                
                [{
                    var: '--bg-light-white',
                    color: '#ccff90'
                },
                {
                    var: '--nav-bg',
                    color: '#ccff90'
                }
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
