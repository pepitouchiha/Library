<script setup lang="ts">
import { ref } from "vue";
import AddBookModal from "./components/AddBookModal.vue";
const showModal = ref(false);

const handleBookAdded = (newBook: any) => {
  console.log("New book added:", newBook);
};
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-md">
        <a class="navbar-brand text-light" href="#">Library</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink class="nav-link text-light" to="/">Books</RouterLink>
            </li>
            <li class="nav-item bg-success rounded">
              <button class="nav-link text-light bg-transparent border-0" @click="showModal = true">
                Add Book
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main class="container py-4">
    <RouterView />
    <AddBookModal v-if="showModal" :isOpen="showModal" @close="showModal = false" @bookAdded="handleBookAdded" />
  </main>
</template>

<style scoped></style>
