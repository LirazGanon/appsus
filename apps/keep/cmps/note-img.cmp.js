import noteActions from './note-actions.cmp.js'


export default {
    props: ['note'],
template: `
<section class="note">
    <h2 class="title">{{note.info.title}}</h2>
    <h2>{{note.info.url}}</h2>
    <div className="img-placeholder">
        <img :src="note.info.url" alt="" />
    </div>
    <!-- <pre>{{note}}</pre> -->
    <note-actions 
        @deleteNote="deleteNote"
        :note="note">
</section>
`,
data() {
return {
}
},
methods: {
  
},
computed: {
},
components: {
    noteActions
}
}