<template>
    <div class="container">
        <h1 class="text-center text-light bg-success rounded">All the Books</h1>
    </div>
    <main class="container">
        <table class="table text-center table-success table-striped">
            <thead class="table-primary">
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Price</th>
                    <th>Disponibility</th>
                    <th>Publishers</th>
                    <th>Actions</th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" key="book.id">
                    <td>{{ book.id }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.genre }}</td>
                    <td>{{ book.price }}</td>
                    <td>
                        <span v-if="book.disponibility" class="material-symbols-outlined text-success">
                            check_circle
                        </span>
                        <span v-else class="material-symbols-outlined text-danger">
                            cancel
                        </span>
                    </td>
                    <td>{{ book.publishers }}</td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <RouterLink :to="{ path: 'edit-book/' + book.id }"
                                class="btn btn-primary btn-sm d-flex align-items-center">
                                <span class="material-symbols-outlined">edit</span>
                            </RouterLink>
                            <button class="btn btn-danger btn-sm d-flex align-items-center"
                                @click="deleteBook(book.id, book.title)">
                                <span class="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </td>

                </tr>
            </tbody>
        </table>
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import type BookModelResponse from "@/models/BookModelResponse"; // Importa la interfaz

// Define una referencia reactiva para almacenar los libros
const books = ref<BookModelResponse[]>([]);

// Función para obtener los libros desde el endpoint
const listBooks = async (): Promise<void> => {
    try {
        const response = await axios.get<BookModelResponse[]>("http://localhost:3000/books");
        books.value = response.data; // Asigna los datos al estado reactivo
        console.log("Datos recibidos:", books.value);
    } catch (error) {
        console.error("¡No se pudieron obtener los datos correctamente!", error);
    }
};

// Función para eliminar los libros desde el endpoint
const deleteBook = async (id: string, title: string): Promise<void> => {
    const confirmDelete = window.confirm(
        `Do you want to delete ${title}?`
    );
    if (confirmDelete) {
        try {
            await axios.delete(`http://localhost:3000/books/${id}`);
            window.alert("Successfully deleted the book!");
            listBooks(); // Vuelve a cargar los libros
        } catch (error) {
            console.log("Error deleting the book!", error);
        }
    }
};

// Llama a la función al inicializar el componente
onMounted(() => {
    listBooks(); // Obtén los libros al montar el componente
});
</script>
<style scoped>
</style>