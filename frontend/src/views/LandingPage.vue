<template>
  <NavBar />
  <div class="landing-container" :class="{ 'landlord-mode': userType === 'landlord' }">
    <!-- <div class="login-button">
      <button @click="goToLogin">Login</button>
    </div> -->
    <h1>Welcome to StudentHome.dk</h1>

    <p>Join our waitlist to be the first to know when we launch!</p>
    <p>We are still building our platform and would love to keep you updated.</p>

<div class="info-cards">
  <div class="info-card">
    <h2>For Students</h2>
    <p>Looking for a room near your university? Join our waitlist and be the first to know when listings are available.</p>
    <router-link to="/student">
      <button class="router-button">Join the Student Waitlist</button>
    </router-link>
    <h3> How it works:</h3>
    <ul>
      <li>Sign up for our waitlist</li>
      <li>Get notified when we launch</li>
      <li>Get matched and find your perfect student home</li>
    </ul>
  </div>
  <div class="info-card">
    <h2>For Landlords</h2>
    <p>Have a student-friendly property to rent out? Sign up and match with verified students hassle-free.</p>
    <router-link to="/landlord">
      <button class="router-button">Join the Landlord Waitlist</button>
    </router-link>
    <h3> How it works:</h3>
    <ul>
      <li>List your room or property through the landlord list</li>
      <li>Get notified when we launch</li>
      <li>Match with ideal tenants</li>
    </ul>

  </div>
</div>>

</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'LandingPage',
  components: {
    NavBar,
  },
}
</script>

<style scoped>

.landing-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1rem;
  text-align: center;
}

.info-cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.info-card {
  flex: 1 1 calc(50% - 1rem);
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: left;
}

.info-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-width: 300px;
  text-align: left;
}

.router-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0.5rem;
  transition: background-color 0.3s ease;
}

.router-button:hover {
  background-color: #2980b9;
}

.login-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.login-button button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button button:hover {
  background-color: #2980b9;
}

.waitlist-form input[type="checkbox"] {
  width: auto;
  margin-right: 0.5rem;
  transform: scale(1.2); /* optional: makes it a bit easier to click */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  border-radius: 8px;
  text-align: left;
}

.modal h2 {
  margin-top: 0;
}

.modal button {
  margin-top: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.user-toggle {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
}

.user-toggle input[type="radio"] {
  margin-right: 0.5rem;
}

.landlord-redirect {
  color: #3498db;
  text-decoration: underline;
  margin-bottom: 2rem;
  cursor: pointer;
}

.waitlist-form select {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60%;
  max-width: 300px;
  box-sizing: border-box;
}

.form-group {
  width: 100%;
  margin-bottom: 1.5rem;
  text-align: center;
}

.waitlist-form textarea {
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 4
}
h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.waitlist-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.waitlist-form input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60%;
  max-width: 300px;
}

.waitlist-form button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.waitlist-form button:hover {
  background-color: #369d74;
}

.thank-you {
  margin-top: 1.5rem;
  color: #42b983;
  font-weight: bold;
}
</style>