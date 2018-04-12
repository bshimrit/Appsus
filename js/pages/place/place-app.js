import placeService from '../../services/place/place.service.js'

import placeMap from '../../cmps/place/place-map.js'
import placeSearch from '../../cmps/place/place-search.js'
import placeMarked from '../../cmps/place/place-marked.js'

export default {
    template:`
    <section class="placeApp">
        <place-map  v-if="places.length" :places="places"></place-map>
        <place-search @searchLocation="searchLocation"></place-search>
        <place-marked :places="places"></place-marked>
    </section>
    `,
    data(){
        return {
            places: []
        }
    },
    components:{
        placeMap,
        placeSearch,
        placeMarked
    },
    created() {
        placeService.query()
            .then(places => {
                this.places = places
            })
    },
    methods:{
        searchLocation(searchValue){
            placeService.searchLocation(this.searchValue)            
        }
    }
}