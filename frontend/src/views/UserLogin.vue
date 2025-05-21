<template>
  <NavBar />
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>

      <button type="submit">Login</button>
    </form>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
// src/views/UserLogin.vue
import NavBar from '@/components/NavBar.vue';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
    const user = userCredential.user;

    // Check if user is a student
    const studentRef = doc(db, "studentWaitlist", user.uid);
    const studentSnap = await getDoc(studentRef);

    if (studentSnap.exists()) {
      console.log("Student logged in.");
      this.$router.push('/StudentDashboard');
      return;
    }

    // Check if user is a landlord
    const landlordRef = doc(db, "landlords", user.uid);
    const landlordSnap = await getDoc(landlordRef);

    if (landlordSnap.exists()) {
      console.log("Landlord logged in.");
      this.$router.push('/LandlordDashboard');
      return;
    }

    // If neither, maybe they exist in Auth but not Firestore
    this.errorMessage = "User profile not found in Firestore.";
    console.warn("No matching student or landlord document.");
  } catch (error) {
    this.errorMessage = 'Login failed. Please check your credentials.';
    console.error(error);
  }
}
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.error {
  color: red;
  margin-top: 1rem;
  text-align: center;
}
</style>