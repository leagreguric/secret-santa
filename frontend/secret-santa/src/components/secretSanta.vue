<template>
<div class="outer-container">
  <video autoplay loop muted>
    <source src="../assets/santa_hd.mp4" type="video/mp4">
  </video>
  <img src="../assets/santa.png" class="image santa" alt="">
  <div class="container" v-if="message">
    <div class="names">
      <p class="name message">{{message}}</p>
    </div>
    <button class="assign" @click="assignSecretSanta">Dodijeli parove</button>
  </div>
  <div v-else class="container">
    <div class="names">
      <div class="names-left-side">
        <p class="name">Lea</p>
        <p class="name">Katarina</p>
        <p class="name">Tatjana</p>
        <p class="name">Dalibor</p>
        <p class="name">Blanka</p>
        <p class="name">Hrvoje</p>
        <p class="name">Frano</p>
        <p class="name">Rocco</p>
      </div>
      
      <div class="names-right-side">
        <p class="name">Niko</p>
        <p class="name">Elena</p>
        <p class="name">Sven</p>
        <p class="name">Damir</p>
        <p class="name">Branka</p>
        <p class="name">Bruno</p>
        <p class="name">Petra</p>
        <p class="name">David</p>
      </div>
    </div>
    <button class="assign" @click="assignSecretSanta">Dodijeli parove</button>
  </div>
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
        this.message = 'Dogodila se greška, izvadite papiriće.🧻😒';
        console.error(error);
      }
    },
  },
  revealName() {
    console.log("called")
     const nameElement = document.querySelector('.name');
  nameElement.classList.add('revealed'); // Adds class to make the name visible
  }
};

 
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@400;700&family=Pangolin&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lakki+Reddy');

@keyframes scale {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100%{
    transform: scale(1);
  }
  
}


body {
  margin: 0 auto;
  background-color: #285728;
  overflow: hidden;
  cursor: url("https://i.imgur.com/M5InjI1.png"), auto;
  transition: cursor 0.5s ease-in-out;
}

body {
    background-color: #285728;

    background-position: top left;
    background-repeat: repeat;
    background-attachment: fixed;
    background-blend-mode: screen;
  }
.container {
  margin: auto;
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  height: 100vh; 

  width: 100vw;

  overflow: hidden;
  
  display: flex;

  justify-content: center;

  align-items: center;
}

video {
  position: fixed; /* Keeps the video fixed to the viewport */
  top: 50%;        /* Centers vertically */
  left: 50%;       /* Centers horizontally */
  transform: translate(-50%, -50%); /* Centers completely */
  width: auto;     /* Keeps aspect ratio */
  height: auto;
  min-width: 100%; /* Covers width of the screen */
  min-height: 100%; /* Covers height of the screen */
  z-index: -1;     /* Places it behind other content */
}
.name {
  font-family: "Pangolin", cursive;
  font-weight: 400;
  font-style: normal;
  color: rgb(255, 255, 179);
  font-size: 53px;
  padding: 0px;
  line-height: 16px;
  font-weight: bold;
  transform: skew(-4deg, 0deg);
  text-shadow: rgb(0, 0, 0) 2px 2px 10px;
}

.names {
  
  display: flex;
  flex-direction: row;
  gap: 55px;
  position: absolute;
  left: 165px;
  top: 440px;
  
}

.assign {
  cursor: url("https://i.imgur.com/1wEruF4.png"), auto;
	box-shadow:inset 0px 1px 0px 0px #f5978e;
	box-shadow: 0px 1px 10px 4px rgb(131, 32, 32);
	background:linear-gradient(to bottom, #f24537 5%, #c62d1f 100%);
	background-color:#f24537;
	border-radius:86px;
	border:1px solid #d02718;
	display:inline-block;
	color:#ffffff;
	font-family:"Mountains of Christmas", serif;
	font-size:120px;
	font-weight:bold;
	padding:30px 48px;
  text-align: center;
	text-decoration:none;
	text-shadow:0px 1px 15px #ff8d85;
  transition: 0.5s all ease-in-out;
}
.assign:hover {
	background:linear-gradient(to bottom, #c62d1f 5%, #f24537 100%);
	background-color:#c62d1f;
  animation: 1s scale infinite;
}
.assign:active {
	position:relative;
	top:10px;
  background:linear-gradient(to bottom, #6d1d17 5%, #a11e12 100%);
}

.message {
  text-wrap: wrap;
  width: 400px;
  line-height: 100px;
}

.image {
  position: absolute;
}

.santa {
  width: 150px;
  left: 50px;
  top: 50px;
  transform: rotate(-7deg);
  animation: 1s scale infinite;
  filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.4));   
}

.gift-purple {
  transform: rotate(26deg);
  bottom: -100px;
  width: 25%;
}

.lights {
  position: absolute;
  width: 50%;
}

.l-4 {
    right: 0;
    transform: scaleX(-1);
    left: 75%;
}

.l-3 {
  left: 50%;
  transform: scaleX(1);
}

.l-2 {
  left: 50%;
  transform: scaleX(-1);
}

.lights-container {
  
}

</style>
