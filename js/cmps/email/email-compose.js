export default {
    template:`
    <section class="email-compose">
        <form class="flex flex-column justify-start" @submit.prevent="sendEmail">
                <h1>Compose email</h1>
                <label>
                    Subject
                    <input type="text" v-model="email.subject"  placeholder="Subject" />
                </label>
                <label>
                    Message
                    <input type="text" v-model="email.body" placeholder="email message" />
                </label>
                <button class="clear-btn1" type="submit" :disabled="!isValid">Send</button>
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
        }
    }
}
