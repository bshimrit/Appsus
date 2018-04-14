import home from './pages/general/home.js'
import about from './pages/general/about.js'
import emailApp from './pages/email/email-app.js'
import emailCompose from './cmps/email/email-compose.js'
import emailDetails from './cmps/email/email-details.js'
import placeApp from './pages/place/place-app.js'
import keeper from './pages/keeper.js'


const routes = [
    {path: '/', component: home},
    {path: '/about', component: about},
    {path: '/email', component: emailApp,
      children: [
        {path: 'details/:id', components: {default: emailDetails},props: {default: true} },
        {path: 'compose', component: emailCompose}
      ]
    },
    {path: '/place', component: placeApp},
    {path: '/keeper', component: keeper},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;