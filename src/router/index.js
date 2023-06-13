import { createRouter, createWebHistory } from 'vue-router';
import Cocktails from '../components/Cocktails.vue';
import SingleCocktail from '../components/SingleCocktail.vue';

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
  ],
});

export default router;
