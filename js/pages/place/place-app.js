import placeService from '../../services/place/place.service.js'

import placeMap from '../../cmps/place/place-map.js'
import placeSearch from '../../cmps/place/place-search.js'
import placeMarked from '../../cmps/place/place-marked.js'

export default {
    template:`
    <section class="container place-app">
        <place-map  v-if="places.length" :places="places"></place-map>
        <place-search @searchLocation="searchLocation"></place-search>
        <place-marked :places="places" @deletePlace="deletePlace" @locationClicked="goToLocation"></place-marked>
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
        },
        deletePlace(place){
            placeService.deletePlace(place.id)
                .then(res => {
                    placeService.query()
                    .then(places => {
                        this.places= places;
                    })        
                })
        },
        goToLocation(place){
            placeService.goToLocation(place);
        }
    }
}