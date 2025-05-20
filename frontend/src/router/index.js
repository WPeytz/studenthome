import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';

const routes = [
  { path: '/', name: 'Home', component: LandingPage },
  { path: '/login', name: 'Login', component: () => import('../views/UserLogin.vue') },
  { path: '/UserDashboard', name: 'UserDashboard', component: () => import('../views/UserDashboard.vue') },
  { path: '/about', name: 'About', component: () => import('../views/AboutPage.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/ContactPage.vue') },
  { path: '/faq', name: 'FAQ', component: () => import('../views/FAQ.vue') },
  { path: '/student', name: 'Student', component: () => import('../views/StudentWaitlist.vue') },
  { path: '/landlord', name: 'Landlord', component: () => import('../views/LandlordWaitlist.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;