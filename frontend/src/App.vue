<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
body {
  background-color: #eef3f8;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.landing-container {
  background-color: white;
  border-radius: 12px;
  padding: 3rem 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  margin-top: 5vh;
  transition: box-shadow 0.3s ease;
}

.waitlist-form input {
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.1);
}

.waitlist-form button {
  background-image: linear-gradient(to right, #42b983, #3ba37d);
  box-shadow: 0 4px 14px rgba(66, 185, 131, 0.4);
}
</style>
