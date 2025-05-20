<template>
    <NavBar />
  <div class="contact-container">
    <h1>Contact Us</h1>
    <p>We’d love to hear from you. Whether you're a student, landlord, or just curious — drop us a message.</p>

    <form @submit.prevent="handleSubmit">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="form.name" required />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" required />

      <label for="message">Message</label>
      <textarea id="message" v-model="form.message" rows="5" required></textarea>

      <button type="submit">Send</button>
    </form>

    <p class="email-note">Or email us directly at <a href="mailto:contact@studenthome.dk">contact@studenthome.dk</a></p>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'ContactPage',
  components: {
    NavBar,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      // Placeholder for future integration with Firebase or backend API
      alert(`Thanks for your message, ${this.form.name}! We'll get back to you soon.`);
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    },
  },
};
</script>

<style scoped>
.contact-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  color: #fff;
  background: linear-gradient(to right, #1e1e2f, #3e3e5a);
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  font-family: 'Helvetica Neue', sans-serif;
}

h1 {
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 1rem;
  margin-bottom: 0.3rem;
}

input,
textarea {
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
}

button {
  margin-top: 1.5rem;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background-color: #4a90e2;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
}

button:hover {
  background-color: #3b7bc0;
}

.email-note {
  margin-top: 2rem;
  font-size: 0.9rem;
}
</style>