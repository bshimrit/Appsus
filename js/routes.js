import home from './pages/home.js'
import about from './pages/about.js'
import emailApp from './pages/email/email-app.js'
import emailCompose from './cmps/emails/email-compose.js'
import emailDetails from './cmps/emails/email-details.js'
import place from './pages/place.js'
import keeper from './pages/keeper.js'


const routes = [
    {path: '/', component: home},
    {path: '/about', component: about},
    {path: '/email', component: emailApp,
      children: [
        {path: '', component: emailDetails},
        {path: 'compose', component: emailCompose}
      ]
    },
    {path: '/place', component: place},
    {path: '/keeper', component: keeper},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;