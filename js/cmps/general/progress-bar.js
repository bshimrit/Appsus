import eventBus, {EMAIL_READ} from '../../services/general/event-bus.service.js'

export default {
    template: `
        <section>
            <progress class="progress is-primary" :value="progress" :max="100"></progress>
        </section>
    `,
    data(){
        return {
            progress: 0
        }
    },
    created() {
        eventBus.$on(EMAIL_READ, emailStatus => {
            this.progress = 100 * (emailStatus.read / (emailStatus.all ? emailStatus.all : 1));
        })
    },
}