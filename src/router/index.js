import Vue from 'vue';
import Router from 'vue-router';

/* layout */
import Layout from '../views/Layout/Layout';

/* login */
import Login from '../views/Login/index.vue';
// const authRedirect = _import('Login/authredirect');

/* dashboard */
import Bashboard from '../views/Bashboard/index.vue';

/* components */
import SwiperManager from '../views/SwiperManager/index.vue';


/* error page */
import Err404 from '../views/Error/404.vue';
import Err401 from '../views/Error/401.vue';

Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 **/

export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  // {path: '/authredirect', component: authRedirect, hidden: true},
  {path: '/404', component: Err404, hidden: true},
  {path: '/401', component: Err401, hidden: true},
  {path: '/', redirect: '/dashboard', hidden: true}
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    name: '首页',
    icon: 'fa-home',
    noDropdown: true,
    children: [{path: 'index', component: Bashboard, name: '首页'}]
  },
  {
    path: '/web',
    component: Layout,
    redirect: '/web/swiper-manager',
    name: '官网设置',
    icon: 'fa-cogs',
    children: [
      {path: 'swiper-manager', component: SwiperManager, name: '轮播图设置'}
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
];
