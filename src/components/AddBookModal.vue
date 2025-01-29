<template>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add new book</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                <input type="text" class="form-control" v-model="newBook.publishers" required />
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
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-success">Add Book</button>
      </div>
    </div>
  </div>
</div>
</template>
  
<script setup lang="ts">
  import { ref } from "vue";
  import axios from "axios";
  import type BookModel from "@/models/BookModel";
  
  // Define los campos del formulario
  const newBook = ref<BookModel>({
    id: "",
    title: "",
    author: "",
    genre: "",
    price: 0,
    disponibility: true,
    publishers: "",
  });
  
  // Método para añadir un libro
  const addBook = async (): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:3000/books", newBook.value);
      // Reinicia el formulario
      newBook.value = {
        id: "",
        title: "",
        author: "",
        genre: "",
        price: 0,
        disponibility: true,
        publishers: "",
      };
      console.log(`Book "${newBook.value.title}" added successfully.`);
      const created = window.alert("Book created correctly!");
    } catch (error) {
      console.error("Cannot create the book correctly!", error);
    }
  };
</script>
  
  <style>
  </style>