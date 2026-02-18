import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import StudentsView from '../views/StudentsView.vue'
import StudentDetailView from '../views/StudentDetailView.vue'
import StudentFormView from '../views/StudentFormView.vue'
import StudentEditView from '../views/StudentEditView.vue'

import BooksView from '../views/BooksView.vue'
import BookEditView from '../views/BookEditView.vue'
import BookDetailView from '../views/BookDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/students',
      name: 'students',
      component: StudentsView
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView
    },
    {
      path: '/students/create',
      name: 'student-create',
      component: StudentFormView // reutiliza o mesmo formulário para criar, rotas fixas primeiro, depois as dinâmicas
    },
    {
      path: '/students/:id',
      name: 'student-detail',
      component: StudentDetailView,
      props: true // recebe o ID como prop no componente
    },
    {
      path: '/books/:id',
      name: 'book-detail',
      component: BookDetailView,
      props: true
    },
    {
      path: '/students/:id/edit',
      name: 'student-edit',
      component: StudentEditView,
      props: true
    },
    {
      path: '/books/:id/edit',
      name: 'book-edit',
      component: BookEditView,
      props: true
    }
  ]
})

export default router