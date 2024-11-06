import Vue from 'vue'
import Router from 'vue-router'
import DrinksPage from '@/views/DrinksPage'
import GamesPage from '@/views/GamesPage'
import WorkersPage from '@/views/WorkersPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/drinks',
      redirect: '/drinks/list/all'
    },
    {
      path: '/drinks/:action/:id',
      name: 'drinks',
      component: DrinksPage,
      props: true
    },
    {
      path: '/games',
      redirect: '/games/list/all'
    },
    {
      path: '/games/:action/:id',
      name: 'games',
      component: GamesPage,
      props: true
    },
    {
      path: '/workers',
      redirect: '/workers/list/all'
    },
    {
      path: '/workers/:action/:id',
      name: 'workers',
      component: WorkersPage,
      props: true
    }
  ]
})
