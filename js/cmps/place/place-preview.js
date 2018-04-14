export default {
    props: ['place'],
    template:`
    <section class="place-preview">
            <h1>{{place.name}}</h1>
            <p>{{place.description}}</p>
        </ul>
    </section>
    `
}