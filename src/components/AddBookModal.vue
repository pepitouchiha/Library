<template>
  <!-- Modal Bootstrap -->
  <div class="modal fade show" v-if="isOpen" style="display: block; background: rgba(0, 0, 0, 0.5)">
    <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add new book</h1>
        <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
        <form @submit.prevent="addBook">
          <div class="row">
            <div class="col">
              <div data-mdb-input-init class="form-outline">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="newBook.title" required />
              </div>
            </div>
            <div class="col">
              <div data-mdb-input-init class="form-outline">
                <label class="form-label">Author</label>
                <input type="text" class="form-control" v-model="newBook.author" required />
              </div>
            </div>
            <div class="col">
              <div data-mdb-input-init class="form-outline">
                <label class="form-label">Publishers</label>
                <input type="date" class="form-control" v-model="newBook.publishers" required />
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col">
              <div data-mdb-input-init class="form-outline">
                <label class="form-label">Genre</label>
                <input type="text" class="form-control" v-model="newBook.genre" required />
              </div>
            </div>
            <div class="col">
              <div data-mdb-input-init class="form-outline">
                <label class="form-label">Price</label>
                <input type="number" class="form-control" v-model="newBook.price" required />
              </div>
            </div>
            <div class="col">
              <div class="form-check form-switch">
                <label class="form-check-label">Disponibility</label>
                <input class="form-check-input" type="checkbox" role="switch" v-model="newBook.disponibility"/>
              </div>
            </div>
          </div>
        </form>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        <button type="submit" class="btn btn-success" @click="addBook">Add Book</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";
import axios from "axios";
import type BookModel from "@/models/BookModel";

// Props
const props = defineProps<{ isOpen: boolean }>();

// Emits
const emit = defineEmits(["close", "bookAdded"]);

// Modelo del libro
const newBook = ref<BookModel>({
  title: "",
  author: "",
  genre: "",
  price: 0,
  disponibility: true,
  publishers: "",
});

// Agregar libro
const addBook = async () => {
  try {
    await axios.post("http://localhost:3000/books", newBook.value);
    emit("bookAdded", newBook.value);

    // Resetear formulario
    newBook.value = {
      title: "",
      author: "",
      genre: "",
      price: 0,
      disponibility: true,
      publishers: "",
    };
    alert("Book created successfully!");
    closeModal();
    
  } catch (error) {
    console.error("Error adding book:", error);
  }
};

// Cerrar modal
const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
/* Ajuste para que el fondo del modal no desaparezca */
.modal.fade.show {
  display: block !important;
}
</style>
