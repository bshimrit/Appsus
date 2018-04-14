import mapService from '../../services/place/map.service.js'
export default {
    props:['places'],
    template:`
    <section >
        <div id="map" ref="map" class="map"></div>
    </section>
    `
    , 
    mounted(){
        mapService.initMap(this.$refs.map)
        .then(() => {
            this.markers.forEach(marker =>{
                mapService.addMarker({lat:marker.lat,lng:marker.lng});
            })
            mapService.setCenter({lat:this.markers[0].lat,lng:this.markers[0].lng});
        })
    },
    data(){
        return {
            markers: this.places
        }
    }

}