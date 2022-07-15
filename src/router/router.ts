import Vue from 'vue';
import VueRouter, { RouteConfig } from "vue-router";
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/BoardAdmin.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/BoardUser.vue')
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('../views/BoardChart.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;


