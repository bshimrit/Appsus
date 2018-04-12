import placeService from '../../services/place/place.service.js'

import placeMap from '../../cmps/place/place-map.js'
import placeSearch from '../../cmps/place/place-search.js'
import placeMarked from '../../cmps/place/place-marked.js'

export default {
    template:`
    <section class="placeApp">
        <place-map @loadMap="loadMap"></place-map>
        <place-search @searchLocation="searchLocation"></place-search>
        <place-marked></place-marked>
    </section>
    `,
    components:{
        placeMap,
        placeSearch,
        placeMarked
    },
    methods:{

        searchLocation(searchValue){
            placeService.searchLocation(this.searchValue)            
        },
        loadMap(){
            placeService.loadMap();
        }
    }
}