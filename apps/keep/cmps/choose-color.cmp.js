export default {
    template: `
<section class="choose-color" >
    <div v-for="theme in themes" :style="theme" @click="$emit('setColor',theme)"></div>    
</section>
`,
    data() {
        return {
            themes: [
                { backgroundColor: '#f28b82' },
                { backgroundColor: '#fff475' },
                { backgroundColor: '#ccff90' },
                { backgroundColor: '#cbf0f8' },
                { backgroundColor: '#aecbfa' },
                { backgroundColor: '#d7aefb' },

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