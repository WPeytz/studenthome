<template>
    <NavBar />
  <div class="about-container">
    <h1>About StudentHome</h1>
    <p>
      StudentHome is on a mission to make student housing simpler, smarter, and more accessible.
      We connect students with verified landlords and housing providers through a transparent,
      user-friendly platform.
    </p>

    <p>
      Whether you're a student searching for the perfect place to live or a landlord looking
      for responsible tenants, our platform is designed to streamline the process and create
      meaningful matches.
    </p>

    <p>
      Built with care by a team who knows the struggles of student living, we believe in creating
      tools that empower, inform, and connect the student housing community across Denmark.
    </p>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'AboutPage',
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #fff;
  background: linear-gradient(to right, #1e1e2f, #3e3e5a);
  font-family: 'Helvetica Neue', sans-serif;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
}
</style>