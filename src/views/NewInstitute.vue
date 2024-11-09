<template>
  <div>
    <header class="header">
      <h1 class="title">New Institute</h1>
      <nav class="navbar">
        <button @click="currentSection = 'home'">Home</button>
        <button @click="currentSection = 'drinks'">Drinks</button>
        <button @click="currentSection = 'games'">Games</button>
        <button @click="currentSection = 'workers'">Workers</button> 
      </nav>
    </header>

    <main>
      <!-- Home -->
      <section v-if="currentSection === 'home'" class="home-section">
        <div class="carousel-container">
          <button @click="prevImage" class="carousel-button prev-button">&#10094;</button>
          <img :src="carouselImages[currentImageIndex]" alt="New Institute" class="bar-image">
          <button @click="nextImage" class="carousel-button next-button">&#10095;</button>
        </div>
        <div class="description">
          <h2>About the New Institute</h2>
          <p>{{ barData.description }}</p>
          
        </div>
        
        <!-- Location Section with Toggleable Hours -->
        <div class="location">
          <h3>Location</h3>
          <div class="location-content">
            <img src="/image/map3.png" alt="Map to Bateau Ivre" class="map-image">
            <div class="location-details">
              <p><strong>Address:</strong> {{ barData.address }}</p>
               <!-- Toggleable Hours -->
              <div class="schedule-container">
                <p><strong>Opening times</strong></p>
                <button @click="toggleHours">
                  {{ showHours ? "See less" : "See the hours" }}
                </button>
                <div v-if="showHours" class="hoursList">
                  <ul>
                    <li v-for="(hours, day) in barData.hours" :key="day">
                      {{ day }}: {{ hours }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Drinks Table -->
      <section v-if="currentSection === 'drinks'">
        <h2 class="centered-title">Available Drinks</h2>
        <table class="drink-table" v-if="barDrinks.length > 0">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Ingredients</th>
              <th>Price (€)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(drink, index) in barDrinks" :key="index">
              <td><img :src="drink.image" :alt="drink.name_drink" class="drink-image"></td>
              <td>{{ drink.name_drink }}</td>
              <td>{{ drink.ingredient_drink }}</td>
              <td>{{ drink.price_selling_drink }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No drinks available</p>
      </section>

      <!-- Games Table -->
      <section v-if="currentSection === 'games'">
        <h2 class="centered-title">Available Games</h2>
        <table class="game-table" v-if="barGames.length > 0">
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
            <tr v-for="(game, index) in barGames" :key="index">
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

      <!-- Workers Table -->
      <section v-if="currentSection === 'workers'">
        <h2 class="centered-title">Our Workers</h2>
        <table class="worker-table" v-if="barWorkers.length > 0">
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
            <tr v-for="(worker, index) in barWorkers" :key="index">
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
  name: "NewInstitute",
  data() {
    return {
      currentSection: "home",
      barData: {},
      barDrinks: [],
      barGames: [],
      barWorkers: [], 
      currentImageIndex: 0,
      carouselImages: [
        "/image/bar3.jpg", 
        "/image/bar3_1.jpg", 
        "/image/bar3_2.jpg"
      ],
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
      const barId = 3;
      this.barData = barsData.find(bar => bar.id_bar === barId);
    },
    loadBarDrinks() {
      const barId = 3;
      const drinkIds = barDrinksData
        .filter(relation => relation.bar_id === barId)
        .map(relation => relation.drink_id);
    
      this.barDrinks = drinksData.filter(drink => 
        drinkIds.includes(drink.id_drink)
      );
    },
    loadBarGames() {
      const barId = 3;
      const gameIds = barGamesData
        .filter(relation => relation.bar_id === barId)
        .map(relation => relation.game_id);

      this.barGames = gamesData.filter(game => 
        gameIds.includes(game.id_game)
      );
    },
    loadBarWorkers() {
      const barId = 3;
      const workerIds = barWorkersData
        .filter(relation => relation.bar_id === barId)
        .map(relation => relation.employee_id);

      this.barWorkers = workersData.filter(worker => 
        workerIds.includes(worker.id_employee)
      );
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.carouselImages.length;
    },
    toggleHours() {
      this.showHours = !this.showHours;
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #ff8c42;
  text-align: center;
  padding: 20px;
  color: white;
  font-size: 2em;
}

.navbar {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.navbar button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #ff8c42;
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

.bar-image, .map-image {
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



.carousel-container {
  position: relative;
  width: 80%;
  max-width: 700px;
  margin: 0 auto;
}

.bar-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  border-radius: 50%;
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}

.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
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
