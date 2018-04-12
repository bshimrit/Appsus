import placeMap from '../../cmps/place/place-map.js'
import placeSearch from '../../cmps/place/place-search.js'
import placeMarked from '../../cmps/place/place-marked.js'

export default {
    template:`
    <section class="placeApp">
        <place-map></place-map>
        <place-search></place-search>
        <place-marked></place-marked>
    </section>
    `,
    components:{
        placeMap,
        placeSearch,
        placeMarked
    }
}