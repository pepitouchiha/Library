import BooksView from '@/views/BooksView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BooksView
    },
    {
      path: '/add-book',
      name: 'addBook',
      component: () => import('../views/AddBookView.vue')
    },
    {
      path: '/edit-book/:id',
      name: 'editBook',
      component: () => import('../views/EditBookView.vue')
    }
  ],
})

export default router
