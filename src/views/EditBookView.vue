<template>
    <div class="container">
      <h1 class="text-center text-light bg-success rounded">Edit Book</h1>
    </div>
    <main class="container">
      <div>
        <form @submit.prevent="editBook">
          <div class="row">
            <div class="col">
              <div data-mdb-input-init class="form-outline">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="updateBook.title" required />
              </div>
            </div>
            <div class="col">
              <div data-mdb-input-init class="form-outline">
                <label class="form-label">Author</label>
                <input type="text" class="form-control" v-model="updateBook.author" required />
              </div>
            </div>
            <div class="col">
              <div data-mdb-input-init class="form-outline">
                <label class="form-label">Publishers</label>
                <input type="date" class="form-control" v-model="updateBook.publishers" required />
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col">
              <div data-mdb-input-init class="form-outline">
                <label class="form-label">Genre</label>
                <input type="text" class="form-control" v-model="updateBook.genre" required />
              </div>
            </div>
            <div class="col">
              <div data-mdb-input-init class="form-outline">
                <label class="form-label">Price</label>
                <input type="number" class="form-control" v-model="updateBook.price" required />
              </div>
            </div>
            <div class="col">
              <div class="form-check form-switch">
                <label class="form-check-label">Disponibility</label>
                <input class="form-check-input" type="checkbox" role="switch" v-model="updateBook.disponibility"/>
              </div>
            </div>
          </div>
          <div class="text-center p-3">
            <button type="submit" class="btn btn-success">Save Changes</button>
          </div>
        </form>
      </div>
    </main>
  </template>
  
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import type BookModel from "@/models/BookModel";

  
  // Referencia reactiva para almacenar los datos del libro a editar
  const updateBook = ref<BookModel>({
    title: "",
    author: "",
    genre: "",
    price: 0,
    disponibility: false,
    publishers: "",
  });
  
  // Instancia del enrutador y ruta actual
  const router = useRouter();
  const route = useRoute();
  
  // Función para obtener los datos del libro a editar
  const fetchBookDetails = async (): Promise<void> => {
    const bookId = route.params.id; // Obtener el ID del libro desde los parámetros de la ruta
    try {
      const response = await axios.get<BookModel>(`http://localhost:3000/books/${bookId}`);
      updateBook.value = response.data; // Asignar los datos al formulario
    } catch (error) {
      console.error("Error al obtener los detalles del libro:", error);
      alert("No se pudo cargar la información del libro.");
    }
  };
  
  // Función para enviar los cambios al servidor
  const editBook = async (): Promise<void> => {
    const bookId = route.params.id;
    try {
      await axios.put(`http://localhost:3000/books/${bookId}`, updateBook.value);
      alert("Book updated successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
      alert("No se pudo actualizar el libro.");
    }
  };
  
  // Obtener los detalles del libro al cargar el componente
  onMounted(fetchBookDetails);
</script>
  
  <style scoped>
  </style>
  