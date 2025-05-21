<template>
    <NavBar />
    <div class="dashboard">
  <h1>Welcome to the StudentHome Landlord dashboard</h1>
  <p>As a landlord, you can manage existing listings and add new listings here</p>
  <p>We will send you an email when we launch and find a match for your listing</p>

  <h2>Your Listings</h2>
  <ul>
  <li v-for="listing in listings" :key="listing.id">
    <strong>{{ listing.propertyAddress || listing.address }}</strong><br />
    Description: {{ listing.description }}<br />
    Rent: {{ listing.monthlyRent || listing.rent }} DKK<br />
    Preferred Move-in Date: {{ listing.moveInDate }}<br />
    Acceptable Rental Duration:
    <ul>
      <li v-for="(duration, index) in listing.rentalDuration" :key="index">{{ duration }}</li>
    </ul>
    <button @click="deleteListing(listing.id)" style="margin-top: 0.5rem; background-color: #e74c3c;">Delete</button>
  </li>
</ul>

  <h3>Add New Listing</h3>
<form @submit.prevent="addListing">
  <label>Address: <input v-model="newListing.propertyAddress" /></label><br />
  <label>Monthly Rent: <input type="number" v-model="newListing.monthlyRent" /></label><br />
  <label>Preferred Move-in Date: <input type="date" v-model="newListing.moveInDate" /></label><br />
  <label>Acceptable Rental Duration:</label><br />
    <label><input type="checkbox" value="Less than 3 months" v-model="newListing.rentalDuration" /> Less than 3 months</label><br />
  <label><input type="checkbox" value="3-6 months" v-model="newListing.rentalDuration" /> 3-6 months</label><br />
  <label><input type="checkbox" value="6-12 months" v-model="newListing.rentalDuration" /> 6-12 months</label><br />
  <label><input type="checkbox" value="More than 12 months" v-model="newListing.rentalDuration" /> 12+ months</label><br />
  <label>Additional information</label>
        <p>Tell us about your property and what kind of tenants you’re looking for. Include anything that might help us match you with the right students. You can write in Danish or English. The more details you include, the better we can match your listing with ideal student tenants.</p>
<textarea v-model="newListing.description" rows="4" placeholder="Enter detailed description..."></textarea><br /><br />
  <button type="submit">Add Listing</button>
</form>
</div>
</template>
<script setup>
import NavBar from '@/components/NavBar.vue'
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { ref, onMounted } from "vue";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";


const listings = ref([]);
const newListing = ref({
  propertyAddress: '',
  description: '',
  monthlyRent: 0,
  moveInDate: '',
  rentalDuration: []
});
const auth = getAuth();
const db = getFirestore();
const user = ref(auth.currentUser);
const addListing = async () => {
  if (!user.value) return;

  const listingsRef = collection(db, "landlords", user.value.uid, "listings");
  await addDoc(listingsRef, { ...newListing.value });

  // Refresh listings
  const querySnapshot = await getDocs(listingsRef);
  listings.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Reset form
  newListing.value = { title: '', description: '', rent: 0 };
};
onMounted(async () => {
  if (user.value) {
    const listingsRef = collection(db, "landlords", user.value.uid, "listings");
    const querySnapshot = await getDocs(listingsRef);
    listings.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
});

const deleteListing = async (listingId) => {
  if (!user.value) return;

  const listingRef = doc(db, "landlords", user.value.uid, "listings", listingId);
  await deleteDoc(listingRef);

  // Refresh listings
  const listingsRef = collection(db, "landlords", user.value.uid, "listings");
  const querySnapshot = await getDocs(listingsRef);
  listings.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

</script>
<style scoped>
form label {
  display: block;
  margin: 1.25rem 0 0.5rem;
  font-weight: 600;
}

textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  resize: vertical;
}

.dashboard {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2, h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  background: white;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

form {
  margin-top: 2rem;
}

form label {
  display: block;
  margin: 0.5rem 0 0.25rem;
  font-weight: 500;
}

input[type="text"],
input[type="number"],
input[type="date"] {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #2980b9;
}
</style>