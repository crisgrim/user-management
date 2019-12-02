import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyFavorites from '../views/MyFavorites.vue'
import User from '../views/User.vue'
import Error404 from '../views/Error404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/my-favorites',
    name: 'My Favorites',
    component: MyFavorites
  },
  {
    path: '/user/:username',
    component: User
  },
    {
    path: '*',
    name: 'Error 404',
    component: Error404
  },
]

const router = new VueRouter({
  routes
})

export default router
