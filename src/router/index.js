import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddCar from '../views/AddCar.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'AddCar',
    component: AddCar
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
