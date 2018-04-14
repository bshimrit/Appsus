import eventBus, {DELETE_PLACE, SAVE_PLACE} from '../../services/general/event-bus.service.js'

import placeService from '../../services/place/place.service.js'

import placeMap from '../../cmps/place/place-map.js'
import placeSearch from '../../cmps/place/place-search.js'
import placeList from '../../cmps/place/place-list.js'

export default {
    template:`
    <section class="container place-app">
        <place-map  v-if="places.length" :places="places"></place-map>
        <place-search @searchLocation="searchLocation"></place-search>
        <place-list :places="places" @deletePlace="deletePlace" @locationClicked="goToLocation"></place-list>
        <router-view></router-view>
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
        placeList
    },
    created() {
        eventBus.$on(DELETE_PLACE, place => {
            this.deletePlace(place)});
        eventBus.$on(SAVE_PLACE, place => {
            this.savePlace(place)});
        placeService.query()
            .then(places => {
                this.places = places
            })
    },
    methods:{
        removeTmpLocation(){
            var idx = this.places.findIndex(place => place.isTemp);
            if (idx !== -1)
                this.places.splice(idx,1);
        },
        searchLocation(searchValue){
            this.removeTmpLocation();
            placeService.searchLocation(searchValue)
            .then((place) => {
                this.addTempLocation(place);
            })
        },
        addTempLocation(place){
            this.places.unshift(place);
        },
        deletePlace(place){
            this.removeTmpLocation();
            if (!place.isTemp){
                placeService.deletePlace(place.id)
                    .then(res => {
                        placeService.query()
                        .then(places => {
                            this.places= places;
                        })        
                    })
            }
        },
        savePlace(place){
            place.isTemp = false;
            debugger;
            placeService.savePlace(place)
                .then(res =>{
                    placeService.query()
                    .then(places => {
                        this.places = places
                    })
                })
        },
        goToLocation(place){
            placeService.goToLocation(place);
        }
    }
}