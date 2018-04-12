import placeService from '../../services/place/place.service.js'

export default {
    template:`
    <section id="map" class="map">
        {{getMap}}
    </section>
    `
    ,
    computed: {
        getMap(){
            return this.getServiceMap();
        }
    },
    methods:{
        getServiceMap(){
            return placeService.loadMap();
        }
    }
}