import eventBus, {DELETE_EMAIL} from '../../services/general/event-bus.service.js'

export default {
    props: ['email'],
    template:`
    <section class="email-preview">
        <section class="flex space-between">
            <div><span class="fa"></span> {{email.name}}</div>
            <div>Sent at: {{email.sentAt}}</div>
        </section>
        <section class="flex space-between">
            <p><span class="font-bold">Subject: </span>{{shortSubject}} </p>
            <button class="delete-btn fa clear-btn" @click.stop="emitDelete()"></button>
        </section>
    </section>
    `,
    computed: {
        shortSubject(){
            return this.email.subject.substring(0,30);
        }
    },
    methods:{
        emitDelete() {
            eventBus.$emit(DELETE_EMAIL,this.email);
        },
    }
}