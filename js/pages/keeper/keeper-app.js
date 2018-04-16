import noteType from '../../cmps/keeper/keeper-notes.js'
import listType from '../../cmps/keeper/keeper-list.js'
import reminderType from '../../cmps/keeper/keeper-reminder.js'
import keepService from '../../services/keeper/keeper.service.js'
import modal from '../../cmps/general/modal.js'
import keeperMenu from '../../cmps/keeper/keeper-menu.js'

export default {
    template:`
    <section class="keeper">
        <section class="container notes flex flex-column flex-wrap">
            <section v-for="keep in keeps" class="note clear-input">
                <component @emitSelected="updateSelected" :editMode="false" @selected="updateSelected" :keep="keep" :is="keep.type"></component>
            </section>
        </section>
        <modal v-if="keepSelected" @selected="updateSelected">
            <component :keep="keepSelected" class="clear-input" :editMode="true" :is="keepSelected.type"></component>
            <button class="button is-primary" @click="keepSelected = null">close</button>
        </modal>
        <keeper-menu :menuOpen="menuOpen" @addKeep="addKeep"></keeper-menu>
    </section>
    `,
    components: {
        keeperMenu,
        modal,
        noteType,
        listType,
        reminderType
    },
    data(){
        return {
            keeps:[],
            keepSelected: null,
            menuOpen: false
        }
    },
    created() {
        keepService.query()
            .then(keeps => {
                this.keeps = keeps
            })
    },
    methods:{
        updateSelected(keep){
            this.keepSelected = keep;
        },
        addKeep(type){
            this.keepSelected = keepService.createNewKeep(type);
        }
    }
}