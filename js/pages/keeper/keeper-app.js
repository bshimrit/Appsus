import notesType from '../../cmps/keeper/keeper-notes.js'
import listType from '../../cmps/keeper/keeper-list.js'
import reminderType from '../../cmps/keeper/keeper-reminder.js'
import keepService from '../../services/keeper/keeper.service.js'
import modal from '../../cmps/general/modal.js'
import keepMenu from '../../cmps/keeper/keeper-menu.js'

export default {
    template:`
    <section class="keeper">
        <div class="flex">
            <button @click="menuOpen = !menuOpen">Add note</button>
            <!-- <keeper-menu></keeper-menu> -->
            <ul class="flex menu-btn pointer" v-if="menuOpen">
                <li @click="addKeep('noteType')">Note</li>
                <li @click="addKeep('listType')">List</li>
                <li @click="addKeep('reminderType')">Reminder</li>
            </ul>
        </div>
        <section class="container notes flex flex-column flex-wrap">
            <section v-for="keep in keeps" class="note clear-input">
                <component @emitSelected="updateSelected" :editMode="true" @selected="updateSelected" :keep="keep" :is="keep.type"></component>
            </section>
        </section>
        <modal v-if="keepSelected" @selected="updateSelected">
            <component :keep="keepSelected" class="clear-input" :editMode="false" :is="keepSelected.type"></component>
            <button class="button is-primary" @click="keepSelected = null">close</button>
        </modal>
    </section>
    `,
    components: {
        keepMenu,
        modal,
        notesType,
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
        }
    }
}