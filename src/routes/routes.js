import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import Movie from 'src/pages/Movie.vue'
import MovieDetail from 'src/pages/MovieDetail.vue'
import Book from 'src/pages/Book.vue'
import BookDetail from 'src/pages/BookDetail.vue'
import Analysis from 'src/pages/Analysis.vue'
import AnalysisDetail from 'src/pages/AnalysisDetail.vue'
import Comment from 'src/pages/Comment.vue'
import Icons from 'src/pages/trashbin/Icons.vue'
import Notifications from 'src/pages/Notifications.vue'
import Admin from 'src/pages/Admin.vue'
import Typography from 'src/pages/trashbin/Typography.vue'
import Login from 'src/pages/Login.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/overview'
  },
  {
    path: '/login',
    component: Login
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
        path: 'book/',
        name: 'Book',
        component: Book
      },
      {
        path: 'book/detail/',
        name: 'Book Detail',
        component: BookDetail
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
        path: 'comment/',
        name: 'Comment',
        component: Comment
      },
      // {
      //   path: 'typography/',
      //   name: 'typography',
      //   component: Typography
      // },
      {
        path: 'admin/',
        name: 'Admin',
        component: Admin
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
