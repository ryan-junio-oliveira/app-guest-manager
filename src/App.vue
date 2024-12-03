<template>
  <div id="app">
    <Form @guest-added="fetchGuests"/>
    <Guests @guest-updated="fetchGuests"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export default defineComponent({
  methods: {
    async fetchGuests() {
      const querySnapshot = await getDocs(collection(db, 'guests'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  },
});
</script>
