<template>
    <NavBar />
  <div class="waitlist-container">
    <form class="waitlist-form" @submit.prevent="handleSubmit" v-if="!submitted">
      <h2>Landlord Waitlist</h2>

      <p>Join our waitlist to be the first to know when we launch!</p>
      <p>We are still building our platform and would love to keep you updated.</p>

      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Enter your email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Choose a secure password" required />
      </div>

      <div class="form-group">
        <label>What type of landlord are you?</label>
        <select v-model="landlordType" required>
          <option disabled value="">Select your type</option>
          <option>Private Landlord</option>
          <option>Property Manager</option>
          <option>Dorm Manager</option>
          <option>Other</option>
        </select>
      </div>

      <div class="form-group">
        <label>Your full name</label>
        <input v-model="name" type="text" placeholder="Firstname Lastname" required />
      </div>

      <div class="form-group">
        <label>Company/Dorm name (Optional)</label>
        <input v-model="companyName" type="text" placeholder="Company or dorm name" />
      </div>

      <div class="form-group">
        <label>Property address</label>
        <input v-model="propertyAddress" type="text" required />
      </div>

      <div class="form-group">
        <label>Monthly rent (DKK)</label>
        <input v-model="monthlyRent" type="number" min="0" required />
      </div>

      <div class="form-group">
        <label>Preferred move-in date</label>
        <input v-model="moveInDate" type="date" required />
      </div>

      <div class="form-group">
        <label>Rental duration. Select all that apply</label>
        <br>
        <div class="checkbox-group">
          <label><input type="checkbox" value="Less than 3 months" v-model="rentalDuration" /> Less than 3 months</label>
          <label><input type="checkbox" value="3-6 months" v-model="rentalDuration" /> 3–6 months</label>
          <label><input type="checkbox" value="6-12 months" v-model="rentalDuration" /> 6–12 months</label>
          <label><input type="checkbox" value="More than 12 months" v-model="rentalDuration" /> More than 12 months</label>
          <label><input type="checkbox" value="Other" v-model="rentalDuration" /> Other</label>
        </div>
      </div>

      <div class="form-group">
        <label>Additional information</label>
        <p>Tell us about your property and what kind of tenants you’re looking for. Include anything that might help us match you with the right students. You can write in Danish or English. The more details you include, the better we can match your listing with ideal student tenants.</p>
        <textarea v-model="description" placeholder="Tell us about your property and what kind of tenants you're looking for" rows="6" required></textarea>
      </div>

      <div class="form-group">
        <label>How did you hear about us?</label>
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
          <h3>Terms and Conditions</h3>
          <p>
            By signing up you agree to allow us to contact you about housing opportunities and store your submission data securely.
          </p>
          <button @click="showTerms = false">Close</button>
        </div>
      </div>

      <button type="submit">Join as Landlord</button>
    </form>

    <p class="thank-you" v-else>🎉 Thank you! We’ll be in touch soon.</p>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { ref } from 'vue';
import { collection, addDoc } from "firebase/firestore";

const email = ref('');
const password = ref('');
const landlordType = ref('');
const name = ref('');
const companyName = ref('');
const propertyAddress = ref('');
const monthlyRent = ref(null);
const moveInDate = ref('');
const rentalDuration = ref([]);
const description = ref('');
const referralSource = ref('');
const agreedToTerms = ref(false);
const submitted = ref(false);
const showTerms = ref(false);

async function handleSubmit() {
  try {
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // 2. Build the landlord profile (no password included!)
    const landlordData = {
      email: email.value,
      landlordType: landlordType.value,
      name: name.value,
      companyName: companyName.value,
      referralSource: referralSource.value,
      agreedToTerms: agreedToTerms.value,
      createdAt: new Date()
    };

    const listingData = {
      propertyAddress: propertyAddress.value,
      monthlyRent: monthlyRent.value,
      moveInDate: moveInDate.value,
      rentalDuration: rentalDuration.value,
      description: description.value,
      createdAt: new Date()
    };

    // 3. Save it to Firestore using the UID
    await setDoc(doc(db, 'landlords', user.uid), landlordData);

    // 4. Save the listing data in a sub-collection
    await addDoc(collection(db, 'landlords', user.uid, 'listings'), listingData);

    console.log('🎉 Landlord registered and data saved!');
    submitted.value = true;
  } catch (error) {
    console.error('🔥 Error during landlord signup:', error);
    alert('Signup failed: ' + error.message);
  }
}
</script>

<style scoped>
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 0.5rem;
}

.checkbox-group label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
}

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

input[type="checkbox"] {
  width: auto;
}

.waitlist-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fafafa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.waitlist-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.7rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkbox label {
  font-weight: normal;
}

button {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 0.9rem;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #1565c0;
}

.thank-you {
  text-align: center;
  font-size: 1.3rem;
  color: green;
  margin-top: 2rem;
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
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 6px;
  width: 80%;
  max-width: 500px;
}
</style>