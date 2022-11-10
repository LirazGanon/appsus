export default {
    template: `
<section class="choose-color" >
    <div v-for="theme in themes" :style="theme" @click="$emit('setColor',theme)"></div>    
</section>
`,
    data() {
        return {
            themes: [
                { backgroundColor: '#de6457' },
                { backgroundColor: '#dae86d' },
                { backgroundColor: '#94ed61' },
                { backgroundColor: '#61c3ed' },
                { backgroundColor: '#5d70de' },
                { backgroundColor: '#cb75f0' },

            ]
                
    
}
    },
methods: {
  
},
computed: {
},
components: {
}
}