export default {
    template: `
<section>


    <form @submit.prevent="addNote">
        <input v-model="info.txt" type="type"/>
        <input @change="previewFile" type="file" />
        <input @change="saveURL" type="text" placeholder="enter video URL..." />
        <button>submit</button>
    </form>
    <img class="img" v-if="info.img" :src="info.img" alt=""  />
    

</section>
`,
    data() {
        return {
            info: {
                txt: '',
                img: null,
                videoURL: null
            }
        }
    },
    methods: {
        addNote() {
            console.log('this.txt:', this.info)
        },
        previewFile(ev) {
            //    const {name,type} = ev.target.files[0]
            //    console.log(ev.target.files[0]);
            //    console.log(name);
            //    console.log(type);
            //    console.log('variable:', name.toDataURL(type))
            //         this.info.img = name.toDataURL(type)

            var reader = new FileReader();
            reader.onload = function (e) {
                this.info.img = e.target.result
            }
            reader.readAsDataURL(ev.target.files[0])
        },
        saveURL(ev) {
            let url = ev.target.value
            let newUrl = url.match(/(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/);
            newUrl[5] = '/embed'
            newUrl.splice(0,1)
            newUrl = newUrl.join('')
            this
            console.log(newUrl);
        }

    },
    computed: {

    },
    components: {
    }
}

