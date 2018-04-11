import home from './pages/home.js'
import about from './pages/about.js'
import email from './pages/miss-email.js'
import place from './pages/miss-place.js'
import keeper from './pages/miss-keeper.js'
import appsus from './pages/appsus.js'


const routes = [
    {path: '/', component: home},
    {path: '/appsus', component: appsus},
    {path: '/about', component: about},
    {path: '/email', component: email},
    {path: '/place', component: place},
    {path: '/keeper', component: keeper},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;