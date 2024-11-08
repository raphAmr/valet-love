import Vue from 'vue';
import VueRouter from 'vue-router';
import BarPage from '../views/BarPage.vue';
import Financier from '../views/Financier.vue';
import BateauIvre from '../views/BateauIvre.vue';
import NewInstitute from '../views/NewInstitute.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'BarPage', component: BarPage },
  { path: '/financier', name: 'Financier', component: Financier },
  { path: '/bateau-ivre', name: 'BateauIvre', component: BateauIvre },
  { path: '/new-institute', name: 'NewInstitute', component: NewInstitute },
];

const router = new VueRouter({
  mode: 'history',  // Utilisation du mode 'history' pour des URLs propres
  routes
});

export default router;

