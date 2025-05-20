<template>
    <NavBar />
  <!-- STUDENT FORM -->
  <div>

    <form v-if="!submitted" class="waitlist-form" @submit.prevent="handleSubmit">
        <h2>Student Waitlist</h2>
    <p>Join our waitlist to be the first to know when we launch!</p>
    <p>We are still building our platform and would love to keep you updated.</p>
      <div class="form-group">
        <h3>1. What is your email?</h3>
        <p>Use your student email if you have one</p>
        <p>We will send you a confirmation email.</p>
        <input v-model="email" type="email" placeholder="Enter your email" required />
      </div>

      <div class="form-group">
        <h3>2. Choose a Password</h3>
        <input v-model="password" type="password" placeholder="Choose a secure password" required />
      </div>

      <div class="form-group">
        <h3>3. What is your name?</h3>
        <input v-model="name" type="text" placeholder="Your name" required />
      </div>

      <div class="form-group">
        <h3>4. What best describes you?</h3>
        <select v-model="university" required>
          <option disabled value="">Select your university</option>
          <option>Incoming/current DTU student</option>
          <option>Student at another University</option>
          <option>Not a student</option>
          <option>Other</option>
        </select>
      </div>

      <div class="form-group">
        <h3>5. What type of housing are you looking for?</h3>
        <select v-model="housingType" required>
          <option disabled value="">Select Type</option>
          <option>Room in Apartment</option>
          <option>Apartment</option>
          <option>Dorm Room</option>
          <option>I'm Flexible</option>
          <option>Other</option>
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
        <h3>8. For how long do you need housing?</h3>
        <select v-model="housingDuration" required>
          <option disabled value="">Select Duration</option>
          <option>Less than 3 months</option>
          <option>3-6 months</option>
          <option>6-12 months</option>
          <option>More than 12 months</option>
          <option>Other</option>
        </select>
      </div>

      <div class="form-group">
        <h3>9. Additional Information</h3>
        <p>
          Tell us a bit about yourself, what kind of place you’re looking for, and anything else you’d like a future landlord to know.
          Feel free to write in Danish or English. The more details you share, the easier it is to find your perfect match.
        </p>
        <textarea v-model="description" rows="8" required></textarea>
      </div>

      <div class="form-group">
        <h3>10. How did you hear about us?</h3>
        <select v-model="referralSource" required>
          <option disabled value="">Select Option</option>
          <option>Social Media</option>
          <option>Friend/Colleague</option>
          <option>Online Search</option>
          <option>Other</option>
        </select>
      </div>

      <div class="form-group terms">
        <label class="terms-label">
          <input type="checkbox" v-model="agreedToTerms" required />
          I agree to the <a href="#" @click.prevent="showTerms = true">terms and conditions</a>
        </label>
      </div>

      <div v-if="showTerms" class="modal-overlay" @click.self="showTerms = false">
        <div class="modal">
          <h2>Terms and Conditions</h2>
          <p>
            By using StudentHome.dk, you agree to let us contact you with housing opportunities,
            process the information you submit, and comply with all relevant data protection regulations.
          </p>
          <button @click="showTerms = false">Close</button>
        </div>
      </div>

      <button type="submit">Join Waitlist</button>
    </form>

    <p class="thank-you" v-if="submitted">Thanks! You're on the list 🏡</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { db } from '@/firebaseConfig.js'; 
import { collection, addDoc } from 'firebase/firestore';


const email = ref('')
const password = ref('')
const name = ref('')
const university = ref('')
const housingType = ref('')
const budget = ref('')
const moveInDate = ref('')
const housingDuration = ref('')
const description = ref('')
const referralSource = ref('')
const agreedToTerms = ref(false)
const submitted = ref(false)
const showTerms = ref(false)

const handleSubmit = async () => {
  const formData = {
    email: email.value,
    password: password.value,
    name: name.value,
    university: university.value,
    housingType: housingType.value,
    budget: budget.value,
    moveInDate: moveInDate.value,
    housingDuration: housingDuration.value,
    description: description.value,
    referralSource: referralSource.value,
    agreedToTerms: agreedToTerms.value
  };

  try {
    await addDoc(collection(db, "studentWaitlist"), formData);
    console.log("✅ Data submitted to Firestore");
    submitted.value = true;
  } catch (error) {
    console.error("❌ Error submitting to Firestore:", error);
  }
};
</script>

<style scoped>
.terms-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  flex-wrap: wrap; /* helps prevent overflow */
}

.terms-label input[type="checkbox"] {
  margin: 0;
  width: 20px;
  height: 20px;
}
.waitlist-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem 2.5rem;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.8rem;
}

.form-group h3 {
  margin-bottom: 0.4rem;
  color: #333;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #4caf50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
  width: 100%;
}

button:hover {
  background-color: #388e3c;
}

.thank-you {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.4rem;
  color: #4caf50;
  font-weight: bold;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  text-align: left;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

label a {
  color: #4caf50;
  text-decoration: underline;
  cursor: pointer;
}
</style>