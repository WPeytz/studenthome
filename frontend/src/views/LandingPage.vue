<template>
  <div class="landing-container">
    <h1>Welcome to StudentHome.dk</h1>
    <p class="subtitle">Find your perfect student home — fast, verified, and close to campus.</p>

    <form class="waitlist-form" @submit.prevent="handleSubmit">
 <form class="waitlist-form" @submit.prevent="handleSubmit">

    <div class="form-group">
    <h3>1. What is your name?</h3>
    <input v-model="name" type="text" placeholder="Your name" required />
  </div>

  <div class="form-group">
    <h3>2. What is your email?</h3>
    <p>We will send you a confirmation email.</p>
    <input v-model="email" type="email" placeholder="Enter your email" required />
  </div>



  <div class="form-group">
    <h3>3. What is your phone number?</h3>
    <input v-model="phone" type="tel" placeholder="Your phone number" required />
  </div>

  <div class="form-group">
    <h3>4. Select your University</h3>
    <select v-model="university" required>
      <option disabled value="">Select your university</option>
      <option>DTU</option>
      <option>KU</option>
      <option>CBS</option>
      <option>AAU</option>
      <option>SDU</option>
      <option>RUC</option>
      <option>ITU</option>
      <option>AU</option>
    </select>
  </div>

  <div class="form-group">
    <h3>5. What type of housing are you looking for?</h3>
    <select v-model="housingType" required>
      <option disabled value="">What type of housing are you looking for?</option>
      <option>Room in Apartment</option>
      <option>Apartment</option>
      <option>Dorm Room</option>
      <option> Other</option>
    </select>
  </div>

  <div class="form-group">
    <h3>6. What is your monthly budget? (In DKK)</h3>
    <input v-model="budget" type="number" placeholder="Monthly budget in DKK" min="0" required />
  </div>

  <div class="form-group">
    <h3>7. What is your preferred move-in date?</h3>
    <input v-model="moveInDate" type="date" required />
  </div>

  <div class="form-group">
    <h3>8. Additional Information</h3>
    <p>Let us know if you have any specific requirements or preferences.</p>
    <textarea v-model="description" placeholder="Describe what you're looking for" rows="12" required></textarea>
  </div>

  <button type="submit">Join Waitlist</button>
</form>
</form>

    <p class="thank-you" v-if="submitted">Thanks! You're on the list 🏡</p>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      email: '',
      submitted: false
    }
  },
  methods: {
  async handleSubmit() {
  try {
    const payload = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      university: this.university,
      housingType: this.housingType,
      budget: this.budget,
      moveInDate: this.moveInDate,
      description: this.description,
      timestamp: new Date().toISOString()
    };

    const res = await fetch('https://us-central1-housed-app.cloudfunctions.net/addToWaitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      this.submitted = true;
      // optionally reset form values here
    } else {
      alert('Something went wrong. Try again later.');
    }
  } catch (error) {
    console.error(error);
    alert('Error contacting server.');
  }
}
}
}
</script>

<style scoped>

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

.landing-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 3rem 1rem;
  text-align: center;
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