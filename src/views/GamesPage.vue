<template>
  <div class="games">
    <p>
      ACTION = {{ action }}<br />
      ID = {{ id }}<br />
      <a href="/#/games/list/all">Back to the list</a><br />
      <a href="/#/games/edit/0">Add a new game</a><br />
    </p>

    <!-- Displaying game details -->
    <table v-if="action === 'show'" class="table table-striped table-bordered table-hover">
      <tr><td>ID</td><td>{{ oneGame.id_game }}</td></tr>
      <tr><td>NAME</td><td>{{ oneGame.name_game }}</td></tr>
      <tr><td>PRICE</td><td>{{ oneGame.price_game }}</td></tr>
      <tr><td>DURATION</td><td>{{ oneGame.time_game }}</td></tr>
      <tr><td>MIN PLAYERS</td><td>{{ oneGame.nb_people_min_game }}</td></tr>
      <tr><td>MAX PLAYERS</td><td>{{ oneGame.nb_people_max_game }}</td></tr>
      <tr><td>STATE</td><td>{{ oneGame.state_game }}</td></tr>
    </table>

    <!-- Form for modifying or adding a game -->
    <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover">
      <tr><td>NAME</td>
        <td><input type="text" v-model="oneGame.name_game" /></td></tr>
      <tr><td>PRICE</td>
        <td><input type="number" v-model="oneGame.price_game" /></td></tr>
      <tr><td>DURATION</td>
        <td><input type="text" v-model="oneGame.time_game" /></td></tr>
      <tr><td>MIN PLAYERS</td>
        <td><input type="number" v-model="oneGame.nb_people_min_game" /></td></tr>
      <tr><td>MAX PLAYERS</td>
        <td><input type="number" v-model="oneGame.nb_people_max_game" /></td></tr>
      <tr><td>STATE</td>
        <td><input type="text" v-model="oneGame.state_game" /></td></tr>
      <tr><td colspan="2">
        <input type="button" value="SEND" @click="sendEditRequest()" />
      </td></tr>
    </table>

    <!-- List all of games -->
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <tr>
        <td>ID</td><td>NAME</td><td>PRICE</td><td>DURATION</td><td>MIN PLAYERS</td><td>MAX PLAYERS</td><td>STATE</td><td>SHOW DETAILS</td><td>EDIT</td><td>DELETE</td>
      </tr>
      <tr v-for="g of games" :key="g.id_game">
        <td>{{ g.id_game }}</td>
        <td>{{ g.name_game }}</td>
        <td>{{ g.price_game }}</td>
        <td>{{ g.time_game }}</td>
        <td>{{ g.nb_people_min_game }}</td>
        <td>{{ g.nb_people_max_game }}</td>
        <td>{{ g.state_game }}</td>
        <td><a :href="'/#/games/show/' + g.id_game">[SHOW]</a></td>
        <td><a :href="`/#/games/edit/${g.id_game}`">[EDIT]</a></td>
        <td><input type="button" value="DELETE" @click="sendDeleteRequest(g.id_game)" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'GamesPage',
  props: ['action', 'id'],
  data() {
    return {
      games: [], // Initialize as an empty array to be filled with data from JSON
      oneGame: {
        id_game: 0,
        name_game: '',
        price_game: 0,
        time_game: '',
        nb_people_min_game: 0,
        nb_people_max_game: 0,
        state_game: ''
      }
    }
  },
  methods: {
    async getAllData() {
      try {
        const response = await fetch('/source/json/games.json');
        this.games = await response.json();
      } catch (error) {
        console.error("Error loading data from games.json:", error);
      }
      this.refreshOneGame();
    },
    refreshOneGame() {
      if (this.$props.id === 'all' || this.$props.id === '0') return;
      this.oneGame = this.games.find(game => game.id_game == this.$props.id);
    },
    sendDeleteRequest(gameId) {
      this.games = this.games.filter(game => game.id_game !== gameId);
    },
    sendEditRequest() {
      const index = this.games.findIndex(g => g.id_game === this.oneGame.id_game);
      if (index !== -1) {
        this.games.splice(index, 1, { ...this.oneGame });
      } else {
        this.games.push({ ...this.oneGame });
      }
    }
  },
  watch: {
    id(newVal, oldVal) {
      this.refreshOneGame();
    }
  },
  created() {
    this.getAllData();
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
p {
  color: darkgray;
}
.table {
  width: 95%;
  margin: 20px;
}
.table td {
  text-align: left;
}
</style>
