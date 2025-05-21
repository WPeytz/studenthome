<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/">StudentHome</router-link>
    </div>
    <ul class="nav-links">
      <li v-if="!isAuthenticated"><router-link to="/">Home</router-link></li>
      <li v-else-if="dashboardRoute"><router-link :to="dashboardRoute">Dashboard</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <li><router-link to="/faq">FAQ</router-link></li>
      <li v-if="!isAuthenticated"><router-link to="/login"> Login </router-link></li>
      <li v-else><a @click="handleLogout">Log Out</a></li>
    </ul>
  </nav>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig"; // ✅ use the shared, already-initialized instance
import { getDoc, doc, getFirestore } from "firebase/firestore";

export default {
  name: 'NavBar',
  data() {
  return {
    isAuthenticated: false,
    dashboardRoute: null
  };
},
  created() {
  onAuthStateChanged(auth, async (user) => {
    this.isAuthenticated = !!user;

    if (user) {
      const db = getFirestore();
      const studentDoc = await getDoc(doc(db, "studentWaitlist", user.uid));
      if (studentDoc.exists()) {
        this.dashboardRoute = "/StudentDashboard";
        return;
      }

      const landlordDoc = await getDoc(doc(db, "landlords", user.uid));
      if (landlordDoc.exists()) {
        this.dashboardRoute = "/LandlordDashboard";
      }
    }
  });
},
  methods: {
    handleLogout() {
      signOut(auth)
        .then(() => {
          this.isAuthenticated = false;
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e2f;
  padding: 1rem 2rem;
  color: white;
}

.logo a {
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #aaa;
}
</style>