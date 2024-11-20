<template>
  <div v-if="bar">
    <header class="header">
      <div class="logo-container">
        <img src="/image/logo.png" alt="Logo" class="logo-image">
      </div>
      <div class="navbar">
        <button @click="currentSection = 'home'">HOME</button>
        <button @click="currentSection = 'About'">ABOUT</button>
        <button @click="currentSection = 'favorite'">FAVORITE</button>
        <button @click="currentSection = 'login'">LOGIN</button>
      </div>
    </header> 


    <main>
      <!-- Home Section -->
      <section v-if="currentSection === 'home'" class="home-section">
        
        <div class="description">
          <h1 class="title">{{ bar.name }}</h1>
          <p v-html="bar.fool_description"></p>

        </div>

        <div class="items">
          <div class="drinks-section">
            <img src="/image/Drinks_item.png" alt="Drinks Item">
            <button @click="currentSection = 'drinks'">DRINKS</button>
          </div>

          <div class="games-section">
            <img src="/image/Games_item.png" alt="Games Item">
            <button @click="currentSection = 'games'">GAMES</button>
          </div>

          <div class="workers-section">
            <img src="/image/Workers_item.png" alt="Workers Item">
            <button @click="currentSection = 'workers'">WORKERS</button>
          </div>
        </div>

        <!-- Location Section with Toggleable Hours -->
        <div class="location">
          <h3>Location</h3>
          <div class="location-content">
            <img :src="bar.image_map" alt="Map to the bar" class="map-image">
            <div class="location-details">
              <p><strong>Address:</strong> {{ bar.address }}</p>
              <div class="schedule-container">
                <p><strong>Opening times</strong></p>
                <button @click="toggleHours">
                  {{ showHours ? "See less" : "See the hours" }}
                </button>
                <div v-if="showHours" class="hoursList">
                  <ul>
                    <li v-for="(hours, day) in bar.hours" :key="day">{{ day }}: {{ hours }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section v-if="currentSection === 'About'">
        <p>T'es arrivé dans le about mais jai pas encore fait grand chose</p>
      </section>

      <!-- Favorite Section -->
      <section v-if="currentSection === 'favorite'">
        <p>Pareil que pour about</p>
      </section>

      <!-- Login Section -->
      <section v-if="currentSection === 'login'">
        <p>pareil que pour favorite</p>
      </section>

      <!-- Drinks Section -->
      <section v-if="currentSection === 'drinks'">
        <h2 class="centered-title">Available Drinks</h2>
        <table class="drink-table" v-if="filteredDrinks.length > 0">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Ingredients</th>
              <th>Price (€)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(drink, index) in filteredDrinks" :key="index">
              <td><img :src="drink.image" :alt="drink.name_drink" class="drink-image"></td>
              <td>{{ drink.name_drink }}</td>
              <td>{{ drink.ingredient_drink }}</td>
              <td>{{ drink.price_selling_drink }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No drinks available</p>
      </section>

      <!-- Games Section -->
      <section v-if="currentSection === 'games'">
        <h2 class="centered-title">Available Games</h2>
        <table class="game-table" v-if="filteredGames.length > 0">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (€)</th>
              <th>Time</th>
              <th>Min Players</th>
              <th>Max Players</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in filteredGames" :key="index">
              <td><img :src="game.image" :alt="game.name_game" class="game-image"></td>
              <td>{{ game.name_game }}</td>
              <td>{{ game.price_game }}</td>
              <td>{{ game.time_game }}</td>
              <td>{{ game.nb_people_min_game }}</td>
              <td>{{ game.nb_people_max_game }}</td>
              <td>{{ game.state_game }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No games available</p>
      </section>

      <!-- Workers Section -->
      <section v-if="currentSection === 'workers'">
        <h2 class="centered-title">Our Workers</h2>
        <table class="worker-table" v-if="filteredWorkers.length > 0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Post</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Salary (€)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(worker, index) in filteredWorkers" :key="index">
              <td>{{ worker.name_employee }}</td>
              <td>{{ worker.post_employee }}</td>
              <td>{{ worker.age_employee }}</td>
              <td>{{ worker.gender_employee }}</td>
              <td>{{ worker.salary_employee }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No workers available</p>
      </section>

    </main>
  </div>
</template>

<script>
import barsData from "../json/bar.json";
import drinksData from "../json/drinks.json";
import barDrinksData from "../json/bar_drinks.json";
import gamesData from "../json/games.json";
import barGamesData from "../json/bar_games.json";
import workersData from "../json/workers.json"; 
import barWorkersData from "../json/bar_workers.json";

export default {
  name: "Bar",
  data() {
    return {
      currentSection: "home",
      bar: null,
      barDrinks: [],
      barGames: [],
      barWorkers: [],
      currentImageIndex: 0,
      showHours: false
    };
  },
  mounted() {
    this.loadBarData();
    this.loadBarDrinks();
    this.loadBarGames();
    this.loadBarWorkers();
  },
  computed: {
    filteredDrinks() {
      console.log("Filtered drinks:", this.barDrinks);
      return drinksData.filter(drink => 
        this.barDrinks.some(barDrink => barDrink.drink_id === drink.id_drink)
      );
    },
    filteredGames() {
      return gamesData.filter(game => 
        this.barGames.some(barGame => barGame.game_id === game.id_game)
      );
    },
    filteredWorkers() {
      return workersData.filter(worker =>
        this.barWorkers.some(barWorker => barWorker.employee_id === worker.id_employee)
      );
    }
  },
  methods: {
    loadBarData() {
      const barId = parseInt(this.$route.params.id, 10);
      this.bar = barsData.find(bar => bar.id_bar === barId);
    },
    loadBarDrinks() {
      const barId = parseInt(this.$route.params.id, 10);
      const drinkIds = barDrinksData
        .filter(barDrink => barDrink.bar_id === barId)
        .map(barDrink => barDrink.drink_id);
      this.barDrinks = drinkIds;
    },
    loadBarGames() {
      const barId = parseInt(this.$route.params.id, 10);
      const gameIds = barGamesData
        .filter(barGame => barGame.bar_id === barId)
        .map(barGame => barGame.game_id);
      this.barGames = gameIds;
    },
    loadBarWorkers() {
      const barId = parseInt(this.$route.params.id, 10);
      const workerIds = barWorkersData
        .filter(barWorker => barWorker.bar_id === barId)
        .map(barWorker => barWorker.employee_id);
      this.barWorkers = workerIds;
    },
    toggleHours() {
      this.showHours = !this.showHours;
    }
  }
};
</script>

  

<style scoped>

.header {
  display: flex; /* Active Flexbox */
  justify-content: space-between; /* Place le logo à gauche et les boutons à droite */
  align-items: center; /* Aligne verticalement tous les éléments */
  background-color: #5005a0;
  color: white;
  padding: 10px 20px; /* Ajoute de l’espace à l’intérieur du header */
}

.logo-container {
  display: flex; /* Pour flexibilité future */
  align-items: center; /* Centrer verticalement le logo */
}

.logo-image {
  height: 50px; /* Ajuste la hauteur du logo */
  width: auto; /* Conserve ses proportions */
}

.navbar {
  display: flex; /* Aligne les boutons sur une ligne */
  gap: 15px; /* Espace entre les boutons */
}

.navbar button {
  padding: 10px 20px;
  background-color: #05a04b;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1em;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.navbar button:hover {
  background-color: #e07b37;
}




.home-section, .drinks, .games {
  text-align: center;
  margin-top: 20px;
}

.map-image {
  width: 100%;
  max-width: 600px;
  margin: 10px 0;
  border-radius: 8px;
}

.description {
  margin: 20px;
}

.drink-table, .game-table {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.drink-table th, .drink-table td, .game-table th, .game-table td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.drink-table th, .game-table th {
  background-color: #ff8c42;
  color: white;
  font-weight: bold;
}

.drink-table tr:nth-child(even), .game-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.drink-table tr:hover, .game-table tr:hover {
  background-color: #f1f1f1;
}

.drink-image, .game-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}
.centered-title {
  text-align: center;
  margin: 20px 0;
  font-size: 1.8em;
}


.items {
  display: flex;
  justify-content: center;
  gap: 20px; /* Espacement entre les éléments */
  margin-top: 20px;
}

/* Styles pour chaque section */
.drinks-section,
.games-section,
.workers-section {
  display: flex;
  flex-direction: column; /* Aligne les enfants verticalement */
  align-items: center;    /* Centrer horizontalement */
}

.drinks-section img,
.games-section img,
.workers-section img {
  width: 300px;   /* Ajustez la taille de l'image */
  height: auto;
  margin-bottom: 10px; /* Espacement entre l'image et le bouton */
}

.drinks-section button, .games-section button, .workers-section button {
  padding: 10px 20px;
  background-color: #05a04b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.drinks-section button:hover, .games-section button:hover,.workers-section button:hover {
  background-color: #e07b37;
}


.bar-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.description {
  margin: 20px 0;
}


.location {
  display: flex;
  flex-direction: column; 
  align-items: center;     
  justify-content: center;
  text-align: center;     
  margin: 0 auto;          
}

.location-content {
  display: flex;
  flex-direction: row;  
  align-items: center;     
  justify-content: center; 
  width: 80%;              
  margin-top: 20px;        
}

.location-details {
  padding-left: 20px;   
}

.map-image {
  width: 400px;
  height: auto;
  margin-right: 20px;
}


.schedule-container {
  margin-top: 10px;
}

.schedule-container button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #ff8c42;
  color: white;
  border: none;
  cursor: pointer;
}

.schedule-container button:hover {
  background-color: #ff7b2d;
}

.hoursList ul {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
}

.hoursList li {
  margin: 5px 0;
}

.worker-table {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.worker-table th, .worker-table td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.worker-table th {
  background-color: #ff8c42;
  color: white;
  font-weight: bold;
}

.worker-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.worker-table tr:hover {
  background-color: #f1f1f1;
}


</style>
