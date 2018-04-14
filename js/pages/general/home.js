export default {
    template:`
    <section class="home font-bold container flex space-between">
    <div class="flex flex-column align-center" >
        <router-link to="/email">
            <img class="shake" src="img/Email.png" />
        </router-link>
        <h1 class="title is-3 base-color">missEmail</h1>
    </div>
    <div class="flex flex-column align-center" >
        <router-link to="/place">
            <img class="shake" src="img/Map.png" />
        </router-link>
        <h1 class="title is-3 base-color"> missPlace </h1>
    </div>
    <div class="flex flex-column align-center" >
        <router-link to="/keeper">
            <img class="shake" src="img/Task.png" />
        </router-link>
        <h1 class="title is-3 base-color">missKeeper</h1>
    </div>
    </section>
    `
}