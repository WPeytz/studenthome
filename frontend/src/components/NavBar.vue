<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/">StudentHome</router-link>
    </div>
    <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <li><router-link to="/faq">FAQ</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
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