<template>
  <div>
    <h1>Assign Secret Santa</h1>
    <button @click="assignSecretSanta">Assign</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Assign',
  data() {
    return {
      message: '',
    };
  },
  methods: {
    async assignSecretSanta() {
      try {
        const response = await axios.post('http://localhost:3000/assign/secret-santa');
        this.message = response.data;
      } catch (error) {
        this.message = 'Error assigning Secret Santa pairs.';
        console.error(error);
      }
    },
  },
};
</script>

<style>
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}
</style>
