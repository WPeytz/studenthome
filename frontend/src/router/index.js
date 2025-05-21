import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const routes = [
  {
  path: '/',
  name: 'Home',
  component: LandingPage,
  beforeEnter: (to, from, next) => {
    const auth = getAuth();

    // Wrap in a promise to wait for auth to fully initialize
    new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe(); // stop listening once we get the result
        resolve(user);
      });
    }).then(async (user) => {
      if (!user) {
        return next(); // Not logged in, continue to LandingPage
      }

      const db = getFirestore();

      try {
        const studentDoc = await getDoc(doc(db, "studentWaitlist", user.uid));
        if (studentDoc.exists()) {
          return next('/StudentDashboard');
        }

        const landlordDoc = await getDoc(doc(db, "landlords", user.uid));
        if (landlordDoc.exists()) {
          return next('/LandlordDashboard');
        }

        return next('/login'); // fallback
      } catch (error) {
        console.error("Error checking user role:", error);
        return next('/login');
      }
    });
  }
  },
  { path: '/login', name: 'UserLogin', component: () => import('../views/UserLogin.vue') },
  { path: '/about', name: 'About', component: ()  => import('../views/AboutPage.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/ContactPage.vue') },
  { path: '/faq', name: 'FAQ', component: () => import('../views/FAQ.vue') },
  { path: '/student', name: 'Student', component: () => import('../views/StudentWaitlist.vue') },
  { path: '/landlord', name: 'Landlord', component: () => import('../views/LandlordWaitlist.vue') },
  { path: '/StudentDashboard', name: 'UserDashboard', component: () => import('../views/StudentDashboard.vue') },
  { path: '/LandlordDashboard', name: 'LandlordDashboard', component: () => import('../views/LandlordDashboard.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;