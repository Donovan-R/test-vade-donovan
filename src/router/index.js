import { createRouter, createWebHistory } from 'vue-router';
import Cocktails from '../components/Cocktails.vue';
import SingleCocktail from '../components/SingleCocktail.vue';
import ErrorPage from '../components/ErrorPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Cocktails,
    },
    {
      path: '/:id',
      name: 'cocktailDetails',
      component: SingleCocktail,
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: ErrorPage,
    },
  ],
});

router.resolve({
  name: 'not-found',
  params: { pathMatch: 'not/found' },
}).href;

export default router;
