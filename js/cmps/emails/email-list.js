import emailPreview from './email-preview.js'


export default {
    props: ['emails'],
    template:`
    <section class="email-list vertical">
        <h1>EmailList</h1>
        <ul>
            <li v-for="email in emails">
                <email-preview :email="email"></email-preview>
                <hr>
            </li>
        </ul>
    </section>
    `,
    components:{
        emailPreview
    }
}