<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold text-center mb-6">Adicionar Convidado</h1>
        <form @submit.prevent="addGuest" class="bg-white shadow-md rounded-lg p-6 space-y-4">

            <!-- Categoria -->
            <div>
                <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Categoria</label>
                <select v-model="guest.category" required
                    class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="noivo">Noivo</option>
                    <option value="noiva">Noiva</option>
                </select>
            </div>

            <!-- Tipo -->
            <div>
                <label for="type" class="block text-gray-700 text-sm font-bold mb-2">Tipo</label>
                <select v-model="guest.type" required
                    class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="amigos">Amigos</option>
                    <option value="vizinhos">Vizinhos</option>
                    <option value="igreja">Igreja</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="família">Família</option>
                </select>
            </div>

            <!-- Identificador -->
            <div>
                <label for="identificator" class="block text-gray-700 text-sm font-bold mb-2">Identificador (Nome de um
                    membro da família)</label>
                <input type="text" v-model="guest.identificator" required
                    class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <!-- Número de Membros -->
            <div>
                <label for="members" class="block text-gray-700 text-sm font-bold mb-2">Número de Membros</label>
                <input type="number" v-model="guest.members" min="1" required
                    class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <!-- Botão -->
            <div class="text-center">
                <button type="submit"
                    class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                    Adicionar Convidado
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { db } from '../firebase'; // Importa sua configuração do Firebase
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

// Definição da interface para o convidado
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
      guest: {
        category: 'noivo', // Valor inicial
        type: 'família', // Valor inicial
        identificator: '',
        members: 1,
      } as Guest, // Define 'guest' como um objeto do tipo 'Guest'
      guests: [] as Guest[], // Lista de convidados
    };
  },
  mounted() {
    // Chama a função que começa a escutar as mudanças no Firestore
    this.fetchGuests();
  },
  methods: {
    // Função para buscar os convidados do Firestore com escuta em tempo real
    fetchGuests() {
      const guestsCollection = collection(db, 'guests');
      
      // Escuta as alterações na coleção 'guests'
      onSnapshot(guestsCollection, (querySnapshot) => {
        this.guests = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Guest[]; // Atualiza a lista de convidados com as alterações
      }, (error) => {
        console.error("Erro ao ouvir mudanças:", error); // Captura erros na escuta
      });
    },

    // Função para adicionar um novo convidado
    async addGuest() {
      try {
        // Adiciona o convidado no Firestore
        await addDoc(collection(db, 'guests'), {
          category: this.guest.category,
          type: this.guest.type,
          identificator: this.guest.identificator,
          members: this.guest.members,
        });
        alert('Convidado adicionado com sucesso!');

        // Limpa os campos do formulário
        this.guest.identificator = '';
        this.guest.members = 1;

        window.location.reload();
      } catch (error) {
        console.error('Erro ao adicionar convidado:', error);
      }
    },
  },
});
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>