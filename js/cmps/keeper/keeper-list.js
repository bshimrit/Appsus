export default {
    props: {keep: {default:[]}, editMode: {default: true}},
    template:`<section @click="emitSelected" class="flex flex-column justify-end align-start">
        <input type="text" class="font-bold" placeholder="Title" v-model="curKeep.title" :disabled="editMode"></input>
        <ul>
            <li v-for="i in curKeep.notes.length" >
                <label for='note' class="checkbox"></label>
                <input id='note' type="checkbox" :disabled="editMode"></input>
                <span contentEditable="editMode">{{curKeep.notes[i - 1]}}</span>
            </li>
        </ul>
        </section>
    `,
    data(){
        return {
            curKeep: this.keep
        }
    },
    methods:{
        emitSelected(){
            this.$emit('selected',this.keep);
        }
    }
}