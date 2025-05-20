<template>
  <div class="dashboard">
    <h2>Welcome, {{ userData?.name || user?.email }}</h2>
    <p><strong>Email:</strong> {{ user?.email }}</p>
    <p><strong>University:</strong> {{ userData?.university }}</p>
    <p><strong>Housing Type:</strong> {{ userData?.housingType }}</p>
    <p><strong>Budget:</strong> {{ userData?.budget }}</p>
    <p><strong>Bio:</strong> {{ userData?.description }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

const user = ref(auth.currentUser);
const userData = ref({});

onMounted(async () => {
  if (user.value) {
    const userRef = doc(db, "users", user.value.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      userData.value = docSnap.data();
    }
  }
});
</script>