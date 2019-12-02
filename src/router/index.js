import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyFavorites from '../views/MyFavorites.vue'
import User from '../views/User.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
