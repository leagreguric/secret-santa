import { createRouter, createWebHashHistory } from 'vue-router';
import secretSanta from '../views/secretSantaView.vue'


const routes = [
    { 
      path: '/', 
      component: secretSanta,
      meta: {
          title: "secretSanta",
        }
    }

    ]
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        }
      } else if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0, behavior: 'smooth' };
      }
    }
  });
  router.beforeEach((to, from)=> {
    document.title=to.meta?.title ?? 'secretSanta';
  })
  export default router;