<template>
  <NavBar />
  <div class="dashboard">
    <h1> Welcome to the StudentHome Student Dashboard</h1>
    <p>As a student, you can edit your application and view your waitlist status here.</p>
    <p>We will send you an email when we launch and find a match for your application.</p>
    <h2>Edit Your Application</h2>
    <form @submit.prevent="saveChanges">
      <label>
        Name:
        <input v-model="userData.name" type="text" />
      </label>

      <label>
        University:
        <input v-model="userData.university" type="text" />
      </label>

      <label>
        Housing Type:
        <input v-model="userData.housingType" type="text" />
      </label>

      <label>
        Montly Budget (DKK):
        <input v-model="userData.budget" type="number" />
      </label>

      <label>
        <h3>Additional Information</h3>
        <p>
          Tell us a bit about yourself, what kind of place you’re looking for, and anything else you’d like a future landlord to know.
          Feel free to write in Danish or English. The more details you share, the easier it is to find your perfect match.
        </p>
        <textarea v-model="userData.description" rows="4"></textarea>
      </label>

      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { updateDoc } from "firebase/firestore";
import NavBar from "@/components/NavBar.vue";
import { onAuthStateChanged } from "firebase/auth";

onMounted(() => {
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      user.value = currentUser;
      const userRef = doc(db, "studentWaitlist", currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        userData.value = docSnap.data();
      }
    }
  });
});

const user = ref(auth.currentUser);
const userData = ref({});

const saveChanges = async () => {
  if (!user.value) return;

  try {
    const userRef = doc(db, "studentWaitlist", user.value.uid);
    await updateDoc(userRef, {
      name: userData.value.name,
      university: userData.value.university,
      housingType: userData.value.housingType,
      budget: userData.value.budget,
      description: userData.value.description
    });
    alert("Changes saved!");
  } catch (error) {
    console.error("Failed to save changes:", error);
    alert("Something went wrong while saving.");
  }
};

onMounted(async () => {
  if (user.value) {
    const userRef = doc(db, "studentWaitlist", user.value.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      userData.value = docSnap.data();
    }
  }
});
</script>

<style scoped>

.dashboard {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f4f7fa;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  font-family: Arial, sans-serif;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 1rem;
  font-weight: 500;
  color: #34495e;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-top: 0.3rem;
}

textarea {
  resize: vertical;
}

button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
}

button:hover {
  background-color: #2980b9;
}

</style>