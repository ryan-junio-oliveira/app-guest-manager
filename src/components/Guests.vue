<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4 text-center">Lista de Convidados</h2>
      <ul class="space-y-2">
        <li v-for="guest in guests" :key="guest.id" class="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
          <div>
            {{ guest.identificator }} - {{ guest.type }} ({{ guest.category }}) - Membros: {{ guest.members }}
          </div>
          <div class="flex space-x-2">
            <button @click="editGuest(guest)" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Editar
            </button>
            <button @click="deleteGuest(guest.id)" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
              Excluir
            </button>
          </div>
        </li>
      </ul>
  
      <!-- Modal de Edição -->
      <div v-if="editingGuest" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 class="text-xl font-bold mb-4">Editar Convidado</h2>
          <form @submit.prevent="updateGuest" class="space-y-4">
            <div>
              <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Categoria</label>
              <select v-model="editingGuest.category" class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="noivo">Noivo</option>
                <option value="noiva">Noiva</option>
              </select>
            </div>
  
            <div>
              <label for="type" class="block text-gray-700 text-sm font-bold mb-2">Tipo</label>
              <select v-model="editingGuest.type" class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="amigos">Amigos</option>
                <option value="vizinhos">Vizinhos</option>
                <option value="igreja">Igreja</option>
                <option value="trabalho">Trabalho</option>
                <option value="família">Família</option>
              </select>
            </div>
  
            <div>
              <label for="identificator" class="block text-gray-700 text-sm font-bold mb-2">Identificador</label>
              <input type="text" v-model="editingGuest.identificator" class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
  
            <div>
              <label for="members" class="block text-gray-700 text-sm font-bold mb-2">Número de Membros</label>
              <input type="number" v-model="editingGuest.members" min="1" class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
  
            <div class="flex justify-between">
              <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Salvar
              </button>
              <button @click="cancelEdit" class="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { db } from '../firebase';
  import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
  
  interface Guest {
    id: string;
    category: string;
    type: string;
    identificator: string;
    members: number;
  }
  
  export default defineComponent({
    data() {
      return {
        guests: [] as Guest[],
        editingGuest: null as Guest | null,
      };
    },
    async mounted() {
      await this.fetchGuests();
    },
    methods: {
      async fetchGuests() {
        const querySnapshot = await getDocs(collection(db, 'guests'));
        this.guests = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Guest[];
      },
      editGuest(guest: Guest) {
        this.editingGuest = { ...guest };
      },
      cancelEdit() {
        this.editingGuest = null;
      },
      async updateGuest() {
        if (this.editingGuest) {
          const guestDoc = doc(db, 'guests', this.editingGuest.id);
          await updateDoc(guestDoc, {
            category: this.editingGuest.category,
            type: this.editingGuest.type,
            identificator: this.editingGuest.identificator,
            members: this.editingGuest.members,
          });
          this.editingGuest = null;
          await this.fetchGuests();
        }
      },
      async deleteGuest(id: string) {
        await deleteDoc(doc(db, 'guests', id));
        await this.fetchGuests();
      },
    },
  });
  </script>
  
  <style scoped>
  /* Modal overlay */
  .fixed {
    z-index: 50;
  }
  
  /* Responsividade e espaçamento */
  .container {
    max-width: 800px;
  }
  </style>
  