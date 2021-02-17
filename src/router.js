
import Vue from 'vue'
import Router from 'vue-router'
import Cart from './views/pages/Cart.vue'
import Shipping from './views/pages/Shipping.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
        {
          path: '/',
          redirect: '/cart'
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart,
          meta: { layout: 'main'},
        },
        {
          path: '/shipping',
          name: 'shipping',
          component: Shipping,
          meta: { layout: 'main'},
        }
      ]
})

export default router
