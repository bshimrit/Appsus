import placePreview from '../place/place-preview.js'
export default {
    props:['places'],
    template:`
    <section >
        <section class="place-list" :class="{showList: showList}">
            <div @click="showList = !showList">
                <h1  class="places-btn font-bold base-color title is-4">Your places <span class="fa">{{mq.matches ? '' : ''}}</span></h1>
            </div>
            <ul v-if="mq.matches || showList">
                <li v-for="place in places" class="place-item" :class="{tmpPlace: place.isTemp}" >
                    <place-preview class="pointer" :place="place" @click.native="locationClicked(place)"></place-preview>
                </li>
            </ul>
        </section>
    </section>
    `,
    methods:{
        locationClicked(place){
            this.showList = false;
            this.$emit('locationClicked',place)
        }

    },
    data(){
        return {
            mq: window.matchMedia( "(min-width: 740px)" ),
            showList : false
        }
    },
    components:{
        placePreview
    }
    
}