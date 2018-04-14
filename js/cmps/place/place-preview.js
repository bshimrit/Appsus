export default {
    props: ['place'],
    template:`
    <section class="pointer place-preview">
        <h1>{{place.name}}</h1>
        <p>{{place.description}}</p>
        <button class="clear-btn" @click.stop="emitDelete(place)">delete</button>
    </section>
    `
}