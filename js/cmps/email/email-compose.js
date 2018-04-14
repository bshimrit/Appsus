export default {
    template:`
    <section class="email-compose">
        <form class="flex flex-column justify-start" @submit.prevent="sendEmail">
                <input class="input is-primary" type="text" v-model="email.subject"  placeholder="Subject" />
                <textarea class="textarea is-primary" v-model="email.body" placeholder="email message"></textarea>
                <section class="compose-btns">
                    <button class="button is-primary" type="submit" :disabled="!isValid">Send</button>
                    <button class="button is-primary" @click.prevent="cancelEmail">Cancel</button>
                </section>
            </form>
    </section>
    `,
    data(){
        return {
            email: {subject:'',
                    body:''}
        }
    },
    methods:{
        isValid() {
            return this.email.subject !== '';
        },
        sendEmail(){
            this.$emit('sendEmail',this.email)
        },
        cancelEmail(){
            this.$emit('cancelEmail');
        }
    }
}
