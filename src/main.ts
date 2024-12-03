// main.ts
import { createApp } from 'vue';
import './style.css';  // Importando o estilo com Tailwind

import App from './App.vue'
import Form from './components/Form.vue'
import Guests from './components/Guests.vue'

const app = createApp(App)

app.component('Form', Form)
app.component('Guests', Guests)

// Monta o app
app.mount('#app')
