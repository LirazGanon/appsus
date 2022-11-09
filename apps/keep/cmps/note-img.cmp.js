import noteActions from './note-actions.cmp.js'


export default {
    props: ['note'],
template: `
<section class="note">
    <h2 class="title">{{note.info.title}}</h2>
    <div className="img-placeholder">
        <h2>{{note.info.url}}</h2>
        <img :src="note.info.url" alt="" />
    </div>
    <!-- <pre>{{note}}</pre> -->
    <note-actions 
        @delete="deleteNote" />
        
</section>
`,
data() {
return {
}
},
methods: {
    deleteNote(){
        this.$emit('delete',this.note.id)
    }
},
computed: {
},
components: {
    noteActions
}
}