<template>
    <NavBar />
  <div class="faq-container">
    <h1>Frequently Asked Questions</h1>

    <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
      <h2 @click="toggle(index)">
        {{ faq.question }}
        <span class="arrow">{{ activeIndex === index ? '▲' : '▼' }}</span>
      </h2>
      <p v-if="activeIndex === index" class="answer">{{ faq.answer }}</p>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "FAQ",
    components: {
        NavBar,
    },
  data() {
    return {
      activeIndex: null,
      faqs: [
        {
          question: "What is StudentHome?",
          answer: "StudentHome is a platform designed to match students with housing opportunities based on their preferences and budget.",
        },
        {
          question: "Is StudentHome free to use?",
          answer: "Yes! It's free for students. Landlords may have additional options available later.",
        },
        {
          question: "How do I get notified when a match is found?",
          answer: "Once you're on the matching list, you'll receive an email when a potential housing match becomes available.",
        },
        {
          question: "Can landlords also sign up?",
          answer: "Yes, landlords can register and list properties directly through the platform.",
        },
      ],
    };
  },
  methods: {
    toggle(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(to right, #1e1e2f, #3e3e5a);
  color: #fff;
  font-family: 'Helvetica Neue', sans-serif;
  border-radius: 10px;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.faq-item {
  margin-bottom: 1.5rem;
  cursor: pointer;
}

.faq-item h2 {
  font-size: 1.2rem;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.answer {
  margin-top: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
}

.arrow {
  font-size: 0.8rem;
  margin-left: 0.5rem;
}
</style>