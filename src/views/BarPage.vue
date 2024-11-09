<template>
    <div>
      <header class="header">
        <h1 class="title">Valet-love</h1>
      </header>
  
      <main>
        <section class="intro">
          <h2>Choose the bar you want to go to</h2>
        </section>
  
        <section class="bars">
          <div class="bar-item" v-for="(bar, index) in bars" :key="index" :class="{'reverse': index % 2 !== 0}">
            <img :src="bar.image" :alt="'Photo of ' + bar.name" class="bar-image">
            <div class="bar-info">
              <h3>{{ bar.name }}</h3>
              <p>{{ bar.description }}</p>
              <p>Address : {{ bar.address }}</p>
              <div class="schedule-container">
                <p>Opening times</p>
                <button @click="toggleHours(index)">
                  {{ bar.showHours ? "See less" : "See the hours" }}
                </button>
                <div v-if="bar.showHours" class="hoursList">
                  <ul>
                    <li v-for="(hours, day) in bar.hours" :key="day">{{ day }} : {{ hours }}</li>
                  </ul>
                </div>
              </div>
              <router-link :to="{ name: bar.linkName }" class="bar-link">See more</router-link>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import barsData from "../json/bar.json"

  export default {
    name: 'BarPage',
    data() {
      return { 
        bars : barsData
        /*
        bars: [
          {
            name: "The Financier",
            description: "Discover the warm atmosphere and unique cocktails of the Financier bar. An ideal place to relax and socialise.",
            address: "15 Rue du Départ, 75014 Paris",
            image: require('../views/image/bar1.jpg'),
            linkName: "Financier",
            showHours: false,
            hours: {
              monday: "17:00 - 02:00",
              tuesday: "17:00 - 02:00",
              wednesday: "17:00 - 02:00",
              thursday: "17:00 - 03:00",
              friday: "17:00 - 05:00",
              saturday: "14:00 - 05:00",
              sunday: "14:00 - 02:00"
            }
          },
          {
            name: "The Bateau Ivre",
            description: "A modern bar with innovative drinks and a dynamic atmosphere. Perfect for evenings out with friends.",
            address: "40 Rue Descartes, 75005 Paris",
            image: require('../views/image/bar2.jpg'),
            linkName: "BateauIvre",
            showHours: false,
            hours: {
              monday: "17:00 - 02:00",
              tuesday: "17:00 - 02:00",
              wednesday: "17:00 - 02:00",
              thursday: "17:00 - 02:00",
              friday: "17:00 - 02:00",
              saturday: "17:00 - 02:00",
              sunday: "17:00 - 02:00"
            }
          },
          {
            name: "The New Institute",
            description: "A chic bar with a wide selection of wines and an elegant atmosphere. The perfect place for refined evenings out.",
            address: "1 bd St Germain, 75005 Paris",
            image: require('../views/image/bar3.jpg'),
            linkName: "NewInstitute",
            showHours: false,
            hours: {
              monday: "07:00 - 02:00",
              tuesday: "07:00 - 02:00",
              wednesday: "07:00 - 02:00",
              thursday: "07:00 - 02:00",
              friday: "07:00 - 02:00",
              saturday: "07:00 - 02:00",
              sunday: "07:00 - 02:00"
            }
          }
        ]*/
      };
    },
    methods: {
    toggleHours(index) {
      this.bars[index].showHours = !this.bars[index].showHours;
    }}
  };
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
  
  body {
    background-color: #f0f0f5;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .header {
    background-color: #ff8c42;
    padding: 20px;
    width: 100%;
    text-align: center;
  }
  
  .title {
    color: #fff;
    font-size: 2.5em;
  }
  
  .intro {
    margin: 20px 0;
    text-align: center;
  }
  
  .intro h2 {
    font-size: 1.8em;
    color: #333;
  }
  
  .bars {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 80%;
    max-width: 800px;
  }
  
  .bar-item {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s;
  }
  
  .bar-item:hover {
    transform: scale(1.02);
  }
  
  .bar-image {
    width: 40%;
    height: auto;
  }
  
  .bar-info {
    padding: 20px;
    width: 60%;
  }
  
  .bar-info h3 {
    font-size: 1.5em;
    color: #ff8c42;
  }
  
  .bar-info p {
    margin: 10px 0;
    color: #555;
  }
  
  .bar-link {
    text-decoration: none;
    color: #ff8c42;
    font-weight: bold;
  }
  
  .bar-link:hover {
    color: #ff5722;
  }
  
  .reverse {
    flex-direction: row-reverse;
  }
  
  .schedule-container {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  button {
    background-color: #42b983;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #35865e;
  }
  
  .hoursList ul {
    list-style: none;
    padding: 0;
  }
  
  .hoursList li {
    background-color: #eaeaea;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  </style>
  