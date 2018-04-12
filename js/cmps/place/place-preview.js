export default {
    props: ['place'],
    template:`
    <section class="place-preview">
            <p>{{place.name}}</p>
            <p>{{place.description}} </p>
        </ul>
    </section>
    `
}