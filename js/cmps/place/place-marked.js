import placePreview from '../place/place-preview.js'
export default {
    props:['places'],
    template:`
    <section class="placeMarked">
        <h1>Your places</h1>
        <ul>
            <li v-for="place in places">
                <place-preview :place="place"></place-preview>
                <button @click.stop="emitDelete(place)">delete</button>
                <hr>
            </li>
        </ul>
    </section>
    `,
    methods:{
        emitDelete(email) {
            this.$emit('deleteEmail');
        },
    },
    components:{
        placePreview
    }
}