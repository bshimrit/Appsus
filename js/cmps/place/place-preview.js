import eventBus, {DELETE_PLACE, SAVE_PLACE} from '../../services/general/event-bus.service.js'

export default {
    props: ['place'],
    template:`
    <section class="pointer place-preview">
        <h1>{{place.name}}</h1>
        <p>{{place.description}}</p>
        <button class="clear-btn menu-btn" @click.stop="emitDelete">delete</button>
        <router-link  class="menu-btn" @click.native="showModal = true" @close="showModal = false" :to="'/place/edit/'+ place.id">{{(place.isTemp)? 'Add': 'Edit'}}</router-link>
        <!-- <button v-if="place.isTemp" class="button is-primary" @click.stop="emitAdd">Add</button> -->
    </section>
    `,
    data(){
        return {
            showModal: false
        }
    },
    methods:{
        emitDelete() {
            eventBus.$emit(DELETE_PLACE,this.place);
        },
        emitAdd() {
            eventBus.$emit(SAVE_PLACE,this.place);
        },
    }
}