import { createRouter, createWebHistory } from 'vue-router'
import home from '@/vue/home.vue'
import character from '@/vue/character.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/',
      name: 'home',
      component: home
    },
    {
      path: "/character/:id",
      name: 'character',
      component: character
    }
  ],
})

export default router
