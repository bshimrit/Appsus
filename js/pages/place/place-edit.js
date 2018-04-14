import eventBus, {SAVE_PLACE} from '../../services/general/event-bus.service.js'
import modal from '../../cmps/general/modal.js'
import placeService from '../../services/place/place.service.js'

export default {
    props: { id: '' },
    data() {
        return {
            place: {}
        }
    },
    template:`
    <section class="container place-edit">
        <modal @close="closeModal">
            <template slot="header">
                <h1 class="title is-3"> Edit place details </h1>
            </template>
            <template slot="body">
                <form class="flex flex-column justify-start" @submit.prevent="savePlace">
                    <label>
                        Name: <input class="input is-primary" type="text" v-model="place.name"></input>
                    </label>
                    <label>
                        Description: <textarea class="textarea is-primary" v-model="place.description"></textarea>
                    </label>
                    <div class="field is-grouped is-grouped-multiline">
                        <div v-for="tag in place.tags" class="control">
                            <div class="tags has-addons">
                            <a class="tag is-link">{{tag}}</a>
                            <a class="tag is-delete">X</a>
                            </div>
                        </div>
                    </div>
                        <!-- Tags: <input class="input is-primary" v-model="place.tags"></input> -->
                    </label>
                    <section class="compose-btns">
                        <button class="button is-primary" @click="closeModal" type="submit">Save</button>
                        <button class="button is-primary" @click.prevent="closeModal">Cancel</button>
                    </section>
                </form>
            </template>
        </modal>
    </section>
    `,
    watch: {
        id: {
            immediate: true,
            handler (newId) {
                if (newId != ''){
                    placeService.getPlaceById(newId)
                    .then(selectedPlace => {
                        this.place = selectedPlace;
                    });
                }
            }
        }
    },
    components:{
        modal
    },
    methods:{
        closeModal(){
            this.$router.push("/place");
        },
        savePlace(){
            eventBus.$emit(SAVE_PLACE,this.place)
        }
    }
}