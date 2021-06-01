import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import MovieDetail from 'src/pages/MovieDetail.vue'
import Books from 'src/pages/Books.vue'
import Analyses from 'src/pages/Analyses.vue'
import Icons from 'src/pages/Icons.vue'
import Notifications from 'src/pages/Notifications.vue'
import Movies from 'src/pages/Movies.vue'
import Upgrade from 'src/pages/Upgrade.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/overview'
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'moviedetail',
        name: 'MovieDetail',
        component: MovieDetail
      },
      {
        path: 'books',
        name: 'Books',
        component: Books
      },
      {
        path: 'analyses',
        name: 'Analyses',
        component: Analyses
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'movies',
        name: 'Movies',
        component: Movies
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
