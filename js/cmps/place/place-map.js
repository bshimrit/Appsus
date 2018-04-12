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
            // var places = this.places;
            this.markers.forEach(marker =>{
                // debugger;
                mapService.addMarker({lat:marker.lat,lng:marker.lng});
            })
            mapService.setCenter({lat:this.markers[0].lat,lng:this.markers[0].lng});
            mapService.setZoom(12);
        })
    },
    data(){
        return {
            markers: this.places
        }
    }

}