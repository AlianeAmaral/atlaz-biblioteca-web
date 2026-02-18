import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import StudentsView from '../views/StudentsView.vue'
import StudentFormView from '../views/StudentFormView.vue'
import StudentEditView from '../views/StudentEditView.vue'
import StudentDetailView from '../views/StudentDetailView.vue'

import BooksView from '../views/BooksView.vue'
import BookFormView from '../views/BookFormView.vue'
import BookEditView from '../views/BookEditView.vue'
import BookDetailView from '../views/BookDetailView.vue'

import LoansView from '../views/LoansView.vue'
import LoanFormView from '../views/LoanFormView.vue'

// primeiro rotas fixas e depois dinâmicas

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // rotas fixas
    
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
      path: '/loans',
      name: 'loans',
      component: LoansView
    },
    {
      path: '/students/create',
      name: 'student-create',
      component: StudentFormView
    },
    {
      path: '/books/create',
      name: 'book-create',
      component: BookFormView
    },
    {
      path: '/loans/create',
      name: 'loan-create',
      component: LoanFormView
    },

    // rotas dinâmicas, aqui pode passar a receber o ID como prop no componente no props = true

    {
      path: '/students/:id',
      name: 'student-detail',
      component: StudentDetailView,
      props: true
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