import eventBus, {DELETE_PLACE, SAVE_PLACE} from '../../services/general/event-bus.service.js'

export default {
    props: ['place'],
    template:`
    <section class="pointer place-preview">
        <h2 class="font-bold">{{place.name}}</h2>
        <p>{{place.description}}</p>
        <div class="menu-btn">
            <button class="clear-btn menu-btn" @click.stop="emitDelete">Delete</button>
            <router-link @click.native="showModal = true" @close="showModal = false" :to="'/place/edit/'+ place.id">{{(place.isTemp)? 'Add': 'Edit'}}</router-link>
        </div>
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