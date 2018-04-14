import placePreview from '../place/place-preview.js'
export default {
    props:['places'],
    template:`
    <section class="place-list">
        <h1 class="font-bold">Your places</h1>
        <ul>
            <li v-for="place in places" class="place-item" :class="{tmpPlace: place.isTemp}" >
                <place-preview class="pointer" :place="place" @click.native="locationClicked(place)"></place-preview>
            </li>
        </ul>
    </section>
    `,
    methods:{
        locationClicked(place){
            this.$emit('locationClicked',place)
        }

    },
    components:{
        placePreview
    }
    
}