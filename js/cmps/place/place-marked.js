import placePreview from '../place/place-preview.js'
export default {
    props:['places'],
    template:`
    <section class="place-marked">
        <h1>Your places</h1>
        <ul>
            <li v-for="place in places">
                <place-preview :place="place"></place-preview>
                <button class="clear-btn" @click.stop="emitDelete(place)">delete</button>
                <hr>
            </li>
        </ul>
    </section>
    `,
    methods:{
        emitDelete(place) {
            this.$emit('deletePlace',place);
        },
    },
    components:{
        placePreview
    }
}