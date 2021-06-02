import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import Movie from 'src/pages/Movie.vue'
import MovieDetail from 'src/pages/MovieDetail.vue'
import Books from 'src/pages/Books.vue'
import Analysis from 'src/pages/Analysis.vue'
import AnalysisDetail from 'src/pages/AnalysisDetail.vue'
import Comments from 'src/pages/Comments.vue'
import Icons from 'src/pages/Icons.vue'
import Notifications from 'src/pages/Notifications.vue'
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
        path: 'overview/',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'books/',
        name: 'Books',
        component: Books
      },
      {
        path: 'analysis/',
        name: 'Analysis',
        component: Analysis
      },
      {
        path: 'analysis/detail/',
        name: 'Analysis Detail',
        component: AnalysisDetail
      },
      {
        path: 'icons/',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'movie/',
        name: 'Movie',
        component: Movie
      },
      {
        path: 'movie/detail/',
        name: 'Movie Detail',
        component: MovieDetail
      },
      {
        path: 'notifications/',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'comments/',
        name: 'comments',
        component: Comments
      },
      {
        path: 'upgrade/',
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
